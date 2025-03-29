/**
to do(or at least try):

unban: almost
mods/admin: done?
autoscroll: not quite
not need to spam backspace: done, probably
fix the message bubbles: done
staying banned: almost
private messages?: yeah
bannedWords: not quite
mute/unmute?: 
recall last sent message?: done
help command: done
*/

var socket = io.connect(":30000?sketch=1130117");
let messVal = [],
	messText = [],
	userids = [],
	bannedIds = [],
	bannedWords = ['test'],
	modIds = ['053856686'];
let mess = '',
	mo = '',
	id = '',
	lastMess = '';
let scroll = 0,
	/* autoScroll = 0,*/
	messSide = 0,
	time = 0,
	timer = 0,
	timer2 = 0,
	onW = 100,
	time2 = 0,
	timer3 = 0,
	meh = 0,
	scrollInc = 15;
//let successBool = window.navigator.vibrate(1);

function setup() {
	createCanvas(windowWidth, windowHeight);
	socket.on('userJoined', userJoined);
	socket.on('updateUsers', updateUsers);
	//socket.on('updateBan', updateBan);
	//socket.on('reqBanlist', reqBanlist);
	//socket.on('reqBanlistReq', reqBanlistReq);
	//socket.on('updateMod', updateMod);
	//socket.on('reqModlist', reqModlist);
	//socket.on('reqModlistReq', reqModlistReq);
	socket.on('here', usersUp);
	socket.on('sendMess', messRec);
	socket.on('sendPrivMess', messPrivRec);
	socket.on('typing', userTyp);
	socket.on('kick', kicked);
	socket.on('hug', hugged);
	socket.on('highfive', highfived);
	socket.emit('updateUsers');
	//socket.emit('reqBanlist', id);
	//socket.emit('reqModlist', id);
	//print(modIds);

	textSize(15);
	//messVal = [0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1];
	//messText = ["Hey", "Are you busy?", "No.", "Cool", "Do you remember what time we were supposed to meet on Thursday?", "We were supposed to meet at 8:30.", "Okay, thanks!", "No problem!", "Also, did you ask out Alec like you said you would?", "Or did you chicken out like last time?", "Ugh. It's complicated.", "I tried to but his friends kept interrupting me, so I never go the chance to actually ask him.", "It's so frustrating."];
	
	id = getItem('id');
	/*for(let n = 0; n < 9; n++) {
		id += round(random(0, 9)).toString();
	}*/
	if(id === null) {
		id = '';
		for (let n = 0; n < 9; n++) {
			id += round(random(0, 9)).toString();
		}
		//id = round(random(0, 9)).toString().repeat(9);
	}
	//print(round(random(0, 9)).toString().repeat(9));
	storeItem('id', id);
	//print(id);
	userids.push(id);
	socket.emit('userJoined', id);
	
	if(getItem('modIds') == null) {
		storeItem('modIds', modIds);
	} else {
		storeItem('modIds', modIds);
		modIds = getItem('modIds');
	}
	//print(modIds);
	
	if(getItem('bannedIds') == null) {
		storeItem('bannedIds', bannedIds);
	} else {
		storeItem('bannedIds', bannedIds);
		bannedIds = getItem('bannedIds');
	}
	//print(modIds);
}

function draw() {
	background(225);
	noStroke();
	//fill(225, 225, 225);
	//rect(5, 5, width - 10, height - 5, 8, 8, 8, 8);

	textStyle(NORMAL);
	messageDis();

	fill(150);
	rect(width - 5, 0 - scroll, 5, (2 / messText.length) * height);

	fill(200);
	rect(0, height - 95, width, 95);
	rect(0, height - 120, onW, 25, 0, 8, 0, 0);

	fill(0);
	textStyle(BOLD);
	text('Online: ' + userids.length, 5, height - 100);
	if(mouseX > 0 && mouseX < 100 && mouseY > (height - 120) && mouseY < (height - 95)) {
		onW = width;
		//textStyle(BOLD);
		text(' | ' + userids, 70, height - 100);
		//print('test');
	} else {
		onW = 100;
	}

	fill(255);
	rect(10, height - 87, width - 80, 80, 8, 8, 8, 8);
	fill(0)
	text(mess, 15, height - 82, width - 95, 100);

	fill(41, 91, 255);
	rect(width - 65, height - 87, 60, 80, 8, 8, 8, 8);

	if(time > 0) {
		if(millis() >= 1000 + timer) {
			time--;
			timer = millis();
		}
		fill(50, 50, 255);
		rect((width / 2) - 40, 25, 100, 30, 8, 8, 8, 8);
		fill(0);
		//textStyle(BOLD);
		text('User joined', (width / 2) - 30, 30, width / 8, 50);
	}

	if(time2 > 0) {
		if(millis() >= 1000 + timer3) {
			time2--;
			timer3 = millis();
		}
		fill(50, 50, 255);
		rect((width / 2) - 80, 25, 165, 30, 8, 8, 8, 8);
		fill(0);
		textStyle(BOLD);
		text(mo + ' is typing.', (width / 2) - 70, 30, 165, 50);
		//print(mo + ' is typing.');
	}

	if(millis() >= 1500 + timer2) {
		userids = [];
		socket.emit('updateUsers');
		userids.push(id);
		//userids = [...new Set(userids)];
		timer2 = millis();
	}
	userids = [...new Set(userids)];
	backSpace();
}

function mouseDragged() {
	scroll += (mouseY - pmouseY);
	//print(scroll);
}

function mouseWheel(event) {
	//print(event.delta);
	scroll -= event.delta;
}

function mouseClicked() {
	//time = 1;
	//print(mouseX + ' ' + mouseY);
	//print(width + ' ' + height);
	//print(width - mouseX + ' ' + height - mouseY);
	//window.navigator.vibrate(300);
}

function messageDis() {
	noStroke();
	let lastH = 10;
	//let lastY = 65;
	let x = 0;
	let y = 0;
	let w = 0;
	let h = 0;

	for (let i = 0; i < messText.length; i++) {
		//print(messText[i]);
		//print(messVal[i]);
		if(messText[i].length /* * 15 */ <= 5 /*75*/ ) {
			w = messText[i].length * 10.5 + 15;
			h = 35;
		} else if(messText[i].length <= 80 /*(80/1366) * width*/ ) {
			w = messText[i].length * 8.5 + 15;
			h = 35;
		} else {
			w = width / 2 + 15;
			h = 35 + (10 * ceil(messText[i].length / 80 /*((80/1366) * width)*/ ));
		}
		messSide = messVal[i];
		if(messSide == 0) {
			fill(50, 50, 255);
			x = (width - 10) - w;
		} else if(messSide == 1) {
			fill(15, 255, 15);
			x = 10;
		}

		/*if(messText.length > (6/615) * height) {
			autoScroll -= height/8;
		}*/
		//y = 10 + (65 * i) + scroll;
		y = (70 * i) + lastH + (h + (h / 4)) + scroll /* + autoScroll*/ ;
		rect(x, y, w, h, 5, 5, 5, 5);

		fill(0, 0, 0);
		text(messText[i], x + 5, y + 10, w - 10, h);
		lastH = h;
		//lastY = y;
	}
}

function messRec(recMess) {
	//window.navigator.vibrate(200);
	messText.push(recMess);
	messVal.push(1);
	scroll -= scrollInc * messText.length;
}

function messPrivRec(dd, gg, ms) {
	if(dd == id) {
		messText.push('Sent by ' + gg + ': ' + ms);
		messVal.push(1);
		scroll -= scrollInc * messText.length;
	}
}

function backSpace() {
	if(keyIsDown(8)) {
		if(millis() >= 150 + meh) {
			typ('Backspace');
			meh = millis();
		}
		//print('test');
	}
}

function keyTyped() {
	socket.emit('typing', id);
	typ(key);
}

function keyPressed() {
	//print(key + " -- " + keyCode + " scroll = " + scroll);
	//print(messText);
	//print(messText.length);
	//print(messVal);
	//print(messVal.length);
	if(key == 'ArrowUp') {
		//scroll -= 10;
		mess = lastMess;
	} else if(key == 'ArrowDown') {
		//scroll += 10;
		mess = '';
	} else if(key == 'Control') {
		//messText.push(("Test ".repeat(round(random(0, 20)))));
		//messVal.push(round(random(0, 1)));

		//socket.emit('sendMess', "Test ".repeat(round(random(0, 20))));

		//saveStrings(messText, 'messSave.txt');
	}
}

function typ(mm) {
	if(mm == 'Backspace') {
		mess = mess.slice(0, -1);
	} else if(mm == 'Enter') {
		if(mess != '') {
			lastMess = mess;
			if(mess.substring(0, 1) == '/') { //commands
				if(mess.includes('/kick')) {
					if(modIds.includes(id)) {
						socket.emit('kick', mess.replace('/kick ', ''));
						messText.push('Attemptng to kick "' + mess.replace('/kick ', '') + '"');
						messVal.push(0);
						socket.emit('sendMess', mess.replace('/ban ', '') + ' has been kicked from the room.');
					} else {
						messText.push('You do no have permission to use this command');
						messVal.push(0);
					}
					mess = '';
				} else if(mess.includes('/ban')) {
					if(modIds.includes(id)) {
						socket.emit('kick', mess.replace('/ban ', ''));
						messText.push('Attempting to ban ' + mess.replace('/ban ', ''));
						messVal.push(0);
						bannedIds.push(mess.replace('/ban ', ''));
						//socket.emit('reqBanlistReq');
						socket.emit('sendMess', mess.replace('/ban ', '') + ' has been banned from the room.');
					} else {
						messText.push('You do no have permission to use this command');
						messVal.push(0);
					}
					mess = '';
				} else if(mess.includes('/unban')) {
					if(modIds.includes(id)) {
						socket.emit('kick', mess.replace('/unban ', ''));
						messText.push('Unbanning ' + mess.replace('/unban ', ''));
						messVal.push(0);
						bannedIds.pop(mess.replace('/unban ', ''));
						//socket.emit('reqBanlistReq');
						socket.emit('sendMess', mess.replace('/unban ', '') + 'has been unbanned.');
					} else {
						messText.push('You do no have permission to use this command');
						messVal.push(0);
					}
					mess = '';
				} else if(mess.includes('/mod')) {
					if(modIds.includes(id)) {
						messText.push('Making ' + mess.replace('/mod ', '') + ' mod.');
						messVal.push(0);
						modIds.push(mess.replace('/mod ', ''));
						//socket.emit('reqModlistReq');
						//print(modIds);
					} else {
						messText.push('You do no have permission to use this command');
						messVal.push(0);
					}
					mess = '';
				} else if(mess.includes('/unmod')) {
					if(modIds.includes(id)) {
						messText.push('Removing ' + mess.replace('/unmod ', '') + 's mod.');
						messVal.push(0);
						modIds.pop(mess.replace('/unmod ', ''));
						//socket.emit('reqModlistReq');
						//print(modIds);
					} else {
						messText.push('You do no have permission to use this command');
						messVal.push(0);
					}
					mess = '';
				} else if(mess.includes('/hug')) {
					socket.emit('hug', mess.replace('/hug ', ''), id);
					messText.push('hugging ' + mess.replace('/hug ', ''));
					messVal.push(0);
					mess = '';
				} else if(mess.includes('/priv')) {
					socket.emit('sendPrivMess', mess.replace('/priv ', '').substring(0, 9), id, mess.substring(15, mess.length));
					messText.push('Sending private message to ' + mess.replace('/priv ', '').substring(0, 9));
					messVal.push(0);
					mess = '';
				} else if(mess.includes('/highfive')) {
					socket.emit('highfive', mess.replace('/highfive ', ''), id);
					messText.push('Sending highfive to ' + mess.replace('/highfive ', '') + '.');
					messVal.push(0);
					mess = '';
				} else if(mess.includes('/help')) {
					messText.push('Help page:');
					messVal.push(0);
					messText.push('Normal User Commands: ');
					messVal.push(0);
					messText.push('/help');
					messVal.push(0);
					messText.push('Opens this list of commands.');
					messVal.push(0);
					messText.push('/hug [USERID]');
					messVal.push(0);
					messText.push('Sends a hug to another user.');
					messVal.push(0);
					messText.push('/priv [USERID] [MESSAGE]');
					messVal.push(0);
					messText.push('Sends a private message to another use.');
					messVal.push(0);
					messText.push('/highfive [USERID]');
					messVal.push(0);
					messText.push('Sends a highfive to another user.');
					messVal.push(0);
					messText.push('Mod Commands: ');
					messVal.push(0);
					messText.push('/kick [USERID]');
					messVal.push(0);
					messText.push('Kicks the specified user from the chat.');
					messVal.push(0);
					messText.push('/ban [USERID]');
					messVal.push(0);
					messText.push('Bans the specified user from the chat.');
					messVal.push(0);
					messText.push('/unban [USERID]');
					messVal.push(0);
					messText.push('Removes the specified user from the ban list.');
					messVal.push(0);
					messText.push('/mod [USERID]');
					messVal.push(0);
					messText.push('Gives the specified user mod permissions.');
					messVal.push(0);
					messText.push('/unmod [USERID]');
					messVal.push(0);
					messText.push('Takes away mod permisions from the specified user.');
					messVal.push(0);
					mess = '';
				} else {
					messText.push('Not a known command.');
					messVal.push(0);
					mess = '';
				}
			} else {
				//print(mess.includes('/kick') + ' ' + typeof mess);
				//print(mess.length);
				/*let bw = 0;
				for(let i = 0; i < bannedWords.length; i++) {
					if(mess.includes(bannedWords[i])) {
						bw++;
					}
				}
				
				if(bw < 0) {
					socket.emit('sendMess', id + ': ' + mess);
					messText.push(mess);
					messVal.push(0);
				} else {
					for(let i = 0; i < bannedWords.length; i++) {
						mess.replace(bannedWords[i], ("*".repeat(bannedWords[i].length)));
					}
					socket.emit('sendMess', id + ': ' + mess);
					messText.push(mess);
					messVal.push(0);
				}*/
				socket.emit('sendMess', id + ': ' + mess);
				messText.push(mess);
				messVal.push(0);
				mess = '';
			}
		}
	} else {
		mess += mm;
	}
}

function userJoined(mal) {
	if(bannedIds.includes(mal)) {
		socket.emit('kick', mal);
		//messText.push('User ' + mal + ' is banned.');
		//messVal.push(1);
		//print(bannedIds);
	} else {
		//window.navigator.vibrate(500);
		messText.push('User ' + mal + ' joined.');
		messVal.push(1);
		time = 3;
	}
}

function updateUsers() {
	socket.emit('here', id);
}

function usersUp(usid) {
	userids.push(usid);
}

function userTyp(mol) {
	mo = mol;
	time2 = 2;
}

function hugged(ack, oc) {
	if(ack == id) {
		messText.push('You were hugged by ' + oc + '.');
		messVal.push(1);
	}
}

function highfived(ack, oc) {
	if(ack == id) {
		messText.push(oc + ' highfived you.');
		messVal.push(1);
	}
}

function kicked(ch) {
	if(ch == id) {
		remove();
		/*fill(150);
		rect(0, 0, width, height);
		textSize(35);
		fill(0);
		text('KICKED', width/2, height/2);
		noLoop();*/
	}
}
/*
function updateBan(sit, sock) {
	if(sit == id) {
		bannedIds = sock;
		storeItem('bannedIds', bannedIds);
	}
	//print('test2');
	//print(bannedIds);
}

function reqBanlist(rock) {
	socket.emit('updateBan', rock, bannedIds);
	//print('test' + rock);
}

function reqBanlistReq() {
	socket.emit('reqBanlist', id);
}

function updateMod(sit, sock) {
	if(sit == id) {
		modIds = sock;
		storeItem('modIds', modIds);
	}
	if(modIds.includes(id)) {
		messText.push('You were made a mod.');
		messVal.push(1);
	}
	//print('test2');
	//print(bannedIds);
}

function reqModlist(rock) {
	socket.emit('updateMod', rock, modIds);
	//print('test' + rock);
}

function reqModlistReq() {
	socket.emit('reqModlist', id);
}*/