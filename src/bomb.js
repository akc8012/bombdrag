"use strict";

function Bomb(x, y, radius)
{
	this.x = x;
	this.y = y;
	this.offsetX = -1;
	this.offsetY = -1;
	this.radius = radius;
	this.pressed = false;
}

Bomb.prototype.update = function()
{
	
}

Bomb.prototype.press = function(x, y, sf)
{
	if (Math.abs(x - this.x) < this.radius && Math.abs(y - this.y) < this.radius)
	{
		this.offsetX = x - this.x;
		this.offsetY = y - this.y;
		this.pressed = true;
	}
}

Bomb.prototype.drag = function(x, y, sf)
{
	this.x = x - this.offsetX;
	this.y = y - this.offsetY;

	var wallDist = 28*sf;

	if (this.x-wallDist < 0)
		this.x = wallDist;
	if (this.x+wallDist > width)
		this.x = width-wallDist;
	if (this.y-wallDist < 0)
		this.y = wallDist;
	if (this.y+wallDist > height)
		this.y = height-wallDist;
}

Bomb.prototype.release = function()
{
	this.offsetX = -1;
	this.offsetY = -1;
	this.pressed = false;
}

Bomb.prototype.draw = function(ctx, sf)
{
	ctx.beginPath();
	//ctx.arc(this.x, this.y, this.radius*sf * (this.pressed ? 1.3 : 1), 0, 2*Math.PI);
	ctx.arc(this.x, this.y, this.radius*sf, 0, 2*Math.PI);
	ctx.fillStyle = this.pressed ? "red" : "cyan";
	ctx.fill();
}