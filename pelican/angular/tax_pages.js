/////////////////////////////////////////
//
// Construct Pages
//
// Constructs each page corresponding to a navigation item.
// the parent caller (the Controller) passes a DOM element,
// which is a <div> that contains the actual page content.
// This is where the D3 charts are added via Angular directives.

var construct_home = function(elem) { 
    console.log('Constructing the home page.');
    elem.empty();
    elem.append($("<h2></h2>").text("Home"));
    elem.append($("<p></p>").text("Hello cruel angular world, this is home."));
};

var construct_categories = function(elem) { 
    console.log('Constructing the categories page.');
    elem.empty();
    elem.append($("<h2></h2>").text("Categories"));
    elem.append($("<p></p>").text("Hello cruel angular world, this is categories.")); 
};

