{{HEAD}}
title=Openbound - Triggers
description=An in-depth tutorial of the Openbound game engine, Sburb. This section covers triggers.

{{BODY}}

# Openbound - Triggers

The official wiki describes triggers as event listeners. They are essentially checks executed every frame, which can run some function (or more checks) if the check is confirmed true. An example of a check might be seeing if the character's Y position is greater than some value and, if it is, move to a different room.

## Table Of Contents

-   [Overview](/openbound-overview)
-   [Basics](/openbound-basics)
    -   [Assets](/openbound-assets)
    -   [Dependencies](/openbound-dependencies)
    -   [Rooms](/openbound-rooms)
    -   [Characters](/openbound-characters)
    -   [Actions/interactions](/openbound-actions)
    -   [Dialog sprites](/openbound-dialog-sprites)
    -   [Dialog](/openbound-dialog)
    -   [**Triggers**](/openbound-triggers)
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

Triggers are usually found within a room definition like so:

```xml
<sburb description='first room'>
    <rooms>
        <room>
            <triggers>
                ...
            </triggers>
        </room>
    </rooms>
</sburb>
```

Triggers follow a very simple structure:

```xml
<triggers>
    <trigger>
        <args>[EVENT]</args>
        [ACTION]
    </trigger>
</triggers>
```

Here, `[EVENT]` is one of the event names followed by their arguments, as described in the [events](#events) section. `[ACTION]` is simply any action, as seen in the [actions](/openbound-actions) section.

Here is a complete example of a trigger:

```xml
<triggers>
    <trigger>
        <args>spriteProperty,char,x>4650</args>
        <action command='deltaSprite'>
            <args>char,-12,0</args>
            <action command='changeRoomRemote'>secondRoom.xml,secondRoom,800,790</action>
        </action>
    </trigger>
</triggers>
```

It simply checks if the character has an X position greater than 4650, moves them 12 pixels to the left, and then changes the room.
Now, why move the character 12 pixels to the left if you're going to change the room? Well, for that, see the [gotchas](#gotchas) section.

## Gotchas

There is one absolutely critical "gotcha" for triggers. When you execute a trigger, it doesn't disable the trigger, which means that it can be run again. This is usually what you want, but it can lead to one major issue.

Here is an example of a trigger with one glaring issue:

```xml
<triggers>
    <trigger>
        <args>spriteProperty,char,x>4650</args>
        <action command='changeRoomRemote'>secondRoom.xml,secondRoom,800,790</action>
    </trigger>
</triggers>
```

Can you tell what the problem is? This trigger changes rooms when the player character has an X greater than 4650. Well, the room change doesn't happen instantly; There's a slight pause and a fade transition before it occurs.

This means that there could be several more frames, where the player character **still** fullfills the condition of having an X greater than 4650, which would result in yet another room change call. This could easily become an infinite loop of the fade animation being reset from the room change command and thus never changing rooms.

So what to do? Why, you simply make the trigger condition false in some way. In the following version of the code, the player character is moved left 12 pixels, which means that, next frame, they won't be fullfilling the condition of having an X greater than 4650 anymore.

```xml
<triggers>
    <trigger>
        <args>spriteProperty,char,x>4650</args>
        <action command='deltaSprite'>
            <args>char,-12,0</args>
            <action command='changeRoomRemote'>secondRoom.xml,secondRoom,800,790</action>
        </action>
    </trigger>
</triggers>
```

Now, that solves this particular problem, but it might not work for everything. Depending on your situation, you may also want to use [guards](#guards).

## Guards

**NOTE: Always consider using [gameState](/openbound-gamestate) first.**

What is a guard? Well, it's a simple way to enable or disable triggers.

Here is an example of using a trigger guard.

```xml
<sburb description='first room'>
    <sprite name='firstRoomToggle' y='0'>
        <animation sheet='aradiaSheet'/>
    </sprite>

    <rooms>
        <room>
            <triggers>
                <trigger>inBox,char,1439,1730,60,110
                    <trigger>spriteProperty,firstRoomToggle,y=0
                        <action command='moveSprite'>
                            <args>firstRoomToggle,0,50</args>
                            <action class='aradiaTalk2'/>
                        </action>
                    </trigger>
                </trigger>
            </triggers>
        </room>
    </rooms>
</sburb>
```

This may seem kind of weird, but it's pretty simple. You place a sprite outside of the room, which ensures that it will never be visible.

In the room, a trigger checks if the player is within certain bounds using the [inBox](#inbox) event.

It then has a follow-up trigger, which checks if `firstRoomToggle` (the sprite defined earlier) has a Y of 0. As `y='0'` is set on the sprite, we know that Y is, indeed, 0.

The action `moveSprite` is then executed. This command simply moves the `firstRoomToggle` sprite to have Y=50, so that its Y is no longer 0, which means that the trigger will not execute again.

It then continues on to the actual action, which is irrelevant for this example.

# Attributes

## restart

Whether the trigger should reset itself when satisfied. Defaults to false if not specified.

## detonate

Whether the trigger should be removed when satisfied. Defaults to false if not specified.

# Events

## spriteProperty

Check if the specified property of the specified sprite satisfies some condition. Currently the conditions that can be checked are <, >, !=, and =. Additionally, they can only be compared to integers at this point in time.

Parameters: "sprite, property condition value"

The sprite parameter may be specified as "char" if the player's character is the desired target.

Example: spriteProperty,char,x>50

## inBox

Checks if the specified sprite is within certain bounds, as specified from a position and a size.

Parameters: "sprite, x, y, width, height"

The sprite parameter may be specified as "char" if the player's character is the desired target.

Example: inBox,char,20,20,50,50

## inBox2

Checks if the specified sprite is within certain bounds, as specified by two positions.

Parameters: "sprite, x1, y1, x2, y2"

The sprite parameter may be specified as "char" if the player's character is the desired target.

Example: inBox2,char,20,20,70,70

This example has the same function as the [inBox](#inbox) example, but done by manually specifying the second X and Y coordinates instead of having them calculated from the width and height.

## gameState

Checks if the game state meets a certain condition. Can check the conditions >, <, !=, and =.

Parameters: "state condition value"

Example: gameState,doorOpened=true

## nudge

Check if the player is nudging the game forwards (space or mouse).

Parameters: none

Example: nudge

## noActions

Check if there are no pending or active actions in the queue

Parameters: none

Example: noActions

## withinRange

Check if two sprites are near eachother.

Parameters: "sprite, sprite, distance"

Sprites may also be "char" for the player character. Distance is defined in pixels.

Example: withinRange,char,animToggle,10

The above example checks if the player character is within 10 pixels of a sprite named "animToggle".

## time

Wait for the specified number of frames (at ~30 fps)

Parameters: "time"

Example: time,30

## played

Wait for the specified sprite's current animation to be done (including no more loops left).

Parameters: "sprite"

The sprite parameter may be specified as "char" if the player's character is the desired target.

Example: played,sweetSprite
