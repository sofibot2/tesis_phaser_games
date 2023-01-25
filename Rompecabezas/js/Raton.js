var Raton = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Raton() {
            Phaser.Scene.call(this, { key: 'Raton' });
        },

    preload: function () {

        this.load.image('raton', './images/raton/ratonCompleto.png');

        this.load.image('cabezagRaton', './images/raton/cabezag.png');
        this.load.image('cuerpogRaton', './images/raton/cuerpog.png');
        this.load.image('quesogRaton', './images/raton/quesog.png');
        this.load.image('oreja1gRaton', './images/raton/oreja1g.png');
        this.load.image('narizgRaton', './images/raton/narizg.png');

        this.load.image('cabezaRaton', './images/raton/cabeza.png');
        this.load.image('cuerpoRaton', './images/raton/cuerpo.png');
        this.load.image('quesoRaton', './images/raton/queso.png');
        this.load.image('oreja1Raton', './images/raton/oreja1.png');
        this.load.image('narizRaton', './images/raton/nariz.png');
    },

    create: function () {
        this.start;
        aciertos = 0;
        attempts = 0;
        intentos = 5;
        animal = 'raton';
        hoy1 = new Date();

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        toc_audio = this.sound.add('toc');
        error_audio = this.sound.add('error');

        //Background
        this.cameras.main.setBackgroundColor('#3343DB');

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

        //var raton = this.add.image(screenCenterX, screenCenterY, 'raton').setInteractive();
        //raton.setScale(0.30);

        var cuerpogRaton = this.add.image(screenCenterX + 38, screenCenterY + 28, 'cuerpogRaton').setInteractive();
        cuerpogRaton.setScale(0.30);
        cuerpogRaton.input.dropZone = true;
        var cabezagRaton = this.add.image(screenCenterX + 12, screenCenterY - 53, 'cabezagRaton').setInteractive();
        cabezagRaton.setScale(0.30);
        cabezagRaton.input.dropZone = true;
        var narizgRaton = this.add.image(screenCenterX - 40, screenCenterY - 30, 'narizgRaton').setInteractive();
        narizgRaton.setScale(0.30);
        narizgRaton.input.dropZone = true;
        var quesogRaton = this.add.image(screenCenterX - 47, screenCenterY + 60, 'quesogRaton').setInteractive();
        quesogRaton.setScale(0.30);
        quesogRaton.input.dropZone = true;
        var oreja1gRaton = this.add.image(screenCenterX + 59, screenCenterY - 65, 'oreja1gRaton').setInteractive();
        oreja1gRaton.setScale(0.30);
        oreja1gRaton.input.dropZone = true;

        var cuerpoRaton = this.add.image(screenCenterX * 1.5, screenCenterY * 1.60, 'cuerpoRaton').setInteractive();
        cuerpoRaton.setScale(0.30);
        this.input.setDraggable(cuerpoRaton);
        var cabezaRaton = this.add.image(screenCenterX * 0.5, screenCenterY * 1.60, 'cabezaRaton').setInteractive();
        cabezaRaton.setScale(0.30);
        this.input.setDraggable(cabezaRaton);
        var quesoRaton = this.add.image(screenCenterX * 0.6, screenCenterY * 0.35, 'quesoRaton').setInteractive();
        quesoRaton.setScale(0.30);
        this.input.setDraggable(quesoRaton);
        var oreja1Raton = this.add.image(screenCenterX * 0.4, screenCenterY * 0.7, 'oreja1Raton').setInteractive();
        oreja1Raton.setScale(0.30);
        this.input.setDraggable(oreja1Raton);
        var narizRaton = this.add.image(screenCenterX * 1.3, screenCenterY * 0.4, 'narizRaton').setInteractive();
        narizRaton.setScale(0.30);
        this.input.setDraggable(narizRaton);

        cuerpoRaton.on('pointerover', function () {
            this.setTint(0x00ff00);
        });
        cuerpoRaton.on('pointerout', function () {
            this.clearTint();
        });
        cabezaRaton.on('pointerover', function () {
            this.setTint(0x00ff00);
        });
        cabezaRaton.on('pointerout', function () {
            this.clearTint();
        });
        narizRaton.on('pointerover', function () {
            this.setTint(0x00ff00);
        });
        narizRaton.on('pointerout', function () {
            this.clearTint();
        });
        quesoRaton.on('pointerover', function () {
            this.setTint(0x00ff00);
        });
        quesoRaton.on('pointerout', function () {
            this.clearTint();
        });
        oreja1Raton.on('pointerover', function () {
            this.setTint(0x00ff00);
        });
        oreja1Raton.on('pointerout', function () {
            this.clearTint();
        });

        //-----------------------------------------------------------------------------------------------------
        this.input.on('dragstart', function (pointer, gameObject) {
            if (gameObject.texture.key == 'cuerpoRaton') {
                this.children.bringToTop(cabezagRaton);
                this.children.bringToTop(cabezaRaton);
                this.children.bringToTop(oreja1gRaton);
                this.children.bringToTop(narizgRaton);
                this.children.bringToTop(quesogRaton);
                this.children.bringToTop(oreja1Raton);
                this.children.bringToTop(narizRaton);
                this.children.bringToTop(quesoRaton);
            }
            if (gameObject.texture.key == 'cabezaRaton') {
                this.children.bringToTop(cabezagRaton);
                this.children.bringToTop(cabezaRaton);
                this.children.bringToTop(oreja1gRaton);
                this.children.bringToTop(narizgRaton);
                this.children.bringToTop(oreja1Raton);
                this.children.bringToTop(narizRaton);
            }
        }, this);

        // DRAG ELEMENTS
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('dragenter', function (pointer, gameObject, dropZone) {
            if (dropZone.texture.key == 'cuerpogRaton') {
                cuerpogRaton.setTint(000100);
            } else if (dropZone.texture.key == 'cabezagRaton') {
                cabezagRaton.setTint(000100);
            } else if (dropZone.texture.key == 'oreja1gRaton') {
                oreja1gRaton.setTint(000100);
            } else if (dropZone.texture.key == 'narizgRaton') {
                narizgRaton.setTint(000100);
            } else if (dropZone.texture.key == 'quesogRaton') {
                quesogRaton.setTint(000100);
            }
        });

        this.input.on('dragleave', function (pointer, gameObject, dropZone) {
            cuerpogRaton.clearTint();
            cabezagRaton.clearTint();
            oreja1gRaton.clearTint();
            narizgRaton.clearTint();
            quesogRaton.clearTint();
        });

        this.input.on('drop', function (pointer, gameObject, dropZone) {
            if (gameObject.texture.key == 'cuerpoRaton' && dropZone.texture.key == 'cuerpogRaton') {
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;
                gameObject.input.enabled = false;
                dropZone.input.enabled = false;
                cuerpogRaton.clearTint();
                aciertos += 1;
                toc_audio.play();
            } else if (gameObject.texture.key == 'cabezaRaton' && dropZone.texture.key == 'cabezagRaton') {
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;
                gameObject.input.enabled = false;
                dropZone.input.enabled = false;
                cabezagRaton.clearTint();
                aciertos += 1;
                toc_audio.play();
            } else if (gameObject.texture.key == 'narizRaton' && dropZone.texture.key == 'narizgRaton') {
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;
                gameObject.input.enabled = false;
                dropZone.input.enabled = false;
                narizgRaton.clearTint();
                aciertos += 1;
                toc_audio.play();
            } else if (gameObject.texture.key == 'oreja1Raton' && dropZone.texture.key == 'oreja1gRaton') {
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;
                gameObject.input.enabled = false;
                dropZone.input.enabled = false;
                oreja1gRaton.clearTint();
                aciertos += 1;
                toc_audio.play();
            } else if (gameObject.texture.key == 'quesoRaton' && dropZone.texture.key == 'quesogRaton') {
                gameObject.x = dropZone.x;
                gameObject.y = dropZone.y;
                gameObject.input.enabled = false;
                dropZone.input.enabled = false;
                quesogRaton.clearTint();
                aciertos += 1;
                toc_audio.play();
            } else {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
                cuerpogRaton.clearTint();
                cabezagRaton.clearTint();
                narizgRaton.clearTint();
                oreja1gRaton.clearTint();
                quesogRaton.clearTint();
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
                game_level_name: "Ratón",
                game_name: "ROMPECABEZAS Y FIGURAS",
                game_level: 3,
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
                game_level_name: "Ratón",
                game_name: "ROMPECABEZAS Y FIGURAS",
                game_level: 3,
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