[![Unittests](https://github.com/papermerge/document-commander/actions/workflows/unittests.yml/badge.svg)](https://github.com/papermerge/document-commander/actions/workflows/unittests.yml)

# Document Commander

NodeJs package for (reusable) client side files browsing i.e. javascript code for navigating documents and folders.
Provides look and feel of typical modern desktop file manager e.g. [Gnome's Files App](https://wiki.gnome.org/Apps/Files).
Document Commander is part by [Papermerge Core](https://github.com/papermerge/papermerge-core).


![Commander](./img/commander.svg)


## Requirements

The core requirements for this project are NodeJs, npm (node package manager) and webpack:

* [nodejs](https://nodejs.org/en/) >= 10.24
* [npm](https://docs.npmjs.com/about-npm) >= 7.8
* [webpack](https://webpack.js.org/) >= 5.30.0

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
    $ cd ..
    $ make run


## Document Commander API

At vary basic, you can instanciate Document Commander and open root folder as follows::

    let DC = DocummentCommander, commander;

    commander = new DC.CommanderView({
        'el': '#commander'
    });
    commander.open();

Where ``#commander`` is some DOM div element. Notice when `commander.open`
method is without arguments Commander will open root folder i.e. will issue
request `GET /core/folder/` from the server side. The `core` part of the url request
is so called `urlconf` prefix. If no further configuration is provided, default `urlconf` prefix is used - which is `/core`.

You can change default `urlconf` prefix as follows::

    let DC = DocummentCommander, commander;

    DC.urlconf.prefix = "/app";
    commander = new DC.CommanderView({
        'el': '#commander'
    });
    commander.open();

In this case DocumentCommander will issue `GET /app/folder` http request to
fetch root folder data.