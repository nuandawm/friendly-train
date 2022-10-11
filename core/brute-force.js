function getPyramidChildrenIndexes(rowsQuantity, row, col) {
  const nextRow = row+1
  return nextRow < rowsQuantity ? [[nextRow, col], [nextRow, col+1]] : []
}

function findAllPaths(getChildrenIndexes) {
  // TODO better write this recursive function
  const recursiveFind = (row, col, path, allPaths) => {
    const currentPath = path.concat([col])
    const childrenIndexes = getChildrenIndexes(row, col)
    if (childrenIndexes.length === 0) {
      allPaths.push(currentPath)
    } else {
      childrenIndexes.forEach(([childRow, childCol]) => {
        recursiveFind(childRow, childCol, currentPath, allPaths)
      })
    }
    return allPaths
  }
  return recursiveFind(0, 0, [], [])
}

/**
 * Given a list of paths and a weight matrix return the index and the sum of weights
 * of the shortest path
 * @param paths
 * @param weightMatrix
 * @returns {{index: number | null, sum: number | null}}
 */
function findShortestPath(paths, weightMatrix) {
  let sum = null
  let index = null
  paths.forEach((path, pathIndex) => {
    const pathSum = path
      .map((col, row) => weightMatrix[row][col])
      .reduce((weight, sum) => sum + weight)

    if(sum === null || pathSum < sum) {
      sum = pathSum
      index = pathIndex
    }
  })
  return {
    index,
    sum
  }
}

function elaboratePyramidFastestPath_bruteForce(rowsQuantity, pyramidMatrix) {
  const paths = findAllPaths((row, col) => getPyramidChildrenIndexes(rowsQuantity, row, col))
  const { index, sum } = findShortestPath(paths, pyramidMatrix)
  return {
    pathLength: sum,
    path: paths[index]
  }
}

module.exports = {
  elaboratePyramidFastestPath_bruteForce,
  getPyramidChildrenIndexes,
  findAllPaths,
  findShortestPath
}
