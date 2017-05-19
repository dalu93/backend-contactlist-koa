/* eslint-disable no-process-env, import/first, global-require */

const env = process.env.NODE_ENV || 'local'

// Load process.env variables from .env file (when developing locally)
// !! Do not move these lines, config variables have to be loaded before default config is loaded.
if (env === 'local' || env === 'test') {
  require('dotenv').config({ silent: false })
}

import _ from 'lodash'

// We need dynamic requires here to ensure that .env is loaded beforehand
const envConfigPath = `./env/${env}`
const envConfig = require(envConfigPath)
const defaultConfig = require('./default')

// Override default values with values from environment config
const resultConfig = _.merge({}, defaultConfig, envConfig)
export default resultConfig
 