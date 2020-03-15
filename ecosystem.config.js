module.exports = {
  apps: [
    {
      name: 'google-nest-notifier-api',
      script: 'dist/index.js',

      // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G', // eslint-disable-line @typescript-eslint/camelcase
      env: {
        NODE_ENV: 'development'
      },
      // eslint-disable-next-line @typescript-eslint/camelcase
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],

  // FIXME: Not yet implemented
  deploy: {
    production: {
      user: 'node',
      host: '212.83.163.1',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/production',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
}
