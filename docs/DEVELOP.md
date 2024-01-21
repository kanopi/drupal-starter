# Developer Instructions.

## Step #1: Docksal environment setup

If you don't have Docker Desktop and Docksal set up, complete this step.

**This is a one time setup.**

Follow [Docksal install instructions](https://docs.docksal.io/getting-started/setup/)

## Step #2: Project setup

1. Clone this repo into your Projects directory.
1. Change directory to the cloned folder.
1. Make your own version of the `docksal-local.env` file from the example
and add your `SECRET_TERMINUS_TOKEN` to the file.
    * You don't need to do this if you set your token globally in Docksal
1. Initialize the site with `fin init`
1. Once the site has been initialized you'll get a url
to go to in your browser to start dev'ing.


## Installing Modules

Modules are installed using composer.
The process for installing a module would be the following:

```
fin composer require [organization]/[package]
```

The standard composer command is used but with the Docksal specific command 
`fin` prepended to the beginning.
