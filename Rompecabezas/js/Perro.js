var Perro = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Perro() {
            Phaser.Scene.call(this, { key: 'Perro' });
        },

    preload: function () {

        this.load.image('perro', './images/perro/perroCompleto.png');

        this.load.image('patasgPerro', './images/perro/patasg.png');
        this.load.image('cuerpogPerro', './images/perro/cuerpog.png');
        this.load.image('cabezagPerro', './images/perro/cabezag.png');
        this.load.image('caragPerro', './images/perro/carag.png');

        this.load.image('patasPerro', './images/perro/patas.png');
        this.load.image('cuerpoPerro', './images/perro/cuerpo.png');
        this.load.image('cabezaPerro', './images/perro/cabeza.png');
        this.load.image('caraPerro', './images/perro/cara.png');
    },

    create: function () {
        this.start;
        aciertos = 0;
        attempts = 0;
        intentos = 4;
        animal = 'perro';
        hoy1 = new Date();

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        toc_audio = this.sound.add('toc');
        error_audio = this.sound.add('error');

        //Background
        this.cameras.main.setBackgroundColor('#C020DA');

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

        /* var perro = this.add.image(screenCenterX, screenCenterY, 'perro').setInteractive();
        perro.setScale(0.27); */

        var patasgPerro = this.add.image(screenCenterX, screenCenterY + 90.5, 'patasgPerro').setInteractive();
        patasgPerro.setScale(0.27);
        patasgPerro.input.dropZone = true;
        var cuerpogPerro = this.add.image(screenCenterX + 14, screenCenterY + 28, 'cuerpogPerro').setInteractive();
        cuerpogPerro.setScale(0.27);
        cuerpogPerro.input.dropZone = true;
        var cabezagPerro = this.add.image(screenCenterX, screenCenterY - 75, 'cabezagPerro').setInteractive();
        cabezagPerro.setScale(0.27);
        cabezagPerro.input.dropZone = true;
        var caragPerro = this.add.image(screenCenterX + 5, screenCenterY - 70, 'caragPerro').setInteractive();
        caragPerro.setScale(0.27);
        caragPerro.input.dropZone = true;

        var patasPerro = this.add.image(screenCenterX * 0.4, screenCenterY * 1.6, 'patasPerro').setInteractive();
        patasPerro.setScale(0.27);
        this.input.setDraggable(patasPerro);
        var cuerpoPerro = this.add.image(screenCenterX * 0.48, screenCenterY * 0.4, 'cuerpoPerro').setInteractive();
        cuerpoPerro.setScale(0.27);
        this.input.setDraggable(cuerpoPerro);
        var cabezaPerro = this.add.image(screenCenterX * 1.3, screenCenterY * 1.7, 'cabezaPerro').setInteractive();
        cabezaPerro.setScale(0.27);
        this.input.setDraggable(cabezaPerro);
        var caraPerro = this.add.image(screenCenterX * 1.3, screenCenterY * 0.4, 'caraPerro').setInteractive();
        caraPerro.setScale(0.27);
        this.input.setDraggable(caraPerro);

        patasPerro.on('pointerover', function () {
            this.setTint(0x00ff00);
        });
        patasPerro.on('pointerout', function () {
            this.clearTint();
        });
        cuerpoPerro.on('pointerover', function () {
            this.setTint(0x00ff00);
        });
        cuerpoPerro.on('pointerout', function () {
            this.clearTint();
        });
        cabezaPerro.on('pointerover', function () {
            this.setTint(0x00ff00);
        });
        cabezaPerro.on('pointerout', function () {
            this.clearTint();
        });
        caraPerro.on('pointerover', function () {
            this.setTint(0x00ff00);
        });
        caraPerro.on('pointerout', function () {
            this.clearTint();
        });

        //-----------------------------------------------------------------------------------------------------
        this.input.on('dragstart', function (pointer, gameObject) {
            if (gameObject.texture.key == 'patasPeero') {
                this.children.bringToTop(cuerpogPerro);
            }
            if (gameObject.texture.key == 'cabezaPerro') {
                this.children.bringToTop(caragPerro);
            }
        }, this);

        // DRAG ELEMENTS
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('dragenter', function (pointer, gameObject, dropZone) {
            if (dropZone.texture.key == 'patasgPerro') {
                patasgPerro.setTint(000100);
            } else if (dropZone.texture.key == 'cuerpogPerro') {
                cuerpogPerro.setTint(000100);
            } else if (dropZone.texture.key == 'cabezagPerro') {
                cabezagPerro.setTint(000100);
            } else if (dropZone.texture.key == 'caragPerro') {
                caragPerro.setTint(000100);
            }
        });

        this.input.on('dragleave', function (pointer, gameObject, dropZone) {
            patasgPerro.clearTint();
            cuerpogPerro.clearTint();
            cabezagPerro.clearTint();
            caragPerro.clearTint();
        });

        this.input.on('drop', function (pointer, gameObject, dropZone) {
            if (gameObject.texture.key == 'patasPerro' && dropZone.texture.key == 'patasgPerro') {
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;
                gameObject.input.enabled = false;
                dropZone.input.enabled = false;
                patasgPerro.clearTint();
                aciertos += 1;
                toc_audio.play();
            } else if (gameObject.texture.key == 'cuerpoPerro' && dropZone.texture.key == 'cuerpogPerro') {
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;
                gameObject.input.enabled = false;
                dropZone.input.enabled = false;
                cuerpogPerro.clearTint();
                aciertos += 1;
                toc_audio.play();
            } else if (gameObject.texture.key == 'cabezaPerro' && dropZone.texture.key == 'cabezagPerro') {
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;
                gameObject.input.enabled = false;
                dropZone.input.enabled = false;
                cabezagPerro.clearTint();
                aciertos += 1;
                toc_audio.play();
            } else if (gameObject.texture.key == 'caraPerro' && dropZone.texture.key == 'caragPerro') {
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;
                gameObject.input.enabled = false;
                dropZone.input.enabled = false;
                caragPerro.clearTint();
                aciertos += 1;
                toc_audio.play();
            } else {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
                patasgPerro.clearTint();
                cuerpogPerro.clearTint();
                cabezagPerro.clearTint();
                caragPerro.clearTint();
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
                game_level_name: "Perro",
                game_name: "ROMPECABEZAS Y FIGURAS",
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

            this.scene.start('GameMenu');
        }, this);
    },

    update: function () {
        if (aciertos == 4) {

            hoy2 = new Date();
            tiempo = (diff_time(hoy2, hoy1));

            let data = {
                game_person: person_id,
                game_level_name: "Perro",
                game_name: "ROMPECABEZAS Y FIGURAS",
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

            this.scene.start('EndGame');
        }
    },
});