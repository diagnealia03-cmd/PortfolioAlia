output "namespace_name" {
  value = kubernetes_namespace.portfolio.metadata[0].name
}
