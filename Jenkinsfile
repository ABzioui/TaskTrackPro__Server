pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/ABzioui/TaskTrackPro_Server'
            }
        }
        stage('Build and Deploy') {
            steps {
                sh 'docker-compose up --build -d'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }
    post {
        always {
            script {
                dir('/home/ec2-user/TaskTrackPro_Server') {
                    sh 'docker-compose down'
                }
                sh '''
                rm -rf /home/ec2-user/TaskTrackPro_Server
                docker image prune -f
                '''
            }
        }
    }
}
