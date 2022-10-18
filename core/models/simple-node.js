function SimpleNode(type, relationships, weight, row, col) {
  return {
    type,
    relationships,
    props: {
      weight,
      row,
      col
    },
  }
}

module.exports = SimpleNode
