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
#PLUGINS = ['liquid_tags','render_math','ipynb']
PLUGINS = []
#EXTRA_HEADER = open('_nb_header.html').read().decode('utf-8')



# ipython notebooks
MARKUP = ('md', 'ipynb')



# This is stuff that goes into content/ that's copied into the website 
STATIC_PATHS = ['images']



# Don't try to turn HTML files into pages
READERS = {'html': None}



EXTRA_TEMPLATES_PATHS = ['angular','angular/page3','angular/tax']



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
TEMPLATE_PAGES['dangular6.html'] = 'dangular6/index.html'
TEMPLATE_PAGES['dangular7.html'] = 'dangular7/index.html'

TEMPLATE_PAGES['dangular6.csv']  = 'dangular6/dangular6.csv'
TEMPLATE_PAGES['dangular6.json'] = 'dangular6/dangular6.json'
TEMPLATE_PAGES['dangular7.csv']  = 'dangular7/dangular7.csv'

TEMPLATE_PAGES['hang1.html'] = 'hang1/index.html'
TEMPLATE_PAGES['hang2.html'] = 'hang2/index.html'

TEMPLATE_PAGES['datah1.csv'] = 'hang1/datah1.csv'
TEMPLATE_PAGES['datah2.csv'] = 'hang2/datah2.csv'

TEMPLATE_PAGES['iris1.csv']   = 'multi1/iris.csv'
TEMPLATE_PAGES['multi1.html'] = 'multi1/index.html'

TEMPLATE_PAGES['iris2.csv']   = 'multi2/iris.csv'
TEMPLATE_PAGES['multi2.html'] = 'multi2/index.html'
TEMPLATE_PAGES['multi2.css']  = 'multi2/multi2.css'

TEMPLATE_PAGES['wine3.csv']             = 'multi3/wine.csv'
TEMPLATE_PAGES['multi3.html']           = 'multi3/index.html'
TEMPLATE_PAGES['multi3.css']            = 'multi3/multi3.css'
TEMPLATE_PAGES['multi3_controller.js']  = 'multi3/multi3_controller.js'
TEMPLATE_PAGES['multi3_module.js']      = 'multi3/multi3_module.js'
TEMPLATE_PAGES['multi3_directives.js']  = 'multi3/multi3_directives.js'

TEMPLATE_PAGES['wine4.csv']             = 'multi4/wine.csv'
TEMPLATE_PAGES['multi4.html']           = 'multi4/index.html'
TEMPLATE_PAGES['multi4.css']            = 'multi4/multi4.css'
TEMPLATE_PAGES['multi4_controller.js']  = 'multi4/multi4_controller.js'
TEMPLATE_PAGES['multi4_module.js']      = 'multi4/multi4_module.js'
TEMPLATE_PAGES['multi4_directives.js']  = 'multi4/multi4_directives.js'

TEMPLATE_PAGES['wine5.csv']             = 'multi5/wine.csv'
TEMPLATE_PAGES['multi5.html']           = 'multi5/index.html'
TEMPLATE_PAGES['multi5.css']            = 'multi5/multi5.css'
TEMPLATE_PAGES['multi5_controller.js']  = 'multi5/multi5_controller.js'
TEMPLATE_PAGES['multi5_module.js']      = 'multi5/multi5_module.js'
TEMPLATE_PAGES['multi5_directives.js']  = 'multi5/multi5_directives.js'

TEMPLATE_PAGES['page1.html']            = 'page1/index.html'
TEMPLATE_PAGES['page1.css']             = 'page1/page1.css'
TEMPLATE_PAGES['page1_module.js']       = 'page1/page1_module.js'
TEMPLATE_PAGES['page1_controller.js']   = 'page1/page1_controller.js'

TEMPLATE_PAGES['page2.html']            = 'page2/index.html'
TEMPLATE_PAGES['page2.css']             = 'page2/page2.css'
TEMPLATE_PAGES['page2_module.js']       = 'page2/page2_module.js'
TEMPLATE_PAGES['page2_controller.js']   = 'page2/page2_controller.js'
TEMPLATE_PAGES['page2_directives.js']   = 'page2/page2_directives.js'

TEMPLATE_PAGES['page3.html']            = 'page3/index.html'
TEMPLATE_PAGES['page3.css']             = 'page3/page3.css'
TEMPLATE_PAGES['page3_module.js']       = 'page3/page3_module.js'
TEMPLATE_PAGES['page3_controller.js']   = 'page3/page3_controller.js'
TEMPLATE_PAGES['page3_directives.js']   = 'page3/page3_directives.js'

TEMPLATE_PAGES['flare.json']                    = 'tax/flare.json'
TEMPLATE_PAGES['tax-data.csv']                  = 'tax/tax-data.csv'
TEMPLATE_PAGES['tax-data2.json']                = 'tax/tax-data2.json'
TEMPLATE_PAGES['tax.html']                      = 'tax/index.html'
TEMPLATE_PAGES['tax.css']                       = 'tax/tax.css'
TEMPLATE_PAGES['tax_module.js']                 = 'tax/tax_module.js'
TEMPLATE_PAGES['tax_controller.js']             = 'tax/tax_controller.js'
TEMPLATE_PAGES['tax_directives_pages.js']       = 'tax/tax_directives_pages.js'
TEMPLATE_PAGES['tax_directives_intro.js']       = 'tax/tax_directives_intro.js'
TEMPLATE_PAGES['tax_directives_categories.js']  = 'tax/tax_directives_categories.js'
TEMPLATE_PAGES['tax_directives_categoriesexplorer.js']  = 'tax/tax_directives_categoriesexplorer.js'
TEMPLATE_PAGES['tax_directives_era.js']         = 'tax/tax_directives_era.js'
TEMPLATE_PAGES['tax_directives_sunburst.js']    = 'tax/tax_directives_sunburst.js'



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
