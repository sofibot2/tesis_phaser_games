var EndGame = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function EndGame() {
        Phaser.Scene.call(this, { key: 'EndGame' });
    },

    create: function() {
        this.scene.start('Instrucions_EndGame');
    },

});

var Instrucions_EndGame = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Instrucions_EndGame() {
        Phaser.Scene.call(this, { key: 'Instrucions_EndGame' });
    },

    create: function() {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        // this.cameras.main.setBackgroundColor('#d7bde2');

        var background_instructions = this.add.sprite(0, 0, 'background_instructions').setInteractive();
        background_instructions.setOrigin(0);
        background_instructions.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        var help = [
            'FELICITACIONES',
            'EL JUEGO HA',
            'TERMINADO'
        ];

        var add = this.add;

        WebFont.load({
            google: {
                families: ['Yusei Magic', 'Kaushan Script']
            },

            active: function() {
                add.text(screenCenterX, screenCenterY * 0.7, help, { fontFamily: 'Yusei Magic', fontSize: 30, color: '#42210B', align: 'center' }).setShadow('#333333', 2, false, true).setOrigin(0.5);
            },
        });
    },

});