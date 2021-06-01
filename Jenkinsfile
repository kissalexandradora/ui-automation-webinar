pipeline {
  agent any

  tools {nodejs "node14"}

  stages {
    stage('Install dependencies') {
      steps {
        bat 'npm install'
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