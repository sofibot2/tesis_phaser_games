window.onload = function() {

    var config = {
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        parent: 'container',
        title: 'Puzzle',
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        scene: [
            MainMenu,

            GameMenu,

            GameSecondMenu,

            Instrucciones,

            Leon,

            Oso,

            Raton,

            Tortuga,

            Conejo,

            Perro,

            Buho,

            Tucan,

            EndGame,
        ],
        audio: {
            disableWebAudio: false,
        }
    };

    var game = new Phaser.Game(config);

};