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

function main()
{
	canvas = document.createElement("canvas");

	width = window.innerWidth;
	height = window.innerHeight;

	var evt = "touchstart";
	if (width >= 500)
	{
		width = 320;
		height = 480;
		canvas.style.border = "1px solid #000";
		evt = "mousedown";
	}
	scaleFactor = width/320;

	document.addEventListener(evt, onpress);
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
}

function onpress(evt)
{
	console.log("press!");
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

	s_player[0].draw(ctx, frames, 0);
}

main();
