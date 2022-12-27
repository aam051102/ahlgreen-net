{{HEAD}}
title=Openbound - Text Colours
description=An in-depth tutorial of the Openbound game engine, Sburb. This section covers customizing text colours.

{{BODY}}

# Openbound - Text Colours

This article covers modifying the existing text colours used in dialogs or adding new ones, to match any new characters. This is not a particularly complicated process, but it does require modifying a file in the `src` directory, which contains the engine source code. Please be careful when modifying these files.

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
    -   [Triggers](/openbound-triggers)
    -   [Paths](/openbound-paths)
    -   [Templates](/openbound-templates)
    -   [Game State](/openbound-gamestate)
-   [Good practice](/openbound-good-practice)
-   [Advanced](/openbound-advanced)
    -   [**Text colours**](/openbound-text-colours)
-   [Production](/openbound-production)
    -   [Build](/openbound-build)
    -   [Release](openbound-release)

## The colour section

To begin adding, removing or modifying colours, open the `FontEngine.js` file in the `src` directory. Now go to line 55. You are looking for a line containing the text `Sburb.FontEngine.prototype.prefixColours = {`.

Now, within the `{` and `}`, you can see a list of names with attached colours.
The first defined colour is for `aa` and looks like so:

```javascript
Sburb.FontEngine.prototype.prefixColours = {
    aa: "#a10000",
    ...
};
```

The name to the left of the `:`, which here is `aa`, is the name which can be used when writing dialog to define the colour of the text.

The `#a10000` is the hexadecimal colour code for Aradia's colour. That sounds a bit complicated, but it's just another way to write the red, green, and blue values for the maroon colour that Aradia speaks in. There are plenty of free "RGB to HEX" converters and colour pickers online, if you need to turn your specific colour into hexadecimal. Most art programs can also represent colour in HEX in their colour picker. Note that the `#` at the beginning is necessary.

If you have the sample open, you may notice that there is a following definition for `aradia`, which is set to the exact same colour. This is simply so that, when writing dialogue, the writer can use either `aa` or `aradia` as the name, depending on the situation. They may use `aa` for chats and `aradia` when Aradia is actually present in person.

## Adding a colour

Adding a new colour definition is relatively simple.
Below is an example of adding `equius`'s colour definition of `#000056`.

Before:

```javascript
Sburb.FontEngine.prototype.prefixColours = {
    aa: "#a10000",
    ac: "#416600",
};
```

After:

```javascript
Sburb.FontEngine.prototype.prefixColours = {
    aa: "#a10000",
    equius: "#000056",
    ac: "#416600",
};
```

NOTE: There **must** be a comma after every colour definition, though it is not required after the very last one.

## Removing a colour

There is little need to remove colours, but if you do need to, you can simply remove the pairing of name to colour.
Below is an example of the before and after of removing the colour definition for `aradia`.

Before:

```javascript
Sburb.FontEngine.prototype.prefixColours = {
    aa: "#a10000",
    aradia: "#a10000",
    ac: "#416600",
};
```

After:

```javascript
Sburb.FontEngine.prototype.prefixColours = {
    aa: "#a10000",
    ac: "#416600",
};
```

Note that the comma at the end of `aradia: "#a10000",` was also removed.
