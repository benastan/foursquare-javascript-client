authentication_window = false
Timeout = 30000

class Authentication

  constructor: ({@client, @timeout}) ->

    access_token = @client.utilities.hash_params().access_token

    if access_token

      @client.access_token = access_token

      #@client.current_user = 

    else

      if authentication_window && +new Date - auth_began > auth_timeout

        # Timeout.

      else if authentication_window && authentication_window instanceof Window

        hash_params = @client.utilities.parse_hash_params(authentication_window)
        authentication_window.close()

      else

        authentication_window = window.open(@url())
        authentication_began_at = +new Date
        setTimeout(arguments.callee(), 100)

   url: ->

     "https://foursquare.com/oauth2/authenticate?client_id=#{@client.client_id}&response_type=token&redirect_uri=#{@client.redirect_url}"

