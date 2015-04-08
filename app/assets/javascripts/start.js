$(function() {
    startMusic();
    addKeyEventListeners();
});

function startMusic() {
    setTimeout(function() { $("#music").trigger("play"); }, 500);
}

function stopMusic() {
    $("#music").animate( { volume: 0 }, 3000);
}

function addKeyEventListeners() {
    addEventListener(
        "keydown",
        function(e) {
            if (e.keyCode == 83) {
                stopMusic();
                createGame();
            }
            else if (e.keyCode == 37) {
                e.preventDefault();
                updateGame("?act=move&dir=left");
            }
            else if (e.keyCode == 39) {
                e.preventDefault();
                updateGame("?act=move&dir=right");
            }
            else if (e.keyCode == 38) {
                e.preventDefault();
                updateGame("?act=move&dir=up");
            }
            else if (e.keyCode == 40) {
                e.preventDefault();
                updateGame("?act=move&dir=down");
            }
        });
}

function createGame() {
    $.post( "/api/game/", function(data) {
        $("div#menu").hide();
        $("div#game").css("display", "table");
        renderDungeon(data.dungeon);
        renderCharacters(data.characters);
    });
}

function updateGame(action) {
    $.ajax({
        url: "/api/game/" + getCookie("game_id") + action,
        type: "PUT",
        success: function(data) {
            renderDungeon(data.dungeon);
            renderCharacters(data.characters);
        }
    });
}

function renderDungeon(dungeon) {
    $("div#dungeon").empty();
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

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');

    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) === 0) return c.substring(name.length,c.length);
    }

    return "";
}
