pipeline {
	agent any
	stages {
		stage('Checkout SCM') {
			steps {
				checkout scm
			}
		}

        stage('Selenium Tessting') {
			steps {
				script{
					sh 'cd openclown-ui-test && npm install'
					sh 'cd openclown-ui-test && npx mocha test.js'
				}
			}
		}

		stage('OWASP DependencyCheck') {
			steps {
				dependencyCheck additionalArguments: '--format HTML --format XML', odcInstallation: 'OWASP-Dependency-Check'
			}
		}

        stage('Code Quality Check via SonarQube') {
            steps {
                script {
                    def scannerHome = tool 'SonarQube'
                    withSonarQubeEnv('SonarQube') {
                        sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=PYP -Dsonar.sources=. -Dsonar.host.url=http://sonarqube:9000 -Dsonar.token=sqp_3388fa5662f18de82c2fd41541521adb0da0b03e"
                    }
                }
            }
        }
	}	
	post {
        always {
            recordIssues enabledForFailure: true, tool: sonarQube()
        }
		success {
			dependencyCheckPublisher pattern: 'dependency-check-report.xml'
		}
	}
}