Array.prototype.shuffle = function () {
    var n = this.length;
    while (n--) {
        var i = Math.floor(n * Math.random());
        var tmp = this[i];
        this[i] = this[n];
        this[n] = tmp;

    }
    return this;
}

GameStates.Game = function (game) {
    console.log(game);
    this.platforms = null;
    this.cursors = null;
    this.card = null;
    this.nCurrentIndex = 0;
    this.student = null;

    this.suit = ['spades', 'hearts', 'diamonds', 'clubs'];
    this.ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '1'];

};

GameStates.Game.prototype = {

    create: function () {

        this.game.add.sprite(0, 0, 'table');

        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;
        
        this.init();
        
        this.avatarsEffect();
       
    },

    init: function () {
        
        this.card = this.game.add.group();
        var randomIndex = Math.floor(Math.random() * this.card.length);
        for (var i = 0; i < this.suit.length; i++) {
            for (var j = 0; j < this.ranks.length; j++) {

                
                var cards = this.card.create(this.world.centerX, -100 * j, this.ranks[j] + '_of_' + this.suit[i]);

                cards.anchor.setTo(0.5, 0.5);
                cards.scale.setTo(0.4, 0.4);
                cards.inputEnabled = true;
            }
        }
        this.card.children.shuffle();

        for (var i = 0; i < this.card.children.length; i++) {
            var card = this.card.children[i];
            var cardAction = this.game.add.tween(card);
            cardAction.to({ y: this.world.centerY }, 300, Phaser.Easing.Out, true);

            card.events.onInputDown.add(this.clickedCards, this);
        }

        console.debug('this.card', this.card);
    },

    

    clickedCards: function (selectCard) {

        var selectCardAction = this.game.add.tween(selectCard),
            xAniNum = 70,
            yAniNum = this.world.centerY;


        switch (this.nCurrentIndex % 4) {
            case 0:
                xAniNum = 70;
                yAniNum = this.world.centerY;
                this.student.animations.play('walkBack', 20, true);
                break;

            case 1:
                xAniNum = this.world.centerX;
                yAniNum = 80;
                this.student.animations.play('walkSide1', 20, true);
                break;
            case 2:
                xAniNum = 730;
                yAniNum = this.world.centerY;
                this.student.animations.play('walkSide2', 20, true);
                break;
            case 3:
                xAniNum = this.world.centerX;
                yAniNum = 520;
                this.student.animations.play('walkFront', 20, true);
                break;
        }

        selectCardAction.to({ x: xAniNum, y: yAniNum }, 300, Phaser.Easing.Out);
        selectCardAction.start();

        if (this.nCurrentIndex >= this.card.length) {
            selectCardAction.stop();
            this.student.animations.stop();
            selectCard.inputEnabled = false;
            console.log(selectCard)
        } else {
            this.nCurrentIndex++;
        }

        console.debug('nCurrentIndex', this.nCurrentIndex);
;
    },

    avatarsEffect: function () {
        this.student = this.game.add.tileSprite(0, 0, 64, 64, 'student');
        this.student.animations.add('walkBack', [0, 1, 2, 3, 4, 5, 6, 7, 8]);
        this.student.animations.add('walkSide1', [9, 10, 11, 12, 13, 14, 15, 16, 17]);
        this.student.animations.add('walkFront', [18, 19, 20, 21, 22, 23, 24, 25, 26]);
        this.student.animations.add('walkSide2', [27, 28, 29, 30, 31, 32, 33, 34, 35]);
    },
   
    update: function () {
    },

    render: function () {
     //   this.game.debug.inputInfo(32, 32);
    },
};
