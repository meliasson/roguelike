$(function() {
    addKeyEventListeners();
});

function addKeyEventListeners() {
    addEventListener(
        "keydown",
        function(e) {
            if (e.keyCode == 83) {
                createGame();
            }
        });
};

function createGame() {
    $.post( "/api/game/", function(data) {
        $("div#menu").hide();
        renderDungeon(data.dungeon, data.characters);
    });
}

function renderDungeon(dungeon, characters) {
    console.log(characters)
    $("div#game").show();
    for (var i = 0; i < dungeon.length; i++) {
        $("div#game").append("<div id='row" + i + "'>")
        for (var j = 0; j < dungeon[i].length; j++) {
            switch(dungeon[i][j]) {
            case 0:
                $("div#row" + i).append("<span id='cell" + i + j + "'>.</span>")
            }
        }
    }

    for (var i = 0; i < characters.length; i++) {
        console.log(characters[i].pos);
        $("span#cell" + characters[i].pos[0] + characters[i].pos[1]).text("@")
    }
}
