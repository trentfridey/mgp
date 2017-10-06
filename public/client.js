// client-side js


$('document').ready(function(){
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
  var jqxhr = $.get('/data','',function(res){ console.log('loaded')}, 'json').done(function(d){data = d; console.log(data)})
  function game(){
    var genRules = data.genRule;
    var boxRules = data.boxRule;
    var toAlive = [];
    var toDead = [];
    for(var l = 0; l < pixels; l++){
      var row = Math.floor(l/70);
      var col = l-(Math.floor(l/70)*70);
      var aliveNeighbors = 0;
        for(var m = Math.max(row-1,0); m < Math.min(row+2,50); m++){
          for(var n = Math.max(col-1,0); n < Math.min(col+2,70); n++){
            if($("#pixel"+(m*70+n)).attr("class") == "cell alive"){
              if(m*70+n !== l){
                aliveNeighbors++;
              }
            }
          }
        }
      if($("#pixel"+l).attr("class") == "cell alive"){
        var stayAliveRule = false;
        var toDeadRule;
        for(var a in genRules.stayAlive){
          stayAliveRule =  stayAliveRule || (aliveNeighbors == genRules.stayAlive[a].current)
          toDeadRule = !stayAliveRule // Logical OR all conditions to alive, to dead rule is just the opposite
        }
        if(toDeadRule){
          toDead.push(l);
        }
      }
      else if($("#pixel"+l).attr("class") !== "cell alive"){
        var toAliveRule = false;
        for(var s in genRules.toAlive){
          toAliveRule = toAliveRule || (aliveNeighbors == genRules.toAlive[s].current)
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