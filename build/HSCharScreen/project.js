window.addEventListener(
    "DOMContentLoaded",
    function () {
        ///---CANVAS---///
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "black";
        ctx.font = "bold 14px courier";
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;

        ///----PARAMEER SEGMENT---///
        var rawParams;
        if (location.href.indexOf("#") != -1) {
            rawParams = location.href.slice(0, location.href.indexOf("#"));
        } else {
            rawParams = location.href;
        }
        if (rawParams.indexOf("?") != -1) {
            rawParams = rawParams.slice(rawParams.indexOf("?") + 1).split("&");
        } else {
            rawParams = [];
        }
        var params = {};
        for (var i = 0; i < rawParams.length; i++) {
            try {
                var p = rawParams[i].split("=");
                params[p[0]] = decodeURIComponent(p[1]);
            } catch (err) {}
        }

        ///---VARIABLES---///
        //--MOUSE--//
        var mouseX = 0;
        var mouseY = 0;

        //--SPRITES--//
        var sprites = [];
        var readySprites = [];
        var allSpritesReady = false;
        var currentSprite = 0;

        var spriteAdd = 4;

        //--TEXT--//
        var textIndex = 0;
        var textWait = 0;

        //--CHARACTERS--//
        var characters = [[]];
        if (params.char1A != undefined) {
            characters[0] = [];
            spriteAdd++;
            characters[0][0] = spriteAdd;
            if (params.char1E == "true") characters[0][1] = 1;
            else characters[0][1] = 0;
            if (params.char1B != undefined) {
                spriteAdd++;
                characters[0][2] = spriteAdd;
            } else characters[0][2] = -1;
        }

        if (params.char2A != undefined) {
            characters[1] = [];
            spriteAdd++;
            characters[1][0] = spriteAdd;
            if (params.char2E == "true") characters[1][1] = 1;
            else characters[1][1] = 0;
            if (params.char2B != undefined) {
                spriteAdd++;
                characters[1][2] = spriteAdd;
            } else characters[1][2] = -1;
        }

        if (params.char3A != undefined) {
            characters[2] = [];
            spriteAdd++;
            characters[2][0] = spriteAdd;
            if (params.char3E == "true") characters[2][1] = 1;
            else characters[2][1] = 0;
            if (params.char3B != undefined) {
                spriteAdd++;
                characters[2][2] = spriteAdd;
            } else characters[2][2] = -1;
        }

        if (params.char4A != undefined) {
            characters[3] = [];
            spriteAdd++;
            characters[3][0] = spriteAdd;
            if (params.char4E == "true") characters[3][1] = 1;
            else characters[3][1] = 0;
            if (params.char4B != undefined) {
                spriteAdd++;
                characters[3][2] = spriteAdd;
            } else characters[3][2] = -1;
        }
        /////     [CHARACTER 1, CHARACTER 2, CHARACTER 3, etc.] - [SPRITE NUMBER, USABLE, BACKGROUND NUMBER]     /////

        var characterLinks = [];
        if (params.char1C != undefined) {
            characterLinks[0] = params.char1C;
        }
        if (params.char2C != undefined) {
            characterLinks[1] = params.char2C;
        }
        if (params.char3C != undefined) {
            characterLinks[2] = params.char3C;
        }
        if (params.char4C != undefined) {
            characterLinks[3] = params.char4C;
        }

        //--HOVERING--//
        var hoverIndex = -1;
        var hovering = false;

        //--SELECTION BEGIN--//
        var charY = 898;
        var charYChange = true;

        var panelSize = 0;
        var panelSizeChange = true;

        //--PANELS DONE--//
        var panelUnfinishedY = 0;
        var panelWait = 3;
        var panelsDone = [];
        if (params.char1F == "true") panelsDone[0] = 1;
        else panelsDone[0] = 0;
        if (params.char2F == "true") panelsDone[1] = 1;
        else panelsDone[1] = 0;
        if (params.char3F == "true") panelsDone[2] = 1;
        else panelsDone[2] = 0;
        if (params.char4F == "true") panelsDone[3] = 1;
        else panelsDone[3] = 0;

        ///---ART LOADING---///
        //--MAIN PARTS--//
        loadArt("assets/Main.png");
        loadArt("assets/CharBack.png");
        loadArt("assets/CharTop.png");
        loadArt("assets/MainTop.png");
        loadArt("assets/PanelsNotDone.png");

        //--AUTO LOAD--//
        if (params.char1A != undefined) loadArt(params.char1A);
        if (params.char1B != undefined) loadArt(params.char1B);

        if (params.char2A != undefined) loadArt(params.char2A);
        if (params.char2B != undefined) loadArt(params.char2B);

        if (params.char3A != undefined) loadArt(params.char3A);
        if (params.char3B != undefined) loadArt(params.char3B);

        if (params.char4A != undefined) loadArt(params.char4A);
        if (params.char4B != undefined) loadArt(params.char4B);

        //--CHARACTERS--//

        ///---REGIONS---///
        if (characters.length == 2) {
            var pointerRegions = [171, 326];
        }
        if (characters.length == 3) {
            var pointerRegions = [96, 251, 406];
        }
        if (characters.length == 4) {
            var pointerRegions = [16, 171, 326, 481];
        }

        ///---LOOP---///
        var loop = setInterval(update, 1000 / 50);

        function update() {
            if (allSpritesReady) {
                ctx.fillRect(0, 0, 650, 450);

                ///---MAIN AREA START---///

                //--PANEL--//
                if (panelSize == 0) {
                    ctx.drawImage(sprites[0], 3, 3, 0, 0);
                } else if (panelSize == 1) {
                    ctx.drawImage(
                        sprites[0],
                        3 + sprites[0].width / 4,
                        3 + sprites[0].height / 4,
                        sprites[0].width / 2,
                        sprites[0].height / 2
                    );
                } else if (panelSize == 2) {
                    ctx.drawImage(
                        sprites[0],
                        3 - sprites[0].width * 0.07,
                        3 - sprites[0].height * 0.07,
                        sprites[0].width * 1.4,
                        sprites[0].height * 1.4
                    );
                } else if (panelSize == 3) {
                    ctx.drawImage(sprites[0], 3, 3);
                }

                //--BACKGROUND--//
                if (hoverIndex != -1 && characters[hoverIndex][2] != -1) {
                    if (panelsDone[hoverIndex] == true) {
                        ctx.drawImage(
                            sprites[characters[hoverIndex][2]],
                            8,
                            70
                        );
                    }
                }

                //--TOP--//
                if (panelSize == 3) {
                    ctx.drawImage(sprites[3], 7, 69);
                }

                //--CHARACTER--//
                canvas.style.cursor = "default";
                hoverIndex = -1;
                hovering = false;

                for (var i = 0; i < pointerRegions.length; i++) {
                    ctx.drawImage(sprites[1], pointerRegions[i], 78 + charY);
                    ctx.drawImage(
                        sprites[characters[i][0]],
                        pointerRegions[i],
                        78 + charY
                    );

                    if (
                        !hovering &&
                        mouseY >= 78 &&
                        mouseY <= 226 &&
                        mouseX >= pointerRegions[i] &&
                        mouseX <= pointerRegions[i] + 148
                    ) {
                        canvas.style.cursor = "pointer";
                        hoverIndex = i;
                        hovering = true;
                        if (hoverIndex == i)
                            ctx.drawImage(
                                sprites[2],
                                pointerRegions[i],
                                78 + charY
                            );
                    }
                }

                ///---MAIN AREA END---///

                //--FLY-IN CALCULATIONS--//
                if (panelSize < 3 && panelSizeChange == true) {
                    panelSize += 1;
                } else {
                    panelSize = 3;
                    panelSizeChange = false;
                }

                if (charY >= 0 && charYChange == true) {
                    charY -= 100;
                } else {
                    charY = 0;
                    charYChange = false;
                }

                //--CHARACTER SELECTION TEXT--//
                if (textIndex == 0) {
                    ctx.fillStyle = "rgb(255, 10, 0)";
                } else {
                    ctx.fillStyle = "rgb(255, 205, 0)";
                }
                ctx.fillText("CHOOSE YOUR CHARACTER!", 241, 15);

                //--PANELS DONE--//
                for (var n = 0; n < characters.length; n++) {
                    if (hoverIndex == n && panelsDone[n] == false) {
                        ctx.fillText("PANELS AREN'T DONE YET!", 241, 280);
                        ctx.drawImage(
                            sprites[4],
                            15,
                            455 - sprites[4].height + panelUnfinishedY
                        );
                    }
                }

                if (panelUnfinishedY >= 2) {
                    panelUnfinishedY = 0;
                } else {
                    if (panelWait == 0) {
                        panelUnfinishedY += 2;
                        panelWait = 3;
                    } else {
                        panelWait--;
                    }
                }

                if (textWait > 0) {
                    textWait--;
                } else {
                    textWait = Math.floor(Math.random() * 3);
                    textIndex = !textIndex;
                }

                ctx.fillStyle = "black";
            } else {
                allSpritesReady = true;

                for (var n = 0; n < sprites.length; n++) {
                    if (readySprites[n] == false) {
                        allSpritesReady = false;
                        break;
                    }
                }
            }
        }

        //--ART LOADING FUNCTIONS--//
        function loadArt(path) {
            sprites[currentSprite] = new Image();
            readySprites[currentSprite] = false;
            sprites[currentSprite].src = path;

            sprites[currentSprite].onload = function () {
                readySprites[sprites.indexOf(this)] = true;
            };

            currentSprite++;
        }

        function loadArt2(path) {
            sprites[currentSprite] = new Image();
            readySprites[currentSprite] = false;
            sprites[currentSprite].src = path;

            sprites[currentSprite].onload = function () {
                readySprites[sprites.indexOf(this)] = true;
            };

            currentSprite++;
        }

        function loadGif(path, frames, filetype) {
            for (var n = 0; n < frames; n++) {
                loadArt2(path + "/" + n + filetype);
            }
        }

        ///---MOUSE FUNCTIONS---///
        canvas.addEventListener(
            "mousedown",
            function () {
                //--CHARACTER SELECTIONS--//
                if (
                    hoverIndex != -1 &&
                    characters[hoverIndex][1] == 1 &&
                    panelsDone[hoverIndex] == true
                ) {
                    window.top.location = characterLinks[hoverIndex];
                }
            },
            false
        );

        canvas.addEventListener(
            "mousemove",
            function (e) {
                //--MOUSE POSITIONS--//
                var rect = canvas.getBoundingClientRect();
                mouseX = e.clientX - rect.left;
                mouseY = e.clientY - rect.top;
            },
            false
        );
    },
    false
);
