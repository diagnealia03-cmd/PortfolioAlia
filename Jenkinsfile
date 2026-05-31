pipeline {
    agent any

    environment {
        SONAR_PROJECT_KEY = 'portfolio-alia'
        SONAR_HOST_URL    = 'http://sonarqube:9000'
        COMPOSE_FILE_PATH = '/var/jenkins_home/workspace/portfolio-alia-pipeline/docker-compose.yml'
    }

    stages {

        stage('Checkout') {
            steps {
                echo '📥 Récupération du code source...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '📦 Installation des dépendances backend...'
                dir('backend') { sh 'npm install' }
                echo '📦 Installation des dépendances frontend...'
                dir('frontend') { sh 'npm install' }
            }
        }

        stage('Build Frontend') {
            steps {
                echo '🏗️  Compilation du frontend React...'
                dir('frontend') { sh 'npm run build' }
                echo '✅ Build frontend terminé !'
            }
        }

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

        stage('Docker Build') {
            steps {
                echo '🐳 Construction des images Docker...'
                sh "docker-compose -f ${WORKSPACE}/docker-compose.yml build backend frontend"
                echo '✅ Images Docker construites !'
            }
        }

        stage('Deploy') {
            steps {
                echo '🚀 Déploiement en cours...'
                // On redémarre UNIQUEMENT les services applicatifs
                // pas Jenkins ni SonarQube qui tournent déjà
                sh """
                    docker-compose -f ${WORKSPACE}/docker-compose.yml \
                        up -d --force-recreate \
                        mongodb backend frontend
                """
                echo '✅ Déploiement terminé !'
            }
        }
    }

    post {
        success {
            echo '🎉 Pipeline réussi ! Le portfolio est déployé sur http://localhost'
        }
        failure {
            echo '❌ Pipeline échoué. Vérifie les logs ci-dessus.'
        }
        always {
            echo '🏁 Pipeline terminé.'
        }
    }
}
