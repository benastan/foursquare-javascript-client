authenticationWindow = false
Timeout = 30000

class Authentication

  success: (callback) ->

    @success = callback

    @

  error: (callback) ->

    @error = callback

    @

  constructor: ({@client, @timeout}) ->

    @popup()

  popup: ->

    if authenticationWindow && +new Date - authenticationBeganAt > Timeout

      @error()

    else if authenticationWindow

      hashParams = @client.utilities.parseHashString(authenticationWindow.document.location.hash.substr(1))

      if hashParams.access_token

        authenticationWindow.close()
        @client.accessToken = @accessToken = hashParams.access_token
        authenticationWindow = false
        @success()

      else

        setTimeout((=> @popup()), 100)

    else

      authenticationWindow = window.open(@url())
      authenticationBeganAt = +new Date
      setTimeout((=> @popup()), 100)

   url: ->

     "https://foursquare.com/oauth2/authenticate?client_id=#{@client.clientId}&response_type=token&redirect_uri=#{@client.redirectUrl}"

module.exports = Authentication
