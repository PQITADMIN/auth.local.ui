pipeline{

	agent {label 'valuestory-io-dev'}

	environment {
        BUILD_NUMBER = ''
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
				sh 'docker build -t $imageName:$BUILD_NUMBER .'
			}
		}
		stage('Deploy') {
			steps {
				sh 'docker run -p 5000:80 -d --name $containerName $imageName:$BUILD_NUMBER'
			}
		}

	}

}
