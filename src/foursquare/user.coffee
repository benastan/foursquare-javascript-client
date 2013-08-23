Base = require './base'

class User extends Base

  constructor: ({@client, @user_id}) ->

    super(client: @client)

    @get()

  base_params: ->

    [ 'users', @user_id ]

module.exports = User
