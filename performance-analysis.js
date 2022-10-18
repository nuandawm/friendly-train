const { getDataFromPyramidDataFile, generateRandomPyramid } = require('./core/utils');
const { computeSimpleBenchmark } = require("./core/performance-tools");
const { elaboratePyramidFastestPath_bruteForce } = require('./core/brute-force');
const { elaboratePyramidFastestPath_simplifiedDijkstra, elaboratePyramidFastestPath_properDijkstra } = require("./core/dijkstra");

(async () => {
  console.log('Performance analysis');

  console.log('*** random pyramid ***');
  const weightMatrix = generateRandomPyramid(23, 100);
  const rowsQuantity = weightMatrix.length;
  console.log('row quantity:', rowsQuantity);
  //console.log('matrix data:')
  //console.log(weightMatrixStr)

  const iterations = 1
  let formattedValueMS;

  console.log('\n*** Brute force algorithm ***');
  ({ formattedValueMS } = computeSimpleBenchmark(() => {
    elaboratePyramidFastestPath_bruteForce(rowsQuantity, weightMatrix)
  }, iterations));
  console.log(`benchmark result after ${iterations} iterations`, formattedValueMS);

  console.log('\n*** Simplified Dijkstra algorithm ***');
  ({ formattedValueMS } = computeSimpleBenchmark(() => {
    elaboratePyramidFastestPath_simplifiedDijkstra(rowsQuantity, weightMatrix)
  }, iterations));
  console.log(`benchmark result after ${iterations} iterations`, formattedValueMS);

  console.log('\n*** Proper Dijkstra algorithm ***');
  ({ formattedValueMS } = computeSimpleBenchmark(() => {
    elaboratePyramidFastestPath_properDijkstra(rowsQuantity, weightMatrix)
  }, iterations));
  console.log(`benchmark result after ${iterations} iterations`, formattedValueMS);
})()
