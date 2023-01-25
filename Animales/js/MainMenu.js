var hoy1;
var hoy2;
var tiempo='';

function diff_time(dt2, dt1) {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    var diff2 = Math.abs(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    if (diff < 1) {
        return diff2 + ' segundos.';
    } else {
        if (Math.abs(Math.round(diff)) < 1.99) {
            return Math.abs(Math.round(diff)) + ' minuto.';
        } else {
            return Math.abs(Math.round(diff)) + ' minutos.';
        }
    }
}

var MainMenu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function MainMenu() {
        Phaser.Scene.call(this, { key: 'MainMenu' });
    },

    preload: function() {

        // Audio
        this.load.audio('bg_sound_2', ['sounds/sound_2.mp3', 'sounds/sound_2.ogg']);

        // Main Menu Components
        this.load.image('background', 'images/background.png');
        this.load.image('game_title', 'images/game_title.png');
        this.load.image('play_button', 'images/play_button.png');
        this.load.image('frame', 'images/frame.png');

        // Instructions Components
        this.load.image('background_instructions', 'images/background_instructions.png');

        // WebFonts
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

        this.load.image('vaca_leche', 'images/vaca_leche.png');
        this.load.image('vaca_zapatos', 'images/vaca_zapatos.png');
        this.load.image('vaca_mantequilla', 'images/vaca_mantequilla.png');
        this.load.image('vaca_queso', 'images/vaca_queso.png');
        this.load.image('vaca_queso_1', 'images/vaca_queso_1.png');
        this.load.image('vaca_cartera', 'images/vaca_cartera.png');
        this.load.image('vaca_yogourt', 'images/vaca_yogourt.png');
        this.load.image('vaca_carne', 'images/vaca_carne.png');
        this.load.image('oveja_gorro', 'images/oveja_gorro.png');
        this.load.image('oveja_sueter', 'images/oveja_sueter.png');
        this.load.image('oveja_bufanda', 'images/oveja_bufanda.png');
        this.load.image('oveja_hilo', 'images/oveja_hilo.png');
        this.load.image('gallina_huevo', 'images/gallina_huevo.png');
        this.load.image('gallina_asada', 'images/gallina_asada.png');
        this.load.image('cerdo_jamon', 'images/cerdo_jamon.png');
        this.load.image('cerdo_asado', 'images/cerdo_asado.png');
        this.load.image('cerdo_tocino', 'images/cerdo_tocino.png');
        this.load.image('pescado_atun', 'images/pescado_atun.png');
        this.load.image('pescado_sardina', 'images/pescado_sardina.png');
        this.load.image('pescado_frito', 'images/pescado_frito.png');
        this.load.image('abeja_miel', 'images/abeja_miel.png');

        this.load.image('regresarBot', 'images/regresar.png');
    },

    create: function() {

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        var bg_audio = this.sound.add('bg_sound_2', {
            loop: true,
            volume: 0.5
        });

        bg_audio.play();

        var background = this.add.sprite(0, 0, 'background').setInteractive();
        background.setOrigin(0);
        background.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        var game_tile = this.add.sprite(screenCenterX, screenCenterY * 0.5, 'game_title').setInteractive();

        var play_button = this.add.sprite(screenCenterX, screenCenterY, 'play_button').setInteractive();

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // true for mobile device
            game_tile.setScale(0.7);

            play_button.setPosition(screenCenterX, screenCenterY * 1.2);
            play_button.setScale(0.3);
        } else {
            game_tile.setPosition(screenCenterX, screenCenterY * 0.5);
            game_tile.setScale(1);

            play_button.setPosition(screenCenterX, screenCenterY * 1.2);
            play_button.setScale(0.4);
        }

        play_button.once('pointerup', () => {
            this.scene.start('Level1');
        }, this);
    }

});