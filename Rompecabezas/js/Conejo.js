var Conejo = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Conejo() {
            Phaser.Scene.call(this, { key: 'Conejo' });
        },

    preload: function () {

        this.load.image('conejo', './images/conejo/conejoCompleto.png');

        this.load.image('cuerpogConejo', './images/conejo/cuerpog.png');
        this.load.image('pata1gConejo', './images/conejo/pata1g.png');
        this.load.image('pata2gConejo', './images/conejo/pata2g.png');
        this.load.image('cabezagConejo', './images/conejo/cabezag.png');

        this.load.image('cuerpoConejo', './images/conejo/cuerpo.png');
        this.load.image('pata1Conejo', './images/conejo/pata1.png');
        this.load.image('pata2Conejo', './images/conejo/pata2.png');
        this.load.image('cabezaConejo', './images/conejo/cabeza.png');
    },

    create: function () {
        this.start;
        aciertos = 0;
        attempts = 0;
        intentos = 4;
        animal = 'conejo';
        hoy1 = new Date();

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        toc_audio = this.sound.add('toc');
        error_audio = this.sound.add('error');

        //Background
        this.cameras.main.setBackgroundColor('#38BF2C');

        var frame = this.add.sprite(0, 0, 'frame').setInteractive();
        frame.setOrigin(0);
        frame.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        var puntuacion = this.add.image(screenCenterX, screenCenterY * 0.13, 'puntuacion').setInteractive();
        puntuacion.setScale(0.25);
        attemptsText = this.add.text(screenCenterX - 5, screenCenterY * 0.10, '0', { fontSize: '25px Arial Black', fill: '#fff' });

        var botonSonido = this.add.sprite(screenCenterX * 1.8, screenCenterY * 0.2, 'botonSonido').setInteractive();
        botonSonido.setScale(0.15);

        var botonSinSonido = this.add.sprite(screenCenterX * 1.8, screenCenterY * 0.2, 'botonSinSonido').setInteractive();
        botonSinSonido.setScale(0.15);
        if (sonido) {
            botonSinSonido.visible = false;
        } else {
            botonSonido.visible = false;
        }

        var house = this.add.image(screenCenterX * 1.8, screenCenterY * 0.37, 'house').setInteractive();
        house.setScale(0.15);

        /* var conejo = this.add.image(screenCenterX, screenCenterY, 'conejo').setInteractive();
        conejo.setScale(0.32); */

        var cuerpogConejo = this.add.image(screenCenterX + 21, screenCenterY + 53, 'cuerpogConejo').setInteractive();
        cuerpogConejo.setScale(0.32);
        cuerpogConejo.input.dropZone = true;
        var cabezagConejo = this.add.image(screenCenterX - 23, screenCenterY - 57, 'cabezagConejo').setInteractive();
        cabezagConejo.setScale(0.32);
        cabezagConejo.input.dropZone = true;
        var pata1gConejo = this.add.image(screenCenterX - 19, screenCenterY + 90, 'pata1gConejo').setInteractive();
        pata1gConejo.setScale(0.32);
        pata1gConejo.input.dropZone = true;
        var pata2gConejo = this.add.image(screenCenterX + 69, screenCenterY + 89, 'pata2gConejo').setInteractive();
        pata2gConejo.setScale(0.32);
        pata2gConejo.input.dropZone = true;

        var cuerpoConejo = this.add.image(screenCenterX, screenCenterY * 1.68, 'cuerpoConejo').setInteractive();
        cuerpoConejo.setScale(0.32);
        this.input.setDraggable(cuerpoConejo);
        var cabezaConejo = this.add.image(screenCenterX * 0.7, screenCenterY * 0.4, 'cabezaConejo').setInteractive();
        cabezaConejo.setScale(0.32);
        this.input.setDraggable(cabezaConejo);
        var pata1Conejo = this.add.image(screenCenterX * 1.3, screenCenterY * 0.5, 'pata1Conejo').setInteractive();
        pata1Conejo.setScale(0.32);
        this.input.setDraggable(pata1Conejo);
        var pata2Conejo = this.add.image(screenCenterX * 1.7, screenCenterY * 0.8, 'pata2Conejo').setInteractive();
        pata2Conejo.setScale(0.32);
        this.input.setDraggable(pata2Conejo);

        cuerpoConejo.on('pointerover', function () {
            this.setTint(0x00ff00);
        });
        cuerpoConejo.on('pointerout', function () {
            this.clearTint();
        });
        cabezaConejo.on('pointerover', function () {
            this.setTint(0x00ff00);
        });
        cabezaConejo.on('pointerout', function () {
            this.clearTint();
        });
        pata1Conejo.on('pointerover', function () {
            this.setTint(0x00ff00);
        });
        pata1Conejo.on('pointerout', function () {
            this.clearTint();
        });
        pata2Conejo.on('pointerover', function () {
            this.setTint(0x00ff00);
        });
        pata2Conejo.on('pointerout', function () {
            this.clearTint();
        });

        //-----------------------------------------------------------------------------------------------------
        this.input.on('dragstart', function (pointer, gameObject) {
            if (gameObject.texture.key == 'cuerpoConejo') {
                this.children.bringToTop(cabezagConejo);
                this.children.bringToTop(pata1gConejo);
                this.children.bringToTop(pata2gConejo);
                this.children.bringToTop(cabezaConejo);
                this.children.bringToTop(pata1Conejo);
                this.children.bringToTop(pata2Conejo);
            }
        }, this);

        // DRAG ELEMENTS
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('dragenter', function (pointer, gameObject, dropZone) {
            if (dropZone.texture.key == 'cuerpogConejo') {
                cuerpogConejo.setTint(000100);
            } else if (dropZone.texture.key == 'cabezagConejo') {
                cabezagConejo.setTint(000100);
            } else if (dropZone.texture.key == 'pata1gConejo') {
                pata1gConejo.setTint(000100);
            } else if (dropZone.texture.key == 'pata2gConejo') {
                pata2gConejo.setTint(000100);
            }
        });

        this.input.on('dragleave', function (pointer, gameObject, dropZone) {
            cuerpogConejo.clearTint();
            cabezagConejo.clearTint();
            pata1gConejo.clearTint();
            pata2gConejo.clearTint();
        });

        this.input.on('drop', function (pointer, gameObject, dropZone) {
            if (gameObject.texture.key == 'cuerpoConejo' && dropZone.texture.key == 'cuerpogConejo') {
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;
                gameObject.input.enabled = false;
                dropZone.input.enabled = false;
                cuerpogConejo.clearTint();
                aciertos += 1;
                toc_audio.play();
            } else if (gameObject.texture.key == 'cabezaConejo' && dropZone.texture.key == 'cabezagConejo') {
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;
                gameObject.input.enabled = false;
                dropZone.input.enabled = false;
                cabezagConejo.clearTint();
                aciertos += 1;
                toc_audio.play();
            } else if (gameObject.texture.key == 'pata1Conejo' && dropZone.texture.key == 'pata1gConejo') {
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;
                gameObject.input.enabled = false;
                dropZone.input.enabled = false;
                pata1gConejo.clearTint();
                aciertos += 1;
                toc_audio.play();
            } else if (gameObject.texture.key == 'pata2Conejo' && dropZone.texture.key == 'pata2gConejo') {
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;
                gameObject.input.enabled = false;
                dropZone.input.enabled = false;
                pata2gConejo.clearTint();
                aciertos += 1;
                toc_audio.play();
            } else {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
                cuerpogConejo.clearTint();
                cabezagConejo.clearTint();
                pata1gConejo.clearTint();
                pata2gConejo.clearTint();
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
                game_level_name: "Conejo",
                game_name: "ROMPECABEZAS Y FIGURAS",
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

            this.scene.start('GameMenu');
        }, this);
    },

    update: function () {
        if (aciertos == 4) {

            hoy2 = new Date();
            tiempo = (diff_time(hoy2, hoy1));

            let data = {
                game_person: person_id,
                game_level_name: "Conejo",
                game_name: "ROMPECABEZAS Y FIGURAS",
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

            this.scene.start('EndGame');
        }
    },
});