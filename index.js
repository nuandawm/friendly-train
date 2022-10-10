const { getDataFromPyramidDataFile } = require('./core/utils');
const { elaboratePyramidFastestPath_bruteForce } = require('./core');

(async () => {
  console.log('*** first pyramid ***')
  let { rowsQuantity, weightMatrix, weightMatrixStr } = await getDataFromPyramidDataFile('./data/exampleMatrix.txt')
  console.log('row quantity:', rowsQuantity)
  console.log('matrix data:')
  console.log(weightMatrixStr)
  console.log('finding the fastest path...')
  let { pathLength } = elaboratePyramidFastestPath_bruteForce(rowsQuantity, weightMatrix)
  console.log('the length of the fastest path is:', pathLength)

  console.log('\n*** second pyramid ***');
  ({ rowsQuantity, weightMatrix, weightMatrixStr } = await getDataFromPyramidDataFile('./data/exampleMatrixA.txt'))
  console.log('row quantity:', rowsQuantity)
  console.log('matrix data:')
  console.log(weightMatrixStr)
  console.log('finding the fastest path...');
  ({ pathLength } = elaboratePyramidFastestPath_bruteForce(rowsQuantity, weightMatrix))
  console.log('the length of the fastest path is:', pathLength)

  console.log('\n*** third pyramid ***');
  ({ rowsQuantity, weightMatrix, weightMatrixStr } = await getDataFromPyramidDataFile('./data/exampleMatrixB.txt'))
  console.log('row quantity:', rowsQuantity)
  console.log('matrix data:')
  console.log(weightMatrixStr)
  console.log('finding the fastest path...');
  ({ pathLength } = elaboratePyramidFastestPath_bruteForce(rowsQuantity, weightMatrix))
  console.log('the length of the fastest path is:', pathLength)
})()
