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
  const recursiveMap = (row, col, isRoot) => {
    const childrenIndexes = getChildrenIndexes(row, col)

    let type = SimpleNodeType.MIDDLE
    if (isRoot) {
      type = SimpleNodeType.SOURCE
    } else if (childrenIndexes.length === 0) {
      type = SimpleNodeType.DESTINATION
    }

    const nodeRelationships = childrenIndexes.map(([childRow, childCol]) => Relationship(
      RelationshipType.PARENT_OF,
      recursiveMap(childRow, childCol, false)
    ))

    return SimpleNode(type, matrix[row][col], row, col, nodeRelationships)
  }

  return recursiveMap(0, 0, true)
}

module.exports = {
  getDataFromPyramidDataFile,
  mapWeightMatrixToNodesTree
}
