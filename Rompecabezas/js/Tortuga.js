var Tortuga = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Tortuga() {
            Phaser.Scene.call(this, { key: 'Tortuga' });
        },

    preload: function () {

        this.load.image('tortuga', './images/tortuga/tortugaCompleta.png');

        this.load.image('cabezagTortuga', './images/tortuga/cabezag.png');
        this.load.image('pata1gTortuga', './images/tortuga/pata1g.png');
        this.load.image('pata2gTortuga', './images/tortuga/pata2g.png');
        this.load.image('pata3gTortuga', './images/tortuga/pata3g.png');
        this.load.image('pata4gTortuga', './images/tortuga/pata4g.png');
        this.load.image('cuerpogTortuga', './images/tortuga/cuerpog.png');

        this.load.image('cabezaTortuga', './images/tortuga/cabeza.png');
        this.load.image('pata1Tortuga', './images/tortuga/pata1.png');
        this.load.image('pata2Tortuga', './images/tortuga/pata2.png');
        this.load.image('pata3Tortuga', './images/tortuga/pata3.png');
        this.load.image('pata4Tortuga', './images/tortuga/pata4.png');
        this.load.image('cuerpoTortuga', './images/tortuga/cuerpo.png');
    },

    create: function () {
        this.start;
        aciertos = 0;
        attempts = 0;
        intentos = 6;
        animal = 'tortuga';
        hoy1 = new Date();

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        toc_audio = this.sound.add('toc');
        error_audio = this.sound.add('error');

        //Background
        this.cameras.main.setBackgroundColor('#E21F42');

        var frame = this.add.sprite(0, 0, 'frame').setInteractive();
        frame.setOrigin(0);
        frame.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        var puntuacion = this.add.image(screenCenterX, screenCenterY * 0.13, 'puntuacion').setInteractive();
        puntuacion.setScale(0.25);
        attemptsText = this.add.text(screenCenterX - 5, screenCenterY * 0.10, '0', { fontSize: '25px Arial Black', fill: '#fff' });

        var botonSonido = this.add.sprite(screenCenterX * 1.8, screenCenterY * 0.5, 'botonSonido').setInteractive();
        botonSonido.setScale(0.15);

        var botonSinSonido = this.add.sprite(screenCenterX * 1.8, screenCenterY * 0.5, 'botonSinSonido').setInteractive();
        botonSinSonido.setScale(0.15);
        if (sonido) {
            botonSinSonido.visible = false;
        } else {
            botonSonido.visible = false;
        }

        var house = this.add.image(screenCenterX * 1.8, screenCenterY * 0.67, 'house').setInteractive();
        house.setScale(0.15);

        /* var tortuga = this.add.image(screenCenterX, screenCenterY, 'tortuga').setInteractive();
        tortuga.setScale(0.35); */

        var cabezagTortuga = this.add.image(screenCenterX - 104, screenCenterY - 41, 'cabezagTortuga').setInteractive();
        cabezagTortuga.setScale(0.35);
        cabezagTortuga.input.dropZone = true;
        var pata1gTortuga = this.add.image(screenCenterX - 110, screenCenterY + 16, 'pata1gTortuga').setInteractive();
        pata1gTortuga.setScale(0.35);
        pata1gTortuga.input.dropZone = true;
        var pata2gTortuga = this.add.image(screenCenterX - 58, screenCenterY - 85, 'pata2gTortuga').setInteractive();
        pata2gTortuga.setScale(0.35);
        pata2gTortuga.input.dropZone = true;
        var pata3gTortuga = this.add.image(screenCenterX + 95, screenCenterY - 10, 'pata3gTortuga').setInteractive();
        pata3gTortuga.setScale(0.35);
        pata3gTortuga.input.dropZone = true;
        var pata4gTortuga = this.add.image(screenCenterX + 50, screenCenterY + 66, 'pata4gTortuga').setInteractive();
        pata4gTortuga.setScale(0.35);
        pata4gTortuga.input.dropZone = true;
        var cuerpogTortuga = this.add.image(screenCenterX + 9, screenCenterY + 3, 'cuerpogTortuga').setInteractive();
        cuerpogTortuga.setScale(0.35);
        cuerpogTortuga.input.dropZone = true;


        var cabezaTortuga = this.add.image(screenCenterX, screenCenterY * 0.4, 'cabezaTortuga').setInteractive();
        cabezaTortuga.setScale(0.35);
        this.input.setDraggable(cabezaTortuga);
        var pata1Tortuga = this.add.image(screenCenterX * 0.3, screenCenterY * 1.35, 'pata1Tortuga').setInteractive();
        pata1Tortuga.setScale(0.35);
        this.input.setDraggable(pata1Tortuga);
        var pata2Tortuga = this.add.image(screenCenterX * 0.3, screenCenterY * 0.4, 'pata2Tortuga').setInteractive();
        pata2Tortuga.setScale(0.35);
        this.input.setDraggable(pata2Tortuga);
        var pata3Tortuga = this.add.image(screenCenterX * 1.6, screenCenterY * 0.3, 'pata3Tortuga').setInteractive();
        pata3Tortuga.setScale(0.35);
        this.input.setDraggable(pata3Tortuga);
        var pata4Tortuga = this.add.image(screenCenterX * 1.65, screenCenterY * 1.40, 'pata4Tortuga').setInteractive();
        pata4Tortuga.setScale(0.35);
        this.input.setDraggable(pata4Tortuga);
        var cuerpoTortuga = this.add.image(screenCenterX, screenCenterY * 1.65, 'cuerpoTortuga').setInteractive();
        cuerpoTortuga.setScale(0.35);
        this.input.setDraggable(cuerpoTortuga);


        cuerpoTortuga.on('pointerover', function () {
            this.setTint(0x00ff00);
        });
        cuerpoTortuga.on('pointerout', function () {
            this.clearTint();
        });
        cabezaTortuga.on('pointerover', function () {
            this.setTint(0x00ff00);
        });
        cabezaTortuga.on('pointerout', function () {
            this.clearTint();
        });
        pata1Tortuga.on('pointerover', function () {
            this.setTint(0x00ff00);
        });
        pata1Tortuga.on('pointerout', function () {
            this.clearTint();
        });
        pata2Tortuga.on('pointerover', function () {
            this.setTint(0x00ff00);
        });
        pata2Tortuga.on('pointerout', function () {
            this.clearTint();
        });
        pata3Tortuga.on('pointerover', function () {
            this.setTint(0x00ff00);
        });
        pata3Tortuga.on('pointerout', function () {
            this.clearTint();
        });
        pata4Tortuga.on('pointerover', function () {
            this.setTint(0x00ff00);
        });
        pata4Tortuga.on('pointerout', function () {
            this.clearTint();
        });

        //-----------------------------------------------------------------------------------------------------
        this.input.on('dragstart', function (pointer, gameObject) {
            if (gameObject.texture.key == 'pata4Tortuga') {
                this.children.bringToTop(pata4gTortuga);
            }
            if (gameObject.texture.key == 'pata3Tortuga') {
                this.children.bringToTop(pata3gTortuga);
            }
            if (gameObject.texture.key == 'cabezaTortuga') {
                this.children.bringToTop(cabezagTortuga);
            }
            if (gameObject.texture.key == 'pata2Tortuga') {
                this.children.bringToTop(pata2gTortuga);
            }
            if (gameObject.texture.key == 'pata1Tortuga') {
                this.children.bringToTop(pata1gTortuga);
            }
            if (gameObject.texture.key == 'cuerpoTortuga') {
                this.children.bringToTop(pata1gTortuga);
                this.children.bringToTop(pata2gTortuga);
                this.children.bringToTop(pata3gTortuga);
                this.children.bringToTop(pata4gTortuga);
                this.children.bringToTop(cabezagTortuga);
                this.children.bringToTop(pata1Tortuga);
                this.children.bringToTop(pata2Tortuga);
                this.children.bringToTop(pata3Tortuga);
                this.children.bringToTop(pata4Tortuga);
                this.children.bringToTop(cabezaTortuga);
            }
        }, this);

        // DRAG ELEMENTS
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('dragenter', function (pointer, gameObject, dropZone) {
            if (dropZone.texture.key == 'cuerpogTortuga') {
                cuerpogTortuga.setTint(000100);
            } else if (dropZone.texture.key == 'cabezagTortuga') {
                cabezagTortuga.setTint(000100);
            } else if (dropZone.texture.key == 'pata1gTortuga') {
                pata1gTortuga.setTint(000100);
            } else if (dropZone.texture.key == 'pata2gTortuga') {
                pata2gTortuga.setTint(000100);
            } else if (dropZone.texture.key == 'pata3gTortuga') {
                pata3gTortuga.setTint(000100);
            } else if (dropZone.texture.key == 'pata4gTortuga') {
                pata4gTortuga.setTint(000100);
            }
        });

        this.input.on('dragleave', function (pointer, gameObject, dropZone) {
            cuerpogTortuga.clearTint();
            cabezagTortuga.clearTint();
            pata1gTortuga.clearTint();
            pata2gTortuga.clearTint();
            pata3gTortuga.clearTint();
            pata4gTortuga.clearTint();
        });

        this.input.on('drop', function (pointer, gameObject, dropZone) {
            if (gameObject.texture.key == 'cabezaTortuga' && dropZone.texture.key == 'cabezagTortuga') {
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;
                gameObject.input.enabled = false;
                dropZone.input.enabled = false;
                cabezagTortuga.clearTint();
                aciertos += 1;
                toc_audio.play();
            } else if (gameObject.texture.key == 'pata1Tortuga' && dropZone.texture.key == 'pata1gTortuga') {
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;
                gameObject.input.enabled = false;
                dropZone.input.enabled = false;
                pata1gTortuga.clearTint();
                aciertos += 1;
                toc_audio.play();
            } else if (gameObject.texture.key == 'pata2Tortuga' && dropZone.texture.key == 'pata2gTortuga') {
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;
                gameObject.input.enabled = false;
                dropZone.input.enabled = false;
                pata2gTortuga.clearTint();
                aciertos += 1;
                toc_audio.play();
            } else if (gameObject.texture.key == 'pata3Tortuga' && dropZone.texture.key == 'pata3gTortuga') {
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;
                gameObject.input.enabled = false;
                dropZone.input.enabled = false;
                pata3gTortuga.clearTint();
                aciertos += 1;
                toc_audio.play();
            } else if (gameObject.texture.key == 'pata4Tortuga' && dropZone.texture.key == 'pata4gTortuga') {
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;
                gameObject.input.enabled = false;
                dropZone.input.enabled = false;
                pata4gTortuga.clearTint();
                aciertos += 1;
                toc_audio.play();
            } else if (gameObject.texture.key == 'cuerpoTortuga' && dropZone.texture.key == 'cuerpogTortuga') {
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;
                gameObject.input.enabled = false;
                dropZone.input.enabled = false;
                cuerpogTortuga.clearTint();
                aciertos += 1;
                toc_audio.play();
            } else {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
                cuerpogTortuga.clearTint();
                cabezagTortuga.clearTint();
                pata1gTortuga.clearTint();
                pata2gTortuga.clearTint();
                pata3gTortuga.clearTint();
                pata4gTortuga.clearTint();
                error_audio.play();
            }
        });

        this.input.on('dragend', function (pointer, gameObject, dropped) {
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
            attempts += 1;
            attemptsText.setText(attempts);
        });
        //-----------------------------------------------------------------------------------------------------

        botonSonido.on('pointerdown', function (pointer) {
            botonSonido.visible = false;
            botonSinSonido.visible = true;
            bg_audio.stop();
            sonido = false;
        });
        botonSinSonido.on('pointerdown', function (pointer) {
            botonSinSonido.visible = false;
            botonSonido.visible = true;
            bg_audio.play();
            sonido = true;
        });

        house.once('pointerup', () => {

            hoy2 = new Date();
            tiempo = (diff_time(hoy2, hoy1));

            let data = {
                game_person: person_id,
                game_level_name: "Tortuga",
                game_name: "ROMPECABEZAS Y FIGURAS",
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

            this.scene.start('GameMenu');
        }, this);
    },

    update: function () {
        if (aciertos == 6) {

            hoy2 = new Date();
            tiempo = (diff_time(hoy2, hoy1));

            let data = {
                game_person: person_id,
                game_level_name: "Tortuga",
                game_name: "ROMPECABEZAS Y FIGURAS",
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

            this.scene.start('EndGame');
        }
    },
});