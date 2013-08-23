class Utitlities

  hash_params: ->
    @_hash_params ||= @parse_hash_params(window)

  parse_hash_params: (_window) ->

    raw_hash = _window.document.location.hash

    processed_hash = {}

    for hash_pair in params_ary = raw_hash.substr(1).split('&')
      [key, val] = hash_pair.split('=')
      processed_hash[key] = val

    processed_hash

module.exports = Utitlities
