$(function() {
    // startMusic();
    addKeyEventListeners();
});

function startMusic() {
    setTimeout(function() { $("#music").trigger("play"); }, 1000);
}

function stopMusic() {
    $("#music").animate( { volume: 0 }, 3000);
}

function addKeyEventListeners() {
    addEventListener(
        "keydown",
        function(e) {
            e.preventDefault();
            if (e.keyCode == 83) {
                stopMusic();
                createGame();
            }
            else if (e.keyCode == 37) {
                $.ajax({
                    url: "/api/game/1",
                    type: "PUT",
                    success: function(result) {
                        console.log("YEAH!");
                    }
                });
                console.log("Moving left!");
            }
            else if (e.keyCode == 39) {
                console.log("Moving right!");
            }
            else if (e.keyCode == 38) {
                console.log("Moving up!");
            }
            else if (e.keyCode == 40) {
                console.log("Moving down!");
            }
        });
}

function createGame() {
    $.post( "/api/game/", function(data) {
        $("div#menu").hide();
        renderDungeon(data.dungeon);
        renderCharacters(data.characters);
    });
}

function renderDungeon(dungeon) {
    $("div#game").css("display", "table");
    for (var i = 0; i < dungeon.length; i++) {
        $("div#dungeon").append("<div id='row" + i + "'>")
        for (var j = 0; j < dungeon[i].length; j++) {
            switch(dungeon[i][j]) {
            case 0:
                $("div#row" + i).append("<span id='cell" + i + j + "'>&nbsp;</span>");
                break;
            case 1:
                $("div#row" + i).append("<span id='cell" + i + j + "'>#</span>");
                break;
            case 2:
                $("div#row" + i).append("<span id='cell" + i + j + "'>.</span>");
                break;
            }
        }
    }
}

function renderCharacters(characters) {
    for (var i = 0; i < characters.length; i++) {
        $("span#cell" + characters[i].pos[0] + characters[i].pos[1]).text("@");
    }
}
