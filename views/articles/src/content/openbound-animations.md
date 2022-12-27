{{HEAD}}
title=Openbound - Animations
description=An in-depth description of animations in the Openbound game engine.

{{BODY}}

# Openbound - Animations

An animation is, despite the name, not exclusively animations. An animation is simply an image, which **can** have more than 1 frame, making it an animation.

## Table Of Contents

-   [Overview](./openbound-overview)
-   [Basics](./openbound-basics)
    -   [Assets](./openbound-assets)
    -   [Dependencies](./openbound-dependencies)
    -   [Rooms](./openbound-rooms)
    -   [Sprites](./openbound-sprites)
    -   [**Animations**](./openbound-animations)
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

Animations are widely used, though mainly in sprite definitions, like so:

```xml
<sprite name='eightBalls' x='906' y='3314'>
    <animation sheet='eightBallsSheet' />
</sprite>
```

## Attributes

### name

`name` is the name used to refer back to the animation from other places in the code. It is not required.

### sheet

`sheet` defines the graphic asset to use for the animation.

### x

`x` determines the relative X position of the animation. Optional.

### y

`y` determines the relative Y position of the animation. Optional.

### colSize

`colSize` determines the column size for each frame of the animation. Optional.

### rowSize

`rowSize` determines the row size for each frame of the animation. Optional.

### startPos

`startPos` determines the starting frame of the animation. Optional.

### length

`length` determines the amount of frames in the animation. Optional.

### frameInterval

`frameInterval` determines the amount of time between each frame. Optional.

### loopNum

`loopNum` determines the amount of times the animation should loop. `-1` for never. Optional.

### followUp

`followUp` the name of the animation which should play after the current one is completed. Optional.

### flipX

`flipX` is a boolean (true/false) value determining whether or not the animation (images) should be flipped. Optional.

### flipY

`flipX` is a boolean (true/false) value determining whether or not the animation (images) should be flipped. Optional.

### sliced

`sliced` is a boolean (true/false) value determining whether or not the animation should render a series of sliced images. Optional.

This is used for backgrounds and foregrounds to avoid rendering issues for massive images. When true, the engine will take the `sheet` attribute and append `_[COLUMN]_[ROW]` to find the asset for each of the slices for all rows and columns.

### numCols

`numCols` is the amount of columns in the animation. Optional. If not defined, defaults to image width divided by `colSize`.

### numRows

`numRows` is the amount of rows in the animation. Optional. If not defined, defaults to image height divided by `rowSize`.
