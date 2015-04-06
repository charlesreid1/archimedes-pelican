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

TEMPLATE_PAGES = {}

TEMPLATE_PAGES['hello1.html'] = 'hello1/index.html'
TEMPLATE_PAGES['hello2.html'] = 'hello2/index.html'
TEMPLATE_PAGES['hello3.html'] = 'hello3/index.html'
TEMPLATE_PAGES['hello4.html'] = 'hello4/index.html'
TEMPLATE_PAGES['hello5.html'] = 'hello5/index.html'

TEMPLATE_PAGES['dangular1.html'] = 'dangular1/index.html'
TEMPLATE_PAGES['dangular2.html'] = 'dangular2/index.html'
TEMPLATE_PAGES['dangular3.html'] = 'dangular3/index.html'
TEMPLATE_PAGES['dangular4.html'] = 'dangular4/index.html'
TEMPLATE_PAGES['dangular5.html'] = 'dangular5/index.html'

TEMPLATE_PAGES['hang1.html'] = 'hang1/index.html'
TEMPLATE_PAGES['hang2.html'] = 'hang2/index.html'

TEMPLATE_PAGES['datah1.csv'] = 'hang1/datah1.csv'
TEMPLATE_PAGES['datah2.csv'] = 'hang2/datah2.csv'

TEMPLATE_PAGES['multi1.html'] = 'multi1/index.html'
TEMPLATE_PAGES['iris1.csv']    = 'multi1/iris.csv'

TEMPLATE_PAGES['multi2.html'] = 'multi2/index.html'
TEMPLATE_PAGES['multi2.css']  = 'multi2/multi2.css'
TEMPLATE_PAGES['iris2.csv']    = 'multi2/iris.csv'



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
