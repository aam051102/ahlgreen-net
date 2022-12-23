{{HEAD}}
title=Openbound - Assets
description=An in-depth tutorial of the Openbound game engine, Sburb. This section covers assets.

{{BODY}}

# Openbound - Assets

This article focuses on the creation of assets in the Sburb game engine.

## Table Of Contents

-   [Overview](/openbound-overview)
-   [Basics](/openbound-basics)
    -   [**Assets**](/openbound-assets)
    -   [Dependencies](/openbound-dependencies)
    -   [Rooms](/openbound-rooms)
    -   [Characters](/openbound-characters)
    -   [Chests](/openbound-chests)
    -   [Actions/interactions](/openbound-actions)
    -   [Triggers](/openbound-triggers)
    -   [Paths](/openbound-paths)
    -   [Templates](/openbound-templates)
-   [Advanced](/openbound-advanced)
    -   [Text colours](/openbound-text-colours)
-   [Production](/openbound-production)
    -   [Build](/openbound-build)
    -   [Release](openbound-release)

## Structure

Asset sections can exist in any file and several different asset types exist. Most of the assets you will have to add yourself, will be for rooms and characters, as the sample predefines common assets for the dialogue system and UI.

## File

The general structure for an individual room file is as follows:

```xml
<assets>
  <asset ...>...</asset>
  ...
  <asset ...>...</asset>
</assets>
```

## Asset outline

The `<assets>` element can contain any amount of `<asset>` tags within. Assets do nothing on their own, and must be used by an `<animation>` or other elements to be visible. Thus, best practice is for the asset to be placed in the same file as the code that uses it.

There are several different types of assets, as seen in the example below:

```xml
<assets>
  <asset name='chest1ClosedSheet' type='graphic'>objects/chests/chest1.png</asset>
  <asset name='openSound' type='audio'>audio/sfx/Open1.oga;audio/sfx/Open1.mp3</asset>
</assets>
```

Let us start by focusing on the `<asset>` tag and its attributes.

## Attributes

### name

The `name` attribute determines the name used by other elements to refer to the asset.

### type

The `type` attribute defines the type of asset. It takes one of a few keywords, all of which are listed below.

-   graphic - an image

```xml
<asset name='chest1ClosedSheet' type='graphic'>objects/chests/chest1.png</asset>
```

-   audio - a sound

```xml
 <asset name='openSound' type='audio'>audio/sfx/Open1.oga;audio/sfx/Open1.mp3</asset>
```

-   movie - a flash movie (unsupported in modern browsers)
-   path - a [path](/openbound-paths)
-   font - a font definition
-   text - a piece of text
