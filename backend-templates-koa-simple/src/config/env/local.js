
export default {
  logging: {
    cloudwatch: {
      enabled: false,
    },
  },
  database: {
    options: {
      dialectOptions: {
        ssl: false,
      },
    },
  },
}
