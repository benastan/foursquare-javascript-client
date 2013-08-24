class Utitlities

  parseHashString: (rawHash) ->

    processedHash = {}

    for hashPair in paramsAry = rawHash.split('&')

      [key, val] = hashPair.split('=')
      processedHash[key] = val

    processedHash

module.exports = Utitlities
