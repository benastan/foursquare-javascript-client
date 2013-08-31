Foursquare JavaScript Client
============================

One chill JavaScript client for using Foursquare's API.

# Basic Usage

Set up your client:

    var clientId = "Your-Client-Id" # From your app at https://foursquare.com/developers/apps,
        client = Foursquare(clientId: clientId); # returns new Foursquare.Client 
      
# Authorization

To get authorization:
  
    client.authorize(function() {
      # User is now authorized, client has `currentUser` property.
    });

# Endpoint Wrappers

All endpoint wrappers return a jQuery Promise object.

## User

For most of the following methods, you must first authorize the user.

### Current User's leaderboard
  
    client.User.leaderboard().done(function(rsp) {
      var leaderboard = rsp.response.items;
    });
  
### Current User's requests
  
    client.User.requests().done(function(rsp) {
      var requests = rsp.response.items;
    });
  
### Search Users

    client.User.search({
      name: "Ben Bergstein"
    }).done(function(rsp) {
      results = rsp.response.items;
    });

