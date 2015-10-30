// Preloader will load all of the assets like graphics and audio
GameStates.Preloader = function (game) {
    this.preloadBar = null;
    this.suit = ['spades', 'clubs', 'diamonds', 'hearts'];
    this.ranks = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];
}


GameStates.Preloader.prototype = {
    preload: function () {
        // common to add a loading bar sprite here...
        this.preloadBar = this.add.sprite(this.game.width / 2 - 100, this.game.height / 2, 'preloaderBar');
        this.load.setPreloadSprite(this.preloadBar);
        // load all game assets
        // images, spritesheets, atlases, audio etc..
        this.load.spritesheet('student', 'assets/spritesheets/student.png', 64, 64, 36);
        this.load.image('table', 'assets/bg_platform.png');
        
        for (var i = 0; i < this.suit.length; i++) {
            for (var j = 0; j < this.ranks.length; j++) {
                this.load.image(this.ranks[j] + '_of_' + this.suit[i], 'assets/svg_card/' + this.ranks[j] + '_of_' + this.suit[i] + '.svg');
            }
            
        }
    },

    create: function () {
        //call next state
        this.state.start('MainMenu');
        
        console.log('preloader');
    }
};