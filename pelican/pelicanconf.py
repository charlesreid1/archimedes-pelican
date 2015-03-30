#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

from util import *

import re
import os

SITEURL = ''

AUTHOR = u'charlesreid1'
SITENAME = u'Archimedes Pelican'
SITEURL = '/archimedes-pelican'

PATH = 'content'

TIMEZONE = 'America/Los_Angeles'

DEFAULT_LANG = u'en'




# --------------8<---------------------

SITETAGLINE = "Angular.js and Pelican"

#THEME = 'svbtle'
THEME = 'voidy-bootstrap'

PLUGIN_PATHS = ['/home/charles/codes/pelican-plugins/','/home/charles/codes/pelican-ipynb/']
PLUGINS = ['liquid_tags','render_math','ipynb']


# ipython notebooks
MARKUP = ('md', 'ipynb')

STATIC_PATHS = ['images','notebooks']

EXTRA_HEADER = open('_nb_header.html').read().decode('utf-8')



# Don't try to turn HTML files into pages
READERS = {'html': None}




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
