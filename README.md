# Document Commander

NodeJs package for (reusable) client side files browsing i.e. javascript code for navigating documents and folders.
Provides look and feel of typical modern desktop file manager e.g. [Gnome's Files App](https://wiki.gnome.org/Apps/Files).
Document Commander is part by [Papermerge Core](https://github.com/papermerge/papermerge-core).


## Requirements

The core requirements for this project are nodejs, node package manager (npm) and webpack:

* nodejs >= 10.24
* npm >= 7.8
* webpack >= 5.30.0

## Installation

Install all nodejs dependent packages:

    $ npm i  # looks in package.json and installs dependencies


## Playground

In `site/` folder there is a `flask` based project used as playground.
In order to setup and run playground, use following commands:

    $ cd site
    $ virtualenv .venv -p /usr/bin/python3.7
    $ source .venv/bin/activate
    $ pip install -r requirements.txt
    $ ./run.sh