var Level6 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Level6() {
            Phaser.Scene.call(this, { key: 'Level6' });
        },

    preload: function () {
        // AUDIO
        this.load.audio('audio_tren', ['sounds/audio_tren.mp3', 'sounds/audio_tren.ogg']);
    },

    create: function () {
        this.scene.start('Game_Level6');
    },

});

var Game_Level6 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Game_Level6() {
            Phaser.Scene.call(this, { key: 'Game_Level6' });
        },

    preload: function () {

    },

    create: function () {

        this.start;

        hoy1 = new Date();

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        //Background
        this.cameras.main.setBackgroundColor('#FFFFFF');

        attemptsText = this.add.text(16, 16, 'Intentos: 0', { fontSize: '25px', fill: '#000' });

        var regresarBot = this.add.sprite(screenCenterX * 1.6, screenCenterY * 1.95, 'regresarBot').setInteractive();
        regresarBot.setScale(0.12);
        regresarBot.on('pointerover', function () {
            this.setScale(0.14);
        });
        regresarBot.on('pointerout', function () {
            this.setScale(0.12);
        });

        // AUDIO
        var audio_button = this.add.sprite(screenCenterX, screenCenterY * 0.5, 'audio_button').setInteractive();
        audio_button.setScale(0.3);

        var audio_tren = this.sound.add('audio_tren');
        audio_tren.play();

        // Opciones
        var aire = this.add.sprite(screenCenterX * 0.4, screenCenterY * 1.3, 'aire').setInteractive();
        aire.setScale(0.2);

        var mar = this.add.sprite(screenCenterX, screenCenterY * 1.3, 'mar').setInteractive();
        mar.setScale(0.2);

        var tierra = this.add.sprite(screenCenterX * 1.6, screenCenterY * 1.3, 'tierra').setInteractive();
        tierra.setScale(0.2);

        // LOGICA
        audio_button.on('pointerdown', function (pointer) {
            audio_tren.play();
        });

        aire.on('pointerdown', function (pointer) {
            attempts += 1;
            attemptsText.setText('Intentos: ' + attempts);
            this.setTint(0xff0000);
        });

        aire.on('pointerout', function (pointer) {
            this.clearTint();
        });

        aire.on('pointerup', function (pointer) {
            this.clearTint();
        });

        mar.on('pointerdown', function (pointer) {
            attempts += 1;
            attemptsText.setText('Intentos: ' + attempts);
            this.setTint(0xff0000);
        });

        mar.on('pointerout', function (pointer) {
            this.clearTint();
        });

        mar.on('pointerup', function (pointer) {
            this.clearTint();
        });

        tierra.on('pointerdown', function (pointer) {
            this.setTint(0xFFFFFF);

            attempts += 1;
            attemptsText.setText('Intentos: ' + attempts);

            hoy2 = new Date();
            tiempo = (diff_time(hoy2, hoy1));

            let data = {
                game_person: person_id,
                game_level_name: "Tren",
                game_name: "TRANSPORTES",
                game_level: 6,
                game_attempts: attempts,
                game_time_spent: tiempo,
                game_finish_level: "True",
            };

            fetch(url, {
                method: "POST",
                body: JSON.stringify(data)
            }).then(res => {
                console.log("Request complete! response:", res);
            });

            attempts = 0;

            this.scene.start('WinScreen6');
            audio_tren.destroy();
        });

        tierra.on('pointerout', function (pointer) {
            this.clearTint();
        });

        tierra.on('pointerup', function (pointer) {
            this.clearTint();
        });

        regresarBot.on('pointerup', () => {
            hoy2 = new Date();
            tiempo = (diff_time(hoy2, hoy1));

            let data = {
                game_person: person_id,
                game_level_name: "Tren",
                game_name: "TRANSPORTES",
                game_level: 6,
                game_attempts: attempts,
                game_time_spent: tiempo,
                game_finish_level: "False",
            };

            fetch(url, {
                method: "POST",
                body: JSON.stringify(data)
            }).then(res => {
                console.log("Request complete! response:", res);
            });
            window.location = 'https://t.me/TesisTelegramBot';
        });
    },

    start() {
        this.scene.start('WinScreen6');
    },

});

var WinScreen6 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function WinScreen6() {
            Phaser.Scene.call(this, { key: 'WinScreen6' });
        },

    create: function () {

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        this.cameras.main.setBackgroundColor('#FEFEFE');

        var tren = this.add.sprite(screenCenterX, screenCenterY * 0.5, 'tren').setInteractive();
        tren.setScale(0.3);

        var help = [
            'MUY BIEN',
            'es una TREN',
        ];

        var add = this.add;

        WebFont.load({
            google: {
                families: ['Yusei Magic', 'Kaushan Script']
            },

            active: function () {
                add.text(screenCenterX, screenCenterY * 0.8, help, { fontFamily: 'Yusei Magic', fontSize: 30, color: '#42210B', align: 'center' }).setShadow('#333333', 2, false, true).setOrigin(0.5);
                add.text(screenCenterX, screenCenterY * 1.2, 'HAZ CLICK \nPARA CONTINUAR  ', { fontFamily: 'Kaushan Script', fontSize: 30, color: '#F7931E', align: 'center' }).setShadow('#333333', 2, false, true).setOrigin(0.5);
            },
        });

        this.input.once('pointerdown', this.start, this);

    },

    start() {
        this.scene.start('Level7');
    },

});