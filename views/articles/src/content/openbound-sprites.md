{{HEAD}}
title=Openbound - Sprites
description=An in-depth description of sprites in the Openbound game engine.

{{BODY}}

# Openbound - Sprites

A sprite is basically a visible and optionally collidable element.

## Table Of Contents

-   [Overview](./openbound-overview)
-   [Basics](./openbound-basics)
    -   [Assets](./openbound-assets)
    -   [Dependencies](./openbound-dependencies)
    -   [Rooms](./openbound-rooms)
    -   [**Sprites**](./openbound-sprites)
    -   [Animations](./openbound-animations)
    -   [Characters](./openbound-characters)
    -   [Actions](./openbound-actions)
    -   [Dialog](./openbound-dialog)
    -   [Dialog sprites](./openbound-dialog-sprites)
    -   [Triggers](./openbound-triggers)
    -   [Paths](./openbound-paths)
    -   [Templates](./openbound-templates)
    -   [Game State](./openbound-gamestate)
-   [Good practice](./openbound-good-practice)
-   [Advanced](./openbound-advanced)
    -   [Text colours](./openbound-text-colours)
-   [Production](./openbound-production)
    -   [Build](./openbound-build)
    -   [Release](openbound-release)

## Structure

Sprites can be found practically everywhere. Both inside and outside of rooms. A sprite can also have [animations](#animations) attached. They are one of the most usable elements, and look something like this:

```xml
<sprite name='eightBalls' x='906' y='3314'>
    <animation sheet='eightBallsSheet'/>
</sprite>
```

## Attributes

### name

The `name` attribute is just the name used to refer back to the sprite from other places in the code.

### x

`x` defines the X position in the room.

### y

`y` defines the Y position in the room.

### width

`width` defines the width of the collision box, if `collidable` is true.

### height

`height` defines the height of the collision box, if `collidable` is true.

### depthing

`depthing` is a number defining the depth of the sprite in the room.

`0` is the background.
`1` is the middle ground.
`2` is the foreground.

Sprites have a depth of `1` by default. This means that the player can walk both in front of them and behind them.

### collidable

`collidable` determines whether or not the sprite is collidable. A collision box is automatically selected based on the `width` and `height`.

### dx

`dx` is an offset added to `x` to determine the X position of the collision box. Defaults to 0.

### dy

`dy` is an offset added to `y` to determine the Y position of the collision box. Defaults to 0.

### state

`state` defines which `<animation>` should be applied to the sprite, if multiple are present. Defaults to the first one, if not defined.

## Actions

A sprite may have one or more actions as children. In this case, the actions should have names defined, so they can be distinguished in the "chooser" box.
Read more about actions in the [actions](/openbound-actions) section.

Example:

```xml
<sprite name='aradia' x='1650' y='1705' width='40' height='20' collidable='true'>
    <animation sheet='aradiaSheet' x='-40' y='-100'/>

    <action command='talk' name='Talk.'>
        @! Talky talky talk talk talk.
    </action>
</sprite>
```

## Animations

A sprite may have one or more animations as children. If there are more animations, the first is selected.
Read more about animations in the [animations](/openbound-animations) section.

Example:

```xml
<sprite name='chest1' x='50' y='50' width='40' height='15' depthing='1' collidable='true'>
    <animation name='closed' sheet='chest1ClosedSheet' x='-48' y='-40' />
    <animation name='open' sheet='chest1OpenSheet' x='-48' y='-40' loopNum='0' followUp='opened'/>
    <animation name='opened' sheet='chest1OpenSheet' x='-48' y='-40' loopNum='0'/>

    <action command='openChest' name='Open.'>
        <args>
            chest1,item1, @! You got a CAN OF TAB!
        </args>
    </action>
</sprite>
```

In the case of chests, such as this, the `openChest` command changes the animation used by the `chest1` sprite to use the `chest1OpenSheet` animation instead.
