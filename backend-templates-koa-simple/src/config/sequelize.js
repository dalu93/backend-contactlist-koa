/* eslint-disable camelcase */

import dotenv from 'dotenv'

dotenv.config({ silent: false })

export default {
  development: {
    use_env_variable: 'MIGRATION_DATABASE_URL_DEV',
  },
  test: {
    use_env_variable: 'MIGRATION_DATABASE_URL_TEST',
  },
  beta: {
    use_env_variable: 'MIGRATION_DATABASE_URL_BETA',
  },
  production: {
    use_env_variable: 'MIGRATION_DATABASE_URL_PROD',
  },
}
