let messVal = [];
let messText = [];
let scroll = 0, messSide = 0;
//let font = loadFont("Comic Sans MS");;

function setup() {
	createCanvas(windowWidth, windowHeight);
	//textFont(font);
	textSize(15);
	messVal = [0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1];
	messText = ["Hey", "Are you busy?", "No.", "Cool", "Do you remember what time we were supposed to meet on Thursday?", "We were supposed to meet at 8:30.", "Okay, thanks!", "No problem!", "Also, did you ask out Alec like you said you would?", "Or did you chicken out like last time?", "Ugh. It's complicated.", "I tried to but his friends kept interrupting me, so I never go the chance to actually ask him.", "It's so frustrating."];
}

function draw() {
	background(225);
	noStroke();
	//fill(225, 225, 225);
  //rect(5, 5, width - 10, height - 5, 8, 8, 8, 8);

  messageDis();
	
	fill(150, 150, 150);
	rect(width - 5, 0 - scroll, 5, (2/messText.length) * height);
  
  fill(200, 200, 200);
  rect(0, height - 95,  width, 95);
  
  fill(255, 255, 255);
  rect(10, height - 87, width - 80, 80, 8, 8, 8, 8);
	
	fill(41, 91, 255);
	rect(width - 65, height - 87, 60, 80, 8, 8, 8, 8);

  //stroke(200, 200, 200);
  //strokeWeight(3);
  //line(240, height - 50, 240, height - 10);
}

function mouseDragged() {
	scroll += (mouseY - pmouseY);
	//print(scroll);
}

function mouseWheel(event) {
  //print(event.delta);
  scroll -= event.delta;
}

function keyPressed() {
  //print(key + " -- " + keyCode + " scroll = " + scroll);
	//print(messText);
	//print(messText.length);
	//print(messVal);
	//print(messVal.length);
  if(key == 'ArrowUp') {
    scroll -= 10;
  }
  else if(key == 'ArrowDown') {
    scroll += 10;
  }
  else if(key == 'Control') {
    messText.push(("Test ".repeat(round(random(0, 20)))));
    messVal.push(round(random(0, 1)));
  }
}

function messageDis() {
	noStroke();
  let lastH = 10;
  //let lastY = 65;
  let x = 0;
  let y = 0;
	let w = 0;
	let h = 0;
	
  for(let i = 0; i < messText.length; i++)
  {
    //print(messText[i]);
    //print(messVal[i]);
    if(messText[i].length <= 5) {
      w = messText[i].length * 10.5 + 5;
      h = 35;
    } else if(messText[i].length <= 35) {
      w = messText[i].length * 8 + 5;
      h = 35;
    } else {
      w = 270;
      h = 25 + (17 * ceil(messText[i].length/35));
    }
    messSide = messVal[i];
    if(messSide == 0) {
      fill(50, 50, 255);
      x = (width - 10) - w;
    } else if(messSide == 1) {
      fill(15, 255, 15);
      x = 10;
    }
    
    //y = 10 + (65 * i) + scroll;
    y = (65 * i) + lastH + scroll;
    rect(x, y, w, h, 5, 5, 5, 5);
    
    fill(0, 0, 0);
    text(messText[i], x + 5, y + 10, w, h);
    lastH = h;
    //lastY = y;
  }
}