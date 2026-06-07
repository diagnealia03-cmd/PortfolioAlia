pipeline {
    agent any
    environment {
        SONAR_PROJECT_KEY  = 'portfolio-alia'
        SONAR_HOST_URL     = 'http://sonarqube:9000'
        COMPOSE_PROJECT    = 'portfolioalia'
        COMPOSE_FILE_PATH  = "${WORKSPACE}/docker-compose.yml"
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
                dir('backend') { sh 'npm install' }
                dir('frontend') { sh 'npm install' }
            }
        }
        stage('Build Frontend') {
            steps {
                dir('frontend') { sh 'npm run build' }
                echo '✅ Build frontend terminé !'
            }
        }
        stage('SonarQube Analysis') {
            steps {
                echo '🔍 Analyse de la qualité du code...'
                withSonarQubeEnv('SonarQube') {
                    withCredentials([string(credentialsId: 'sonarqube-token', variable: 'SONAR_TOKEN')]) {
                        sh """
                            npx sonar-scanner \
                              -Dsonar.projectKey=${SONAR_PROJECT_KEY} \
                              -Dsonar.projectName='Portfolio Alia DIAGNE' \
                              -Dsonar.sources=. \
                              -Dsonar.exclusions=**/node_modules/**,**/dist/**,**/.git/** \
                              -Dsonar.host.url=${SONAR_HOST_URL} \
                              -Dsonar.token=${SONAR_TOKEN}
                        """
                    }
                }
            }
        }
        stage('Docker Build') {
            steps {
                echo '🐳 Construction des images Docker...'
                sh """
                    docker-compose --env-file /var/jenkins_home/.env \
                        -p ${COMPOSE_PROJECT} \
                        -f ${COMPOSE_FILE_PATH} \
                        build backend frontend
                """
                echo '✅ Images Docker construites !'
            }
        }
        stage('Deploy Docker') {
            steps {
                echo '🚀 Déploiement Docker en cours...'
                sh """
                    docker-compose --env-file /var/jenkins_home/.env \
                        -p ${COMPOSE_PROJECT} \
                        -f ${COMPOSE_FILE_PATH} \
                        up -d --force-recreate \
                        mongodb backend frontend
                """
                echo '✅ Déploiement Docker terminé !'
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                echo '☸️ Déploiement sur Kubernetes...'
                sh """
                    kubectl apply -f ${WORKSPACE}/k8s/namespace.yaml
                    kubectl apply -f ${WORKSPACE}/k8s/secrets.yaml
                    kubectl apply -f ${WORKSPACE}/k8s/mongodb/
                    kubectl apply -f ${WORKSPACE}/k8s/backend/
                    kubectl apply -f ${WORKSPACE}/k8s/frontend/
                    kubectl rollout restart deployment/backend -n portfolio
                    kubectl rollout restart deployment/frontend -n portfolio
                    kubectl rollout status deployment/backend -n portfolio --timeout=60s
                    kubectl rollout status deployment/frontend -n portfolio --timeout=60s
                """
                echo '✅ Déploiement Kubernetes terminé !'
            }
        }
    }
    post {
        success {
            echo '🎉 Pipeline réussi ! Portfolio déployé sur Docker et Kubernetes !'
        }
        failure {
            echo '❌ Pipeline échoué. Vérifie les logs ci-dessus.'
        }
        always {
            echo '🏁 Pipeline terminé.'
        }
    }
}
