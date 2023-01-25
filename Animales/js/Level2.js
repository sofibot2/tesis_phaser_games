var aciertos2 = 0;
var Level2 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Level2() {
            Phaser.Scene.call(this, { key: 'Level2' });
        },

    create: function () {
        this.scene.start('Instrucions_Level2');
    },

});

var Instrucions_Level2 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Instrucions_Level2() {
            Phaser.Scene.call(this, { key: 'Instrucions_Level2' });
        },

    create: function () {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        this.cameras.main.setBackgroundColor('#fff');

        var help = [
            'Selecciona los',
            'alimentos',
            'provenientes de la',
            'OVEJA'
        ];

        var add = this.add;

        WebFont.load({
            google: {
                families: ['Yusei Magic', 'Kaushan Script']
            },

            active: function () {
                add.text(screenCenterX, screenCenterY * 0.7, help, { fontFamily: 'Yusei Magic', fontSize: 30, color: '#42210B', align: 'center' }).setShadow('#333333', 2, false, true).setOrigin(0.5);
                add.text(screenCenterX, screenCenterY * 1.2, 'HAZ CLICK \nPARA COMENZAR  ', { fontFamily: 'Kaushan Script', fontSize: 30, color: '#F7931E', align: 'center' }).setShadow('#333333', 2, false, true).setOrigin(0.5);
            },
        });

        this.input.once('pointerdown', this.start, this);
    },

    start() {
        this.scene.start('Game_Level2');
    }

});

var Game_Level2 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Game_Level2() {
            Phaser.Scene.call(this, { key: 'Game_Level2' });
        },

    preload: function () {
        this.load.image('oveja', 'images/oveja.png');
    },

    create: function () {

        this.start;

        hoy1 = new Date();

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        //Background
        this.cameras.main.setBackgroundColor('#85C1E9');
        var background_instructions = this.add.sprite(0, 0, 'frame').setInteractive();
        background_instructions.setOrigin(0);
        background_instructions.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        attemptsText = this.add.text(50, screenCenterY * 1.8, 'Intentos: 0', { fontSize: '25px', fill: '#fff' });

        var regresarBot = this.add.sprite(screenCenterX * 1.6, screenCenterY * 1.95, 'regresarBot').setInteractive();
        regresarBot.setScale(0.12);
        regresarBot.on('pointerover', function () {
            this.setScale(0.14);
        });
        regresarBot.on('pointerout', function () {
            this.setScale(0.12);
        });

        // OPTIONS
        // QUESO
        var queso = this.add.sprite(screenCenterX * 0.3, screenCenterY * 0.3, 'vaca_queso_1').setInteractive();
        queso.setScale(0.2);
        queso.setActive(false);
        this.input.setDraggable(queso);
        // LECHE
        var leche = this.add.sprite(screenCenterX, screenCenterY * 0.3, 'vaca_leche').setInteractive();
        leche.setScale(0.2);
        leche.setActive(false);
        this.input.setDraggable(leche);
        // BUFANDA
        var bufanda = this.add.sprite(screenCenterX * 1.7, screenCenterY * 0.3, 'oveja_bufanda').setInteractive();
        bufanda.setScale(0.3);
        this.input.setDraggable(bufanda);
        // GORRO
        var gorro = this.add.sprite(screenCenterX * 0.3, screenCenterY * 0.7, 'oveja_gorro').setInteractive();
        gorro.setScale(0.2);
        this.input.setDraggable(gorro);
        // CARNE
        var carne = this.add.sprite(screenCenterX, screenCenterY * 0.7, 'vaca_carne').setInteractive();
        carne.setScale(0.2);
        carne.setActive(false);
        this.input.setDraggable(carne);
        //  SUETER
        var sueter = this.add.sprite(screenCenterX * 1.7, screenCenterY * 0.7, 'oveja_sueter').setInteractive();
        sueter.setScale(0.2);
        this.input.setDraggable(sueter);
        // HUEVO
        var huevo = this.add.sprite(screenCenterX * 0.7, screenCenterY * 1, 'gallina_huevo').setInteractive();
        huevo.setScale(0.15);
        huevo.setActive(false);
        this.input.setDraggable(huevo);
        // HILO
        var hilo = this.add.sprite(screenCenterX * 1.3, screenCenterY * 1, 'oveja_hilo').setInteractive();
        hilo.setScale(0.15);
        this.input.setDraggable(hilo);

        // // ADD ZONE SPRITE
        var zone = this.add.image(screenCenterX, screenCenterY * 1.4, 'oveja').setInteractive();
        zone.setScale(0.5);
        zone.input.dropZone = true;

        // DRAG ELEMENTS
        this.input.on('dragstart', function (pointer, gameObject) {
            this.children.bringToTop(gameObject);
        }, this);

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('dragenter', function (pointer, gameObject, dropZone) {
            if (gameObject.active) {
                attempts += 1;
                attemptsText.setText('Intentos: ' + attempts);
                zone.setTint(0x00ff00);
            } else {
                attempts += 1;
                attemptsText.setText('Intentos: ' + attempts);
                zone.setTint(0xff0000);
            }
        });

        this.input.on('dragleave', function (pointer, gameObject, dropZone) {
            zone.clearTint();
        });

        this.input.on('drop', function (pointer, gameObject, dropZone) {
            if (gameObject.active) {
                aciertos2 += 1;
                gameObject.destroy();
                if (aciertos2 == 4) {
                    hoy2 = new Date();
                    tiempo = (diff_time(hoy2, hoy1));
                    let data = {
                        game_person: person_id,
                        game_level_name: "Selecciona los alimentos provenientes de la OVEJA",
                        game_name: "ANIMALES Y SUS DERIVADOS",
                        game_level: 2,
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

                    this.scene.start('Level3');
                }
            } else {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }

            zone.clearTint();
        });

        this.input.on('dragend', function (pointer, gameObject, dropped) {
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
                // gameObject.clearTint();

            }
        });

        regresarBot.on('pointerup', () => {
            hoy2 = new Date();
            tiempo = (diff_time(hoy2, hoy1));
            let data = {
                game_person: person_id,
                game_level_name: "Selecciona los alimentos provenientes de la OVEJA",
                game_name: "ANIMALES Y SUS DERIVADOS",
                game_level: 2,
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
        this.scene.start('Level3');
    },

});