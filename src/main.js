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

var bombs = [],
fingerDown = false,
finger = new Vec2(-1, -1);

var touches = 0;

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

	var radius = 25*sf;
	for (var i = 0; i < 12; i++)
		bombs.push(new Bomb(randomRange(radius, width-radius), 
			randomRange(radius, height-radius), radius));
}

function randomRange(min, max)
{
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
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
	finger.x = getFinger(evt).x;
	finger.y = getFinger(evt).y;
	fingerDown = true;

	if (evt.touches)
		touches = evt.touches.length;

	for (var i = bombs.length-1; i >= 0; i--)
	{
		if (bombs[i].press(finger.x, finger.y, sf))
		{
			swapBombToBot(i);
			break;
		}
	}
}

function swapBombToBot(ndx)
{
	var temp = bombs[bombs.length-1];
	bombs[bombs.length-1] = bombs[ndx];
	bombs[ndx] = temp;
}

function ondrag(evt)
{
	if (fingerDown)
	{
		for (var i = 0; i < bombs.length; i++)
		{
			if (bombs[i].pressed)
			{
				finger.x = getFinger(evt).x;
				finger.y = getFinger(evt).y;
				bombs[i].drag(finger.x, finger.y, sf);
			}
		}
	}
}

function onrelease(evt)
{
	finger.x = -1;
	finger.y = -1;
	fingerDown = false;
	touches = 0;

	for (var i = 0; i < bombs.length; i++)
		bombs[i].release();
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

	for (var i = 0; i < bombs.length; i++)
		bombs[i].draw(ctx, sf);

	ctx.fillStyle = '#fff';
	ctx.font = "30px Arial";
	ctx.fillText(touches, 10, 50);
}

function print(msg)
{
	console.log(msg);
}

main();
