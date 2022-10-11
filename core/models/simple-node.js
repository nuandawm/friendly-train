function SimpleNode(type, weight, relationships) {
  return {
    type,
    relationships,
    props: {
      weight
    },
  }
}

module.exports = SimpleNode
