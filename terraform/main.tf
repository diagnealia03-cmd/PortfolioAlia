# ═══════════════════════════════════════════════════════════════
# main.tf — Point d'entrée Terraform pour PortfolioAlia
# ═══════════════════════════════════════════════════════════════

# ── 1. Namespace ────────────────────────────────────────────────
module "namespace" {
  source      = "./modules/k8s-namespace"
  namespace   = var.namespace
  app_name    = var.app_name
  environment = var.environment
}

# ── 2. Infrastructure Docker ────────────────────────────────────
module "docker_infra" {
  source      = "./modules/docker-infra"
  app_name    = var.app_name
  environment = var.environment
}

# ── 3. Application Kubernetes ───────────────────────────────────
module "k8s_app" {
  source = "./modules/k8s-app"

  namespace        = module.namespace.namespace_name
  app_name         = var.app_name
  environment      = var.environment

  frontend_image   = var.frontend_image
  backend_image    = var.backend_image
  mongodb_image    = var.mongodb_image

  frontend_replicas    = var.frontend_replicas
  backend_replicas     = var.backend_replicas

  mongodb_storage_size = var.mongodb_storage_size
  mongodb_database     = var.mongodb_database
  mongodb_port         = var.mongodb_port

  frontend_port = var.frontend_port
  backend_port  = var.backend_port
  ingress_host  = var.ingress_host

  depends_on = [module.namespace]
}
