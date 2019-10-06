$(document).ready(function() {
  var playerChosen = false;
  var opponentChosen = false;
  var charDefeated = false;
  var newAttk = 0;
  var winCount = 0;
  var Characters = [
    {
      name: "Princess Stanzy",
      image: "<img id='CharImg' src='assets/images/stanzleia.png'>",
      hp: Math.floor(Math.random() * 300) + 100, //generates HP between 100-300
      attack: Math.floor(Math.random() * 30) + 10, //generates attack power between 1-100
      isPlayer: false,
      isOpponent: false,
      isDefeated: false
    },
    {
      name: "Commander Biz",
      image: "<img id='CharImg' src='assets/images/commanderbiz.png'>",
      hp: Math.floor(Math.random() * 300) + 100, //generates HP between 100-300
      attack: Math.floor(Math.random() * 30) + 10, //generates attack power between 1-100
      isPlayer: false,
      isOpponent: false,
      isDefeated: false
    },

    {
      name: "Peanut the Rebel",
      image: "<img id='CharImg' src='assets/images/peanutrebel.png'>",
      hp: Math.floor(Math.random() * 300) + 100, //generates HP between 100-300
      attack: Math.floor(Math.random() * 30) + 10, //generates attack power between 1-100
      isPlayer: false,
      isOpponent: false,
      isDefeated: false
    },

    {
      name: "Darth Laser",
      image: "<img id='CharImg' src='assets/images/darthlaser.png'>",
      hp: Math.floor(Math.random() * 300) + 100, //generates HP between 100-300
      attack: Math.floor(Math.random() * 30) + 10, //generates attack power between 1-100
      isPlayer: false,
      isOpponent: false,
      isDefeated: false
    }
  ];

  for (var i = 0; i < Characters.length; i++) {
    console.log(Characters[i]);
  }

  function GenChars() {
    for (var i = 0; i < Characters.length; i++) {
      //for loop to append characters to choose div
      var charCont = $("<div class='charClass col' id='Char" + i + "'></div>");
      charCont.attr("value", i);
      // $(charCont).attr("attack-val", Characters[i].attack); //gets attack value from Characters
      //$(charCont).attr("health-val", Characters[i].hp)
      $("#choose-char").append(charCont);
      charCont.append("<h3 id=#name>" + Characters[i].name + "</h3>");
      charCont.append(Characters[i].image);
      charCont.append("<h4 id= 'charHP'>" + Characters[i].hp + "</h4>");
      console.log("attack", charCont.attr("attack-val"));
      console.log("HP", charCont.attr("health-val"));
    }
  }

  GenChars();

  $(document).on("click", ".charClass", function() {
    console.log("Player" + playerChosen + "Opponent" + opponentChosen);
    console.log($(this));
    //on click character chosen to player array
    if (!playerChosen) {
      $("#choose-op-cont").show();
      var charIndex = $(this).attr("value"); //gets index of this in Characters[]
      Characters[charIndex].isPlayer = true;
      $(this).attr("id", "player"); //replaces Char[i] class from GenFunc
      $(this).removeClass("charClass");
      $(this).attr("char-attack", Characters[charIndex].attack);
      $(this).attr("new-attack", Characters[charIndex].attack); //gets attack value for player
      $("#player-div").append(this);
      $("#player-div").show();
      for (var i = 0; i < Characters.length; i++) {
        //loops through Characters [] to append remaining to choose-op-div
        if (Characters[i].isPlayer === false) {
          var charCont = $(
            "<div class='charClass col' id='Char" + i + "'></div>"
          );
          charCont.attr("value", i);
          //$(charCont).attr("attack-val", Characters[charIndex].attack); //gets attack value from Characters
          //$(charCont).attr("health-val", Characters[charIndex].hp)
          $("#choose-op-div").append(charCont);
          charCont.append("<h3 id=#name>" + Characters[i].name + "</h3>");
          charCont.append(Characters[i].image);
          charCont.append("<h4 id='charHP'>" + Characters[i].hp + "</h4>");
        }
        $("#choose-div").detach();
        playerChosen = true;
      }
    } else if (!opponentChosen) {
      //choose opponent logic
      opponentChosen = true; //toggles global boolean
      var charIndex = $(this).attr("value"); //gets index of this in Characters[]
      $(this).attr("opp-attack", Characters[charIndex].attack); //gets attack value for opponent
      $(this).attr("opp-health", Characters[charIndex].hp); //gets HP value for opponent
      Characters[charIndex].isOpponent = true; //toggles boolean within Characters index
      $(this).detach();
      $(this).attr("id", "opponent"); //replace id from genFunc
      $("#attack-div").show();
      $("#opp-Cont").append(this);
      $("#choose-op-cont").hide();
      console.log($(this));
    }
  });

  //attack onClick

  $(document).on("click", "#attack-button", function() {
    var oppAttk = parseInt($("#opponent").attr("opp-attack")); //opponent attack value
    var initAttk = parseInt($("#player").attr("char-attack")); //initial value for player attack
    newAttk = parseInt($("#player").attr("new-attack"));
    if (!charDefeated) {
      for (var i = 0; i < Characters.length; i++) {
        if (Characters[i].isPlayer === true) {
          Characters[i].attack = Characters[i].attack + initAttk; //increments attack power by itself
          $("#player").attr("new-attack", Characters[i].attack); //stores new attack value in golbal variable
          Characters[i].hp = Characters[i].hp - oppAttk;
          $("#player")
            .children("#charHP")
            .text(Characters[i].hp);
          if (Characters[i].hp <= 0) {
            alert("YOU LOST!!!");
            charDefeated = true;
            return;
          }
          console.log("initAttack");
          console.log(initAttk);
          console.log("Oppattk");
          console.log(oppAttk);
          console.log("player HP");
          console.log(Characters[i].hp);
          console.log("newAttk");
          console.log(newAttk);
        }

        if (
          Characters[i].isOpponent === true &&
          Characters[i].isDefeated === false
        ) {
          Characters[i].hp = Characters[i].hp - newAttk;
          $("#opponent")
            .children("#charHP")
            .text(Characters[i].hp);
          if (Characters[i].hp <= 0) {
            $("#choose-op-cont").show();
            $("#defeat-div").show();
            winCount++;
            console.log("wins: " + winCount);
            Characters[i].isDefeated = true;
            Characters[i].isOpponent = false;
            opponentChosen = false;
            if (winCount < 3) {
              $("#opponent").addClass("col");  
              $("#defeat-div").append($("#opponent").html());
              $("#opp-Cont").empty();
              $("#attack-div").hide();
              $("#opponent").attr("id", "defeated");
              console.log($("#defeated"));
            } else {
              $("#content-wrap").detach(); 
              $("#win-div").show();
            }
          }
        }
      }
    }
  });
});
