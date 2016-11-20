var
canvas,
ctx,
width,
height,
scaleFactor,
frames,
currentstate,
states =
{
	Splash: 0, Game: 1, Score: 2
},
onTouchDevice;

var fingerDown = false,
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
		evtPress = "mousedown";
		evtDrag = "mousemove";
		evtRelease = "mouseup";
	}
	scaleFactor = width/320;

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

	initSprites();
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

	bomb.init(40*scaleFactor, 40*scaleFactor, 20*scaleFactor);
}

function getFingerX(evt)
{
	return onTouchDevice ? evt.touches[0].pageX : evt.clientX;
}

function getFingerY(evt)
{
	return onTouchDevice ? evt.touches[0].pageY : evt.clientY;
}

function onpress(evt)
{
	fingerX = getFingerX(evt);
	fingerY = getFingerY(evt);
	bomb.press(fingerX, fingerY);
	fingerDown = true;
}

function ondrag(evt)
{
	if (fingerDown)
	{
		fingerX = getFingerX(evt);
		fingerY = getFingerY(evt);
		bomb.drag(fingerX, fingerY);
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

	bomb.draw(ctx, scaleFactor);
}

main();
