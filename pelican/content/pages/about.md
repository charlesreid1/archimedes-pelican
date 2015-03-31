Title: About 
PageStyle: well
save_as: about.html

## What is Archimedes Pelican?

Archimedes Pelican was a project forged in the dark and excruciating forges 
of my anger, fueled by my interactions with [Node.js](https://nodejs.org/), 
(see [my wiki for notes on Angular](charlesreid1.com/wiki/Angular)).

My goal was to rip Node.js out from the usual Angular.js workflow, and replace it 
with something in Python - in particular, the superb, simple [Pelican](http://blog.getpelican.com/).

<br />

## What is Angular.js?

Angular.js is a Javascript Model-View-Controller framework library.
It allows you to connect your HTML pages (the view) with your data structures
(the model), with the interaction governed by an abstraction layer (the controller).

This allows you to control ana change your pages without ever touching
the HTML itself (a.k.a. the DOM, domain object model).

<br />

## What is Pelican?

Pelican is a refreshingly lightweight, simple library for generating
static content sites with Python.

Pelican takes less than a minute to install, and gets you immediately
up and running with Markdown, integration of CSS and Javascript, 
themes, plugins, and complex logic for building up pages for sites 
(all the complex logic is implemented in Python, making it a snap.)

<br />

## What's Wrong with Node/Jekyll?

Let's compare the Pelican process with the "other guys": Node.js (Javascript) and Jekyll (Ruby).

Jekyll uses equal parts Ruby scripts and dark magic. It just works, until one day it breaks,
and cannot be fixed. Then you google madly for whatever error you're getting and hope you can
copy and paste some white magic into the command line to fix it.

With Node.js, you'll need to start by compiling node, which will take you 
about 45 minutes. Once that's done, you'll need to install Bower, Grunt,
Gulp, Mustache, Brunch, and a hundred other libraries whose names
and actual functions all blur together. 

Assuming all of this goes smoothly for you 
(it took me [three tries and at least as many hours](http://charlesreid1.com/wiki/Angular) 
to install the Node.js ecosystem on a stock Ubuntu server running 14.04),
you will then have a barely-functioning toolset. No markdown support,
no Python scripting, and no helpful documentation.

The choice to go with Pelican was clear from the beginning. 
While it does sacrifice Javascript unit tests,
this cost was worth the benefit of not dealing with Node.

<br />



