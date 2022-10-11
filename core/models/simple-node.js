function SimpleNode(type, weight, row, col, relationships) {
  return {
    type,
    relationships,
    props: {
      row,
      col,
      weight
    },
  }
}

module.exports = SimpleNode
