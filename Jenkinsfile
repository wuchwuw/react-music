pipeline {
    agent {
        docker {
            image 'node:10.15.3' 
            args '-p 3000:3000' 
        }
    }
    stages {
        stage('Install') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('Test') { 
            steps {
                sh 'npm run build:prod' 
            }
        }
    }
}