window.onload = function() {

    var config = {
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: '#fff',
        parent: 'container',
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        scene: [
            MainMenu,
            Level1,
            Instrucions,
            Game_Level1,
            WinScreen,
            Level2,
            Game_Level2,
            WinScreen2,
            Level3,
            Game_Level3,
            WinScreen3,
            Level4,
            Game_Level4,
            WinScreen4,
            Level5,
            Game_Level5,
            WinScreen5,
            Level6,
            Game_Level6,
            WinScreen6,
            Level7,
            Game_Level7,
            WinScreen7,
            EndGame
        ],
        audio: {
            disableWebAudio: true
        }
    };

    var game = new Phaser.Game(config);

};