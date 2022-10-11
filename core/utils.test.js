const { it, describe, expect } = require('@jest/globals')
const { mapWeightMatrixToNodesTree } = require('./utils')
const { SimpleNode, SimpleNodeType, Relationship, RelationshipType } = require('./models')
const { getPyramidChildrenIndexes } = require("./common");

describe('map pyramid to node list', () => {
  it('should return a tree of 3 connected nodes given the 2-rows pyramid matrix', () => {
    const twoRowsPyramidMatrix = [
      [1],
      [2,3]
    ];
    const nodesTree = SimpleNode(SimpleNodeType.SOURCE, 1, 0, 0, [
      Relationship(
        RelationshipType.PARENT_OF,
        SimpleNode(SimpleNodeType.DESTINATION, 2, 1, 0, [])
      ),
      Relationship(
        RelationshipType.PARENT_OF,
        SimpleNode(SimpleNodeType.DESTINATION, 3, 1, 1, [])
      )
    ])

    expect(mapWeightMatrixToNodesTree(
      twoRowsPyramidMatrix,
      (row, col) => getPyramidChildrenIndexes(twoRowsPyramidMatrix.length, row, col)
    )).toEqual(nodesTree)
  })

  it('should return a tree of 6 connected nodes given the 3-rows pyramid matrix', () => {
    const threeRowsPyramidMatrix = [
      [1],
      [2,3],
      [4,5,6]
    ];
    /*const nodeMatrix = [
      [SimpleNode(SimpleNodeType.SOURCE, 1, 0, 0, [])]
    ]*/
    const nodesTree = SimpleNode(SimpleNodeType.SOURCE, 1, 0, 0, [
      Relationship(
        RelationshipType.PARENT_OF,
        SimpleNode(SimpleNodeType.MIDDLE, 2, 1, 0, [
          Relationship(
            RelationshipType.PARENT_OF,
            SimpleNode(SimpleNodeType.DESTINATION, 4, 2, 0, [])
          ),
          Relationship(
            RelationshipType.PARENT_OF,
            SimpleNode(SimpleNodeType.DESTINATION, 5, 2, 1, [])
          )
        ])
      ),
      Relationship(
        RelationshipType.PARENT_OF,
        SimpleNode(SimpleNodeType.MIDDLE, 3, 1, 1, [
          Relationship(
            RelationshipType.PARENT_OF,
            SimpleNode(SimpleNodeType.DESTINATION, 5, 2, 1, [])
          ),
          Relationship(
            RelationshipType.PARENT_OF,
            SimpleNode(SimpleNodeType.DESTINATION, 6, 2, 2, [])
          )
        ])
      )
    ])

    expect(mapWeightMatrixToNodesTree(
      threeRowsPyramidMatrix,
      (row, col) => getPyramidChildrenIndexes(threeRowsPyramidMatrix.length, row, col)
    )).toEqual(nodesTree)
  })
})
