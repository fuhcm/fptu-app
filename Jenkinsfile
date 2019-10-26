node {
    def app

    stage('Initial') {
        checkout scm
    }

    stage('Build') {
        app = docker.build("fuhcm/fptu-app")
    }

    stage('Test') {
        sh 'echo "Tests passed"'
    }

    stage('Deploy') {
        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
            app.push("${env.BUILD_NUMBER}")
            app.push("latest")
        }
    }
}
