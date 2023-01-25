var Level3 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Level3() {
            Phaser.Scene.call(this, { key: 'Level3' });
        },

    create: function () {
        this.scene.start('Game_Level3');
    },

});

var Game_Level3 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Game_Level3() {
            Phaser.Scene.call(this, { key: 'Game_Level3' });
        },

    preload: function () {
        this.load.image('domino4', 'images/domino_4.png');
    },

    create: function () {

        this.start;

        hoy1 = new Date();

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        // DOMINO
        var domino = this.add.sprite(screenCenterX, screenCenterY * 0.5, 'domino4').setInteractive();
        domino.setTint(0xE74C3C);

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
        var yellow_five = this.add.sprite(screenCenterX * 0.3, screenCenterY * 1.3, '5').setInteractive();
        yellow_five.setScale(0.18);
        yellow_five.setTint(0xF1C40F);

        var orange_foue = this.add.sprite(screenCenterX, screenCenterY * 1.3, '4').setInteractive();
        orange_foue.setScale(0.18);
        orange_foue.setTint(0xE74C3C);

        var green_three = this.add.sprite(screenCenterX * 1.7, screenCenterY * 1.3, '3').setInteractive();
        green_three.setScale(0.18);
        green_three.setTint(0x117864);

        // LOGICA
        yellow_five.on('pointerdown', function (pointer) {
            attempts += 1;
            attemptsText.setText('Intentos: ' + attempts);
            this.setTint(0xff0000);
        });

        yellow_five.on('pointerout', function (pointer) {
            yellow_five.setTint(0xF1C40F);
        });

        yellow_five.on('pointerup', function (pointer) {
            yellow_five.setTint(0xF1C40F);
        });

        orange_foue.on('pointerdown', function (pointer) {
            orange_foue.setTint(0xE74C3C);

            attempts += 1;
            attemptsText.setText('Intentos: ' + attempts);

            hoy2 = new Date();
            tiempo = (diff_time(hoy2, hoy1));

            let data = {
                game_person: person_id,
                game_level_name: "NIVEL 3",
                game_name: "123 DOMINO",
                game_level: 3,
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

            this.scene.start('WinScreen3');
        });

        orange_foue.on('pointerout', function (pointer) {
            this.setTint(0xff0000);
        });

        orange_foue.on('pointerup', function (pointer) {
            this.setTint(0xff0000);
        });

        green_three.on('pointerdown', function (pointer) {
            attempts += 1;
            attemptsText.setText('Intentos: ' + attempts);
            this.setTint(0xff0000);
        });

        green_three.on('pointerout', function (pointer) {
            this.setTint(0x117864);
        });

        green_three.on('pointerup', function (pointer) {
            this.setTint(0x117864);
        });

        regresarBot.on('pointerup', () => {
            hoy2 = new Date();
            tiempo = (diff_time(hoy2, hoy1));

            let data = {
                game_person: person_id,
                game_level_name: "NIVEL 3",
                game_name: "123 DOMINO",
                game_level: 3,
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
        this.scene.start('WinScreen3');
    },

});

var WinScreen3 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function WinScreen3() {
            Phaser.Scene.call(this, { key: 'WinScreen3' });
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
        this.scene.start('Level4');
    },

});