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
  const nodesList = []
  const nodesMatrix = matrix
    .map((row, i) => row
      .map((weight, j) => {
        const node = SimpleNode(SimpleNodeType.MIDDLE, null, weight, i, j)
        nodesList.push(node)
        return node
      }))

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

  return {
    nodesMatrix,
    nodesList,
    rootNode: recursiveMap(0, 0, true)
  }
}

function range(from, to) {
  return {
    [Symbol.iterator]: function(){
      return {
        current: from,
        last: to,
        next() {
          return this.current < this.last
            ? { done: false, value: this.current++ }
            : { done: true }
        }
      }
    }
  }
}

function getRandomInteger(max) {
  return Math.floor(Math.random() * max) + 1
}

function generateRandomPyramid(depth, randomMax) {
  return Array.from(
    range(1, depth + 1),
    elem => Array.from(
      range(0, elem), () => getRandomInteger(randomMax)
    )
  )
}

module.exports = {
  getDataFromPyramidDataFile,
  mapWeightMatrixToNodesTree,
  generateRandomPyramid
}
