class Base

  constructor: ({@client}) ->

  url: (args...) ->

    "#{[ 'https:/', 'api.foursquare.com', 'v2' ].concat(args).join('/')}?oauth_token=#{@access_token}"

  perform: (type, url_args...) ->

    #$.ajax
      #type: type
      #url: @url(@base_params.concat(url_args))

  post: (url_args...) ->

    @perform.apply(@, ['post'].concat(url_args))

  get: (url_args...) ->

    @perform.apply(@, ['get'].concat(url_args))

module.exports = Base
