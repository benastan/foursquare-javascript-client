Base = require './base'

class User extends Base

User.endpoints ->

  @base 'users'

  @get [

    'leaderboard'
    'requests'
    'search'

  ]

class User::Instance extends User

  constructor: ({client, @userId}) ->

    super(client: client)

  update: -> throw new Error('User#update not yet implemented')

User::Instance.endpoints ->

  @base [ @userId ]

  @get [

    'badges'
    'checkins'
    'friends'
    'lists'
    'mayorships'
    'photos'
    'tips'
    'venuehistory'

  ]

  @post [

    'approve'
    'deny'
    'request'
    'setpings'
    'unfriend'

  ]

module.exports = User
