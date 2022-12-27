{{HEAD}}
title=Openbound - Paths
description=An in-depth tutorial of the Openbound game engine, Sburb. This section covers paths.

{{BODY}}

# Openbound - Paths

A path in Openbound is simply a series of X and Y coordinates, which can be used in one of three ways. A path can either be a walkable, an unwalkable, or a motion path. All path types can be added dynamically using their corresponding actions.

## Table Of Contents

-   [Overview](./openbound-overview)
-   [Basics](./openbound-basics)
    -   [Assets](./openbound-assets)
    -   [Dependencies](./openbound-dependencies)
    -   [Rooms](./openbound-rooms)
    -   [Characters](./openbound-characters)
    -   [Actions/interactions](./openbound-actions)
    -   [Dialog sprites](./openbound-dialog-sprites)
    -   [Dialog](./openbound-dialog)
    -   [Triggers](./openbound-triggers)
    -   [**Paths**](./openbound-paths)
    -   [Templates](./openbound-templates)
    -   [Game State](./openbound-gamestate)
-   [Good practice](./openbound-good-practice)
-   [Advanced](./openbound-advanced)
    -   [Text colours](./openbound-text-colours)
-   [Production](./openbound-production)
    -   [Build](./openbound-build)
    -   [Release](openbound-release)

## Structure

The first thing to note about paths is that they must be defined as assets first. You can see how in the [path](./openbound-assets#path) section of the assets tutorial.

The `<paths>` section is usually seen in a room like this:

```xml
<sburb description='first room'>
    <rooms>
        <room>
            <paths>
                ...
            </paths>
        </room>
    </rooms>
</sburb>
```

## Walkables

The walkable path simply allows the player character to move around inside the area of the specified path, even if the room's walkable map does not indicate that they can.

The usage is like so:

```xml
<sburb description='first room'>
    <assets>
	    <asset name='myExtraWalkable' type='path'>1680,1520;2130,1092;2330,1092;2350,1186;2150,1186;1683,1611</asset>
    </assets>

    <rooms>
        <room>
            <paths>
                <walkable path="myExtraWalkable" />
            </paths>
        </room>
    </rooms>
</sburb>
```

The `path` attribute specifies the path asset to use.

## Unwalkables

The unwalkable path does opposite of the walkable. The player character is prevented from moving into the area of the specified path, even if the room's walkable map indicates that the player can walk there.

The usage is like so:

```xml
<sburb description='first room'>
    <assets>
	    <asset name='myExtraUnwalkable' type='path'>1680,1460;2130,1032;2150,1086;1683,1520</asset>
    </assets>

    <rooms>
        <room>
            <paths>
                <unwalkable path="myExtraUnwalkable" />
            </paths>
        </room>
    </rooms>
</sburb>
```

The `path` attribute specifies the path asset to use.

## Motion paths

Motion paths are slightly more complicated than walkables and unwalkables. A motion path specifies a path, which the player is automatically dragged along when pressing a movement button.

Here is an example of a motion path.

```xml
<sburb description='first room'>
    <assets>
	    <asset name='myStairs' type='path'>1374,2868;1370,2776;2098,3458;2098,3558</asset>
    </assets>

    <rooms>
        <room>
            <paths>
  		        <motionpath path="myStairs" xtox='0.7' xtoy='0.7' ytox='0' ytoy='1' dx='0' dy='0' />
            </paths>
        </room>
    </rooms>
</sburb>
```

The `path` attribute specifies the path asset to use.

The `xtox`, `xtoy`, `ytox`, and `ytoy` attributes specify how each X and Y movement corresponds to both X and Y movements.

`xtox`, for example, dictates how much the player character should move along the X axis when they press either left or right. Here, the value is set to `0.7`, meaning that the player will move `0.7` times the usual value. This makes them move slower down the stairs, to simulate steps.

`xtoy` dictates how much the player character should move along the Y axis when they press either left or right. For example, the player character automatically moves down the stairs when you press right, even though you haven't pressed the down button. This is what `xtoy` does. Here, it is set to `0.7`, which makes the player character move down `0.7` times the usual X value. Since `xtox` is also `0.7`, the movement speed down and right will be the same.

The same behaviour applies to `ytox` and `ytoy`, but for pressing the up and down buttons.

The `dx` attribute is a simple added value to help speed up or slow horizontal movements at constant pace. It is usually set to 0. The same applies to `dy`, but for vertical movement.

To be honest, a lot of these values are difficult to understand in writing, and I recommend just fiddling with them to get a feel for the results.
