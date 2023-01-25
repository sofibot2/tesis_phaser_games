var attempts = 0;
var attemptsText;

var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var person_id = urlParams.get('person_id');

var url = "https://sofibot.ups.edu.ec/game/create";

var aciertos = 0;

var Level1 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Level1() {
            Phaser.Scene.call(this, { key: 'Level1' });
        },

    create: function () {
        this.scene.start('Instrucions_Level1');
    },

});

var Instrucions_Level1 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Instrucions_Level1() {
            Phaser.Scene.call(this, { key: 'Instrucions_Level1' });
        },

    create: function () {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        this.cameras.main.setBackgroundColor('#fff');

        var help = [
            'Selecciona los',
            'alimentos',
            'provenientes de la',
            'VACA'
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
        this.scene.start('Game_Level1');
    }

});

var Game_Level1 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Game_Level1() {
            Phaser.Scene.call(this, { key: 'Game_Level1' });
        },

    preload: function () {
        this.load.image('vaca', 'images/vaca.png');
    },

    create: function () {

        this.start;

        hoy1 = new Date();


        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        //Background
        this.cameras.main.setBackgroundColor('#16A085');
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
        // LECHE
        var leche = this.add.sprite(screenCenterX * 0.3, screenCenterY * 0.3, 'vaca_leche').setInteractive();
        leche.setScale(0.2);
        this.input.setDraggable(leche);
        // ZAPATOS
        var zapatos = this.add.sprite(screenCenterX, screenCenterY * 0.3, 'vaca_zapatos').setInteractive();
        zapatos.setScale(0.2);
        this.input.setDraggable(zapatos);
        // MIEL
        var miel = this.add.sprite(screenCenterX * 1.7, screenCenterY * 0.3, 'abeja_miel').setInteractive();
        miel.setScale(0.15);
        miel.setActive(false);
        this.input.setDraggable(miel);
        // GORRO
        var gorro = this.add.sprite(screenCenterX * 0.3, screenCenterY * 0.7, 'oveja_gorro').setInteractive();
        gorro.setScale(0.2);
        gorro.setActive(false);
        this.input.setDraggable(gorro);
        // MANTEQUILLA
        var mantequilla = this.add.sprite(screenCenterX, screenCenterY * 0.7, 'vaca_mantequilla').setInteractive();
        mantequilla.setScale(0.25);
        this.input.setDraggable(mantequilla);
        // YOGOURT
        var yogourt = this.add.sprite(screenCenterX * 1.7, screenCenterY * 0.7, 'vaca_yogourt').setInteractive();
        yogourt.setScale(0.2);
        this.input.setDraggable(yogourt);
        // CARTERA
        var cartera = this.add.sprite(screenCenterX * 0.5, screenCenterY * 1, 'vaca_cartera').setInteractive();
        cartera.setScale(0.25);
        this.input.setDraggable(cartera);
        // QUESO
        var queso = this.add.sprite(screenCenterX * 1.4, screenCenterY * 1, 'vaca_queso').setInteractive();
        queso.setScale(0.2);
        this.input.setDraggable(queso);

        // ADD ZONE SPRITE
        var zone = this.add.image(screenCenterX, screenCenterY * 1.55, 'vaca').setInteractive();
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
                aciertos += 1;
                gameObject.destroy();
                if (aciertos >= 6) {
                    hoy2 = new Date();
                    tiempo = (diff_time(hoy2, hoy1));
                    let data = {
                        game_person: person_id,
                        game_level_name: "Selecciona los alimentos provenientes de la VACA",
                        game_name: "ANIMALES Y SUS DERIVADOS",
                        game_level: 1,
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

                    this.scene.start('Level2');
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
            }
        });

        regresarBot.on('pointerup', () => {
            hoy2 = new Date();
            tiempo = (diff_time(hoy2, hoy1));
            let data = {
                game_person: person_id,
                game_level_name: "Selecciona los alimentos provenientes de la VACA",
                game_name: "ANIMALES Y SUS DERIVADOS",
                game_level: 1,
                game_attempts: attempts,
                game_time_spent: tiempo,
                game_finish_level: "False",
            };
            let json = JSON.stringify(data);

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
        this.scene.start('Level2');
    },

});