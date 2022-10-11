const fs = require('fs/promises');
const { SimpleNode, SimpleNodeType, Relationship, RelationshipType } = require("./models");

async function getDataFromPyramidDataFile(path) {
  try {
    const data = await fs.readFile(path, { encoding: 'utf8' });
    const [rowsQuantity, ...matrixData] = data.split('\n').filter(line => line !== '')
    const weightMatrix = matrixData
      .map(rowStr => rowStr.split(' ').map(value => Number(value)))
    return {
      rowsQuantity,
      weightMatrix,
      weightMatrixStr: matrixData.join('\n')
    }
  } catch (e) {
    console.error(`errors getting pyramid data from the file ${path}`, e.message)
    return null
  }
}

function mapWeightMatrixToNodesTree(matrix, getChildrenIndexes) {
  const nodesMatrix = matrix
    .map(row => row
      .map(weight => SimpleNode(SimpleNodeType.MIDDLE, weight, null)))

  const recursiveMap = (row, col, isRoot) => {
    const currentNode = nodesMatrix[row][col]
    const childrenIndexes = getChildrenIndexes(row, col)

    if (isRoot) {
      currentNode.type = SimpleNodeType.SOURCE
    } else if (childrenIndexes.length === 0) {
      currentNode.type = SimpleNodeType.DESTINATION
    }

    currentNode.relationships = childrenIndexes.map(([childRow, childCol]) => Relationship(
      RelationshipType.PARENT_OF,
      recursiveMap(childRow, childCol, false)
    ))

    return currentNode
  }

  return recursiveMap(0, 0, true)
}

module.exports = {
  getDataFromPyramidDataFile,
  mapWeightMatrixToNodesTree
}
