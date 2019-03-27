pipeline {
    agent { docker 'node:10.15.3' }
    stages {
        stage('Install') {
            steps {
                sh 'yarn'
            }
        }
        state('Build') {
            stpes {
              sh 'yarn build:prod'
            }
        }
    }
}