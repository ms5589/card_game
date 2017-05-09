// The routeMap we will be using, intialized as empty
var fs = require('fs');
var routeMap = {
  get: [],
  post: [],
  put: [],
  patch: [],
  load: [],
  del: [],
  delete: []
};

// Adds a route to the router, matching route and verb to
// a callback function.  Route should be specified in the form:
// "path/to/resource/:id" where any tokens to extract from the
// route are indicated by a key prefaced with a colon (:); the
// value captured will be assigned to the key in the params
// object passed into the callback.  The callback should take
// the form function(req, res, params), where params is an
// object containing key/value pairs extracted from the route
function addRoute(route, verb, callback) {
  if(!route && !callback) {
    console.error("undefined route or callback", route, callback);
    return;
  }

  // We tokenize the path on forward slashes (/)
  // and iterate over the tokens, building a
  // regular expression from the route string
  var tokens = route.split('/');
  var exp = [];
  var keys = [];
  for(var i = 0; i < tokens.length; i++) {
    // We check to see if the token is a key symbol
    var match = tokens[i].match(/:(\w+)/);
    if(match){
      // If so, we add a regular expression capture group
      // to the regular expression we are building, and
      // store the corresponding key in the keys array
      exp.push("(\\w+)");
      keys.push(match[1]);
    } else {
      // If it is not a key symbol, it is a static portion
      // of the URL we'll need to match against, so push
      // it into our growing regualr expression.
      exp.push(tokens[i]);
    }
  }
 // Convert the regular expression array into a proper
 // regular expression
  var regexp = new RegExp('^' + exp.join('/') + '/?$');

  // Store the route object in the routeMap
  routeMap[verb.toLowerCase()].push({
    regexp: regexp,
    keys: keys,
    callback: callback
  });
}

// Adds a resource to the router, automatically generating
// restful routes to match the existing CRUD methods in them
// supplied controller
function addResource(resource, controller) {
  if(resource == undefined || controller == undefined)
    return console.error("Undefined resource or controller");
  // We only want to add routes for actions that are
  // DEFINED in the controller object, so we test for
  // each method's existence
  // Add the CREATE functions (new & create)
  if(controller.homepage) addRoute('/' + resource + '/', 'get', controller.homepage);
  if(controller.homepage) addRoute('/' + resource + '/index', 'get', controller.homepage);
  if(controller.new) addRoute('/' + resource + '/new', 'get', controller.new);
  if(controller.create) addRoute('/' + resource, 'post', controller.create);
  if(controller.change) addRoute('/:id/change' + resource, 'post', controller.change);
  // Add the READ functions (index & show)
  
  if(controller.index) addRoute('/' + resource, 'get', controller.index);
  if(controller.show) addRoute('/' + resource + '/:id', controller.show);
  // Add the UPDATE functions (edit & update)
  if(controller.edit) addRoute('/' + resource + '/:id/edit', 'get', controller.edit);
  if(controller.update) addRoute('/' + resource + '/:id', 'put', controller.update);
  // Add teh DESTROY functions (destroy)
  if(controller.destroy) addRoute('/' + resource + '/:id', 'delete', controller.destroy);
  if(controller.destroy) addRoute('/' + resource + '/:id/delete', 'get', controller.destroy);

  if(controller.destroy) addRoute('/' + resource + '/:id', 'del', controller.delCmt);
  if(controller.destroy) addRoute('/' + resource + '/:id/del', 'get', controller.delCmt);
  
  if(controller.add) addRoute('/' + resource + '/:id', 'load', controller.add);
  if(controller.add) addRoute('/' + resource + '/:id/load', 'get', controller.add);

  if(controller.load) addRoute('/' + resource + '/:id', 'load', controller.load);
  if(controller.load) addRoute('/' + resource + '/:id/load', 'get', controller.load);
}

// Routes a request to the matching callback function
// using the mappings stored in the route table
function route(request, response) {
  console.log(routeMap);
  var verb = request.method.toLowerCase();
  var path = request.url.split("?")[0];
  // Iterate through the routeMap looking for a matching route
  for(var i = 0; i < routeMap[verb].length; i++)
  {
    // Use the route's regular expression to pattern match
    // against the path
    var match = routeMap[verb][i].regexp.exec(path);
    if(match) {
      // A match was found, so populate the params object by
      // iterating over the match's capture groups and assigning
      // them to the corresponding key (correspondence is by order)
      var params = {};
      for(var j = 0; j < routeMap[verb][i].keys.length; j++) {
        var key = routeMap[verb][i].keys[j]
        params[key] = match[j+1];
      }
      // Exit control flow and trigger the callback, passing
      // on our request, response, and params objects. Also,
      // use *call()* to pass on the 'this' context, which is
      // custom-populated by http.Server
      console.log(params);
      return routeMap[verb][i].callback(request, response, params);
    }
  }
  // If we reach this point in our program execution, it means
  // that there was no match for our route.  Respond with a 404.
  response.writeHead(404, {'Content-Type':'text/html'});
  if(request.url == " " || request.url == "/" || request.url == "/index.html" || request.url == "/index" )
  {
    var data = fs.readFileSync('./Views/lobby/game_room.html', {encoding: "utf-8"});
    response.end(data);
  }
  else
  response.end("<h1>Resource Not Found!</h1>");
}

module.exports = exports = {
  addRoute: addRoute,
  addResource: addResource,
  route: route
};