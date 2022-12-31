{{HEAD}}
title=Openbound - Build
description=An in-depth tutorial for building a completed Openbound walkaround.

{{BODY}}

# Openbound - Build

This section covers building your complete Openbound game into a production version. This helps decrease download size, which is important when working on the web. Building isn't required, and this section is quite complicated, so if you can't figure it out, go on to the [release](./openbound-release) section.

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
    -   [Effects](./openbound-effects)
-   [Good practice](./openbound-good-practice)
-   [Advanced](./openbound-advanced)
    -   [Text colours](./openbound-text-colours)
-   [Production](./openbound-production)
    -   [**Build**](./openbound-build)
    -   [Release](openbound-release)

## Linux

This section covers building on Linux. I don't own a Linux machine, so I can't give you exact details, unfortunately. The sample project contains a `production.sh` file, which can be executed in the Linux command prompt. If you get errors regarding ZIP, you may be able to install that using the Linux package system. If you get errors regarding JSMin, you may be able have to download it manually. See [JSMin](#jsmin) section.

Anyway, if any of that works, you should have a `Sburb.zip` in your project root and you can continue to the [release](./openbound-release) section.

## Windows

Building on Windows is a mess, requiring a DLL, two executables and, since I don't want to go through a bunch of other steps, a batch file.

I have rewritten `production.sh` to batch and it can be found [here](./downloads/production.bat). Generally speaking, you should not execute these kinds of scripts on your computer without knowing what they do. I wrote this script myself, so I can assure you of its safety, but that only works if you trust my word on it. Otherwise, ignore all of this and continue to [release](./openbound-release).

Now download the JSMin executable from the [JSMin](#jsmin) section.

Now, I am about to ask you to download a DLL, which you should **never ever** do, so if you don't feel comfortable doing it, please just ignore all of this building and proceed to the [release](./openbound-release) section.

If you're still here, download the [bzip2 DLL](./downloads/bzip2.dll). I am hosting it manually since there are probably a lot of malicious versions out there.

Next, you'll want to download [zip.exe](./downloads/zip.exe), which I also self-hosting.

Place both `bzip2.dll` and `zip.exe` in the root of your project. Now, you must open the command prompt. Again, don't do anything in the command prompt unless you really trust it. To open the command prompt in your project folder, you can simply use the File Explorer to go to your project root, click the path bar at the top, delete everything, type `cmd` and press enter. Now you should have a command prompt. Type `production.bat` and press enter. if you've placed all the files correctly, it should process for a moment before creating a file called `Sburb.zip` in your project root.

If it did this and did not give you any errors in the command prompt, you have successfully built your project. Congratulations! That sucked!

Now, on to [release](./openbound-release).

## macOS

I don't own an Mac products and I have no idea how to build on it. If you know, feel free to inform me and I will update this. Just go on to [release](./openbound-release), I suppose.

## JSMin

This section is on where to find JSMIN.exe, if you get errors on the one in your project. It can be found [here](https://github.com/douglascrockford/JSMin/raw/master/jsmin.exe). The file needs to be placed in the root of your project, where `index.html` is.

[Here](./downloads/jsmin.exe) is a self-hosted version, in case the one on GitHub is removed.
