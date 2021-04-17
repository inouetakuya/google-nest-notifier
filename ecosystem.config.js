module.exports = {
  apps: [
    {
      name: 'google-nest-notifier',
      script: 'dist/index.js',

      // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G', // eslint-disable-line @typescript-eslint/camelcase
      env: {
        USE_DIST: true,
        NODE_ENV: 'development'
      },
      // eslint-disable-next-line @typescript-eslint/camelcase
      env_production: {
        USE_DIST: true,
        NODE_ENV: 'production'
      }
    }
  ],

  deploy: {
    'deploy-only': {
      user: 'pi',
      host: 'raspberrypi',
      ref: 'origin/master',
      repo: 'git@github.com:inouetakuya/google-nest-notifier.git',
      path: '/var/www/google-nest-notifier',
      'post-deploy': 'yarn install && yarn build'
    },
    production: {
      user: 'pi',
      host: 'raspberrypi',
      ref: 'origin/master',
      repo: 'git@github.com:inouetakuya/google-nest-notifier.git',
      path: '/var/www/google-nest-notifier',
      'post-deploy': 'yarn install && yarn build && yarn reload'
    }
  }
}
