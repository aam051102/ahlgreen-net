{{HEAD}}
title=Openbound - Release
description=An in-depth tutorial for releasing a completed Openbound game.

{{BODY}}

# Openbound - Release

When you've completed your Openbound walkaround, you'll probably want to release it. Maybe you have an adventure on MSPFA and you want to embed your walkaround into it. Maybe you just want to let people play it.

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
    -   [**Release**](openbound-release)

## Uploading

If you want other people to see your walkaround, you'll want to upload it somewhere. Personally, I recommend [File Garden](https://filegarden.com/). It was created by the owner of MSPFA for the specific purpose of uploading raw files, making it ideal for content like Openbound walkarounds. If you have your own website, you can do it there, as well.

If you've built your project into production mode, you should have a ZIP file. In that case, you can simply extract the ZIP file somewhere on your computer and upload all of the files to a single directory on your host.

If you have not built your project into production mode, you will have to upload the following files and directories to a single directory on your host:

-   levels
-   resources
-   libs
-   src
-   index.html

## Embedding

To embed your newly uploaded Openbound walkaround in a website like MSPFA, you'll want to use an iframe. Websites other than MSPFA may not allow iframes or may have different website embedding options, which you'll have to figure out yourself.

If the website supports iframes (which MSPFA does), you can simply use the following code:

```html
<iframe style="border: 0;" src="[URL]" width="650" height="450"></iframe>
```

Replace `[URL]` with a direct link to your uploaded `index.html` file and you're good to go. The link you copy should ideally end with `.html`.

If you have any questions regarding either File Garden or MSPFA, please direct your attention to the [MSPFA Discord](https://discord.gg/EC5acgG), which will be happy to help.
