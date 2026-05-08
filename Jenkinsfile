pipeline {
  agent any

  options {
    timestamps()
    buildDiscarder(logRotator(numToKeepStr: '20'))
  }

  parameters {
    string(name: 'CUCUMBER_TAGS', defaultValue: '@smoke', description: 'Cucumber tag expression (e.g. @smoke or @smoke and not @wip)')
    choice(name: 'BROWSER', choices: ['chromium', 'firefox', 'webkit'], description: 'Playwright browser')
    choice(name: 'ENV', choices: ['qa', 'stage', 'prod'], description: 'Which env config to use')
    booleanParam(name: 'HEADLESS', defaultValue: true, description: 'Run headless?')
  }

  environment {
    // Speeds up installs
    CI = "true"
    NPM_CONFIG_FUND = "false"
    NPM_CONFIG_AUDIT = "false"

    // If you use .env files like .env.qa, .env.stage...
    DOTENV_CONFIG_PATH = ".env.${params.ENV}"
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Node & Install Deps') {
      steps {
        bat'''
          node -v
          '''
        bat'''
          npm -v
          '''
        bat'''
          npm ci
        '''
      }
    }

    stage('Install Playwright Browsers') {
      steps {
        bat'''
           npx playwright install
        '''
      }
    }

    stage('Run Cucumber Tests') {
      steps {
        bat """
          echo "Running with tags: ${params.CUCUMBER_TAGS}"
          echo "Using env file: ${env.DOTENV_CONFIG_PATH}"
          echo "Browser: ${params.BROWSER}, Headless: ${params.HEADLESS}"

         set BROWSER=${params.BROWSER}
         set HEADLESS=${params.HEADLESS}
         set CUCUMBER_TAGS=${params.CUCUMBER_TAGS}
         
          npm run test:cucumber -- --tags "${params.CUCUMBER_TAGS}"
        """
      }
    }
  }

  post {
    always {
      // Archive reports if you generate them
      archiveArtifacts artifacts: 'reports/**, cucumber-report/**, test-results/**, playwright-report/**', allowEmptyArchive: true

      // Optional JUnit publish (only if you generate junit xml)
      junit testResults: 'test-results/*.xml', allowEmptyResults: true

      
    }
  }
  
}