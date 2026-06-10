# ─────────────────────────────────────────
# outputs.tf — Sorties après terraform apply
# ─────────────────────────────────────────

output "namespace" {
  description = "Namespace Kubernetes créé"
  value       = module.namespace.namespace_name
}

output "frontend_service_name" {
  description = "Nom du service Kubernetes frontend"
  value       = module.k8s_app.frontend_service_name
}

output "backend_service_name" {
  description = "Nom du service Kubernetes backend"
  value       = module.k8s_app.backend_service_name
}

output "mongodb_service_name" {
  description = "Nom du service Kubernetes MongoDB"
  value       = module.k8s_app.mongodb_service_name
}

output "ingress_host" {
  description = "URL d'accès à l'application"
  value       = "http://${var.ingress_host}"
}

output "docker_network_name" {
  description = "Réseau Docker créé"
  value       = module.docker_infra.network_name
}

output "environment" {
  description = "Environnement déployé"
  value       = var.environment
}

output "access_instructions" {
  description = "Instructions pour accéder à l'application"
  value       = <<-EOT
    ✅ Déploiement Terraform terminé !

    Pour accéder à l'application :
    1. Vérifier que Minikube tourne : minikube status
    2. Activer l'ingress : minikube addons enable ingress
    3. Obtenir l'IP : minikube ip
    4. Ajouter dans /etc/hosts : <minikube-ip> ${var.ingress_host}
    5. Ouvrir : http://${var.ingress_host}

    Commandes utiles :
    kubectl get all -n ${var.namespace}
    kubectl get ingress -n ${var.namespace}
  EOT
}
