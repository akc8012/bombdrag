"use strict";

var
canvas,
ctx,
width,
height,
sf,
frames,
currentstate,
states =
{
	Splash: 0, Game: 1, Score: 2
},
onTouchDevice;

var bomb,
fingerDown = false,
fingerX = -1,
fingerY = -1;

function main()
{
	canvas = document.createElement("canvas");

	width = window.innerWidth;
	height = window.innerHeight;

	if (width >= 500)
	{
		width = 320;
		height = 480;
		//canvas.style.border = "1px solid #000";
	}
	sf = width/320;

	var evtPress = "mousedown";
	var evtDrag = "mousemove";
	var evtRelease = "mouseup";
	onTouchDevice = isTouchDevice();
	if (onTouchDevice)
	{
		evtPress = "touchstart";
		evtDrag = "touchmove";
		evtRelease = "touchend";
	}
	document.addEventListener(evtPress, onpress);
	document.addEventListener(evtDrag, ondrag);
	document.addEventListener(evtRelease, onrelease);

	canvas.width = width;
	canvas.height = height;
	ctx = canvas.getContext("2d");
	document.body.appendChild(canvas);

	initSprites(sf);
	init();
	loop();
}

function isTouchDevice()
{
	return 'ontouchstart' in window        // works on most browsers 
		|| navigator.maxTouchPoints;       // works on IE10/11 and Surface
};

// calling this will basically reset the game
function init()
{
	currentstate = states.Splash;
	frames = 0;

	bomb = new Bomb(40, 40, 20);
}

function getMousePos(canvas, evt)
{
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}

function getFinger(evt)
{
	return {
		x: onTouchDevice ? evt.touches[0].pageX : getMousePos(canvas, evt).x,
		y: onTouchDevice ? evt.touches[0].pageY : getMousePos(canvas, evt).y
	};
}

function onpress(evt)
{
	fingerX = getFinger(evt).x;
	fingerY = getFinger(evt).y;
	bomb.press(fingerX, fingerY, sf);
	fingerDown = true;
}

function ondrag(evt)
{
	if (fingerDown && bomb.pressed)
	{
		fingerX = getFinger(evt).x;
		fingerY = getFinger(evt).y;
		bomb.drag(fingerX, fingerY, sf);
	}
}

function onrelease(evt)
{
	fingerX = -1;
	fingerY = -1;
	bomb.release();
	fingerDown = false;
}

function loop()
{
	update();
	draw();

	window.requestAnimationFrame(loop, canvas);
}

function update()
{
	frames++;
}

function draw()
{
	// redraw background over contents of prior frame
	ctx.fillStyle = "#333";
	ctx.fillRect(0, 0, width, height);

	bomb.draw(ctx, sf);
}

main();
