def make_common_js(dest,url):
    with open(dest,'w') as f:
        f.write("var prefix = \"%s/\";"%(url) );

