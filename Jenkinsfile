pipeline{

	agent {label 'valuestory-io-dev'}

	environment {
        containerName = 'auth.valuestory.ui.dev'
        imageName    = 'auth.valuestory.ui:${BUILD_NUMBER}'
		

	stages {

		stage('Kill') {
			steps {
				sh 'docker stop $(docker ps -a -q)' 
			}
		}
		stage('Remove') {
			steps { 
				sh 'docker stop $containerName || true && docker rm -f $containerName || true'
			}
		}
		stage('Build') {
			steps {
				sh 'docker build --build-arg REACT_APP_AUTH_VALUESTORY_API_BASE_URL=${{ secrets.REACT_APP_AUTH_VALUESTORY_API_BASE_URL }} -t $imageName .'
			}
		}
		stage('Deploy') {
			steps {
				sh 'docker run -p 5000:80 -d --name $containerName $imageName'
			}
		}

	}

}