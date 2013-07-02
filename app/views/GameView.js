var GameView = Backbone.View.extend({

  className: 'game-view',

  events: {
    'click .new-game-button, .new-game-button-nav': 'newGame',
    'click .new-game-button, .new-game-button-nav, .close-button': 'closeEndGame'
  },

  initialize: function(){
    this.boardView = new BoardView({model: this.model.get('board')});
    this.gameScoreView = new GameScoreView({model: game});
    this.gameScoreboardView = new GameScoreboardView({model: game});
    this.endGameView = new EndGameView({model: game});

    this.model.on('change:newGame', function(){
      this.$el.children().detach();
      this.model.set('newGame', false);
      if(this.boardView) {
        this.boardView.remove();
      }
      this.model.set('board', new Board());
      this.boardView = new BoardView({model: this.model.get('board')});
      this.model.boardChangeListener();
      this.render();
    }, this);
  },

  render: function(){
    var html ='' +
      '<div class="navbar" id="nav1">' +
        '<div class="row">' +
          '<a class="toggle" gumby-trigger=".ul-nav" href="#"><i class="icon-menu"></i></a>' +
          '<h3 class="four columns logo">' +
            '<a href="index.html" class="main-logo">Link Thirty Six</a>' +
          '</h3>' +
          '<div class="logged-in-nav">' +
            '<ul class="eight columns ul-nav">' +
              '<li class="new-game-button-nav"><a href="#">New Game</a></li>' +
              '<li><a href="#" class="switch" gumby-trigger="#howToPlay">How to Play</a></li>' +
              '<li><a href="#">About</a></li>' +
            '</ul>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="modal" id="howToPlay">' +
        '<div class="content">' +
          '<a class="close switch close-button" gumby-trigger="|#howToPlay"><i class="icon-cancel-circled" /></i></a>' +
          '<div class="row">' +
            '<div class="ten columns centered center-text">' +
              '<h3>How to Play Link Thirty Six</h3>' +
              '<p>This is a two player game. Alternating turns, each player places their mark on a single board square, until the board is filled</p>' +
              '<p class="info-center"><span class="info-blue">Player 1: Blue X\'s</span><span class="info-red">Player 2: Red O\'s</span></p>' +
              '<p>Your objective is to make links of <strong>3 in a row, or more</strong>. Links can be made horizontally, vertically, or diagonally.</p>' +
              '<div class="link-scoring">' +
                '<p>Link Scoring:</p>' +
                '<p>3 in a row: 1 point</p>' +
                '<p>4 in a row: 3 points</p>' +
                '<p>5 in a row: 10 points</p>' +
                '<p>6 in a row: 20 points</p>' +
              '</div>' +
              '<p>The game is scored in real time, after every move. The Game Score board highlights the current game leader.</p>' +
              '<p>After each game, the Total Wins board updates to reflect the winner of the current game, and keeps track of the entire match.</p>' +
              '<p><strong>The first player to win 3 single games, wins the match!</strong></p>' +
              '<div class="btn primary medium lets-play"><a href="#" class="switch" gumby-trigger="|#howToPlay">Let\'s Play!</a></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    var clear = "<div class='clear'></div>";

    return this.$el.html([
      html,
      this.gameScoreboardView.$el,
      this.gameScoreView.$el,
      this.endGameView.$el,
      clear,
      this.boardView.$el
    ]);
  },

  newGame: function() {
    this.model.newBoard();
  },

  closeEndGame: function() {
    $('.end-game').fadeOut('fast');
  }
});
