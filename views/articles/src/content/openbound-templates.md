{{HEAD}}
title=Openbound - Templates
description=An in-depth tutorial of the Openbound game engine, Sburb. This section covers templates.

{{BODY}}

# Openbound - Templates

Templates in the Openbound game engine are a simple way to predefine commonly used elements. This can be anything from character definitions to actions.

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
    -   [**Templates**](./openbound-templates)
    -   [Game State](./openbound-gamestate)
-   [Good practice](./openbound-good-practice)
-   [Advanced](./openbound-advanced)
    -   [Text colours](./openbound-text-colours)
-   [Production](./openbound-production)
    -   [Build](./openbound-build)
    -   [Release](openbound-release)

## Structure

The template section can be used in any document. However, most definitions are commonly separated as a `standardTemplates.xml` file in `levels/[PROJECT]/etc`, though the name can vary. It looks like so:

```xml
<sburb description='Standard Template Resources'>
    <classes>
        ...
    </classes>
</sburb>
```

## Defining templates

Defining a new template, or "class", is quite easy. You simply define the element with its attributes and children, and then add one attribute called `class`, which you use to define the name of the template.
It looks like so:

```xml
<sburb description='Standard Template Resources'>
    <classes>
        <sprite class='chest1' width='40' height='15' depthing='1' collidable='true'>
            <animation name='closed' sheet='chest1ClosedSheet' x='-48' y='-40' />
            <animation name='open' sheet='chest1OpenSheet' x='-48' y='-40' loopNum='0' followUp='opened'/>
            <animation name='opened' sheet='chest1OpenSheet' x='-48' y='-40' loopNum='0'/>
		</sprite>
    </classes>
</sburb>
```

Here, the name is `chest1` and it refers to a sprite with some animations. The function is not important right now. Fo reference, it is just a basic chest with no interaction.

## Using templates

Using a template is just as simple. All you need to do is define the same element (in the above example, `<sprite>`), with the same `class` attribute (in the above example, `chest1`).

Below is an example of how to use a template. Assume that everything has already been defined, even if it is not shown.

```xml
<sburb description='first room'>
    <rooms>
        <room>
            <sprite class='chest1' name='chest1' x='166' y='498'>
                <action command='openChest' name='Open.'>
                    <args>
                        chest1,item1, @! You got a CAN OF TAB!
                    </args>
                </action>
            </sprite>
        </room>
    </rooms>
</sburb>
```

This may seem a rather complex example, but it shows all of the functions of templates quite clearly. Below is how the engine interprets the above example.

```xml
<sburb description='first room'>
    <rooms>
        <room>
            <sprite width='40' height='15' depthing='1' collidable='true' class='chest1' name='chest1' x='166' y='498'>
                <action command='openChest' name='Open.'>
                    <args>
                        chest1,item1, @! You got a CAN OF TAB!
                    </args>
                </action>

                <animation name='closed' sheet='chest1ClosedSheet' x='-48' y='-40' />
                <animation name='open' sheet='chest1OpenSheet' x='-48' y='-40' loopNum='0' followUp='opened'/>
                <animation name='opened' sheet='chest1OpenSheet' x='-48' y='-40' loopNum='0'/>
            </sprite>
        </room>
    </rooms>
</sburb>
```

In the eyes of the engine, the attributes from the template definition are simply copied onto the usage. The children, too, are copied.

You may notice that the `class` attribute does not appear twice, despite being defined in both the template definition and the usage. Though the values here are the same, the value on the usage technically overrides the value on the template definition. This applies to any attribute. If `x` had already been set on the template definition, for example, it would be overwritten by the `x='166'` from the usage.
