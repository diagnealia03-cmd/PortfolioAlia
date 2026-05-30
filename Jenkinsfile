pipeline {

    // Définit où Jenkins exécute ce pipeline
    // "any" = sur n'importe quel agent disponible
    agent any

    // Variables disponibles dans tout le pipeline
    environment {
        // Nom du projet dans SonarQube
        SONAR_PROJECT_KEY = 'portfolio-alia'
        // URL de SonarQube (nom du service Docker)
        SONAR_HOST_URL    = 'http://sonarqube:9000'
    }

    stages {

        // ─────────────────────────────────────
        // STAGE 1 : Récupération du code
        // Jenkins clone ton dépôt GitHub
        // ─────────────────────────────────────
        stage('Checkout') {
            steps {
                echo '📥 Récupération du code source...'
                checkout scm
            }
        }

        // ─────────────────────────────────────
        // STAGE 2 : Installation des dépendances
        // ─────────────────────────────────────
        stage('Install Dependencies') {
            steps {
                echo '📦 Installation des dépendances backend...'
                dir('backend') {
                    sh 'npm install'
                }
                echo '📦 Installation des dépendances frontend...'
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        // ─────────────────────────────────────
        // STAGE 3 : Build du frontend
        // Compile React en fichiers statiques
        // ─────────────────────────────────────
        stage('Build Frontend') {
            steps {
                echo '🏗️  Compilation du frontend React...'
                dir('frontend') {
                    sh 'npm run build'
                }
                echo '✅ Build frontend terminé !'
            }
        }

        // ─────────────────────────────────────
        // STAGE 4 : Analyse SonarQube
        // Analyse la qualité du code
        // ─────────────────────────────────────
        stage('SonarQube Analysis') {
            steps {
                echo '🔍 Analyse de la qualité du code...'
                withSonarQubeEnv('SonarQube') {
                    sh """
                        npx sonar-scanner \
                          -Dsonar.projectKey=${SONAR_PROJECT_KEY} \
                          -Dsonar.projectName='Portfolio Alia DIAGNE' \
                          -Dsonar.sources=. \
                          -Dsonar.exclusions=**/node_modules/**,**/dist/**,**/.git/** \
                          -Dsonar.host.url=${SONAR_HOST_URL}
                    """
                }
            }
        }

        // ─────────────────────────────────────
        // STAGE 5 : Build des images Docker
        // ─────────────────────────────────────
        stage('Docker Build') {
            steps {
                echo '🐳 Construction des images Docker...'
                sh 'docker compose build'
                echo '✅ Images Docker construites !'
            }
        }

        // ─────────────────────────────────────
        // STAGE 6 : Déploiement
        // Redémarre les conteneurs avec
        // les nouvelles images
        // ─────────────────────────────────────
        stage('Deploy') {
            steps {
                echo '🚀 Déploiement en cours...'
                sh 'docker compose up -d --force-recreate'
                echo '✅ Déploiement terminé !'
            }
        }
    }

    // ─────────────────────────────────────
    // POST : Actions après le pipeline
    // Exécutées peu importe le résultat
    // ─────────────────────────────────────
    post {
        success {
            echo '🎉 Pipeline réussi ! Le portfolio est déployé.'
        }
        failure {
            echo '❌ Pipeline échoué. Vérifie les logs ci-dessus.'
        }
        always {
            echo '🏁 Pipeline terminé.'
        }
    }
}
