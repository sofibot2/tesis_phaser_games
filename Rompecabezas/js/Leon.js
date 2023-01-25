var Leon = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Leon() {
            Phaser.Scene.call(this, { key: 'Leon' });
        },

    preload: function () {

        this.load.image('leon', './images/leon/leonCompleto.png');

        this.load.image('cuerpo', './images/leon/cuerpo.png');
        this.load.image('cola', './images/leon/cola.png');
        this.load.image('melena', './images/leon/melena.png');
        this.load.image('cabeza', './images/leon/cabeza.png');

        this.load.image('cuerpog', './images/leon/cuerpog.png');
        this.load.image('colag', './images/leon/colag.png');
        this.load.image('melenag', './images/leon/melenag.png');
        this.load.image('cabezag', './images/leon/cabezag.png');
    },

    create: function () {
        this.start;
        aciertos = 0;
        attempts = 0;
        intentos = 4;
        animal = 'leon';
        hoy1 = new Date();

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        toc_audio = this.sound.add('toc');
        error_audio = this.sound.add('error');

        //Background
        this.cameras.main.setBackgroundColor('#186B99');
        /* var background = this.add.sprite(0, 0, 'bg').setInteractive();
        background.setOrigin(0);
        background.setDisplaySize(this.cameras.main.width, this.cameras.main.height); */

        var background_instructions = this.add.sprite(0, 0, 'frame').setInteractive();
        background_instructions.setOrigin(0);
        background_instructions.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        var puntuacion = this.add.image(screenCenterX, screenCenterY * 0.13, 'puntuacion').setInteractive();
        puntuacion.setScale(0.25);
        attemptsText = this.add.text(screenCenterX - 5, screenCenterY * 0.10, '0', { fontSize: '25px Arial Black', fill: '#fff' });

        //var leon = this.add.image(screenCenterX, screenCenterY, 'leon').setInteractive();
        //leon.setScale(0.25);

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

        var colag = this.add.image(screenCenterX + 67, screenCenterY + 45, 'colag').setInteractive();
        colag.setScale(0.25);
        colag.input.dropZone = true;
        var cuerpog = this.add.image(screenCenterX - 26, screenCenterY + 72, 'cuerpog').setInteractive();
        cuerpog.setScale(0.25);
        cuerpog.input.dropZone = true;
        var melenag = this.add.image(screenCenterX - 26, screenCenterY - 44, 'melenag').setInteractive();
        melenag.setScale(0.25);
        melenag.input.dropZone = true;
        var cabezag = this.add.image(screenCenterX - 29, screenCenterY - 50, 'cabezag').setInteractive();
        cabezag.setScale(0.25);
        cabezag.input.dropZone = true;

        var cola = this.add.image(screenCenterX * 1.5, screenCenterY * 0.3, 'cola').setInteractive();
        cola.setScale(0.25);
        this.input.setDraggable(cola);

        var cuerpo = this.add.image(screenCenterX * 1.5, screenCenterY * 1.7, 'cuerpo').setInteractive();
        cuerpo.setScale(0.25);
        this.input.setDraggable(cuerpo);

        var melena = this.add.image(screenCenterX * 0.6, screenCenterY * 1.7, 'melena').setInteractive();
        melena.setScale(0.25);
        this.input.setDraggable(melena);

        var cabeza = this.add.image(screenCenterX * 0.5, screenCenterY * 0.3, 'cabeza').setInteractive();
        cabeza.setScale(0.25);
        this.input.setDraggable(cabeza);

        cola.on('pointerover', function () {
            this.setTint(0x00ff00);
        });
        cola.on('pointerout', function () {
            this.clearTint();
        });
        cuerpo.on('pointerover', function () {
            this.setTint(0x00ff00);
        });
        cuerpo.on('pointerout', function () {
            this.clearTint();
        });
        melena.on('pointerover', function () {
            this.setTint(0x00ff00);
        });
        melena.on('pointerout', function () {
            this.clearTint();
        });
        cabeza.on('pointerover', function () {
            this.setTint(0x00ff00);
        });
        cabeza.on('pointerout', function () {
            this.clearTint();
        });

        //-----------------------------------------------------------------------------------------------------

        this.input.on('dragstart', function (pointer, gameObject) {
            //this.children.bringToTop(gameObject);
            if (gameObject.texture.key == 'melena') {
                this.children.bringToTop(cabezag);
            }
        }, this);

        // DRAG ELEMENTS
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
            //console.log(gameObject.texture.key);
            //console.log(gameObject.x);
            //console.log(gameObject.y);
        });

        this.input.on('dragenter', function (pointer, gameObject, dropZone) {
            if (dropZone.texture.key == 'cuerpog') {
                cuerpog.setTint(000100);
            } else if (dropZone.texture.key == 'colag') {
                colag.setTint(000100);
            } else if (dropZone.texture.key == 'melenag') {
                melenag.setTint(000100);
            } else if (dropZone.texture.key == 'cabezag') {
                cabezag.setTint(000100);
            }
        });

        this.input.on('dragleave', function (pointer, gameObject, dropZone) {
            cuerpog.clearTint();
            colag.clearTint();
            melenag.clearTint();
            cabezag.clearTint();
        });

        this.input.on('drop', function (pointer, gameObject, dropZone) {
            if (gameObject.texture.key == 'cuerpo' && dropZone.texture.key == 'cuerpog') {
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;
                gameObject.input.enabled = false;
                cuerpog.clearTint();
                console.log(dropZone.texture.key);
                aciertos += 1;
                toc_audio.play();
            } else if (gameObject.texture.key == 'cola' && dropZone.texture.key == 'colag') {
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;
                gameObject.input.enabled = false;
                colag.clearTint();
                console.log(dropZone.texture.key);
                aciertos += 1;
                toc_audio.play();
            } else if (gameObject.texture.key == 'melena' && dropZone.texture.key == 'melenag') {
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;
                gameObject.input.enabled = false;
                melenag.clearTint();
                console.log(dropZone.texture.key);
                aciertos += 1;
                toc_audio.play();
            } else if (gameObject.texture.key == 'cabeza' && dropZone.texture.key == 'cabezag') {
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;
                gameObject.input.enabled = false;
                dropZone.input.enabled = false;
                cabezag.clearTint();
                console.log(dropZone.texture.key);
                aciertos += 1;
                toc_audio.play();
            } else {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
                colag.clearTint();
                cuerpog.clearTint();
                melenag.clearTint();
                cabezag.clearTint();
                error_audio.play();
            }
            //console.log(dropZone.texture.key);
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
                game_level_name: "León",
                game_name: "ROMPECABEZAS Y FIGURAS",
                game_level: 1,
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
                game_level_name: "León",
                game_name: "ROMPECABEZAS Y FIGURAS",
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

            this.scene.start('EndGame');
        }
    },
});