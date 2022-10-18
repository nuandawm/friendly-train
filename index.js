const { getDataFromPyramidDataFile } = require('./core/utils');
const { elaboratePyramidFastestPath_properDijkstra } = require('./core/dijkstra');

(async () => {
  let pathLength;
  let path;
  console.log('*** first pyramid ***')
  let { rowsQuantity, weightMatrix, weightMatrixStr } = await getDataFromPyramidDataFile('./data/exampleMatrix.txt')
  console.log('row quantity:', rowsQuantity)
  console.log('matrix data:')
  console.log(weightMatrixStr)
  console.log('finding the fastest path...');
  ({ pathLength } = elaboratePyramidFastestPath_properDijkstra(rowsQuantity, weightMatrix));
  console.log('the length of the fastest path is:', pathLength)

  console.log('\n*** second pyramid ***');
  ({ rowsQuantity, weightMatrix, weightMatrixStr } = await getDataFromPyramidDataFile('./data/exampleMatrixA.txt'))
  console.log('row quantity:', rowsQuantity)
  console.log('matrix data:')
  console.log(weightMatrixStr)
  console.log('finding the fastest path...');
  ({ pathLength } = elaboratePyramidFastestPath_properDijkstra(rowsQuantity, weightMatrix))
  console.log('the length of the fastest path is:', pathLength)

  console.log('\n*** third pyramid ***');
  ({ rowsQuantity, weightMatrix, weightMatrixStr } = await getDataFromPyramidDataFile('./data/exampleMatrixB.txt'))
  console.log('row quantity:', rowsQuantity)
  console.log('matrix data:')
  console.log(weightMatrixStr)
  console.log('finding the fastest path...');
  ({ pathLength, path } = elaboratePyramidFastestPath_properDijkstra(rowsQuantity, weightMatrix))
  console.log('the length of the fastest path is:', pathLength)
  console.log('the path of the fastest path is:', path)
})()
