"use strict";

function Bomb(x, y, radius)
{
	this.pos = new Vec2(x, y);
	this.offset = new Vec2(-1, -1);
	this.radius = radius;
	this.pressed = false;
}

Bomb.prototype.update = function()
{
	
}

Bomb.prototype.press = function(fingerX, fingerY)
{
	var xDist = Math.abs(fingerX - this.pos.x);
	var yDist = Math.abs(fingerY - this.pos.y);
	var distance = (xDist*xDist) + (yDist*yDist);
	distance = Math.sqrt(distance);

	if (distance < this.radius)
	{
		this.offset = new Vec2(fingerX - this.pos.x, fingerY - this.pos.y);
		this.pressed = true;
		return true;
	}
	return false;
}

Bomb.prototype.drag = function(fingerX, fingerY)
{
	this.pos = new Vec2(fingerX - this.offset.x, fingerY - this.offset.y);

	var wallDist = this.radius;

	if (this.pos.x-wallDist < 0)
		this.pos.x = wallDist;
	if (this.pos.x+wallDist > width)
		this.pos.x = width-wallDist;
	if (this.pos.y-wallDist < 0)
		this.pos.y = wallDist;
	if (this.pos.y+wallDist > height)
		this.pos.y = height-wallDist;
}

Bomb.prototype.release = function()
{
	this.offset = new Vec2(-1, -1);
	this.pressed = false;
}

Bomb.prototype.draw = function(ctx)
{
	ctx.beginPath();
	ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2*Math.PI);
	ctx.fillStyle = this.pressed ? "red" : "cyan";
	ctx.fill();
}
