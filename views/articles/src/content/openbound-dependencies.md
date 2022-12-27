{{HEAD}}
title=Openbound - Dependencies
description=An in-depth tutorial of the Openbound game engine, Sburb. This section covers dependencies.

{{BODY}}

# Openbound - Dependencies

This article focuses on dependency linking in the Sburb game engine.

## Table Of Contents

-   [Overview](/openbound-overview)
-   [Basics](/openbound-basics)
    -   [Assets](/openbound-assets)
    -   [**Dependencies**](/openbound-dependencies)
    -   [Rooms](/openbound-rooms)
    -   [Characters](/openbound-characters)
    -   [Actions/interactions](/openbound-actions)
    -   [Dialog sprites](/openbound-dialog-sprites)
    -   [Dialog](/openbound-dialog)
    -   [Triggers](/openbound-triggers)
    -   [Paths](/openbound-paths)
    -   [Templates](/openbound-templates)
    -   [Game State](/openbound-gamestate)
-   [Good practice](/openbound-good-practice)
-   [Advanced](/openbound-advanced)
    -   [Text colours](/openbound-text-colours)
-   [Production](/openbound-production)
    -   [Build](/openbound-build)
    -   [Release](openbound-release)

## Structure

Dependency sections can exist in any file. They exist as a simple way to separate content, both for organizational purposes, as well as for optimization. You can think of them as simply copying all the content from the linked dependency into the file that you're linking to them from.

A good example of a dependency is the player character. In the sample, this is Meenah. If you have more rooms, you don't want to redefine Meenah in each room. That could lead to both errors and confusion. Instead, keep her in `levels/[PROJECT]/chars/meenah.xml`, and simply add `chars/meenah.xml` as a dependency in the rooms that need Meenah.

## File

The general structure for a dependency section is as follows:

```xml
<dependencies>
  <dependency>...</dependency>
  ...
  <dependency>...</dependency>
</dependencies>
```

In a scenario where the characters Meenah and Karkat are defined in separate files, but used in a room, the room would need them as dependencies. They would be marked as such:

```xml
<sburb>
  <dependencies>
    <dependency>chars/meenah.xml</dependency>
    <dependency>chars/karkat.xml</dependency>
  </dependencies>

  <rooms>
    <room>
    ...
    </room>
  </rooms>
</sburb>
```

Note that the paths inside of the `<dependency>` elements are not relative to the room file, which is in `levels/[PROJECT]/rooms/`, but instead relative to the project directory `levels/[PROJECT]/`. This means that the linked files are `levels/[PROJECT]/chars/meenah.xml` and `levels/[PROJECT]/chars/karkat.xml`. The files and their content are completely arbitrary.
