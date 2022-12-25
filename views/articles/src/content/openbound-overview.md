{{HEAD}}
title=Openbound - Overview
description=An in-depth tutorial of the Openbound game engine, Sburb.

{{BODY}}

# Openbound - Overview

These articles function as a tutorial for the creation of new Openbound walkaround/walkabout games, as seen in the webcomic Homestuck. Feel free to direct questions to me directly.

The Openbound games were built on what is now known as [the Sburb game engine](https://github.com/WhatPumpkin/Sburb). This is what the tutorial will focus on.

## Table Of Contents

-   [**Overview**](/openbound-overview)
-   [Basics](/openbound-basics)
    -   [Assets](/openbound-assets)
    -   [Dependencies](/openbound-dependencies)
    -   [Rooms](/openbound-rooms)
    -   [Characters](/openbound-characters)
    -   [Actions/interactions](/openbound-actions)
    -   [Dialog sprites](/openbound-dialog-sprites)
    -   [Dialog](/openbound-dialog)
    -   [Triggers](/openbound-triggers)
    -   [Paths](/openbound-paths)
    -   [Templates](/openbound-templates)
-   [Good practice](/openbound-good-practice)
-   [Advanced](/openbound-advanced)
    -   [Text colours](/openbound-text-colours)
-   [Production](/openbound-production)
    -   [Build](/openbound-build)
    -   [Release](openbound-release)

## Resources

-   [Visual Studio Code (recommended editor)](https://code.visualstudio.com/)
-   [Official wiki (incomplete)](https://github.com/WhatPumpkin/Sburb/wiki)
-   [Openbound part 1 source code](https://github.com/WhatPumpkin/Openbound/tree/openbound-part1)
-   [Openbound part 2 source code](https://github.com/WhatPumpkin/Openbound/tree/openbound-part2)
-   [Openbound part 3 source code](https://github.com/WhatPumpkin/Openbound/tree/openbound-part3)
-   [Sburb engine and sample source code](https://github.com/WhatPumpkin/Sburb)

## Setup

### Requirements

Firstly, download the ZIP file for the Sburb engine and extract it somewhere on your computer. You may use any editor to edit the files, but I recommend Visual Studio Code, as it has an extension, which allows you to easily run the game locally, as you're working on it.

### Visual Code Extension (recommended, but optional)

To install this extension to Visual Studio Code, first open the application. Then press the extensions tab (4 rounded squares) on the left. Search for "Live Server" and install the extension by Ritwick Dey. Once installed, you can right-click the `index.html` file and choose "Open with Live Server", which will automatically open it in a browser.

NOTE: If you choose not do to this, you should find another way to run your HTML file on a localhost server, since standard browser security prevents loading of local files, which the Sburb engine tries to do.

## Structure

The Sburb engine has a very simple structure. It may seem overwhelming at first, but know that you rarely have to touch anything other than the `resources` and `levels` folders.

`levels` contains the [SBURBML](#sburbml) files, which make up the actual levels. In other words, every object or character interaction, every dialogue choice, and every collidable object is defined in `levels`.

`resources`, as the name entails, contains every resource used by the files in `levels`. You'll almost only be using it to add new images/animations, but you may also add the occasional piece of music or sound.

Both `levels` and `resources` have a subdirectory with the name of the project, such as `sample`. This directory will from now on be called `[PROJECT]` in all path illustrations. An example might be `levels/[PROJECT]/rooms`. If this is confusing, please look at the sample project for reference.

Some more advanced features, such as changing text colours, may require editing the files in `src`, but I will cover those segments later, as necessary. For now, just focus on `resources` and `levels`.

## SBURBML

The Sburb engine uses a variation on the XML language to define their levels. As a matter of fact, all of the files in the sample end with `.xml`, so you may as well just consider them XML files.

### Basic tag

I would rather not turn this into a programming or XML tutorial, as that information can be found elsewhere, but I will cover the most basic tag necessary, just in case. The meaning of the following tags will be covered later. Please just focus on the syntax.

A simple XML (here SBURBML) tag has an opening tag and a closing tag.

```xml
<sburb></sburb>
```

A tag may have any amount of attributes, including 0. Here is an example of a tag with an attribute.

```xml
<sburb description="first room"></sburb>
```

A tag may contain text content

```xml
<args>karkat3,meenah</args>
```

Alternatively to text content, a tag may have children

```xml
<action>
  <args>karkat3, meenah</args>
</action>
```

This applies to all tags recursively. Basically, XML (here SBURBML) files can look like this, with children and attributes mixed however many times you want:

```xml
<sburb description="first room">
  <action>
    <args>karkat3, meenah</args>
  </action>
</sburb>
```

If none of that made sense to you, you'll probably have trouble with the rest of this tutorial, and I advise you to look up an XML tutorial instead.

### File structure

You will be using SBURBML to define which assets to load, which objects to place, which interactions will occur, and so on.

As a general rule of thumb, a SBURBML file has the following structure:

```xml
<sburb ...>
  <dependencies>
    <dependency>...</dependency>
    ...
    <dependency>...</dependency>
  </dependencies>

  <assets>
    <asset ...>...</asset>
    ...
    <asset ...>...</asset>
  </assets>

  <classes>
    <sprite ...>...</sprite>
    ...
    <sprite ...>...</sprite>
  </classes>

  <effects>
    <animation ...>...</animation>
    ...
    <animation ...>...</animation>
  </effects>

  <hud>
    <spritebutton ... />
    ...
    <spritebutton ... />

    <dialoger ...>
    </dialoger>

    <dialogsprite>
       <animation ...>...</animation>
       ...
       <animation ...>...</animation>
    </dialogsprite>
  </hud>

  <rooms>
    <room ...>...</room>
    ...
    <room ...>...</room>
  </rooms>
</sburb>
```

Note, however, that you are not required to include all of the sections in each file. Room definitions, for example, are generally just a list of assets, dependencies, and a single room. Like so:

```xml
<sburb ...>
  <dependencies>
    <dependency>...</dependency>
    ...
    <dependency>...</dependency>
  </dependencies>

  <assets>
    <asset ...>...</asset>
    ...
    <asset ...>...</asset>
  </assets>

  <rooms>
    <room ...>...</room>
  </rooms>
</sburb>
```

The sample code has plenty of comments, so feel free to explore the sample game and its code before continuing.
