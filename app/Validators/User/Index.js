class Index {
  get sanitizationRules() {
    return {
      is_active: 'to_boolean'
    }
  }
}

module.exports = Index
