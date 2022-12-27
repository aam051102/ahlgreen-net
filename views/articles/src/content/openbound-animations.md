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

Animations are widely used, though mainly in sprite definitions, like so:

```xml
<sprite name='eightBalls' x='906' y='3314'>
    <animation sheet='eightBallsSheet' />
</sprite>
```
