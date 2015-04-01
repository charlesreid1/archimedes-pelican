#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

from util import *

import re
import os

SITEURL = ''

AUTHOR = u'charlesreid1'
SITENAME = u'Archimedes Pelican'
#SITEURL = '/archimedes-pelican'

PATH = 'content'

TIMEZONE = 'America/Los_Angeles'

DEFAULT_LANG = u'en'




# --------------8<---------------------

SITETAGLINE = "Angular.js and Pelican"

THEME = 'archimedes-theme'

HOME = os.environ.get('HOME')

PLUGIN_PATHS = [HOME+'/codes/pelican-plugins/',
                HOME+'/codes/pelican-ipynb/']
PLUGINS = ['liquid_tags','render_math','ipynb']
#EXTRA_HEADER = open('_nb_header.html').read().decode('utf-8')



# ipython notebooks
MARKUP = ('md', 'ipynb')



# This is stuff that goes into content/ that's copied into the website 
STATIC_PATHS = ['images']



# Don't try to turn HTML files into pages
READERS = {'html': None}



EXTRA_TEMPLATES_PATHS = ['angular']


#########################################
# Test out apps from AngularJS book
#
# Figure out how to replace angular's {{ }} with << >>

TEMPLATE_PAGES = {}

TEMPLATE_PAGES['hello1.html'] = 'hello1/index.html'
TEMPLATE_PAGES['hello2.html'] = 'hello2/index.html'
TEMPLATE_PAGES['hello3.html'] = 'hello3/index.html'
TEMPLATE_PAGES['hello4.html'] = 'hello4/index.html'
TEMPLATE_PAGES['hello5.html'] = 'hello5/index.html'




# --------------8<---------------------

DISPLAY_PAGES_ON_MENU = False


# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

DEFAULT_PAGINATION = False

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True
