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
                        if (currentBuild.result == 'SUCCESS') {
                            return
                        }
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
                        script {
                            currentBuild.result = 'SUCCESS'
                            return
                        }
                    }
                }
            }
        }
    }
}
