pipeline{

	agent {label 'valuestory-io-dev'}

	environment {
        Build Number = ''
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
				sh 'docker build -t $imageName:${env.BUILD_NUMBER} .'
			}
		}
		stage('Deploy') {
			steps {
				sh 'docker run -p 5000:80 -d --name $containerName $imageName'
			}
		}

	}

}
