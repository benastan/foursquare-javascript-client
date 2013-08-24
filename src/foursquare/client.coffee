Utilities = require('./utilities')
User = require('./user')

class Client

  authenticate: (success, error) ->

    @authentication = new @Authentication(client: @)

      .success =>

          @currentUser = @User.new(client: this, userId: 'self')

          @currentUser

            .get()

            .done( => success() )

  Authentication: require './authentication'

  constructor: ({@clientId, @redirectUrl, @accessToken}) ->

    @User = new User(client: this)

  utilities: new Utilities

module.exports = Client
