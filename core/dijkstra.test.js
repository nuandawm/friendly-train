const { it, describe, expect } = require('@jest/globals')
const { elaboratePyramidFastestPath_simplifiedDijkstra, getVisitedParentNonVisitedNodes,
  elaboratePyramidFastestPath_properDijkstra
} = require("./dijkstra");
const { SimpleNode, SimpleNodeType, Relationship, RelationshipType } = require("./models");

describe('elaborate pyramid fastest path with simplified dijkstra', () => {
  it('should return 14 given the 4-rows example matrix', () => {
    const exampleMatrix = [
      [1],
      [2,3],
      [4,5,6],
      [7,8,9,10]
    ]
    const { pathLength } = elaboratePyramidFastestPath_simplifiedDijkstra(exampleMatrix.length, exampleMatrix)
    expect(pathLength).toBe(14)
  })
  it('should return 16 given the 4-rows example matrix A', () => {
    const exampleMatrixA = [
      [3],
      [7,4],
      [2,4,6],
      [8,5,9,3]
    ]
    expect(elaboratePyramidFastestPath_simplifiedDijkstra(exampleMatrixA.length, exampleMatrixA).pathLength)
      .toBe(16)
  })
  it('should return 447 given the 15-rows example matrix B', () => {
    const exampleMatrixB = [
      [75],
      [95, 64],
      [17, 47, 82],
      [18, 35, 87, 10],
      [20, 4, 82, 47, 65],
      [19, 1, 23, 75, 3, 34],
      [88, 2, 77, 73, 7, 63, 67],
      [99, 65, 4, 28, 6, 16, 70, 92],
      [41, 41, 26, 56, 83, 40, 80, 70, 33],
      [41, 48, 72, 33, 47, 32, 37, 16, 94, 29],
      [53, 71, 44, 65, 25, 43, 91, 52, 97, 51, 14],
      [70, 11, 33, 28, 77, 73, 17, 78, 39, 68, 17, 57],
      [91, 71, 52, 38, 17, 14, 91, 43, 58, 50, 27, 29, 48],
      [63, 66, 4, 68, 89, 53, 67, 30, 73, 16, 69, 87, 40, 31],
      [4, 62, 98, 27, 23, 9, 70, 98, 73, 93, 38, 53, 60, 4, 23]
    ]
    expect(elaboratePyramidFastestPath_simplifiedDijkstra(exampleMatrixB.length, exampleMatrixB).pathLength)
      .toBe(447)
  })
})

describe('get visited parent not visited nodes', () => {
  const node1 = SimpleNode(SimpleNodeType.SOURCE, [], 3, 0, 0)
  const node2 = SimpleNode(SimpleNodeType.MIDDLE, [], 7, 1, 0)
  const node3 = SimpleNode(SimpleNodeType.MIDDLE, [], 4, 1, 1)
  const node4 = SimpleNode(SimpleNodeType.DESTINATION, [], 2, 2, 0)
  const node5 = SimpleNode(SimpleNodeType.DESTINATION, [], 4, 2, 1)
  const node6 = SimpleNode(SimpleNodeType.DESTINATION, [], 6, 2, 2)
  node1.relationships.push(
    Relationship(RelationshipType.PARENT_OF, node2),
    Relationship(RelationshipType.PARENT_OF, node3)
  )
  node2.relationships.push(
    Relationship(RelationshipType.PARENT_OF, node4),
    Relationship(RelationshipType.PARENT_OF, node5)
  )
  node3.relationships.push(
    Relationship(RelationshipType.PARENT_OF, node5),
    Relationship(RelationshipType.PARENT_OF, node6)
  )

  it('should return three not visited nodes given node1 and node3 visited', () => {
    node1.distance = 3
    node3.distance = 7

    const nonVisitedNodes = getVisitedParentNonVisitedNodes(node1)
    const nodes = []
    const distances = []
    for (const [node, tentativeDistance] of nonVisitedNodes) {
      nodes.push(node);
      distances.push(tentativeDistance);
    }
    expect(nodes).toContain(node2)
    expect(nodes).toContain(node5)
    expect(nodes).toContain(node6)
    expect(nodes).not.toContain(node4)

    expect(distances).toContain(10)
    expect(distances).toContain(11)
    expect(distances).toContain(13)
  })
})

describe('elaborate pyramid fastest path with proper dijkstra', () => {
  it('should return 14 given the 4-rows example matrix', () => {
    const exampleMatrix = [
      [1],
      [2,3],
      [4,5,6],
      [7,8,9,10]
    ]
    const { pathLength } = elaboratePyramidFastestPath_properDijkstra(exampleMatrix.length, exampleMatrix)
    expect(pathLength).toBe(14)
  })
  it('should return 16 given the 4-rows example matrix A', () => {
    const exampleMatrixA = [
      [3],
      [7,4],
      [2,4,6],
      [8,5,9,3]
    ]
    expect(elaboratePyramidFastestPath_properDijkstra(exampleMatrixA.length, exampleMatrixA).pathLength)
      .toBe(16)
  })
  it('should return 447 given the 15-rows example matrix B', () => {
    const exampleMatrixB = [
      [75],
      [95, 64],
      [17, 47, 82],
      [18, 35, 87, 10],
      [20, 4, 82, 47, 65],
      [19, 1, 23, 75, 3, 34],
      [88, 2, 77, 73, 7, 63, 67],
      [99, 65, 4, 28, 6, 16, 70, 92],
      [41, 41, 26, 56, 83, 40, 80, 70, 33],
      [41, 48, 72, 33, 47, 32, 37, 16, 94, 29],
      [53, 71, 44, 65, 25, 43, 91, 52, 97, 51, 14],
      [70, 11, 33, 28, 77, 73, 17, 78, 39, 68, 17, 57],
      [91, 71, 52, 38, 17, 14, 91, 43, 58, 50, 27, 29, 48],
      [63, 66, 4, 68, 89, 53, 67, 30, 73, 16, 69, 87, 40, 31],
      [4, 62, 98, 27, 23, 9, 70, 98, 73, 93, 38, 53, 60, 4, 23]
    ]
    expect(elaboratePyramidFastestPath_properDijkstra(exampleMatrixB.length, exampleMatrixB).pathLength)
      .toBe(447)
  })
})
