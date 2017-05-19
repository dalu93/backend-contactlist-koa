
module.exports = {
  env: {
    jest: true
  },
  settings: {
    // import/name rule does not recognize named exports from chai module (rule is disabled for chai file only)
    'import/ignore': [
      './common/chai'
    ]
  }
}
