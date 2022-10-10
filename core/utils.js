const fs = require('fs/promises');

async function getDataFromPyramidDataFile(path) {
  try {
    const data = await fs.readFile(path, { encoding: 'utf8' });
    const [rowsQuantity, ...matrixData] = data.split('\n').filter(line => line !== '')
    const weightMatrix = matrixData
      .map(rowStr => rowStr.split(' ').map(value => Number(value)))
    return {
      rowsQuantity,
      weightMatrix,
      weightMatrixStr: matrixData.join('\n')
    }
  } catch (e) {
    console.error(`errors getting pyramid data from the file ${path}`, e.message)
    return null
  }
}

module.exports = {
  getDataFromPyramidDataFile
}
