const moment = require('moment')
const momentDurationFormatSetup = require('moment-duration-format')
momentDurationFormatSetup(moment)

function getExecutionTime(callback) {
  const startMs = new Date().getTime()
  callback()
  const endMs = new Date().getTime()
  return endMs - startMs
}

function computeSimpleBenchmark(callback, iterations) {
  let milliseconds;
  if (iterations !== undefined) {
    milliseconds = Array(iterations).fill(0)
      .reduce(sum => sum + getExecutionTime(callback), 0) / iterations
  } else {
    milliseconds = getExecutionTime(callback)
  }

  return {
    milliseconds,
    formattedValueMS: moment.duration(milliseconds, 'milliseconds').format('mm[m] ss[s] SSS[ms]')
  }
}

module.exports = {
  computeSimpleBenchmark
}
