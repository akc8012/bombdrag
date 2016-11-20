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
};

var fingerDown = false,
fingerX = -1,
fingerY = -1;

function main()
{
	canvas = document.createElement("canvas");

	width = window.innerWidth;
	height = window.innerHeight;

	var evtPress = "touchstart";
	var evtDrag = "";//"touchstart";
	var evtRelease = "touchend";
	if (width >= 500)
	{
		width = 320;
		height = 480;
		canvas.style.border = "1px solid #000";
		evtPress = "mousedown";
		evtDrag = "mousemove";
		evtRelease = "mouseup";
	}
	scaleFactor = width/320;

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

// calling this will basically reset the game
function init()
{
	currentstate = states.Splash;
	frames = 0;

	bomb.init(12, 16);
}

function onpress(evt)
{
	fingerX = evt.offsetX;
	fingerY = evt.offsetY;
	bomb.press(fingerX, fingerY);
	fingerDown = true;
}

function ondrag(evt)
{
	if (fingerDown)
	{
		fingerX = evt.offsetX;
		fingerY = evt.offsetY;
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
	ctx.fillStyle = "#fff";
	ctx.fillRect(0, 0, width, height);

	bomb.draw(ctx);
}

main();
