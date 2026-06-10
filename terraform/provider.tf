terraform {
  required_version = ">= 1.0.0"

  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.23"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.11"
    }
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
}

# Provider Kubernetes - pointe vers Minikube
provider "kubernetes" {
  config_path    = "~/.kube/config"
  config_context = "minikube"
}

# Provider Helm
provider "helm" {
  kubernetes {
    config_path    = "~/.kube/config"
    config_context = "minikube"
  }
}

# Provider Docker
provider "docker" {
  host = "unix:///var/run/docker.sock"
}
