{{HEAD}}
title=Openbound - Good practice
description=An in-depth tutorial of the Openbound game engine, Sburb. This section covers good practice.

{{BODY}}

# Openbound - Good practice

This article focuses on good practice. In other words, my recommendations for keeping your project easily logically structured and understandable by anyone who might look at it.

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
    -   [Game State](./openbound-gamestate)
-   [**Good practice**](./openbound-good-practice)
-   [Advanced](./openbound-advanced)
    -   [Text colours](./openbound-text-colours)
-   [Production](./openbound-production)
    -   [Build](./openbound-build)
    -   [Release](openbound-release)

## File structure

The Sburb engine sample comes with the recommended structure, which looks like so:

-   levels
    -   [PROJECT]
        -   chars
        -   etc
        -   rooms
    -   init.xml
-   resources
    -   [PROJECT]
        -   audio
        -   backgrounds
        -   chars
        -   dialogs
        -   fonts
        -   interface
        -   objects

Note, again, that `[PROJECT]` is the name of the project. In the sample project, it is `sample`.

## Assets

Keep all graphics asset at twice the size of their original pixel art size. I recommend creating new assets at the original scale and then doubling them. This is to avoid accidental subpixeling on your sprites, which is not in line with the Openbound art style.

For audio assets, use MP3 with an optional fallback of OGG/OGA if you target old browsers.

## Naming

When naming anything, use camel case. Camel case is essentially joining the words in a name together and changing the first letter after the space to be uppercase, keeping all other letters lowercase. Examples might be `this is a sentence` to `thisIsASentence` or `First Room` to `firstRoom`.
