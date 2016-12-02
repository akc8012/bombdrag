"use strict";

function Bomb(x, y, radius, color)
{
	this.pos = new Vec2(-10, y);
	do
	{
		this.vel = new Vec2(randomRange(-3, 3), randomRange(-3, 3));
	}
	while(this.vel.x == 0 || this.vel.y == 0);

	this.offset = new Vec2(-1, -1);
	this.radius = radius;
	this.color = color;
	this.pressed = false;
	this.fingerId = -1;
	this.getDestroyed = false;
}

Bomb.prototype.update = function()
{
	if (!this.pressed)
	{
		this.pos.x += this.vel.x;
		this.pos.y += this.vel.y;
	}

	if ((this.vel.x > 0 && this.pos.x-this.radius > 0) || 
		(this.vel.x < 0 && this.pos.x+this.radius < width))
	{
		if (this.pos.x-this.radius < 0 || this.pos.x+this.radius > width)
			this.vel.x *= -1;
		if (this.pos.y-this.radius < 0 || this.pos.y+this.radius > height)
			this.vel.y *= -1;
	}
}

Bomb.prototype.canPress = function(finger)
{
	var xDist = Math.abs(finger.x - this.pos.x);
	var yDist = Math.abs(finger.y - this.pos.y);
	var dist = distance(xDist, yDist);

	return dist < this.radius;
}

Bomb.prototype.getDist = function(finger)
{
	var xDist = Math.abs(finger.x - this.pos.x);
	var yDist = Math.abs(finger.y - this.pos.y);
	var dist = distance(xDist, yDist);

	return dist;
}

Bomb.prototype.press = function(finger, fingerId)
{
	if (this.canPress(finger))
	{
		this.offset = new Vec2(finger.x - this.pos.x, finger.y - this.pos.y);
		this.pressed = true;
		this.fingerId = fingerId;
		return true;
	}
	return false;
}

Bomb.prototype.drag = function(finger)
{
	this.pos = new Vec2(finger.x - this.offset.x, finger.y - this.offset.y);

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
	this.fingerId = -1;

	for (var i = 0; i < targetBoxes.length; i++)
	{
		if (this.color == targetBoxes[i].color && targetBoxes[i].isInsideBox(this.pos))
			this.getDestroyed = true;
	}
}

Bomb.prototype.draw = function(ctx)
{
	ctx.beginPath();
	ctx.arc(this.pos.x, this.pos.y, this.radius * (this.pressed ? 1.12 : 1), 0, 2*Math.PI);
	ctx.fillStyle = this.color;
	ctx.fill();
}
