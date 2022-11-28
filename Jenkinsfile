pipeline{

	agent {label 'auth.valuestory-dev'}

	environment {
	containerName = 'auth.valuestory.ui.dev'
        imageName    = 'auth.valuestory.ui'
	}
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
				sh 'docker build --build-arg REACT_APP_AUTH_VALUESTORY_API_BASE_URL=$REACT_APP_AUTH_VALUESTORY_API_BASE_URL -t $imageName .'
			}
		}
		stage('Deploy') {
			steps {
				sh 'docker run -d -e REACT_APP_AUTH_VALUESTORY_API_BASE_URL=$REACT_APP_AUTH_VALUESTORY_API_BASE_URL  -p 91:80 --name $containerName $imageName'
			}
		}

	}

}
