const { getDataFromPyramidDataFile } = require('./core/utils');
const { computeSimpleBenchmark } = require("./core/performance-tools");
const { elaboratePyramidFastestPath_bruteForce } = require('./core/brute-force');
const { elaboratePyramidFastestPath_simplifiedDijkstra } = require("./core/dijkstra");

(async () => {
  console.log('Performance analysis')

  console.log('*** third pyramid ***');
  const { rowsQuantity, weightMatrix, weightMatrixStr } = await getDataFromPyramidDataFile('./data/exampleMatrixB.txt')
  console.log('row quantity:', rowsQuantity)
  console.log('matrix data:')
  console.log(weightMatrixStr)

  const iterations = 1000
  console.log('\n*** Brute force algorithm ***')
  let { formattedValueMS } = computeSimpleBenchmark(() => {
    elaboratePyramidFastestPath_bruteForce(rowsQuantity, weightMatrix)
  }, iterations)
  console.log(`benchmark result after ${iterations} iterations`, formattedValueMS)

  console.log('\n*** Simplified Dijkstra algorithm ***');
  ({ formattedValueMS } = computeSimpleBenchmark(() => {
    elaboratePyramidFastestPath_simplifiedDijkstra(rowsQuantity, weightMatrix)
  }, iterations))
  console.log(`benchmark result after ${iterations} iterations`, formattedValueMS)
})()
