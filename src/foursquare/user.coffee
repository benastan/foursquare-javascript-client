Base = require './base'

class User extends Base

  baseParams: ->

    [ 'users' ]

  leaderboard: -> @get('leaderboard')

  requests: -> @get('requests')

  search: (data) -> @get('search', data)

class User::Instance extends User

  constructor: ({client, @userId}) ->

    super(client: client)

  baseParams: ->

    super().concat([ @userId ])

for method in 'badges checkins friends lists mayorships photos tips venuehistory'.split(' ')
  ((endpoint) -> User::Instance.prototype[endpoint] = (data) -> @get(endpoint, data))(method)

module.exports = User
