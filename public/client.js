// client-side js
document.addEventListener('DOMContentLoaded', function(){
  var canvas = document.getElementById('canvas');
  var gridCanvas = document.getElementById('grid');
  var ctx = canvas.getContext('2d');
  var gctx = gridCanvas.getContext('2d');
  
  var sqdim = 10;
  var cols = 84;
  var rows = 60;
  var xCoord = (function(){var arrX = []; for(var i=0; i<840; i+=10){arrX.push(i-0.5)} return arrX})();
  var yCoord = (function(){var arrY = []; for(var j=0; j<600; j+=10){arrY.push(j-0.5)} return arrY})();
  
  // Init grid
  var grid = new Path2D();
  function strokeGrid(){
    for(var k in xCoord){
      for(var l in yCoord){
        grid.rect(xCoord[k], yCoord[l], sqdim, sqdim)
      }
    }
    gctx.strokeStyle = 'gray';
    gctx.stroke(grid);
  }
  strokeGrid();
  
  // Pixel config
  function fillSq(x, y){
    ctx.fillRect(x+0.5,y+0.5, sqdim-1, sqdim-1)
  }
  
  var pixelsIndex = (function(){var p = []; for(var n=1; n<=84*60; n++){p.push(n)} return p})();
  var pixelNum = pixelsIndex.length;
  var pixels = (function(){var pi = {}; for(var o in pixelsIndex){pi["pixel"+o] = {alive: false}} return pi})();
  
  // Game Controls
  var init = false;
  $("#start").click(function(){
    if(!init){
      ctx.fillStyle = 'orange';
      for(var q in pixelsIndex){
        var row = Math.floor(q/84);
        var col = q-row*84;
        if(Math.floor(Math.random()*2)){ // init in random state
          fillSq(xCoord[col], yCoord[row]);
          pixels["pixel" + q].alive = true;
        }
      }
      init = true;
    }
    game(); // start game
  });
  
  $("#stop").click(function(){
    clearInterval(timeout);
  });
  
  $("#reset").click(function(){
    ctx.fillStyle = 'white';
    for(var t in pixelsIndex){
      console.log(t);
      var row = Math.floor(t/84);
      var col = t-row*84;
      fillSq(xCoord[col], yCoord[row])
      pixels["pixel" + t].alive = false;
    }
    clearInterval(timeout);
    init = false;
  });
  
  //Game Logic
  var timeout;
  var data;
  // Get the rule data
  var jqxhr = $.get('/data','',function(res){ console.log('loaded')}, 'json').done(function(d){data = d;})
 // var fsArr = ["rgba(255,0,0,0.7)","rgba(255,171,0,0.7)","rgba(255,255,0,0.7)","rgba(0,255,0,0.7)","rgba(0,0,255,0.7)","rgba(0,171,255,0.7)","rgba(0,255,255,0.7)","rgba(255,255,255,0.7)"]
 // var fsPixArr = [];
  function game(){
    var genRules = data.genRule;
    var boxRules = data.boxRule;
    var toAlive = [];
    var toDead = [];
    for(var l = 0; l < pixelNum; l++){
      var row = Math.floor(l/84);
      var col = l-(Math.floor(l/84)*84);
      var aliveNeighbors = 0;
      var neighbors = [];
        for(var m = Math.max(row-1,0); m < Math.min(row+2, 36); m++){
          for(var n = Math.max(col-1,0); n < Math.min(col+2, 84); n++){
            if(m*84+n !== l){
              if(pixels["pixel"+(m*84+n)].alive === true){
                aliveNeighbors++; // accumulate alive neighbor count for general rule check
                neighbors.push(true); // build array of alive neighbors for box rule check
              }
              else {
                neighbors.push(false);
              }
            }
          }
        }
     // fsPixArr.push(fsArr[aliveNeighbors]);
    if(pixels["pixel"+l].alive){
        var stayAliveRule = false;
        var toDeadRule;
        for(var a in genRules.stayAlive){
          stayAliveRule =  stayAliveRule || (aliveNeighbors == genRules.stayAlive[a].current)
          // loop through general stayAlive rules, if we meet one criteria, it stays alive 
        }
        var boxAliveRule = true;
        var boxAliveRuleNotEmpty = false;
        loopStayAlive:
        for(var b in boxRules.stayAlive){
          var keys = Object.keys(boxRules.stayAlive[b])
          loopStayAlivePixels:
          for(var c in keys){
            // compare neighbors' states to box rule states
            if(boxRules.stayAlive[b][keys[c]] !== neighbors[c]){
              boxAliveRule = false;
              break loopStayAlivePixels;
              // if they don't match, then the rule isn't satisfied
            }
            boxAliveRuleNotEmpty = boxAliveRuleNotEmpty || boxRules.stayAlive[b][keys[c]]
            // this checks for the case that the box rule was left empty,
            // which isn't considered a valid rule (it's pretty boring anyway, trust me)
          }
        }
        if(boxAliveRuleNotEmpty){
          stayAliveRule = stayAliveRule || boxAliveRule
          // rule check must meet either one or both criteria for staying alive
        }
        toDeadRule = !stayAliveRule 
        if(toDeadRule){
          toDead.push(l);
        }
      }
      else if(!pixels["pixel"+l].alive){
        var toAliveRule = false;
        for(var s in genRules.toAlive){
          toAliveRule = toAliveRule || (aliveNeighbors == genRules.toAlive[s].current)
          // loop through toAlive criteria, if we meet one, it goes alive
        }
        var boxAliveRule = true;
        var boxAliveRuleNotEmpty = false;
        loopToAlive:
        for(var b in boxRules.toAlive){ 
          var keys = Object.keys(boxRules.toAlive[b])
          loopToAlivePixels:
          for(var c in keys){
            // compare neighbors' states to box rule states
            if(boxRules.toAlive[b][keys[c]] !== neighbors[c]){
              boxAliveRule = false; // pixel's neighbors do not match particular box rule
              break loopToAlivePixels;
            }
            boxAliveRuleNotEmpty = boxAliveRuleNotEmpty || boxRules.toAlive[b][keys[c]]
            // checks for empty box rule, like the previous case
            // operands will be false unless a box rule is present
          }
        }
        if(boxAliveRuleNotEmpty){
          toAliveRule = toAliveRule || boxAliveRule
          // will be true if pixel's neighbors match any box rules
        }
        if(toAliveRule){
          toAlive.push(l);
        }
      }
    }
    for(var v in toDead){
      pixels["pixel"+toDead[v]].alive = false;
    }
    for(var w in toAlive){
      pixels["pixel"+toAlive[w]].alive = true;
    }
    
    ctx.fillStyle = 'orange';
    for(var u in pixelsIndex){
      var row = Math.floor(u/84);
      var col = u-row*84;
      if(pixels["pixel"+u].alive){
        fillSq(xCoord[col], yCoord[row])
      }
    }
    ctx.fillStyle = 'white';
    for(var x in pixelsIndex){
      var row = Math.floor(x/84);
      var col = x-row*84;
      if(!pixels["pixel"+x].alive){
        fillSq(xCoord[col], yCoord[row])
      }
    }
    
    timeout = setTimeout(game, 25);
  }
  
})
