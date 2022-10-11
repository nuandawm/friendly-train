const { mapWeightMatrixToNodesTree } = require('./utils')
const { getPyramidChildrenIndexes } = require("./common");
const { SimpleNodeType, SimpleNodeWithTentativeDistance, SimpleNode } = require("./models");

/**
 * Return a list of not visited nodes that have a visited parent.
 * The returned list contains both the node and the tentative distance from the source
 * (based on parent distance and node weight)
 * @param rootNode
 * @returns {[{tentativeDistance: number, node: SimpleNode}]}
 */
function getVisitedParentNonVisitedNodes(rootNode) {
  const recursiveGet = (parentNode, currentNode, nonVisitedList) => {
    if (currentNode.distance !== undefined) {
      currentNode.relationships.forEach(relationship => {
        recursiveGet(currentNode, relationship.node, nonVisitedList)
      })
    } else if (parentNode.distance !== undefined) {
      nonVisitedList.push(SimpleNodeWithTentativeDistance(
        currentNode,
        parentNode.distance + currentNode.props.weight
      ))
    }
    return nonVisitedList
  }
  return recursiveGet(null, rootNode, [])
}

/**
 * Elaborate the fastest path using a simplified version of the Dijkstra algorithm.
 * This version of the algorithm assume that the weight matrix is a tree to exclude
 * some possible paths.
 * @param rowsQuantity
 * @param pyramidMatrix
 * @returns {{path: null, pathLength: number}}
 */
function elaboratePyramidFastestPath_simplifiedDijkstra(rowsQuantity, pyramidMatrix) {
  // convert the weight matrix into a node tree
  const { rootNode } = mapWeightMatrixToNodesTree(pyramidMatrix, (row, col) => getPyramidChildrenIndexes(rowsQuantity, row, col))
  rootNode.distance = rootNode.props.weight

  let nonVisitedNodes = getVisitedParentNonVisitedNodes(rootNode)
  let currentNode = rootNode
  while (currentNode.type !== SimpleNodeType.DESTINATION) {
    // find the non visited node with the minimum distance from the source
    const minNodeAndDistance = nonVisitedNodes.reduce((min, curr) => {
      return curr.tentativeDistance < min.tentativeDistance ? curr : min
    })
    // set the current node to exit the loop when a destination node is reached
    currentNode = minNodeAndDistance.node
    // set the node distance (and mark it as visited)
    currentNode.distance = minNodeAndDistance.tentativeDistance
    // get the non-visited nodes with visited parent TODO this could be improved
    nonVisitedNodes = getVisitedParentNonVisitedNodes(rootNode)
  }

  return {
    pathLength: currentNode.distance,
    path: null // not available with this algorithm
  }
}

module.exports = {
  elaboratePyramidFastestPath_simplifiedDijkstra,
  getVisitedParentNonVisitedNodes
}
