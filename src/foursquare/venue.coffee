Base = require './base'

class Venue extends Base

Venue.endpoints ->

  @base 'venues'
  @get('add')
  @get('search')

module.exports = User
