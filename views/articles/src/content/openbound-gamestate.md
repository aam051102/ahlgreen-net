{{HEAD}}
title=Openbound - Game State
description=An in-depth tutorial of the Openbound game engine, Sburb. This section covers game state.

{{BODY}}

# Openbound - Game State

Game state in Openbound is basically attaching a value to a name. The value can be checked and changed at any time throughout the code, and persists throughout the entire game, regardless of rooms. They are commonly used instead of trigger [guards](./openbound-triggers#guards), as they are much faster and much simpler to understand.

## Table Of Contents

-   [Overview](./openbound-overview)
-   [Basics](./openbound-basics)
    -   [Assets](./openbound-assets)
    -   [Dependencies](./openbound-dependencies)
    -   [Rooms](./openbound-rooms)
    -   [Sprites](./openbound-sprites)
    -   [Characters](./openbound-characters)
    -   [Actions](./openbound-actions)
    -   [Dialog](./openbound-dialog)
    -   [Dialog sprites](./openbound-dialog-sprites)
    -   [Triggers](./openbound-triggers)
    -   [Paths](./openbound-paths)
    -   [Templates](./openbound-templates)
    -   [**Game State**](./openbound-gamestate)
-   [Good practice](./openbound-good-practice)
-   [Advanced](./openbound-advanced)
    -   [Text colours](./openbound-text-colours)
-   [Production](./openbound-production)
    -   [Build](./openbound-build)
    -   [Release](openbound-release)

## Setting state

Setting state is as simple as using the [setGameState](./openbound-actions#setgamestate) action.

```xml
<action command='setGameState'>
    <args>poniesAreBeautiful,true</args>
</action>
```

The above code sets the name `poniesAreBeautiful` to be `true`.

## Checking state

Using state is just as simple as setting it and can be done using the [gameState](./openbound-triggers#gamestate) trigger.

```xml
<trigger>
    <args>gameState,poniesAreBeautiful=true</args>
    <action command='setGameState'>
        <args>poniesAreBeautiful,false</args>
    </action>
</trigger>
```

This is a particularly useless trigger, which checks to see if `poniesAreBeautiful` is `true` and, if so, sets `poniesAreBeautiful` to `false`.
