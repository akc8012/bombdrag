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

function Finger(pos, index)
{
	this.pos = pos;
	this.index = index;
}

var bombs = [],
fingers = [];

var touches = 0;	// used for debugging, not actually needed
var removeType = "";
var pressedFrame = -1;
var allEvts = [];

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
	for (var i = 0; i < 6; i++)
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

function getFinger(evt, i)
{
	return new Vec2(
		onTouchDevice ? evt.touches[i].pageX : getMousePos(canvas, evt).x,
		onTouchDevice ? evt.touches[i].pageY : getMousePos(canvas, evt).y
	);
}

function getReleasedFinger(evt)
{
	return new Vec2(
		onTouchDevice ? evt.changedTouches[0].pageX : getMousePos(canvas, evt).x,
		onTouchDevice ? evt.changedTouches[0].pageY : getMousePos(canvas, evt).y
	);
}

function onpress(evt)
{
	allEvts.push("press");
	var loops = onTouchDevice ? evt.touches.length : 1;
	var start = onTouchDevice ? fingers.length : 0;
	for (var t = start; t < loops; t++)
	{
		if (evt.touches)
			touches = evt.touches.length;

		for (var b = bombs.length-1; b >= 0; b--)
		{
			if (!bombs[b].pressed && bombs[b].press(getFinger(evt, t), frames%1000))
			{
				fingers.push(new Finger(getFinger(evt, t), frames%1000));
				swapBombToBot(b);
				break;
			}
		}
	}
}

function ondrag(evt)
{
	allEvts.push("drag");
	for (var f = 0; f < fingers.length; f++)
	{
		for (var b = 0; b < bombs.length; b++)
		{
			if (bombs[b].fingerNdx == fingers[f].index)
			{
				fingers[f].pos = getFinger(evt, f);
				bombs[b].drag(fingers[f].pos);
			}
		}
	}
}

function onrelease(evt)
{
	allEvts.push("release");
	var released = false;
	for (var b = 0; b < bombs.length; b++)
	{
		if (bombs[b].pressed && bombs[b].canPress(getReleasedFinger(evt, 0)))
		{
			var index = -1;
			for (var f = 0; f < fingers.length; f++)
			{
				if (fingers[f].index == bombs[b].fingerNdx)
				{
					index = f;
					removeType = "on obj";
					break;
				}
			}
			if (index > -1)
			{
				fingers.splice(index, 1);
				bombs[b].release();
				released = true;
				break;
			}
		}
	}

	if (!released)
	{
		for (var b = 0; b < bombs.length; b++)
		{
			bombs[b].release();
		}
		fingers = [];
		removeType = "off obj";

		pressedFrame = frames+1;
	}

	touches -= touches > 0 ? 1 : 0;
}

function swapBombToBot(ndx)
{
	var temp = bombs[ndx];	// the element we want at the bottom

	for (var i = ndx; i < bombs.length-1; i++)	// start for loop at the index, don't do last element (none in front)
	{
		bombs[i] = bombs[i+1];	// replace this element with the one in front of it
	}
	bombs[bombs.length-1] = temp;	// put the desired element at the bottom
}

function loop()
{
	frames++;
	update();
	draw();

	window.requestAnimationFrame(loop, canvas);
}

function update()
{

}

function draw()
{
	// redraw background over contents of prior frame
	ctx.fillStyle = "#333";
	ctx.fillRect(0, 0, width, height);

	for (var i = 0; i < bombs.length; i++)
		bombs[i].draw(ctx);

	ctx.fillStyle = '#fff';
	ctx.font = "30px Arial";


	var string = "";
	for (var i = 0; i < fingers.length; i++)
	{
		string += i;
		string += ", ndx: " + fingers[i].index;

		ctx.fillText(string, 10, (50*i)+50);
		string = "";
	}

	ctx.fillText("fingers: " + fingers.length, 10, height-10);

	ctx.font = "20px Arial";
	for (var i = 0; i < bombs.length; i++)
	{
		string += i;
		string += ", ndx: " + bombs[i].fingerNdx;

		ctx.fillText(string, width-100, (35*i)+35);
		string = "";
	}

	while (allEvts.length > 6)
		allEvts.shift();

	for (var i = allEvts.length-1; i >= 0; i--)
	{
		string += allEvts[i];

		ctx.fillText(string, width-75, (35*(allEvts.length-i))+250);
		string = "";
	}
}

main();
