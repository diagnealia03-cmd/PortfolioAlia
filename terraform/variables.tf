# ─────────────────────────────────────────
# Variables globales — PortfolioAlia
# ─────────────────────────────────────────

variable "namespace" {
  description = "Namespace Kubernetes pour PortfolioAlia"
  type        = string
  default     = "portfolio"
}

variable "app_name" {
  description = "Nom de l'application"
  type        = string
  default     = "portfolioalia"
}

variable "environment" {
  description = "Environnement cible (dev, staging, prod)"
  type        = string
  default     = "dev"

  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "L'environnement doit être dev, staging ou prod."
  }
}

variable "frontend_image" {
  description = "Image Docker du frontend React"
  type        = string
  default     = "portfolioalia-frontend:latest"
}

variable "backend_image" {
  description = "Image Docker du backend Node.js"
  type        = string
  default     = "portfolioalia-backend:latest"
}

variable "mongodb_image" {
  description = "Image Docker MongoDB"
  type        = string
  default     = "mongo:6.0"
}

variable "frontend_replicas" {
  description = "Nombre de réplicas frontend"
  type        = number
  default     = 2
}

variable "backend_replicas" {
  description = "Nombre de réplicas backend"
  type        = number
  default     = 2
}

variable "mongodb_storage_size" {
  description = "Taille du PersistentVolumeClaim MongoDB"
  type        = string
  default     = "1Gi"
}

variable "mongodb_database" {
  description = "Nom de la base de données MongoDB"
  type        = string
  default     = "portfolioalia"
}

variable "ingress_host" {
  description = "Hostname exposé par l'Ingress"
  type        = string
  default     = "portfolio.local"
}

variable "frontend_port" {
  description = "Port du service frontend"
  type        = number
  default     = 80
}

variable "backend_port" {
  description = "Port du service backend"
  type        = number
  default     = 5000
}

variable "mongodb_port" {
  description = "Port de MongoDB"
  type        = number
  default     = 27017
}
