{{HEAD}}
title=Openbound - Overview
description=An in-depth tutorial of the Openbound game engine, Sburb.

{{BODY}}

# Openbound - Overview

These articles function as a tutorial for the creation of new Openbound walkaround/walkabout games, as seen in the webcomic Homestuck. Feel free to direct questions to me directly.

The Openbound games were built on what is now known as [the Sburb game engine](https://github.com/WhatPumpkin/Sburb). This is what the tutorial will focus on.

## Table Of Contents

-   [**Overview**](/openbound-overview)
    -   [Resources](/openbound-overview#resources)
    -   [Setup](/openbound-overview#setup)
    -   [Structure](/openbound-overview#structure)
    -   [SBURBML](/openbound-overview#sburbml)
-   [Basics](/openbound-basics)
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

Some more advanced features, such as changing text colours, may require editing the files in `src`, but I will cover those segments later, as necessary. For now, just focus on `resources` and `levels`.

## SBURBML

The Sburb engine uses a variation on the XML language to define their levels. As a matter of fact, all of the files in the sample end with `.xml`, so you may as well just consider them XML files.

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
