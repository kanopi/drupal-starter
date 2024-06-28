# Creating Default Content

Instructions on how to use the Default Content module to create default content 
for a recipe.

## Enable the Default Content module.

The module is required in the dev section.  It is not required in production.

fin drush en -y default_content

## Exporting content

Content can be exported to a module or recipe, but we want to export to a recipe
so we do not need the default_content module on production. We can apply a 
recipe to import the content.

1. Create a recipe at `[project-root]/recipes/[recipe-name]`

The recipe only needs to have a folder with it's name and a recipe.yml with

```
name: 'Example'
description: 'Demo content for example.'
type: 'Content'
```

2. Create a `/content` folder in that recipe.

3. Export the content you want.

`drush dcer [entity_type] [bundle or ID] --folder=../recipes/[recipe-name]/content`

dcer gets all the dependencies of the entity you are exporting.

### Available [entity_type]s:

* node
* menu_link_content
* taxonomy_term
* media
* user

4. Disable the module when done.

fin drush pmu -y default_content
