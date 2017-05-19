import bunyan from 'bunyan'
import cluster from 'cluster'
import CloudWatchStream from 'awslogs-stream'
import config from '../config'

const logStreams = []

// Stdout stream
if (config.logging.stdout.enabled) {
  logStreams.push({
    level: config.logging.stdout.level,
    stream: process.stdout,
  })
}

// AWS CloudWatch stream
if (config.logging.cloudwatch.enabled) {

  // CloudWatch stream requires these env variables to be set
  // eslint-disable-next-line no-process-env
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    throw new Error('Missing AWS CloudWatch configuration.')
  }

  // eslint-disable-next-line new-cap
  const cloudwatchStream = CloudWatchStream({
    logGroupName: config.logging.cloudwatch.logGroupName,
    logStreamName: config.logging.cloudwatch.logStreamName,
    cloudWatchLogsOptions: {
      region: config.logging.cloudwatch.region,
    },
    processLogRecord(record) {
      return {
        message: JSON.stringify(record),
        timestamp: Date.now(),
      }
    },
  })

  logStreams.push({
    level: config.logging.cloudwatch.level,
    stream: cloudwatchStream,
    type: 'raw',
  })
}

const suffix = cluster.isMaster ? 'master' : 'worker'
const logger = bunyan.createLogger({
  name: `${config.appName}.${suffix}`,
  streams: logStreams,
})

export default logger
