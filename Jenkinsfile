pipeline {
    agent any

    stages {

        stage('Clone') {
            steps {
               git branch: 'main', url: 'https://github.com/PiyaliChoudhury/my-app.git'
            }
        }

        stage('Build (Simulated)') {
            steps {
                echo "Docker build simulated successfully"
            }
        }

        stage('Push (Simulated)') {
            steps {
                echo "Docker push simulated successfully"
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
               echo "Kubernetes deployment simulated successfully"
            }
        }
    }
}