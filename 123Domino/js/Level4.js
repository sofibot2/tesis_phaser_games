var Level4 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Level4() {
            Phaser.Scene.call(this, { key: 'Level4' });
        },

    create: function () {
        this.scene.start('Game_Level4');
    },

});

var Game_Level4 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Game_Level4() {
            Phaser.Scene.call(this, { key: 'Game_Level4' });
        },

    preload: function () {
        this.load.image('domino2', 'images/domino_2.png');
    },

    create: function () {

        this.start;

        hoy1 = new Date();

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        // DOMINO
        var domino = this.add.sprite(screenCenterX, screenCenterY * 0.5, 'domino2').setInteractive();
        domino.setTint(0x2E86C1);

        attemptsText = this.add.text(16, 16, 'Intentos: 0', { fontSize: '25px', fill: '#000' });

        var regresarBot = this.add.sprite(screenCenterX * 1.6, screenCenterY * 1.95, 'regresarBot').setInteractive();
        regresarBot.setScale(0.12);
        regresarBot.on('pointerover', function () {
            this.setScale(0.14);
        });
        regresarBot.on('pointerout', function () {
            this.setScale(0.12);
        });

        // Opciones
        var blue_four = this.add.sprite(screenCenterX * 0.3, screenCenterY * 1.3, '2').setInteractive();
        blue_four.setScale(0.18);
        blue_four.setTint(0x2E86C1);

        var gray_four = this.add.sprite(screenCenterX, screenCenterY * 1.3, '2').setInteractive();
        gray_four.setScale(0.18);
        gray_four.setTint(0x616A6B);

        var blue_three = this.add.sprite(screenCenterX * 1.7, screenCenterY * 1.3, '3').setInteractive();
        blue_three.setScale(0.18);
        blue_three.setTint(0x2E86C1);

        // LOGICA
        blue_four.on('pointerdown', function (pointer) {
            attempts += 1;
            attemptsText.setText('Intentos: ' + attempts);
            this.setTint(0xff0000);

            hoy2 = new Date();
            tiempo = (diff_time(hoy2, hoy1));

            let data = {
                game_person: person_id,
                game_level_name: "NIVEL 4",
                game_name: "123 DOMINO",
                game_level: 4,
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

            this.scene.start('WinScreen4');
        });

        blue_four.on('pointerout', function (pointer) {
            this.setTint(0x2E86C1);
        });

        blue_four.on('pointerup', function (pointer) {
            this.setTint(0x2E86C1);
        });

        gray_four.on('pointerdown', function (pointer) {
            attempts += 1;
            attemptsText.setText('Intentos: ' + attempts);
            this.setTint(0xff0000);
        });

        gray_four.on('pointerout', function (pointer) {
            this.setTint(0x616A6B);
        });

        gray_four.on('pointerup', function (pointer) {
            this.setTint(0x616A6B);
        });

        blue_three.on('pointerdown', function (pointer) {
            attempts += 1;
            attemptsText.setText('Intentos: ' + attempts);
            this.setTint(0xff0000);
        });

        blue_three.on('pointerout', function (pointer) {
            this.setTint(0x2E86C1);
        });

        blue_three.on('pointerup', function (pointer) {
            this.setTint(0x2E86C1);
        });

        regresarBot.on('pointerup', () => {
            hoy2 = new Date();
            tiempo = (diff_time(hoy2, hoy1));

            let data = {
                game_person: person_id,
                game_level_name: "NIVEL 4",
                game_name: "123 DOMINO",
                game_level: 4,
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
        this.scene.start('WinScreen4');
    },

});

var WinScreen4 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function WinScreen4() {
            Phaser.Scene.call(this, { key: 'WinScreen4' });
        },

    create: function () {

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        var starts = this.add.sprite(screenCenterX, screenCenterY * 0.5, 'stars').setInteractive();

        var help = [
            'MUY BIEN',
        ];

        var add = this.add;

        WebFont.load({
            google: {
                families: ['Yusei Magic', 'Kaushan Script']
            },

            active: function () {
                add.text(screenCenterX, screenCenterY * 0.7, help, { fontFamily: 'Yusei Magic', fontSize: 30, color: '#42210B', align: 'center' }).setShadow('#333333', 2, false, true).setOrigin(0.5);
                add.text(screenCenterX, screenCenterY * 1.2, 'HAZ CLICK \nPARA CONTINUAR  ', { fontFamily: 'Kaushan Script', fontSize: 30, color: '#F7931E', align: 'center' }).setShadow('#333333', 2, false, true).setOrigin(0.5);
            },
        });

        this.input.once('pointerdown', this.start, this);

    },

    start() {
        this.scene.start('Level5');
    },

});