# Installation

This repository is configured for use in Pantheon.

## Create the project in Pantheon

* Create a new drupal **10** project.
![Create a new drupal 10 project](https://github.com/kanopi/drupal-starter/assets/7685811/a1926875-951d-473a-bf0f-146abf3ad1eb)

* Create a minimal site install
  ![Create a minimal site install](https://user-images.githubusercontent.com/1062456/130299368-effbdab3-87ec-435b-812a-cb5d50b1c430.png)

* Set the basic details for the site
  ![Set the basic details for the site](https://user-images.githubusercontent.com/1062456/130299369-e102b080-f94b-45ce-a706-08392e075c1a.png)

* Add Redis to the project
![Add redis to the project](https://user-images.githubusercontent.com/1062456/130299370-1e5564db-73dc-4ade-b086-5b7af27d7608.png)

* Go to the Pantheon dashboard for your project.

* Click on the Team tab.

* Click on Add organization

* Search for Kanopi Studios (Important: enter the full term (Kanopi Studios) to
find this - if you just enter Kanopi, you will end up with the wrong group and
things will not work).

* Select and add Kanopi Studios.


## Create project's Github repo
* Go to [https://github.com/kanopi/drupal-starter](https://github.com/kanopi/drupal-starter)

* Click on "Use this template" button.

* Make the owner Kanopi and the repo private, then click "Create repository from
 template"

* In the new repo, click on Settings and then the Manage Access tab.

* Click on "Invite teams or people" button.

* Search for and add Kanopi Studios and grant them Read access.

* Click on "Add kanopicode to this repository"

* Still in Settings, click on the Branches tab.

* Click on Add Rule.

* Make Branch name pattern match your default branch (e.g., main).

* Select "Require pull request reviews before merging"

* Click Create button

## Update the files to be project specific

* Clone the new repo to your local.

* Create a development branch.

* Make the project specific changes listed below.

* Docksal
    * docksal.env
        * Update `hostingsite` to the machine name of the project in Pantheon
        * Update `THEME` to the name of the theme folder
        * `hostingenv` is set to `dev` to start but when you release the
        project to production it should be changed to `live`
        ~~* Run `fin install-kdcl-basic` after you have set the~~
        ~~theme name that you want.~~
    * settings.php
        * `.docksal/etc/conf/settings.php` is used for
        the local settings file for drupal.
    * vhost-overrides.conf
        * `.docksal/etc/nginx/vhost-overrides.conf`
        * Update the proxy url to use the pantheon machine name
         for the site you just created.
    * .pa11yci.js
        * Update the urls you would like to test in the array
        * Update README's pally section with the links to the correct urls.
* CircleCI
    * `config.yml`
        * Update the `TERMINUS_SITE` variable in line 2
        to your Pantheon machine name for the project.
        * Update the `THEME_NAME` variable in line 3
        to the folder name for your custom theme.
        * Update paths in JSON lock files in theme
        * If you would like Slack notifications when builds complete
        uncomment the slack portion.
        You will need to create a new CircleCI slack integration
        for the channel you want to post updates too & update the webhook URL.

* Run `fin init` to validate your local site.

* Run `fin drush cex -y`

* On a development branch, git add, commit and push all local changes.

* Create a PR in github.

* CircleCI won't run this time because we haven't set it up yet.
We need to commit the project-specific CircleCI config.yml first so we can setup
 CircleCI later.

* Merge PR (now we have our project-specific CircleCI config
on the main branch so we can reference it from CircleCI).
Circleci job will still not happen.

## Circleci project setup

* Go to
[CircleCI](https://app.CircleCI.com/projects/project-dashboard/github/kanopi/)

* Find your new project repo and click the "Set Up Project" button.

* Select the branch name option and select the main branch,
 and click on the "Lets go" button.

* Click on the gear for the project and click on the Advanced Settings tab.

* Enable "Only build pull request" and "Auto Cancel Builds" options.
[Update settings](https://user-images.githubusercontent.com/1062456/130299362-9c04c3e2-e59a-4e73-8dfa-816d8d5316f4.png)

## Drupal setup
We have removed all opinions about which modules should be installed in Drupal.

Instead, we have created the [kanopi/saplings](https://www.github.com/kanopi/saplings)
Drupal recipe to require, intsall, and configure the modules and content types we 
use on most Drupal builds.  Please visit that repository to continue using that.

### A note about Redis on Pantheon.
* We enabled Redis on Pantheon in an earlier step.
* Before it can be configure, the Drupal Redis module needs to be enabled and 
pushed to Pantheon.  It is a two commit process.
* Once the module has been enabled and verified on Pantheon:
  * Uncomment the Redis config in `/assets/pantheon_setting_defaults.inc`.
  * Git add, commit and push the change.
  * Submit a PR in the github repo.
  * Validate CircleCI job and deployment to multidev.
  * Merge the PR.
  * Validate CircleCI job deployment and Pantheon Dev site.
