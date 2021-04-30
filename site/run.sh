#!/bin/bash

# create symlink from site/static/dist to root project's dist
site_dist=static/dist
root_proj_dist=../../dist

export FLASK_APP=index.py
export FLASK_ENV=development

if [ ! -L  ${site_dist} ]; then
    ln -s $root_proj_dist $site_dist
fi

flask run --debugger --reload