var Tucan = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Tucan() {
            Phaser.Scene.call(this, { key: 'Tucan' });
        },

    preload: function () {

        this.load.image('tucan', './images/tucan/tucanCompleto.png');

        this.load.image('patasgTucan', './images/tucan/patasg.png');
        this.load.image('cuerpogTucan', './images/tucan/cuerpog.png');
        this.load.image('cabezagTucan', './images/tucan/cabezag.png');
        this.load.image('alagTucan', './images/tucan/alag.png');
        this.load.image('picogTucan', './images/tucan/picog.png');

        this.load.image('patasTucan', './images/tucan/patas.png');
        this.load.image('cuerpoTucan', './images/tucan/cuerpo.png');
        this.load.image('cabezaTucan', './images/tucan/cabeza.png');
        this.load.image('alaTucan', './images/tucan/ala.png');
        this.load.image('picoTucan', './images/tucan/pico.png');
    },

    create: function () {
        this.start;
        aciertos = 0;
        attempts = 0;
        intentos = 5;
        animal = 'tucan';
        hoy1 = new Date();

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        toc_audio = this.sound.add('toc');
        error_audio = this.sound.add('error');

        //Background
        this.cameras.main.setBackgroundColor('#868181');

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

        /* var tucan = this.add.image(screenCenterX, screenCenterY, 'tucan').setInteractive();
        tucan.setScale(0.25); */

        var patasgTucan = this.add.image(screenCenterX - 14, screenCenterY + 70, 'patasgTucan').setInteractive();
        patasgTucan.setScale(0.25);
        patasgTucan.input.dropZone = true;
        var cuerpogTucan = this.add.image(screenCenterX - 17, screenCenterY + 19, 'cuerpogTucan').setInteractive();
        cuerpogTucan.setScale(0.25);
        cuerpogTucan.input.dropZone = true;
        var cabezagTucan = this.add.image(screenCenterX + 26, screenCenterY - 58, 'cabezagTucan').setInteractive();
        cabezagTucan.setScale(0.25);
        cabezagTucan.input.dropZone = true;
        var alagTucan = this.add.image(screenCenterX - 34, screenCenterY - 9, 'alagTucan').setInteractive();
        alagTucan.setScale(0.25);
        alagTucan.input.dropZone = true;
        var picogTucan = this.add.image(screenCenterX + 91, screenCenterY - 51, 'picogTucan').setInteractive();
        picogTucan.setScale(0.25);
        picogTucan.input.dropZone = true;

        var patasTucan = this.add.image(screenCenterX * 1.32, screenCenterY * 1.82, 'patasTucan').setInteractive();
        patasTucan.setScale(0.25);
        this.input.setDraggable(patasTucan);
        var cuerpoTucan = this.add.image(screenCenterX * 0.62, screenCenterY * 1.6, 'cuerpoTucan').setInteractive();
        cuerpoTucan.setScale(0.25);
        this.input.setDraggable(cuerpoTucan);
        var cabezaTucan = this.add.image(screenCenterX * 1.39, screenCenterY * 0.55, 'cabezaTucan').setInteractive();
        cabezaTucan.setScale(0.25);
        this.input.setDraggable(cabezaTucan);
        var alaTucan = this.add.image(screenCenterX * 0.52, screenCenterY * 0.35, 'alaTucan').setInteractive();
        alaTucan.setScale(0.25);
        this.input.setDraggable(alaTucan);
        var picoTucan = this.add.image(screenCenterX * 1.55, screenCenterY * 1.50, 'picoTucan').setInteractive();
        picoTucan.setScale(0.25);
        this.input.setDraggable(picoTucan);

        patasTucan.on('pointerover', function () {
            this.setTint(0x00ff00);
        });
        patasTucan.on('pointerout', function () {
            this.clearTint();
        });
        cuerpoTucan.on('pointerover', function () {
            this.setTint(0x00ff00);
        });
        cuerpoTucan.on('pointerout', function () {
            this.clearTint();
        });
        cabezaTucan.on('pointerover', function () {
            this.setTint(0x00ff00);
        });
        cabezaTucan.on('pointerout', function () {
            this.clearTint();
        });
        alaTucan.on('pointerover', function () {
            this.setTint(0x00ff00);
        });
        alaTucan.on('pointerout', function () {
            this.clearTint();
        });
        picoTucan.on('pointerover', function () {
            this.setTint(0x00ff00);
        });
        picoTucan.on('pointerout', function () {
            this.clearTint();
        });

        //-----------------------------------------------------------------------------------------------------
        this.input.on('dragstart', function (pointer, gameObject) {
            if (gameObject.texture.key == 'cabezaTucan') {
                this.children.bringToTop(picogTucan);
            }
        }, this);

        // DRAG ELEMENTS
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('dragenter', function (pointer, gameObject, dropZone) {
            if (dropZone.texture.key == 'patasgTucan') {
                patasgTucan.setTint(000100);
            } else if (dropZone.texture.key == 'cuerpogTucan') {
                cuerpogTucan.setTint(000100);
            } else if (dropZone.texture.key == 'cabezagTucan') {
                cabezagTucan.setTint(000100);
            } else if (dropZone.texture.key == 'alagTucan') {
                alagTucan.setTint(000100);
            } else if (dropZone.texture.key == 'picogTucan') {
                picogTucan.setTint(000100);
            }
        });

        this.input.on('dragleave', function (pointer, gameObject, dropZone) {
            patasgTucan.clearTint();
            cuerpogTucan.clearTint();
            cabezagTucan.clearTint();
            alagTucan.clearTint();
            picogTucan.clearTint();
        });

        this.input.on('drop', function (pointer, gameObject, dropZone) {
            if (gameObject.texture.key == 'patasTucan' && dropZone.texture.key == 'patasgTucan') {
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;
                gameObject.input.enabled = false;
                dropZone.input.enabled = false;
                patasgTucan.clearTint();
                aciertos += 1;
                toc_audio.play();
            } else if (gameObject.texture.key == 'cuerpoTucan' && dropZone.texture.key == 'cuerpogTucan') {
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;
                gameObject.input.enabled = false;
                dropZone.input.enabled = false;
                cuerpogTucan.clearTint();
                aciertos += 1;
                toc_audio.play();
            } else if (gameObject.texture.key == 'cabezaTucan' && dropZone.texture.key == 'cabezagTucan') {
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;
                gameObject.input.enabled = false;
                dropZone.input.enabled = false;
                cabezagTucan.clearTint();
                aciertos += 1;
                toc_audio.play();
            } else if (gameObject.texture.key == 'alaTucan' && dropZone.texture.key == 'alagTucan') {
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;
                gameObject.input.enabled = false;
                dropZone.input.enabled = false;
                alagTucan.clearTint();
                aciertos += 1;
                toc_audio.play();
            } else if (gameObject.texture.key == 'picoTucan' && dropZone.texture.key == 'picogTucan') {
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;
                gameObject.input.enabled = false;
                dropZone.input.enabled = false;
                picogTucan.clearTint();
                aciertos += 1;
                toc_audio.play();
            } else {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
                patasgTucan.clearTint();
                cuerpogTucan.clearTint();
                cabezagTucan.clearTint();
                alagTucan.clearTint();
                picogTucan.clearTint();
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
                game_level_name: "Tucán",
                game_name: "ROMPECABEZAS Y FIGURAS",
                game_level: 8,
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
        if (aciertos == 5) {

            hoy2 = new Date();
            tiempo = (diff_time(hoy2, hoy1));

            let data = {
                game_person: person_id,
                game_level_name: "Tucán",
                game_name: "ROMPECABEZAS Y FIGURAS",
                game_level: 8,
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