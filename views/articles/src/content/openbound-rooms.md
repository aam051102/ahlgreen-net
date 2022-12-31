{{HEAD}}
title=Openbound - Rooms
description=An in-depth tutorial of the Openbound game engine, Sburb. This section covers rooms.

{{BODY}}

# Openbound - Rooms

This article focuses on the creation of rooms in the Sburb game engine.

## Table Of Contents

-   [Overview](./openbound-overview)
-   [Basics](./openbound-basics)
    -   [Assets](./openbound-assets)
    -   [Dependencies](./openbound-dependencies)
    -   [**Rooms**](./openbound-rooms)
    -   [Sprites](./openbound-sprites)
    -   [Animations](./openbound-animations)
    -   [Characters](./openbound-characters)
    -   [Actions](./openbound-actions)
    -   [Dialog](./openbound-dialog)
    -   [Dialog sprites](./openbound-dialog-sprites)
    -   [Triggers](./openbound-triggers)
    -   [Paths](./openbound-paths)
    -   [Templates](./openbound-templates)
    -   [Game State](./openbound-gamestate)
    -   [Effects](./openbound-effects)
-   [Good practice](./openbound-good-practice)
-   [Advanced](./openbound-advanced)
    -   [Text colours](./openbound-text-colours)
-   [Production](./openbound-production)
    -   [Build](./openbound-build)
    -   [Release](openbound-release)

## Structure

Room creation is relatively simple. Good practice is to place the rooms in the `levels/[PROJECT]/rooms` directory and to keep them in individual files. The Openbound games name their room files `firstRoom.xml`, `secondRoom.xml`, `thirdRoom.xml`, etc., to indicate rooms 1, 2, 3, and so on.

## File

The general structure for an individual room file is as follows:

```xml
<sburb description="...">
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

For an explanation of the `<dependencies>` section, please see [dependencies](./openbound-dependencies).

For an explanation of the `<assets>` section, please see [assets](./openbound-assets).

## Room outline

The `<rooms>` section can contain any amount of `<room>` elements, but good practice appears to be containing each room within its own file, and only have a single `<room>` element within the `<rooms>` element of each file.

Assuming a single room in the file, and disregarding the `<dependencies>` and `<assets>` sections for the purposes of this tutorial, the file for room 1 is likely to look like so:

```xml
<sburb description="first room">
  <rooms>
    <room name='firstRoom' walkableMap='firstRoomMap' mapScale='4'>
    ...
    </room>
  </rooms>
</sburb>
```

Let us start by focusing on the `<room>` tag and its attributes. Anything inside of the room tag, represented here by `...`, will be contained within the room when the player character enters it. This is usually sprites, paths, characters, or triggers.

## Attributes

### name

The `name` attribute, here set as `name='firstRoom'` determines the name used by other actions to refer to the room. An example might be the action to enter a room, which takes the room name as an argument. See example below:

```xml
<action name="changeRoom">
  <args>firstRoom,50,50</args>
</action>
```

### walkableMap

The `walkableMap` attribute, here set as `walkableMap='firstRoomMap'` determines which graphic asset (see [assets](./openbound-assets)) to use for the walkable map.

The walkable map is a black and white (by which I mean the colours black and white; not grayscale) image, which represents where the player character can and can't walk in the room. Note that the map itself is usually not the size of the room. To keep both accuracy and performance good, the Openbound developers commonly went at a map a 1/4 the size of the actual room map.

### mapScale

The `mapScale` attribute, here set as `mapScale='4'`, determines the amount of times that the walkable map needs to be sized up to align with the actual world map. As specified earlier, 4 times (for a map 1/4 the size of the room) is a good mid-point.
