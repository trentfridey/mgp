// client-side js

$('document').ready(function(){
  var matrix = [];
  var boardHtml = "";
  var pixels = 840*600/144;
  for(var i=0; i < pixels; i++){
    boardHtml = boardHtml.concat("<div class='cell dead' id='pixel" + i +"'></div>")
  } // id runs 0 through 3499
  $(".board").html(boardHtml);
  
  //  Game logic
  //  Rules:
      // - if a cell has 2 or 3 live neighbors and it is alive, it stays alive
      // - if a cell has 3 live neighbors and it is dead, it becomes alive
  var timeout;
  
  function game(){
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
      if($("#pixel"+l).attr("class") == "cell alive" && !(aliveNeighbors == 2 || aliveNeighbors == 3)){
          toDead.push(l);
        }
      else if($("#pixel"+l).attr("class") == "cell dead" && aliveNeighbors === 3){
          toAlive.push(l);
      }
    }
    for(var q in toAlive){
      $("#pixel"+toAlive[q]).removeClass("dead");
      $("#pixel"+toAlive[q]).addClass("alive");      
    }
    for(var r in toDead){
      $("#pixel"+toDead[r]).removeClass("alive");
      $("#pixel"+toDead[r]).addClass("dead");
    }
    timeout = setTimeout(game,250);
  }
  
  $("#start").click(function(){
      for(var j = 0; j < pixels; j++){
        if(Math.floor(Math.random()*2)){
          $("#pixel"+j).removeClass("dead");
          $("#pixel"+j).addClass("alive");
        }
      }
      game();
  });
  
  $("#stop").click(function(){
    clearInterval(timeout);
  });
  
  $("#clear").click(function(){
    for(var k = 0; k < pixels; k++){
      $("#pixel"+k).removeClass("alive");
    }
    clearInterval(timeout);
  });
});