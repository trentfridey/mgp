// client-side js


$('document').ready(function(){
  // Load the board
  var matrix = [];
  var boardHtml = "";
  var pixels = 840*600/144;
  for(var i=0; i < pixels; i++){
    boardHtml = boardHtml.concat("<div class='cell' id='pixel" + i +"'></div>")
  } // id runs 0 through 3499
  $(".board").html(boardHtml);
  
  //  Game logic
  var timeout;
  var data;
  // Get the rule data
  var jqxhr = $.get('/data','',function(res){ console.log('loaded')}, 'json').done(function(d){data = d; console.log(data)})
  function game(){
    var genRules = data.genRule;
    var boxRules = data.boxRule;
    var toAlive = [];
    var toDead = [];
    for(var l = 0; l < pixels; l++){ // loop through all pixels on board
      var row = Math.floor(l/70);
      var col = l-(Math.floor(l/70)*70);
      var neighbors = [];
      var aliveNeighbors = 0;
        for(var m = Math.max(row-1,0); m < Math.min(row+2,50); m++){
          var neighborRow = m-Math.max(row-1,0);
          for(var n = Math.max(col-1,0); n < Math.min(col+2,70); n++){
            var neighborCol = n-Math.max(col-1, 0);
            if(m*70+n !== l){
              if($("#pixel"+(m*70+n)).attr("class") == "cell alive"){
                aliveNeighbors++; // accumulate alive neighbor count for general rule check
                neighbors.push(true); // build array of alive neighbors for box rule check
              }
              else {
                neighbors.push(false);
              }
            }
          }
        }
      if($("#pixel"+l).attr("class") == "cell alive"){
        var stayAliveRule = false;
        var toDeadRule;
        for(var a in genRules.stayAlive){
          stayAliveRule =  stayAliveRule || (aliveNeighbors == genRules.stayAlive[a].current)
          // loop through general stayAlive rules, if we meet one criteria, it stays alive 
        }
        var boxAliveRule = true;
        var boxAliveRuleNotEmpty = false;
        for(var b in boxRules.stayAlive){
          var keys = Object.keys(boxRules.stayAlive[b])
          for(var c in keys){
            // compare neighbors' states to box rule states
            if(boxRules.stayAlive[b][keys[c]] !== neighbors[c]){
              boxAliveRule = false;
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
      else if($("#pixel"+l).attr("class") !== "cell alive"){
        var toAliveRule = false;
        for(var s in genRules.toAlive){
          toAliveRule = toAliveRule || (aliveNeighbors == genRules.toAlive[s].current)
          // loop through toAlive criteria, if we meet one, it goes alive
        }
        var boxAliveRule = true;
        var boxAliveRuleNotEmpty = false;
        for(var b in boxRules.toAlive){
          var keys = Object.keys(boxRules.toAlive[b])
          for(var c in keys){
            // compare neighbors' states to box rule states
            if(boxRules.toAlive[b][keys[c]] !== neighbors[c]){
              boxAliveRule = false;
            }
            boxAliveRuleNotEmpty = boxAliveRuleNotEmpty || boxRules.toAlive[b][keys[c]]
            // check for empty box rule
          }
        }
        if(boxAliveRuleNotEmpty){
          toAliveRule = toAliveRule || boxAliveRule
        }
        if(toAliveRule){
          toAlive.push(l);
        }
      }
    }
    for(var q in toAlive){
      $("#pixel"+toAlive[q]).addClass("alive");      
    }
    for(var r in toDead){
      $("#pixel"+toDead[r]).removeClass("alive");
    }
    timeout = setTimeout(game,500);
  }
  
  var init = false;
  $("#start").click(function(){
    if(!init){
      for(var j = 0; j < pixels; j++){
        if(Math.floor(Math.random()*2)){
          $("#pixel"+j).addClass("alive");
        }
      }
      init = true;
    }
      game();
  });
  
  $("#stop").click(function(){
    clearInterval(timeout);
  });
  
  $("#reset").click(function(){
    for(var k = 0; k < pixels; k++){
      $("#pixel"+k).removeClass("alive");
    }
    clearInterval(timeout);
    init = false;
  });
});