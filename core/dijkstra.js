const { mapWeightMatrixToNodesTree } = require('./utils')
const { getPyramidChildrenIndexes } = require("./common");
const { SimpleNodeType, SimpleNode } = require("./models");

/**
 * Return a list of not visited nodes that have a visited parent.
 * The returned list contains both the node and the tentative distance from the source
 * (based on parent distance and node weight)
 * @param rootNode
 * @returns {Map<SimpleNode, number>}
 */
function getVisitedParentNonVisitedNodes(rootNode) {
  const recursiveGet = (parentNode, currentNode, nonVisitedTentativeDistanceMap) => {
    if (currentNode.distance !== undefined) {
      currentNode.relationships.forEach(relationship => {
        recursiveGet(currentNode, relationship.node, nonVisitedTentativeDistanceMap)
      })
    } else if (parentNode.distance !== undefined) {
      if (!nonVisitedTentativeDistanceMap.has(currentNode)) {
        nonVisitedTentativeDistanceMap.set(currentNode, parentNode.distance + currentNode.props.weight)
      } else if (parentNode.distance + currentNode.props.weight < nonVisitedTentativeDistanceMap.get(currentNode)) {
        nonVisitedTentativeDistanceMap.set(currentNode, parentNode.distance + currentNode.props.weight)
      }
    }
    return nonVisitedTentativeDistanceMap
  }
  return recursiveGet(null, rootNode, new Map())
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
    let minNode = null;
    let minDistance = Infinity;
    for (const [node, tentativeDistance] of nonVisitedNodes) {
      if (tentativeDistance < minDistance) {
        minDistance = tentativeDistance
        minNode = node
      }
    }
    // set the current node to exit the loop when a destination node is reached
    currentNode = minNode
    // set the node distance (and mark it as visited)
    currentNode.distance = minDistance
    // get the non-visited nodes with visited parent TODO this could be improved
    nonVisitedNodes = getVisitedParentNonVisitedNodes(rootNode)
  }

  return {
    pathLength: currentNode.distance,
    path: null // not available with this algorithm TODO this could be done
  }
}

// PROPER DIJKSTRA

function properDijkstraInit(nodesList) {
  const dist = new Map();
  const prev = new Map();
  const queue = [];

  nodesList.forEach(node => {
    dist.set(node, Infinity);
    // prev.set(node, undefined) // not needed
    queue.push(node)
  })

  return { dist, prev, queue }
}

function findNodeInQueueWithMinDist(queue, dist) {
  let nodeFound = null;
  let minDistance = Infinity;
  for (const node of queue) {
    const distValue = dist.get(node);
    if (distValue < minDistance) {
      minDistance = distValue;
      nodeFound = node;
    }
  }
  return nodeFound
}

function getNeighboursStillInQueue(node, queue) {
  return node.relationships
    .map(rel => rel.node)
    .filter(node => queue.indexOf(node) !== -1);
}

function recursiveElaboratePath(prev, child, path) {
  const parent = prev.get(child);
  if (parent !== undefined) {
    return recursiveElaboratePath(prev, parent, [child].concat(path))
  } else {
    return [child].concat(path)
  }
}

function elaboratePyramidFastestPath_properDijkstra(rowsQuantity, pyramidMatrix) {
  // convert the weight matrix into a node tree
  const { nodesMatrix, nodesList } = mapWeightMatrixToNodesTree(pyramidMatrix, (row, col) => getPyramidChildrenIndexes(rowsQuantity, row, col));
  const sourceNode = nodesMatrix[0][0];

  const { dist, prev, queue } = properDijkstraInit(nodesList);
  dist.set(sourceNode, sourceNode.props.weight);

  let minDistNode = sourceNode;
  while(minDistNode.type !== SimpleNodeType.DESTINATION) {
    // remove min dist node from queue
    queue.splice(queue.indexOf(minDistNode), 1);
    // get all neighbour node still in queue
    const neighbourNodes = getNeighboursStillInQueue(minDistNode, queue);
    for (const node of neighbourNodes) {
      const alt = dist.get(minDistNode) + node.props.weight;
      if (alt < dist.get(node)) {
        dist.set(node, alt)
        prev.set(node, minDistNode)
      }
    }
    // get next min dist node
    minDistNode = findNodeInQueueWithMinDist(queue, dist);
  }

  return {
    pathLength: dist.get(minDistNode),
    path: recursiveElaboratePath(prev, minDistNode, [])
  };
}

module.exports = {
  elaboratePyramidFastestPath_simplifiedDijkstra,
  getVisitedParentNonVisitedNodes,
  elaboratePyramidFastestPath_properDijkstra
}
