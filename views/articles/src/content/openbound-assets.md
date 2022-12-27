{{HEAD}}
title=Openbound - Assets
description=An in-depth tutorial of the Openbound game engine, Sburb. This section covers assets.

{{BODY}}

# Openbound - Assets

This article focuses on the creation of assets in the Sburb game engine.

## Table Of Contents

-   [Overview](./openbound-overview)
-   [Basics](./openbound-basics)
    -   [**Assets**](./openbound-assets)
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

Asset sections can exist in any file and several different asset types exist. Most of the assets you will have to add yourself, will be for rooms and characters, as the sample predefines common assets for the dialogue system and UI.

## File

The general structure for an asset section is as follows:

```xml
<assets>
  <asset ...>...</asset>
  ...
  <asset ...>...</asset>
</assets>
```

## Asset outline

The `<assets>` element can contain any amount of `<asset>` tags within. Assets do nothing on their own, and must be used by an `<animation>` or other elements to be visible. Thus, best practice is for the asset to be placed in the same file as the code that uses it.

There are several different types of assets, as seen in the example below:

```xml
<assets>
  <asset name='chest1ClosedSheet' type='graphic'>objects/chests/chest1.png</asset>
  <asset name='openSound' type='audio'>audio/sfx/Open1.oga;audio/sfx/Open1.mp3</asset>
</assets>
```

Let us start by focusing on the `<asset>` tag and its attributes.

## Attributes

### name

The `name` attribute determines the name used by other elements to refer to the asset.

### type

The `type` attribute defines the type of asset. It takes one of a few keywords, all of which are listed below.

#### graphic

An image of some form. Used for anything from the background to the character sprites.

```xml
<asset name='chest1ClosedSheet' type='graphic'>objects/chests/chest1.png</asset>
```

#### audio

A sound of some sort. Also used for background music.
The official documentation recommends having two sources; one for the OGG/OGA format and one for the MP3 format. This probably isn't necessary anymore, as nearly all browsers support MP3, so unless you're targeting older browsers, a single MP3 source should do.

```xml
<asset name='openSound' type='audio'>audio/sfx/Open1.oga;audio/sfx/Open1.mp3</asset>
```

#### movie

A flash movie (an SWF file). Flash is unsupported in modern browsers, so this is not particularly useful until a complete Flash emulator is released. Projects like Ruffle may or may not be able to run the movies properly.

```xml
<asset name='startMovie' type='movie'>cutscenes/intro.swf</asset>
```

#### path

A [path](./openbound-paths). It is a semicolon-separated list of X and Y coordinates. The X and Y coordinates are separated by a command, such that the structure is `x1,y1;x2,y2...`.

The below example constructs a path along the following coordinates:

-   X=888, Y=621
-   X=1101, Y=456
-   X=1101, Y=507
-   X=597, Y=675

```xml
<asset name='firstRoomStairs1' type='path'>888,621;1101,456;1101,507;897,675</asset>
```

#### font

A font definition. Only ever used once and the name MUST be `SburbFont`, as it is the keyword, which describes the main font to use in the program. Defining more than one is useless unless you modify the source code.

The font definition is included in the sample, so you need not add it yourself.

```xml
<asset name='SburbFont' type='font'>
  local:Courier New Bold,
  local:Courier New,
  url: fonts/cour.woff,
  url: fonts/cour.ttf,
  weight:bold
</asset>
```

#### text

A piece of text. This is undocumented and unused in all known official documents and I only discovered it by reading the code. Because this is so, I will also provide an example of usage below the definition here.

```xml
<asset name='meenahKarkatTalk1' type='text'>
  @meenah_talk Hey what're you doing in my sample.
  @meenah_angrytalk This is my sample I swear to god I will fight you. Get out. Get ouuuuuut.
  @karkat_talk what
  @meenah_annoyed ouuuuuuut
</asset>
```

```xml
<action command="talk">
  <args body="meenahKarkatTalk1"></args>
</action>
```
