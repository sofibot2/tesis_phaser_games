var Level6 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Level6() {
            Phaser.Scene.call(this, { key: 'Level6' });
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
        this.load.image('domino6', 'images/domino_6.png');
    },

    create: function () {

        this.start;

        hoy1 = new Date();

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        // DOMINO
        var domino = this.add.sprite(screenCenterX, screenCenterY * 0.5, 'domino6').setInteractive();
        domino.setTint(0x2ABD02);

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
        var six1 = this.add.sprite(screenCenterX * 0.3, screenCenterY * 1.3, '6').setInteractive();
        six1.setScale(0.18);
        six1.setTint(0xAF7AC5);

        var six2 = this.add.sprite(screenCenterX, screenCenterY * 1.3, '6').setInteractive();
        six2.setScale(0.18);
        six2.setTint(0x9A7D0A);

        var six3 = this.add.sprite(screenCenterX * 1.7, screenCenterY * 1.3, '6').setInteractive();
        six3.setScale(0.18);
        six3.setTint(0x2ABD02);

        // LOGICA
        six1.on('pointerdown', function (pointer) {
            attempts += 1;
            attemptsText.setText('Intentos: ' + attempts);
            this.setTint(0xff0000);
        });

        six1.on('pointerout', function (pointer) {
            this.setTint(0xAF7AC5);
        });

        six1.on('pointerup', function (pointer) {
            this.setTint(0xAF7AC5);
        });

        six2.on('pointerdown', function (pointer) {
            attempts += 1;
            attemptsText.setText('Intentos: ' + attempts);
            this.setTint(0xff0000);
        });

        six2.on('pointerout', function (pointer) {
            this.setTint(0x9A7D0A);
        });

        six2.on('pointerup', function (pointer) {
            this.setTint(0x9A7D0A);
        });

        six3.on('pointerdown', function (pointer) {
            attempts += 1;
            attemptsText.setText('Intentos: ' + attempts);
            this.setTint(0x2ABD02);

            hoy2 = new Date();
            tiempo = (diff_time(hoy2, hoy1));

            let data = {
                game_person: person_id,
                game_level_name: "NIVEL 6",
                game_name: "123 DOMINO",
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

            this.scene.start('EndGame');
        });

        six3.on('pointerout', function (pointer) {
            this.setTint(0x2ABD02);
        });

        six3.on('pointerup', function (pointer) {
            this.setTint(0x2ABD02);
        });

        regresarBot.on('pointerup', () => {
            hoy2 = new Date();
            tiempo = (diff_time(hoy2, hoy1));

            let data = {
                game_person: person_id,
                game_level_name: "NIVEL 6",
                game_name: "123 DOMINO",
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
        this.scene.start('EndGame');
    },

});