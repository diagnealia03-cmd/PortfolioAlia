resource "kubernetes_namespace" "portfolio" {
  metadata {
    name = var.namespace

    labels = {
      app         = var.app_name
      environment = var.environment
      managed-by  = "terraform"
    }

    annotations = {
      description = "Namespace géré par Terraform pour ${var.app_name}"
    }
  }
}
