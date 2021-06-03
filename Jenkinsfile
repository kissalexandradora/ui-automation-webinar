pipeline {
  agent any

  tools {nodejs "node14"}
  parallel {
    stages {
      stage('Install dependencies') {
        steps {
          bat 'npm install'
        }
      }

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
}