const { it, describe, expect } = require('@jest/globals')
const {
  elaboratePyramidFastestPath_bruteForce, getPyramidChildrenIndexes, findAllPaths,
  findShortestPath
} = require('./index')

describe('elaborate pyramid fastest path', () => {
  it('should return 14 given the 4-rows example matrix', () => {
    const exampleMatrix = [
      [1],
      [2,3],
      [4,5,6],
      [7,8,9,10]
    ]
    const { path, pathLength } = elaboratePyramidFastestPath_bruteForce(exampleMatrix.length, exampleMatrix)
    expect(pathLength).toBe(14)
    expect(path).toEqual([0,0,0,0])
  })
  it('should return 16 given the 4-rows example matrix A', () => {
    const exampleMatrixA = [
      [3],
      [7,4],
      [2,4,6],
      [8,5,9,3]
    ]
    expect(elaboratePyramidFastestPath_bruteForce(exampleMatrixA.length, exampleMatrixA).pathLength)
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
    expect(elaboratePyramidFastestPath_bruteForce(exampleMatrixB.length, exampleMatrixB).pathLength)
      .toBe(447)
  })
})

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

describe('find all paths', () => {
  it('should find [[0,0], [0,1]] paths given the 2-rows pyramid matrix', () => {
    expect(findAllPaths((row, col) => getPyramidChildrenIndexes(2, row, col)))
      .toEqual([[0,0], [0,1]])
  })
  it('should find [[0,0,0], [0,0,1], [0,1,1], [0,1,2]] paths given the 3-rows pyramid matrix', () => {
    expect(findAllPaths((row, col) => getPyramidChildrenIndexes(3, row, col)))
      .toEqual([[0,0,0], [0,0,1], [0,1,1], [0,1,2]])
  })
  it('should find 8 paths given the 4-rows pyramid matrix', () => {
    expect(findAllPaths((row, col) => getPyramidChildrenIndexes(4, row, col)).length)
      .toEqual(8)
  })
  it('shouldn\'t fail finding paths given the 20-rows pyramid matrix', () => {
    expect(() => {
      findAllPaths((row, col) => getPyramidChildrenIndexes(20, row, col))
    }).not.toThrowError()
  })
})

describe('find shortest path', () => {
  it('should return {index: 0, sum: 0} given a list of paths and the zero-matrix', () => {
    const paths = [[0,0,0], [0,1,1]]
    const weightMatrix = [[0,0,0], [0,0,0], [0,0,0]]
    expect(findShortestPath(paths, weightMatrix)).toEqual({
      index: 0, sum: 0
    })
  })
  it('should return a sum equal to weight*rowQuantity given a matrix with same weight for each element', () => {
    const sameWeightMatrix = [[3,3,3,3], [3,3,3,3], [3,3,3,3], [3,3,3,3]]
    let paths = [[0,0,0,0], [0,1,1,2], [0,1,2,3]]
    expect(findShortestPath(paths, sameWeightMatrix).sum).toBe(3*4)
    paths = [[0,1,1,1], [0,1,2,2], [0,0,1,1]]
    expect(findShortestPath(paths, sameWeightMatrix).sum).toBe(3*4)
    paths = [[0,0,0,1], [0,1,2,3]]
    expect(findShortestPath(paths, sameWeightMatrix).sum).toBe(3*4)
  })
})
