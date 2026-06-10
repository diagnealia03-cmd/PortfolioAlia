output "frontend_service_name" {
  value = kubernetes_service.frontend.metadata[0].name
}

output "backend_service_name" {
  value = kubernetes_service.backend.metadata[0].name
}

output "mongodb_service_name" {
  value = kubernetes_service.mongodb.metadata[0].name
}

output "ingress_name" {
  value = kubernetes_ingress_v1.portfolio_ingress.metadata[0].name
}
