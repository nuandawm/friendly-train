const { it, describe, expect } = require('@jest/globals')
const { getPyramidChildrenIndexes } = require("./common");

describe('get pyramid children indexes', () => {
  it('should return [[1,0], [1,1]] given [0,0]', () => {
    expect(getPyramidChildrenIndexes(5, 0, 0))
      .toEqual([[1,0], [1,1]])
  })
  it('should return [[2,1], [2,2]] given [1,1]', () => {
    expect(getPyramidChildrenIndexes(5, 1, 1))
      .toEqual([[2,1], [2,2]])
  })
  it('should return empty list of children given each 5th row element and row quantity of 5', () => {
    for(let i=0; i<5; i++) {
      expect(getPyramidChildrenIndexes(5, 4, i))
        .toEqual([])
    }
  })
})
