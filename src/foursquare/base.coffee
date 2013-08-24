class Base

  constructor: ({@client}) ->

    @attributes = {}

  get: (urlArgs...) ->

    @perform.apply(@, ['get'].concat(urlArgs))

  new: (attributes) ->

    attributes ||= {}
    attributes.client = @client
    new @Instance(attributes)

  perform: (type, urlArgs..., data) ->

    if typeof data is 'string'

      urlArgs.push(data)
      data = undefined

    ajaxOptions =

      type: type
      url: @url.apply(@, @baseParams().concat(urlArgs))
      data: data

    $.ajax(ajaxOptions)

      .done (rsp) =>

        @attributes[key] = val for key, val of rsp.response.user

  post: (urlArgs...) ->

    @perform.apply(@, ['post'].concat(urlArgs))

  url: (args...) ->

    "#{[ 'https:/', 'api.foursquare.com', 'v2' ].concat(args).join('/')}?oauth_token=#{@client.accessToken}"

module.exports = Base
