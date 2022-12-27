{{HEAD}}
title=Openbound - Dialog
description=An in-depth tutorial of the Openbound game engine, Sburb. This section covers dialog.

{{BODY}}

# Openbound - Dialog

This articles covers dialog creation and syntax. It does not, however, cover customizing the `<dialoger>` element, with the exception of one attribute.

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
    -   [**Dialog**](./openbound-dialog)
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

## The dialoger element

The `<dialoger>` element is predefined in `levels/[PROJECT]/etc/ui.xml` in the sample, and changing it is not recommmended, unless you know what you're doing. There is one attribute worth noting, however. By default, the `type` attribute is not defined. It therefore defaults to `standard`. However, it has one other value, which is `social`. The `social` dialoger type includes the tagging system and icons below the standard dialog box.

Unfortunately, the default sample does not include the necessary files or asset definitions for the `social` type.

At the bottom of this article is all of the necessary content for the `social` type.

## Structure

Dialog is essentially always seen within actions with the `talk` command like so:

```xml
<action command="talk" name="Talk.">
    <args>
    @meenah_talk Hey what're you doing in my sample.
  	@meenah_angrytalk This is my sample I swear to god I will fight you. Get out. Get ouuuuuut.
  	@karkat_talk what
  	@meenah_annoyed ouuuuuuut
    </args>
</action>
```

It may be a good idea to keep really long dialogue parts separate from the room definitions to avoid getting overly long files.

## Writing dialogue

Writing dialogue is extremely simple. You simply start your line with `@`, followed by the name of the character sprite. You then add a space and begin writing the actual text.

For example:

```xml
<action command="talk" name="Talk.">
    <args>
    @meenah_talk Hey what're you doing in my sample.
    </args>
</action>
```

Notice the `@` at the beginning, followed by `meenah_talk`, which is the name of the dialog sprite. Then there's a space and then the actual line of text spoken by the character: `Hey what're you doing in my sample.`. Now, you might be wondering where the text colour comes from. Well, that has to do with the `meenah_talk`.

You see, dialog sprites are one of the only assets where the name must follow a specific pattern to work. The pattern must be `[CHARACTER]_[WHATEVER]`. Technically speaking, `[CHARACTER]`, here, is a keyword. For some reason, the Openbound developers decided to predefine all the character names and their colours in the source code. To change them, see the [text colours](./openbound-text-colours) section.

[Here](#predefined-colours) is a list of the predefined colours.

### Narrator

For narrator dialogue, you can simply use `!` instead of the dialog sprite name. Like so:

```xml
<action command='talk' name='Talk.'>
    <args>
    @! You discovered an easter egg! It's easily the most boring thing you've seen all day.
    </args>
</action>
```

## Formatting

The dialog system has a few different formatting options.

### Underlining

If you want to underline a piece of text in the dialog, simply place an underscore on either side. Like so:

```xml
<action command='talk' name='Talk.'>
    <args>
    @! This text is _underlined_.
    </args>
</action>
```

## Changing colour

If you want to change the colour of a piece of text in the dialog, you simply define the hexadecimal colour directly inline.
The colour change can be ended with ##.

Like so:

```xml
<action command='talk' name='Talk.'>
    <args>
    @! If I were Meenah, I would say#77003c "this is glubbing stupid"##.
    </args>
</action>
```

## Image content

If you want to use an image as content in the dialog box, you can append `~[ASSET NAME]` after the dialog sprite name.
Note that this MUST be before tagging.

Example:

```xml
<action command='talk' name='Talk.'>
    <args>
    @kankri_talk~dialogimg_kankri
    </args>
</action>
```

## Different box

If you want to change the dialog box image, you can append `%[ASSET NAME]` after the dialog sprite name. This is used in e-bubbles to get them to look like Twitter.
Note that this MUST be before tagging.

Example:

```xml
<action command='talk' name='Talk.'>
    <args>
    @dave_idle%alttextbox_twitter DAVE/_EBUBBLES: you should probably brush up on your data structures
    </args>
</action>
```

## Tagging

NOTE: Tagging is only available with the `social` type dialoger.

Tagging is pretty simple. After defining your dialog sprite, you add a `:` and begin writing tags, with each tag starting with a hashtags. When you're done writing tags and want to start writing the actual dialogue, you add a space.

It looks like so:

```xml
<action command='talk' name='Talk.'>
    <args>
        @kanaya_smirktalk:#-#-#-#-#Additional-Bashfully-Blank-Hash-Tags KANAYA: Maybe
    </args>
</action>
```

Now, that is understandably hard to look at. You may notice that where spaces would have been in the tags, there are, instead, dashes (`-`). The dashes are replaced with spaces by the engine, so it would end up looking like this:

`# # # # #Additional Bashfully Blank Hash Tags`

Don't forget that adding an actual space indicates the start of the dialogue.

## Predefined colours

-   aa: "#a10000"
-   aradia: "#a10000"
-   ac: "#416600"
-   nepeta: "#416600"
-   ag: "#005682"
-   vriska: "#005682"
-   at: "#a15000"
-   tavros: "#a15000"
-   ca: "#6a006a"
-   eridan: "#6a006a"
-   cc: "#77003c"
-   feferi: "#77003c"
-   cg: "#626262"
-   karkat: "#626262"
-   ct: "#000056"
-   equius: "#000056"
-   ga: "#008141"
-   kanaya: "#008141"
-   gc: "#008282"
-   terezi: "#008282"
-   ta: "#a1a100"
-   sollux: "#a1a100"
-   tc: "#2b0057"
-   gamzee: "#2b0057"
-   dave: "#e00707"
-   meenah: "#77003c"
-   rose: "#b536da"
-   aranea: "#005682"
-   kankri: "#ff0000",
-   porrim: "#008141"
-   latula: "#008282"

## The social type

For your convenience, the following is the necessary asset definitions for the `social` type. You should place them in `ui.xml`'s `<assets>` element.

```xml
<asset name='hashTagBarSheet' type='graphic'>interface/hashtagbar.png</asset>
<asset name='heartButtonSheet' type='graphic'>interface/icons_heart.png</asset>
<asset name='spadeButtonSheet' type='graphic'>interface/icons_spade.png</asset>
<asset name='bubbleButtonSheet' type='graphic'>interface/icons_bub.png</asset>
```

For your convenience, the following in the necessary definitions for the `social` type. You should place them at the very bottom of `ui.xml`'s `<sburb>` element.

```xml
<sprite name='hashTagBar'>
	<animation sheet='hashTagBarSheet'/>
</sprite>
<spritebutton name='spadeButton' x='440' y='300' width='30' height='26' sheet='spadeButtonSheet'>
	<action command='setButtonState' silent='true'>heartButton,0</action>
</spritebutton>
<spritebutton name='heartButton' x='480' y='300' width='30' height='26' sheet='heartButtonSheet'>
	<action command='setButtonState' silent='true'>spadeButton,0</action>
</spritebutton>
<spritebutton name='bubbleButton' x='510' y='300' width='30' height='26' sheet='bubbleButtonSheet'>
	<action command='cancel' silent='true' soft='true'/>
</spritebutton>
```

[Here](./downloads/socialAssets.zip) is a ZIP of the necessary asset files. If you want the `social` type to function, you should place them inside of `resources/[PROJECT]/interface/`.

Don't forget to set the `type` attribute on the `<dialoger>` element to `social`, if you want the previously described functionality.
