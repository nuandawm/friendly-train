function getPyramidChildrenIndexes(rowsQuantity, row, col) {
  const nextRow = row+1
  return nextRow < rowsQuantity ? [[nextRow, col], [nextRow, col+1]] : []
}

module.exports = {
  getPyramidChildrenIndexes
}
