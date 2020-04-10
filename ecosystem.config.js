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

  deploy: {
    production: {
      user: 'pi',
      host: 'raspberrypi',
      ref: 'origin/master',
      repo: 'git@github.com:inouetakuya/google-nest-notifier-api.git',
      path: '/var/www/google-nest-notifier-api',
      'post-deploy': 'npm install && npm run build && npm run reload'
    }
  }
}
