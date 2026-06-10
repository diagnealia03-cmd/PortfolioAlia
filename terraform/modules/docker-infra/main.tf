terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
}

resource "docker_network" "portfolio_network" {
  name = "${var.app_name}-${var.environment}-network"

  labels {
    label = "app"
    value = var.app_name
  }

  labels {
    label = "environment"
    value = var.environment
  }

  labels {
    label = "managed-by"
    value = "terraform"
  }
}
