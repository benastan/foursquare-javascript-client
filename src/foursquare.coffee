# function Foursquare()
#
# @description: # Primary library entry point.
#
# @param client_id: # Your Foursquare application's client_id.
# @returns: Foursquare.Client
#
Foursquare = (options) ->

  new Foursquare.Client(options)

Foursquare.Client = require './foursquare/client'
Foursquare.utilities = require './foursquare/utilities'

window.Foursquare = Foursquare if typeof window isnt 'undefined'

module.exports = Foursquare
