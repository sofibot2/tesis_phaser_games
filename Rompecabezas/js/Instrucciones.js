var Instrucciones = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Instrucciones() {
        Phaser.Scene.call(this, { key: 'Instrucciones' });
    },

    create: function() {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        this.cameras.main.setBackgroundColor('#fff');
        var add = this.add;

        var house = this.add.image(screenCenterX, screenCenterY * 1.5, 'house').setInteractive();
        house.setScale(0.3);
        house.on('pointerover', function() {
            this.setScale(0.32);
        });
        house.on('pointerout', function() {
            this.setScale(0.3);
        });

        WebFont.load({
            google: {
                families: ['Yusei Magic', 'Kaushan Script']
            },

            active: function() {
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    // true for mobile device
                    add.text(screenCenterX, screenCenterY * 0.5, 'Rompecabezas \ncon figuras:', { fontFamily: 'Kaushan Script', fontSize: 26, color: '#F7931E', align: 'center' }).setShadow('#333333', 2, false, true).setOrigin(0.5);
                    add.text(screenCenterX, screenCenterY * 1, 'Utiliza cada figura geométrica \npara armar las imágenes. \nEsto te ayudará a mejorar tus \nfunciones ejecutivas', { fontFamily: 'Yusei Magic', fontSize: 20, color: '#42210B', align: 'center' }).setShadow('#333333', 2, false, true).setOrigin(0.5);
                } else {
                    add.text(screenCenterX, screenCenterY * 0.5, 'Rompecabezas \ncon figuras:', { fontFamily: 'Kaushan Script', fontSize: 26, color: '#F7931E', align: 'center' }).setShadow('#333333', 2, false, true).setOrigin(0.5);
                    add.text(screenCenterX, screenCenterY * 1, 'Utiliza cada figura geométrica \npara armar las imágenes. \nEsto te ayudará a mejorar tus \nfunciones ejecutivas.', { fontFamily: 'Yusei Magic', fontSize: 30, color: '#42210B', align: 'center' }).setShadow('#333333', 2, false, true).setOrigin(0.5);
                }
            },
        });

        house.once('pointerup', () => {
            this.scene.start('GameMenu');
        }, this);
        //this.input.once('pointerdown', this.start, this);
    },
    /* 
        start() {
            this.scene.start('GameMenu');
        } */
});