var Level5 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Level5() {
            Phaser.Scene.call(this, { key: 'Level5' });
        },

    create: function () {
        this.scene.start('Game_Level5');
    },

});

var Game_Level5 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Game_Level5() {
            Phaser.Scene.call(this, { key: 'Game_Level5' });
        },

    preload: function () {
        this.load.image('domino5', 'images/domino_5.png');
    },

    create: function () {

        this.start;

        hoy1 = new Date();

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        // DOMINO
        var domino = this.add.sprite(screenCenterX, screenCenterY * 0.5, 'domino5').setInteractive();
        domino.setTint(0x5E00FF);

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
        var orange_five = this.add.sprite(screenCenterX * 0.3, screenCenterY * 1.3, '5').setInteractive();
        orange_five.setScale(0.18);
        orange_five.setTint(0xE74C3C);

        var brown_five = this.add.sprite(screenCenterX, screenCenterY * 1.3, '5').setInteractive();
        brown_five.setScale(0.18);
        brown_five.setTint(0x5E00FF);

        var purple_two = this.add.sprite(screenCenterX * 1.7, screenCenterY * 1.3, '2').setInteractive();
        purple_two.setScale(0.18);
        purple_two.setTint(0x512E5F);

        // LOGICA
        orange_five.on('pointerdown', function (pointer) {
            attempts += 1;
            attemptsText.setText('Intentos: ' + attempts);
            this.setTint(0xff0000);
        });

        orange_five.on('pointerout', function (pointer) {
            this.setTint(0xE74C3C);
        });

        orange_five.on('pointerup', function (pointer) {
            this.setTint(0xE74C3C);
        });

        brown_five.on('pointerdown', function (pointer) {
            attempts += 1;
            attemptsText.setText('Intentos: ' + attempts);
            this.setTint(0x5E00FF);

            hoy2 = new Date();
            tiempo = (diff_time(hoy2, hoy1));

            let data = {
                game_person: person_id,
                game_level_name: "NIVEL 5",
                game_name: "123 DOMINO",
                game_level: 5,
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

            this.scene.start('WinScreen5');
        });

        brown_five.on('pointerout', function (pointer) {
            this.setTint(0x5E00FF);
        });

        brown_five.on('pointerup', function (pointer) {
            this.setTint(0x5E00FF);
        });

        purple_two.on('pointerdown', function (pointer) {
            attempts += 1;
            attemptsText.setText('Intentos: ' + attempts);
            this.setTint(0xff0000);
        });

        purple_two.on('pointerout', function (pointer) {
            this.setTint(0x512E5F);
        });

        purple_two.on('pointerup', function (pointer) {
            this.setTint(0x512E5F);
        });

        regresarBot.on('pointerup', () => {
            hoy2 = new Date();
            tiempo = (diff_time(hoy2, hoy1));

            let data = {
                game_person: person_id,
                game_level_name: "NIVEL 5",
                game_name: "123 DOMINO",
                game_level: 5,
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
        this.scene.start('WinScreen5');
    },

});

var WinScreen5 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function WinScreen5() {
            Phaser.Scene.call(this, { key: 'WinScreen5' });
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
        this.scene.start('Level6');
    },

});