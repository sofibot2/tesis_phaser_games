window.onload = function() {

    var config = {
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        // backgroundColor: '#fff',
        parent: 'container',
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        scene: [
            MainMenu,

            Level1,
            Instrucions_Level1,
            Game_Level1,

            Level2,
            Instrucions_Level2,
            Game_Level2,

            Level3,
            Instrucions_Level3,
            Game_Level3,

            Level4,
            Instrucions_Level4,
            Game_Level4,

            Level5,
            Instrucions_Level5,
            Game_Level5,

            EndGame,
            Instrucions_EndGame
        ],
        audio: {
            disableWebAudio: true
        }
    };

    var game = new Phaser.Game(config);

};