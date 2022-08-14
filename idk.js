//client code
function setup() {
    screenHeight = 500;
    screenWidth = 700;
    w = 60;
    h = 100;
    cnv = createCanvas(screenWidth, screenHeight);
    cnv.mouseClicked(click);
    createDeck();
    playerId = 1;
    //getHand()
    rect(10, 10, 100, 50);
    textAlign(CENTER);
    text("START", 60, 40);
    fill(0);
    cardPlacements = [];
    start();
  }
  
  function click() {
    // draw card
    if (mouseX > 365 && mouseX < 415 && mouseY > 200 && mouseY < 300) {
      addCard(playerId, 1);
      getHand();
    }
  
    // start
    else if (mouseX > 10 && mouseX < 150 && mouseY > 10 && mouseY < 60) {
      start();
    } else if (mouseY > addY + 100 + screenHeight) {
      i = 0;
      clickedRow =
        cardPlacements[screenHeight / 100 - Number(String(mouseY)[0]) - 1];
      if (mouseX < clickedRow[clickedRow.length - 1]) {
        while (i < clickedRow.length && mouseX > clickedRow[i]) {
          i += 1;
        }
        removeCard(playerId, i - 1);
        getHand();
      }
    }
  }
  
  function start() {
    background(100);
    getHand();
  }
  
  function getHand() {
    // send request to server
    hand = sendCards(playerId);
    showCards(hand);
  }
  
  function unoTxt(x, y, w, h) {
    textAlign(RIGHT, TOP);
    strokeWeight(0);
    fill(255);
    rectMode(CENTER);
    rect(x + w - 14, y + 19, 20, 10, 2);
    rectMode(CORNER);
  
    //UNO
    textSize(13);
    fill(255);
    strokeWeight(0);
    for (let i = -5; i < 9; i++) {
      text("U", x + w - 11 - i, y + 7);
    }
    fill(255);
    strokeWeight(1);
    textSize(8);
    fill(0);
    text("UNO", x + w - 8, y + 9);
    fill(255, 230, 50);
    text("UNO", x + w - 7, y + 8.5);
  
    //FLIP
    strokeWeight(2);
    textSize(6);
    fill(255);
    text("FLIP!", x + w - 7, y + 16);
  }
  
  function smallTxts(txt, x, y, w, h) {
    textSize(15);
    // top left txt
    fill(255);
    stroke(0);
    strokeWeight(2);
    textAlign(LEFT, TOP);
    if (txt == "O") {
      skipCard(x + 2, y + 2, w / 2, h / 3, eW, eH, 1);
    } else if (txt == "+2" || txt == "+4") {
      text(txt, x + 8, y + 9);
    } else if (txt == "R") {
      reverseCard(x + 17, y + 20, 0, 0, 15 / 2, 70 / 2, "White");
    } else if (txt != "UNO") {
      text(txt, x + 10, y + 12);
    }
  
    //top right txt
    textAlign(RIGHT, BOTTOM);
    if (txt == "O") {
      skipCard(x + w / 2 - 2, y + h / 2 + 15, w / 2, h / 3, eW, eH, 1);
    } else if (txt == "+2" || txt == "+4") {
      text(txt, x + w - 10, y + h - 8);
    } else if (txt == "R") {
      reverseCard(x + w - 17, y + h - 20, 0, 0, 15 / 2, 70 / 2, "White");
    } else if (txt != "UNO") {
      text(txt, x + w - 10, y + h - 12);
    }
  }
  
  function bigTxts(txt, x, y, w, h, color) {
    textSize(29);
    //colored part
    fill(color);
    strokeWeight(5);
    stroke(255);
    rect(x + 5, y + 6, w - 10, h - 12, 8);
    //ellipse
    eW = w / 1.5;
    eH = h / 1.4;
    eBorder = 1;
    if (txt == "UNO") {
    } else if (txt == "") {
      wildCard(x, y, w, h, eW, eH);
      wildCard(x - eW / 2 + 5, y - eH / 2 + 4, w, h, 8, 13);
      wildCard(x + eW / 2 - 5, y + eH / 2 - 4, w, h, 8, 13);
    } else if (txt == "R") {
      reverseCard(x, y, w, h, 10, 50, "White");
    } else if (txt == "+4") {
      timesFour(x, y, w, h, eW, eH);
    } else if (txt == "O") {
      skipCard(x, y, w, h, eW, eH, 2);
    } else {
      // middle txt
      fill(255);
      stroke(0);
      strokeWeight(4);
      textAlign(CENTER, CENTER);
      if (txt == "+2") {
        text(txt, x + w / 2 - 2, y + h / 2);
      } else {
        text(txt, x + w / 2, y + h / 2);
      }
    }
    push();
  
    translate(x + w / 2, y + h / 2);
    rotate(radians(26));
    strokeWeight(eBorder);
    if (txt == "UNO") {
      textSize(19);
      stroke("red");
      fill("red");
      ellipse(0, 0, eW - 7, eH);
      rotate(radians(-45));
      textAlign(CENTER, CENTER);
      strokeWeight(2);
      fill(0);
      stroke(255);
      text(txt, -2, 1);
      //LOL
      fill("yellow");
      strokeWeight(2);
      stroke(0);
      text(txt, 0, 0);
    } else {
      stroke(255);
      fill(0, 0, 0, 0);
      ellipse(0, 0, eW, eH);
    }
  
    pop();
  }
  
  function card(txt, x, y) {
    bigTxts(txt[0], x, y, w, h, txt[1]);
    smallTxts(txt[0], x, y, w, h);
    if (txt[0] != "UNO") {
      unoTxt(x, y, w, h);
    }
  }
  
  function wildCard(x, y, w, h, eW, eH) {
    push();
    translate(x + w / 2, y + h / 2);
    rotate(radians(26));
  
    strokeWeight(eBorder);
  
    stroke(255);
    fill("green");
    arc(0, 0, eW, eH, radians(-26), radians(90));
    fill("red");
    arc(0, 0, eW, eH, radians(154), radians(-90));
    fill("blue");
    arc(0, 0, eW, eH, radians(-90), radians(-26));
    fill("yellow");
    arc(0, 0, eW, eH, radians(90), radians(154));
    pop();
  }
  
  function skipCard(x, y, w, h, eW, eH, thick) {
    fill(0, 0, 0, 0);
    strokeWeight(thick * 2);
    stroke(255);
    circle(x + w / 2, y + h / 2, h / 4);
    stroke(0);
    strokeWeight(1);
    circle(x + w / 2, y + h / 2, h / 4 + thick * 2);
    circle(x + w / 2, y + h / 2, h / 4 - thick * 2);
    push();
    stroke(255);
    fill(255);
    translate(x + w / 2, y + h / 2);
    rotate(radians(45));
    rectMode(CENTER);
    rect(0, 0, thick, h / 4);
    stroke(0);
    strokeWeight(1);
    line(
      thick / 2 - 1 - thick / 2,
      -h / 8 + 2,
      thick / 2 - 1 - thick / 2,
      h / 8 - 2
    );
    line(thick / 2 + 1, -h / 8 + 2, thick / 2 + 1, h / 8 - 2);
    pop();
  }
  
  function timesFour(x, y, w, h, eW, eH) {
    push();
    translate(x + w / 2, y + h / 2);
    rotate(radians(26));
    fill(255);
    ellipse(0, 0, eW, eH);
  
    rotate(radians(-26));
    translate(-w / 16, -h / 15);
  
    strokeJoin(MITER);
    strokeWeight(1);
    for (let j = 0; j < 2; j++) {
      stroke(0);
      fill("green");
      rect(-w / 4.5, h / 18, w / 5.5, h / 6, 1);
  
      //blue
      fill("blue");
      rect((w * -11) / 90, -h / 10 + h / 18, w / 5.5, h / 6, 1);
  
      //yellow
      fill("yellow");
      rect(w / 10, -h / 10, w / 5.5, h / 6, 1);
  
      //red
      fill("red");
      rect(0, 0, w / 5.5, h / 6, 1);
    }
    pop();
  }
  
  function reverseCard(x, y, w, h, tSide, eH, color, tHeight) {
    arrow(0);
    arrow(180);
  
    function arrow(angle) {
      push();
      translate(x + w / 2, y + h / 2);
      rotate(radians(angle) + 26);
      stroke(0);
      strokeWeight(1);
      strokeJoin(ROUND);
      fill(color);
      if (tHeight == undefined) {
        tHeight = Math.sqrt(tSide ** 2 - (tSide / 2) ** 2);
      }
      //noFill();
      beginShape();
      vertex(0, -eH / 8);
      vertex(tSide / 4, -eH / 8);
      vertex(tSide / 4, -eH / 8);
      vertex(-tSide / 4, -tHeight - eH / 8);
      vertex((-tSide * 3) / 4, -eH / 8);
  
      vertex(-tSide / 2, -eH / 8);
      vertex(-tSide / 2, eH / 128);
      vertex(0, eH / 16);
      vertex(0, -eH / 8);
  
      endShape();
  
      arc(0, eH / 128, tSide, 10, PI / 2, PI + PI / 16);
  
      line(0, -eH / 8, 0, eH / 8);
  
      pop();
    }
  }
  function showCards(hand) {
    cardPlacements = [];
    clear();
    cnv = createCanvas(screenWidth, screenHeight);
    cnv.mouseClicked(click);
    background(155);
    card(["UNO", "black"], 360, 200);
    card(sendCards(0), 280, 200);
    startX = 0;
    interval = 25;
    totalCards = hand.length;
    addY = -100;
    cardsPlaced = 0;
    nbRows = 0;
    while (totalCards != 0) {
      if (totalCards >= 25) {
        totalCards -= 25;
        nbInRow = 25;
      } else {
        nbInRow = totalCards;
        totalCards = 0;
      }
      startX = screenWidth / 2 - (interval * nbInRow) / 2 - 20;
      cardPlacements.push([]);
      for (let i = 0; i < nbInRow; i++) {
        card(hand[cardsPlaced], startX + i * interval, screenHeight + addY);
        cardPlacements[nbRows].push(startX + i * interval);
        cardsPlaced++;
      }
      cardPlacements[nbRows].push(
        cardPlacements[nbRows][cardPlacements[nbRows].length - 1] + w - 10
      );
      addY -= 100;
      nbRows += 1;
    }
  }
  
  //server functions
  nbPlayers = 1;
  deck = [];
  function createDeck() {
    colors = ["red", "#ffd800 ", "green", "blue"];
    deck = [];
    discardPile = [];
    vals = ["R", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+2", "O"];
      for(let i = 0; i < 2; i++){
        for(let j = 0; j < 4; j++){
            for (let i in vals){
              deck.push([vals[i], colors[j]])
            }
        }
      }
    for (let i = 0; i < 4; i++) {
      deck.push(["0", colors[i]]);
      deck.push(["", "black"]);
      deck.push(["+4", "black"]);
    }
    deck = shuffleDeck(deck);
    dealCards(deck);
  }
  
  function shuffleDeck(deck) {
    for (let k = 0; k < 10; k++) {
      for (let i = 0; i < deck.length; i++) {
        cur = deck[i];
        let r = Math.floor(Math.random() * (deck.length - 1) + 0.5);
        deck[i] = deck[r];
        deck[r] = cur;
      }
    }
    return deck;
  }
  
  function dealCards(deck) {
    hands = [deck.shift()];
    for (let i = 1; i <= nbPlayers; i++) {
      hands.push([]);
      for (let j = 0; j < 7; j++) {
        hands[i].push(deck.shift());
      }
    }
  }
  
  function addCard(Id, nbCards) {
    for (let i = 1; i <= nbCards; i++) {
      if (deck.length == 0) {
        console.log("shuffle");
        console.log(discardPile);
        deck = discardPile;
        deck = [];
        console.log(deck);
      }
      hands[i].push(deck.shift());
    }
  }
  
  function sendCards(ID) {
    if (ID != undefined) {
      return hands[ID];
    } else {
      return deck.shift();
    }
  }
  
  function removeCard(ID, index) {
    discardPile.push(hands[0]);
    hands[0] = hands[ID][index];
    hands[ID].splice(index, 1);
  }
  