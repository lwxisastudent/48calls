'use strict';

module.exports = function(stage) {
      switch(stage.substr(-4)){
          case "_CGT":
          case "_CKG":
              return stage.slice(0,-4);
          default:
              return stage;
      }
}