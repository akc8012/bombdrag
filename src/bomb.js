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

Bomb.prototype.press = function(fingerX, fingerY)
{
	var xDist = Math.abs(fingerX - this.x);
	var yDist = Math.abs(fingerY - this.y);
	var distance = (xDist*xDist) + (yDist*yDist);
	distance = Math.sqrt(distance);

	if (distance < this.radius)
	{
		this.offsetX = fingerX - this.x;
		this.offsetY = fingerY - this.y;
		this.pressed = true;
		return true;
	}
	return false;
}

Bomb.prototype.drag = function(fingerX, fingerY)
{
	this.x = fingerX - this.offsetX;
	this.y = fingerY - this.offsetY;

	var wallDist = this.radius;

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

Bomb.prototype.draw = function(ctx)
{
	ctx.beginPath();
	//ctx.arc(this.x, this.y, this.radius * (this.pressed ? 1.3 : 1), 0, 2*Math.PI);
	ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
	ctx.fillStyle = this.pressed ? "red" : "cyan";
	ctx.fill();
}
