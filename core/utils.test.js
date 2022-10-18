const { it, describe, expect, beforeEach } = require('@jest/globals')
const { mapWeightMatrixToNodesTree } = require('./utils')
const { SimpleNode, SimpleNodeType, Relationship, RelationshipType } = require('./models')
const { getPyramidChildrenIndexes } = require("./common");

describe('map pyramid to node list', () => {
  const node1 = SimpleNode(SimpleNodeType.SOURCE, [], 1, 0, 0)
  const node2 = SimpleNode(SimpleNodeType.DESTINATION, [], 2, 1, 0)
  const node3 = SimpleNode(SimpleNodeType.DESTINATION, [], 3, 1, 1)
  const node4 = SimpleNode(SimpleNodeType.DESTINATION, [], 4, 2, 0)
  const node5 = SimpleNode(SimpleNodeType.DESTINATION, [], 5, 2, 1)
  const node6 = SimpleNode(SimpleNodeType.DESTINATION, [], 6, 2, 2)
  const allNodes = Array(node1, node2, node3, node4, node5, node6)
  const twoRowsPyramidMatrix = [
    [node1.props.weight],
    [node2.props.weight, node3.props.weight]
  ]
  const threeRowsPyramidMatrix = [
    [node1.props.weight],
    [node2.props.weight, node3.props.weight],
    [node4.props.weight, node5.props.weight, node6.props.weight]
  ]

  beforeEach(() => {
    // clear all relationships and set type to destination
    allNodes.forEach((node, index) => {
      node.relationships = []
      if (index !== 0) {
        node.type = SimpleNodeType.DESTINATION
      }
    })
  })

  it('should return a tree of 3 connected nodes given the 2-rows pyramid matrix', () => {
    node1.relationships.push(
      Relationship(RelationshipType.PARENT_OF, node2),
      Relationship(RelationshipType.PARENT_OF, node3)
    )

    expect(mapWeightMatrixToNodesTree(
      twoRowsPyramidMatrix,
      (row, col) => getPyramidChildrenIndexes(twoRowsPyramidMatrix.length, row, col)
    ).rootNode).toEqual(node1)
  })

  it('should return a tree of 6 connected nodes given the 3-rows pyramid matrix', () => {
    node2.type = SimpleNodeType.MIDDLE
    node3.type = SimpleNodeType.MIDDLE

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

    expect(mapWeightMatrixToNodesTree(
      threeRowsPyramidMatrix,
      (row, col) => getPyramidChildrenIndexes(threeRowsPyramidMatrix.length, row, col)
    ).rootNode).toEqual(node1)
  })

  it('should return a tree where the node 5 is not duplicated given the 3-rows pyramid matrix', () => {
    node2.type = SimpleNodeType.MIDDLE
    node3.type = SimpleNodeType.MIDDLE

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

    const { rootNode } = mapWeightMatrixToNodesTree(
      threeRowsPyramidMatrix,
      (row, col) => getPyramidChildrenIndexes(threeRowsPyramidMatrix.length, row, col)
    )

    expect(rootNode.relationships[0].node.relationships[1].node)
      .toBe(rootNode.relationships[1].node.relationships[0].node)
  })
})
