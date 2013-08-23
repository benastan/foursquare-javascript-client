class Client

  authenticate: ->

    @authentication = new @Authentication(client: @)

  Authentication: require './authentication'

  constructor: ({@client_id, @redirect_url}) ->

  User: require './user'
  utilities: require './utilities'

module.exports = Client
