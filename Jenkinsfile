pipeline {
    agent any
    tools {
        nodejs "node14"
    }
    stages {
        stage('Install dependencies') {
            steps {
                bat 'npm install'
            }
        }
        stage('Build UI-automation') {
            parallel {
                stage('Start MongoDB') {
                    steps {
                        timeout(time: 4, unit: 'MINUTES') {
                            bat 'mongod'
                        }
                    }
                }

                stage('Start server') {
                    steps {
                        timeout(time: 4, unit: 'MINUTES') {
                            bat 'npm run startServer'
                        }
                    }
                }

                stage('Test') {
                    steps {
                        bat 'npm run test:mocha'
                    }
                }
            }
        }
    }
}
