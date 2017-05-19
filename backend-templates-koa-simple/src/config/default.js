/* eslint-disable no-process-env */

import pkg from '../../package'

export default {
  appName: 'koa-simple',
  version: pkg.version,
  server: {
    concurrency: process.env.WEB_CONCURRENCY || 1,
    port: process.env.PORT || 3000,
    maxMemory: process.env.WEB_MEMORY || 512,
    killTimeout: 3000,
  },
  auth: {
    pepper: process.env.PEPPER || 'mEOLaKAkgnr0z/IzS9bju4xquOk',
    saltRounds: 10,
    resetPasswordTokenLength: 20,
    tokenExpiration: 2 * 60 * 60, // 2 hours (in seconds)
  },
  database: {
    options: {
      dialectOptions: {
        ssl: true,
      },
      logging: false,
    },
    connectionString: process.env.DATABASE_URL
      || 'postgres://postgres@localhost:5432/koa-database',
  },
  logging: {
    stdout: {
      enabled: true,
      level: 'debug',
    },
    cloudwatch: {
      enabled: true,
      level: 'debug',
      region: 'us-west-2',
      logGroupName: 'koa-sample',

      // Processes cannot share a CloudWatch stream, initialize a unique name for each
      // logger instance, to enable heroku dyno metadata call:
      // `heroku labs:enable runtime-dyno-metadata -a <app name>`
      // (eg. koa-simple-development.v42.worker-3)
      logStreamName: `${process.env.HEROKU_APP_NAME}`
        + `.${process.env.HEROKU_RELEASE_VERSION}`
        + `.process-${process.pid}`,
    },
  },
}
