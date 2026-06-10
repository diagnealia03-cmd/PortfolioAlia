# ═══════════════════════════════════════════════════════════════
# modules/k8s-app/main.tf
# Déploiements, Services, ConfigMap, Secret, PVC, Ingress
# ═══════════════════════════════════════════════════════════════

locals {
  common_labels = {
    app         = var.app_name
    environment = var.environment
    managed-by  = "terraform"
  }
}

# ── Secret MongoDB ───────────────────────────────────────────────
resource "kubernetes_secret" "mongodb_secret" {
  metadata {
    name      = "mongodb-secret"
    namespace = var.namespace
    labels    = local.common_labels
  }

  data = {
    MONGO_INITDB_ROOT_USERNAME = base64encode("admin")
    MONGO_INITDB_ROOT_PASSWORD = base64encode("portfolio2024")
    MONGODB_URI                = base64encode("mongodb://admin:portfolio2024@mongodb-service:${var.mongodb_port}/${var.mongodb_database}?authSource=admin")
  }

  type = "Opaque"
}

# ── ConfigMap Backend ────────────────────────────────────────────
resource "kubernetes_config_map" "backend_config" {
  metadata {
    name      = "backend-config"
    namespace = var.namespace
    labels    = local.common_labels
  }

  data = {
    NODE_ENV     = var.environment
    PORT         = tostring(var.backend_port)
    MONGODB_HOST = "mongodb-service"
    MONGODB_PORT = tostring(var.mongodb_port)
    MONGODB_DB   = var.mongodb_database
  }
}

# ── PersistentVolumeClaim MongoDB ────────────────────────────────
resource "kubernetes_persistent_volume_claim" "mongodb_pvc" {
  metadata {
    name      = "mongodb-pvc"
    namespace = var.namespace
    labels    = local.common_labels
  }

  spec {
    access_modes = ["ReadWriteOnce"]
    resources {
      requests = {
        storage = var.mongodb_storage_size
      }
    }
  }
}

# ── StatefulSet MongoDB ──────────────────────────────────────────
resource "kubernetes_stateful_set" "mongodb" {
  metadata {
    name      = "mongodb"
    namespace = var.namespace
    labels    = merge(local.common_labels, { component = "database" })
  }

  spec {
    service_name = "mongodb-service"
    replicas     = 1

    selector {
      match_labels = { app = "mongodb" }
    }

    template {
      metadata {
        labels = { app = "mongodb" }
      }

      spec {
        container {
          name  = "mongodb"
          image = var.mongodb_image

          port {
            container_port = var.mongodb_port
          }

          env {
            name = "MONGO_INITDB_ROOT_USERNAME"
            value_from {
              secret_key_ref {
                name = kubernetes_secret.mongodb_secret.metadata[0].name
                key  = "MONGO_INITDB_ROOT_USERNAME"
              }
            }
          }

          env {
            name = "MONGO_INITDB_ROOT_PASSWORD"
            value_from {
              secret_key_ref {
                name = kubernetes_secret.mongodb_secret.metadata[0].name
                key  = "MONGO_INITDB_ROOT_PASSWORD"
              }
            }
          }

          volume_mount {
            name       = "mongodb-storage"
            mount_path = "/data/db"
          }

          resources {
            requests = { memory = "256Mi", cpu = "100m" }
            limits   = { memory = "512Mi", cpu = "500m" }
          }
        }

        volume {
          name = "mongodb-storage"
          persistent_volume_claim {
            claim_name = kubernetes_persistent_volume_claim.mongodb_pvc.metadata[0].name
          }
        }
      }
    }
  }
}

# ── Service MongoDB (Headless) ───────────────────────────────────
resource "kubernetes_service" "mongodb" {
  metadata {
    name      = "mongodb-service"
    namespace = var.namespace
    labels    = merge(local.common_labels, { component = "database" })
  }

  spec {
    selector   = { app = "mongodb" }
    cluster_ip = "None"
    port {
      port        = var.mongodb_port
      target_port = var.mongodb_port
    }
  }
}

# ── Deployment Backend ───────────────────────────────────────────
resource "kubernetes_deployment" "backend" {
  metadata {
    name      = "backend"
    namespace = var.namespace
    labels    = merge(local.common_labels, { component = "backend" })
  }

  spec {
    replicas = var.backend_replicas

    selector {
      match_labels = { app = "backend" }
    }

    template {
      metadata {
        labels = { app = "backend" }
      }

      spec {
        container {
          name              = "backend"
          image             = var.backend_image
          image_pull_policy = "IfNotPresent"

          port {
            container_port = var.backend_port
          }

          env_from {
            config_map_ref {
              name = kubernetes_config_map.backend_config.metadata[0].name
            }
          }

          env {
            name = "MONGODB_URI"
            value_from {
              secret_key_ref {
                name = kubernetes_secret.mongodb_secret.metadata[0].name
                key  = "MONGODB_URI"
              }
            }
          }

          resources {
            requests = { memory = "128Mi", cpu = "100m" }
            limits   = { memory = "256Mi", cpu = "300m" }
          }

          readiness_probe {
            http_get {
              path = "/api/health"
              port = var.backend_port
            }
            initial_delay_seconds = 10
            period_seconds        = 5
          }
        }
      }
    }
  }

  depends_on = [kubernetes_stateful_set.mongodb]
}

# ── Service Backend ──────────────────────────────────────────────
resource "kubernetes_service" "backend" {
  metadata {
    name      = "backend-service"
    namespace = var.namespace
    labels    = merge(local.common_labels, { component = "backend" })
  }

  spec {
    selector = { app = "backend" }
    type     = "ClusterIP"
    port {
      port        = var.backend_port
      target_port = var.backend_port
    }
  }
}

# ── Deployment Frontend ──────────────────────────────────────────
resource "kubernetes_deployment" "frontend" {
  metadata {
    name      = "frontend"
    namespace = var.namespace
    labels    = merge(local.common_labels, { component = "frontend" })
  }

  spec {
    replicas = var.frontend_replicas

    selector {
      match_labels = { app = "frontend" }
    }

    template {
      metadata {
        labels = { app = "frontend" }
      }

      spec {
        container {
          name              = "frontend"
          image             = var.frontend_image
          image_pull_policy = "IfNotPresent"

          port {
            container_port = var.frontend_port
          }

          resources {
            requests = { memory = "64Mi",  cpu = "50m"  }
            limits   = { memory = "128Mi", cpu = "200m" }
          }
        }
      }
    }
  }
}

# ── Service Frontend ─────────────────────────────────────────────
resource "kubernetes_service" "frontend" {
  metadata {
    name      = "frontend-service"
    namespace = var.namespace
    labels    = merge(local.common_labels, { component = "frontend" })
  }

  spec {
    selector = { app = "frontend" }
    type     = "NodePort"
    port {
      port        = var.frontend_port
      target_port = var.frontend_port
    }
  }
}

# ── Ingress ──────────────────────────────────────────────────────
resource "kubernetes_ingress_v1" "portfolio_ingress" {
  metadata {
    name      = "portfolio-ingress"
    namespace = var.namespace
    labels    = local.common_labels

    annotations = {
      "kubernetes.io/ingress.class"                = "nginx"
      "nginx.ingress.kubernetes.io/rewrite-target" = "/"
    }
  }

  spec {
    rule {
      host = var.ingress_host

      http {
        path {
          path      = "/"
          path_type = "Prefix"
          backend {
            service {
              name = kubernetes_service.frontend.metadata[0].name
              port { number = var.frontend_port }
            }
          }
        }

        path {
          path      = "/api"
          path_type = "Prefix"
          backend {
            service {
              name = kubernetes_service.backend.metadata[0].name
              port { number = var.backend_port }
            }
          }
        }
      }
    }
  }

  depends_on = [
    kubernetes_service.frontend,
    kubernetes_service.backend
  ]
}
