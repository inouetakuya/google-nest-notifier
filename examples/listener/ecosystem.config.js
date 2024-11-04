module.exports = {
  apps: [
    {
      name: 'google-nest-notifier',
      script: 'dist/index.js',

      // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
  deploy: {
    'deploy-only': {
      user: 'pi',
      host: 'raspberrypi',
      ref: 'origin/main',
      repo: 'git@github.com:inouetakuya/google-nest-notifier.git',
      path: '/var/www/google-nest-notifier',
      'post-deploy': 'echo "post-deploy is blank"',
    },
    production: {
      user: 'pi',
      host: 'raspberrypi',
      ref: 'origin/main',
      repo: 'git@github.com:inouetakuya/google-nest-notifier.git',
      path: '/var/www/google-nest-notifier',
      'post-deploy': 'pnpm install && pnpm --filter listener reload',
    },
  },
}
