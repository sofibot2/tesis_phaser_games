var Buho = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Buho() {
            Phaser.Scene.call(this, { key: 'Buho' });
        },

    preload: function () {

        this.load.image('buho', './images/buho/buhoCompleto.png');

        this.load.image('cuerpogBuho', './images/buho/cuerpog.png');
        this.load.image('cabezagBuho', './images/buho/cabezag.png');
        this.load.image('patasgBuho', './images/buho/patasg.png');
        this.load.image('ala1gBuho', './images/buho/ala1g.png');
        this.load.image('ala2gBuho', './images/buho/ala2g.png');

        this.load.image('cuerpoBuho', './images/buho/cuerpo.png');
        this.load.image('cabezaBuho', './images/buho/cabeza.png');
        this.load.image('patasBuho', './images/buho/patas.png');
        this.load.image('ala1Buho', './images/buho/ala1.png');
        this.load.image('ala2Buho', './images/buho/ala2.png');
    },

    create: function () {
        this.start;
        aciertos = 0;
        attempts = 0;
        intentos = 5;
        animal = 'buho';
        hoy1 = new Date();

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        toc_audio = this.sound.add('toc');
        error_audio = this.sound.add('error');

        //Background
        this.cameras.main.setBackgroundColor('#F68431');

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

        /* var buho = this.add.image(screenCenterX, screenCenterY, 'buho').setInteractive();
        buho.setScale(0.25); */

        var cuerpogBuho = this.add.image(screenCenterX + 4, screenCenterY + 4, 'cuerpogBuho').setInteractive();
        cuerpogBuho.setScale(0.25);
        cuerpogBuho.input.dropZone = true;
        var patasgBuho = this.add.image(screenCenterX - 2, screenCenterY + 95, 'patasgBuho').setInteractive();
        patasgBuho.setScale(0.25);
        patasgBuho.input.dropZone = true;
        var cabezagBuho = this.add.image(screenCenterX + 14, screenCenterY - 41, 'cabezagBuho').setInteractive();
        cabezagBuho.setScale(0.25);
        cabezagBuho.input.dropZone = true;
        var ala1gBuho = this.add.image(screenCenterX - 71, screenCenterY + 55, 'ala1gBuho').setInteractive();
        ala1gBuho.setScale(0.25);
        ala1gBuho.input.dropZone = true;
        var ala2gBuho = this.add.image(screenCenterX + 71, screenCenterY + 53, 'ala2gBuho').setInteractive();
        ala2gBuho.setScale(0.25);
        ala2gBuho.input.dropZone = true;

        var cuerpoBuho = this.add.image(screenCenterX * 0.58, screenCenterY * 1.60, 'cuerpoBuho').setInteractive();
        cuerpoBuho.setScale(0.25);
        this.input.setDraggable(cuerpoBuho);
        var cabezaBuho = this.add.image(screenCenterX, screenCenterY * 0.42, 'cabezaBuho').setInteractive();
        cabezaBuho.setScale(0.25);
        this.input.setDraggable(cabezaBuho);
        var patasBuho = this.add.image(screenCenterX * 1.37, screenCenterY * 1.82, 'patasBuho').setInteractive();
        patasBuho.setScale(0.25);
        this.input.setDraggable(patasBuho);
        var ala1Buho = this.add.image(screenCenterX * 0.22, screenCenterY * 0.6, 'ala1Buho').setInteractive();
        ala1Buho.setScale(0.25);
        this.input.setDraggable(ala1Buho);
        var ala2Buho = this.add.image(screenCenterX * 1.83, screenCenterY, 'ala2Buho').setInteractive();
        ala2Buho.setScale(0.25);
        this.input.setDraggable(ala2Buho);

        cuerpoBuho.on('pointerover', function () {
            this.setTint(0x00ff00);
        });
        cuerpoBuho.on('pointerout', function () {
            this.clearTint();
        });
        patasBuho.on('pointerover', function () {
            this.setTint(0x00ff00);
        });
        patasBuho.on('pointerout', function () {
            this.clearTint();
        });
        cabezaBuho.on('pointerover', function () {
            this.setTint(0x00ff00);
        });
        cabezaBuho.on('pointerout', function () {
            this.clearTint();
        });
        ala1Buho.on('pointerover', function () {
            this.setTint(0x00ff00);
        });
        ala1Buho.on('pointerout', function () {
            this.clearTint();
        });
        ala2Buho.on('pointerover', function () {
            this.setTint(0x00ff00);
        });
        ala2Buho.on('pointerout', function () {
            this.clearTint();
        });

        //-----------------------------------------------------------------------------------------------------
        this.input.on('dragstart', function (pointer, gameObject) {
            if (gameObject.texture.key == 'cuerpoBuho') {
                this.children.bringToTop(cuerpogBuho);
                this.children.bringToTop(cabezagBuho);
                this.children.bringToTop(cabezaBuho);
                this.children.bringToTop(ala1Buho);
                this.children.bringToTop(ala2Buho);
            }
        }, this);

        // DRAG ELEMENTS
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('dragenter', function (pointer, gameObject, dropZone) {
            if (dropZone.texture.key == 'cuerpogBuho') {
                cuerpogBuho.setTint(000100);
            } else if (dropZone.texture.key == 'patasgBuho') {
                patasgBuho.setTint(000100);
            } else if (dropZone.texture.key == 'cabezagBuho') {
                cabezagBuho.setTint(000100);
            } else if (dropZone.texture.key == 'ala1gBuho') {
                ala1gBuho.setTint(000100);
            } else if (dropZone.texture.key == 'ala2gBuho') {
                ala2gBuho.setTint(000100);
            }
        });

        this.input.on('dragleave', function (pointer, gameObject, dropZone) {
            cuerpogBuho.clearTint();
            patasgBuho.clearTint();
            cabezagBuho.clearTint();
            ala1gBuho.clearTint();
            ala2gBuho.clearTint();
        });

        this.input.on('drop', function (pointer, gameObject, dropZone) {
            if (gameObject.texture.key == 'cuerpoBuho' && dropZone.texture.key == 'cuerpogBuho') {
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;
                gameObject.input.enabled = false;
                dropZone.input.enabled = false;
                cuerpogBuho.clearTint();
                aciertos += 1;
                toc_audio.play();
            } else if (gameObject.texture.key == 'patasBuho' && dropZone.texture.key == 'patasgBuho') {
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;
                gameObject.input.enabled = false;
                dropZone.input.enabled = false;
                patasgBuho.clearTint();
                aciertos += 1;
                toc_audio.play();
            } else if (gameObject.texture.key == 'cabezaBuho' && dropZone.texture.key == 'cabezagBuho') {
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;
                gameObject.input.enabled = false;
                dropZone.input.enabled = false;
                cabezagBuho.clearTint();
                aciertos += 1;
                toc_audio.play();
            } else if (gameObject.texture.key == 'ala1Buho' && dropZone.texture.key == 'ala1gBuho') {
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;
                gameObject.input.enabled = false;
                dropZone.input.enabled = false;
                ala1gBuho.clearTint();
                aciertos += 1;
                toc_audio.play();
            } else if (gameObject.texture.key == 'ala2Buho' && dropZone.texture.key == 'ala2gBuho') {
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;
                gameObject.input.enabled = false;
                dropZone.input.enabled = false;
                ala2gBuho.clearTint();
                aciertos += 1;
                toc_audio.play();
            } else {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
                cuerpogBuho.clearTint();
                patasgBuho.clearTint();
                cabezagBuho.clearTint();
                ala1gBuho.clearTint();
                ala2gBuho.clearTint();
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
                game_level_name: "Buho",
                game_name: "ROMPECABEZAS Y FIGURAS",
                game_level: 7,
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
                game_level_name: "Buho",
                game_name: "ROMPECABEZAS Y FIGURAS",
                game_level: 7,
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