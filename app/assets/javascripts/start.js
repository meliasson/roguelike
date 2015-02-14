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
        renderDungeon(data.dungeon);
    });
}

function renderDungeon(dungeon) {
    $("div#game").show();
    for (var i = 0; i < dungeon.length; i++) {
        for (var j = 0; j < dungeon[i].length; j++) {
            switch(dungeon[i][j]) {
            case 0:
                $("div#game").append('.')
            }
        }

        if (i + 1 < dungeon.length) {
            $("div#game").append('<br />');
        }
    }
}
