var Oso = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Oso() {
            Phaser.Scene.call(this, { key: 'Oso' });
        },

    preload: function () {

        this.load.image('oso', './images/oso/osoCompleto.png');

        this.load.image('cuerpogOso', './images/oso/cuerpog.png');
        this.load.image('cabezagOso', './images/oso/cabezag.png');
        this.load.image('pata2gOso', './images/oso/pata2g.png');
        this.load.image('pata3gOso', './images/oso/pata3g.png');

        this.load.image('cuerpoOso', './images/oso/cuerpo.png');
        this.load.image('cabezaOso', './images/oso/cabeza.png');
        this.load.image('pata2Oso', './images/oso/pata2.png');
        this.load.image('pata3Oso', './images/oso/pata3.png');
    },

    create: function () {
        this.start;
        aciertos = 0;
        attempts = 0;
        intentos = 4;
        animal = 'oso';
        hoy1 = new Date();

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        toc_audio = this.sound.add('toc');
        error_audio = this.sound.add('error');

        //Background
        this.cameras.main.setBackgroundColor('#01DBF9');

        var frame = this.add.sprite(0, 0, 'frame').setInteractive();
        frame.setOrigin(0);
        frame.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        var puntuacion = this.add.image(screenCenterX, screenCenterY * 0.13, 'puntuacion').setInteractive();
        puntuacion.setScale(0.25);
        attemptsText = this.add.text(screenCenterX - 5, screenCenterY * 0.10, '0', { fontSize: '25px Arial Black', fill: '#fff' });

        var botonSonido = this.add.sprite(screenCenterX * 1.8, screenCenterY * 0.4, 'botonSonido').setInteractive();
        botonSonido.setScale(0.15);

        var botonSinSonido = this.add.sprite(screenCenterX * 1.8, screenCenterY * 0.4, 'botonSinSonido').setInteractive();
        botonSinSonido.setScale(0.15);
        if (sonido) {
            botonSinSonido.visible = false;
        } else {
            botonSonido.visible = false;
        }

        var house = this.add.image(screenCenterX * 1.8, screenCenterY * 0.57, 'house').setInteractive();
        house.setScale(0.15);

        //var oso = this.add.image(screenCenterX, screenCenterY, 'oso').setInteractive();
        //oso.setScale(0.25);

        var cuerpogOso = this.add.image(screenCenterX + 6, screenCenterY, 'cuerpogOso').setInteractive();
        cuerpogOso.setScale(0.25);
        cuerpogOso.input.dropZone = true;
        var cabezagOso = this.add.image(screenCenterX - 90, screenCenterY - 40, 'cabezagOso').setInteractive();
        cabezagOso.setScale(0.25);
        cabezagOso.input.dropZone = true;
        var pata2gOso = this.add.image(screenCenterX - 28, screenCenterY + 67, 'pata2gOso').setInteractive();
        pata2gOso.setScale(0.25);
        pata2gOso.input.dropZone = true;
        var pata3gOso = this.add.image(screenCenterX + 98, screenCenterY + 60, 'pata3gOso').setInteractive();
        pata3gOso.setScale(0.25);
        pata3gOso.input.dropZone = true;

        var cuerpoOso = this.add.image(screenCenterX, screenCenterY * 1.60, 'cuerpoOso').setInteractive();
        cuerpoOso.setScale(0.25);
        this.input.setDraggable(cuerpoOso);
        var cabezaOso = this.add.image(screenCenterX * 0.4, screenCenterY * 0.4, 'cabezaOso').setInteractive();
        cabezaOso.setScale(0.25);
        this.input.setDraggable(cabezaOso);
        var pata2Oso = this.add.image(screenCenterX * 0.9, screenCenterY * 0.4, 'pata2Oso').setInteractive();
        pata2Oso.setScale(0.25);
        this.input.setDraggable(pata2Oso);
        var pata3Oso = this.add.image(screenCenterX * 1.3, screenCenterY * 0.6, 'pata3Oso').setInteractive();
        pata3Oso.setScale(0.25);
        this.input.setDraggable(pata3Oso);

        cuerpoOso.on('pointerover', function () {
            this.setTint(0x00ff00);
        });
        cuerpoOso.on('pointerout', function () {
            this.clearTint();
        });
        cabezaOso.on('pointerover', function () {
            this.setTint(0x00ff00);
        });
        cabezaOso.on('pointerout', function () {
            this.clearTint();
        });
        pata2Oso.on('pointerover', function () {
            this.setTint(0x00ff00);
        });
        pata2Oso.on('pointerout', function () {
            this.clearTint();
        });
        pata3Oso.on('pointerover', function () {
            this.setTint(0x00ff00);
        });
        pata3Oso.on('pointerout', function () {
            this.clearTint();
        });

        //-----------------------------------------------------------------------------------------------------
        this.input.on('dragstart', function (pointer, gameObject) {
            if (gameObject.texture.key == 'cuerpoOso') {
                this.children.bringToTop(cabezagOso);
                this.children.bringToTop(pata2gOso);
                this.children.bringToTop(pata3gOso);
            }
        }, this);

        // DRAG ELEMENTS
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('dragenter', function (pointer, gameObject, dropZone) {
            if (dropZone.texture.key == 'cuerpogOso') {
                cuerpogOso.setTint(000100);
            } else if (dropZone.texture.key == 'cabezagOso') {
                cabezagOso.setTint(000100);
            } else if (dropZone.texture.key == 'pata2gOso') {
                pata2gOso.setTint(000100);
            } else if (dropZone.texture.key == 'pata3gOso') {
                pata3gOso.setTint(000100);
            }
        });

        this.input.on('dragleave', function (pointer, gameObject, dropZone) {
            cuerpogOso.clearTint();
            cabezagOso.clearTint();
            pata2gOso.clearTint();
            pata3gOso.clearTint();
        });

        this.input.on('drop', function (pointer, gameObject, dropZone) {
            if (gameObject.texture.key == 'cuerpoOso' && dropZone.texture.key == 'cuerpogOso') {
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;
                gameObject.input.enabled = false;
                cuerpogOso.clearTint();
                aciertos += 1;
                toc_audio.play();
            } else if (gameObject.texture.key == 'pata2Oso' && dropZone.texture.key == 'pata2gOso') {
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;
                gameObject.input.enabled = false;
                dropZone.input.enabled = false;
                pata2gOso.clearTint();
                aciertos += 1;
                toc_audio.play();
            } else if (gameObject.texture.key == 'pata3Oso' && dropZone.texture.key == 'pata3gOso') {
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;
                gameObject.input.enabled = false;
                dropZone.input.enabled = false;
                pata3gOso.clearTint();
                aciertos += 1;
                toc_audio.play();
            } else if (gameObject.texture.key == 'cabezaOso' && dropZone.texture.key == 'cabezagOso') {
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;
                gameObject.input.enabled = false;
                dropZone.input.enabled = false;
                cabezagOso.clearTint();
                aciertos += 1;
                toc_audio.play();
            } else {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
                cuerpogOso.clearTint();
                pata2gOso.clearTint();
                pata3gOso.clearTint();
                cabezagOso.clearTint();
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
                game_level_name: "Oso",
                game_name: "ROMPECABEZAS Y FIGURAS",
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
            this.scene.start('GameMenu');
        }, this);
    },

    update: function () {
        if (aciertos == 4) {

            hoy2 = new Date();
            tiempo = (diff_time(hoy2, hoy1));

            let data = {
                game_person: person_id,
                game_level_name: "Oso",
                game_name: "ROMPECABEZAS Y FIGURAS",
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

            this.scene.start('EndGame');
        }
    },
});