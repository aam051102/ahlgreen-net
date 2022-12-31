{{HEAD}}
title=Openbound - Effects
description=An in-depth tutorial for the Openbound game engine. This section covers effects.

{{BODY}}

# Openbound - Effects

Effects are simple animations, unassociated with any `<sprite>`.

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
    -   [**Effects**](./openbound-effects)
-   [Good practice](./openbound-good-practice)
-   [Advanced](./openbound-advanced)
    -   [Text colours](./openbound-text-colours)
-   [Production](./openbound-production)
    -   [Build](./openbound-build)
    -   [Release](openbound-release)

## Structure

The `<effects>` section is simply defined as such:

```xml
<sburb description='first room'>
    <effects>
        ...
    </effects>
</sburb>
```

When defining an effect, you need only define it the way that you would any other animation:

```xml
<sburb description='first room'>
    <effects>
  		<animation name='teleportEffect' x='-66' y='-110' sheet='teleportSheet' colSize='132' rowSize='165' length='6' frameInterval='2' loopNum='0'/>
	</effects>
</sburb>
```

The `name` attribute is used to refer back to the effect when using it. To use an effect, simply execute the [playEffect](./openbound-actions#playeffect) command in an action.
