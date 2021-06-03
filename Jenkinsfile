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
                        bat 'mongod'
                    }
                }

                stage('Start server') {
                    steps {
                        bat 'npm run startServer'
                    }
                }

                stage('Test') {
                    steps {
                        bat 'npm run test:mocha'
                    }
                }
            }
        }
        stage('Stop build') {
            steps {
                currentBuild.result = 'SUCCESS'
                return
            }
        }
    }
}
