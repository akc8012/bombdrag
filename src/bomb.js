var bomb =
{
	x: 0,
	y: 0,
	sf: 1,
	offsetX: -1,
	offsetY: -1,
	radius: 0,
	pressed: false,

	init: function(x, y, radius)
	{
		this.x = x;
		this.y = y;
		this.radius = radius;
	},

	update: function()
	{
		
	},

	press: function(x, y, sf)
	{
		if (Math.abs(x - this.x) < this.radius+(8*sf) && Math.abs(y - this.y) < this.radius+(8*sf))
		{
			offsetX = x - this.x;
			offsetY = y - this.y;
			this.pressed = true;
		}
	},

	drag: function(x, y, sf)
	{
		this.x = x - offsetX;
		this.y = y - offsetY;

		var wallDist = 28*sf;

		if (this.x-wallDist < 0)
			this.x = wallDist;
		if (this.x+wallDist > width)
			this.x = width-wallDist;
		if (this.y-wallDist < 0)
			this.y = wallDist;
		if (this.y+wallDist > height)
			this.y = height-wallDist;
	},

	release: function()
	{
		offsetX = -1;
		offsetY = -1;
		this.pressed = false;
	},

	draw: function(ctx, sf)
	{
		/*ctx.save();
		ctx.translate(this.x, this.y);
		s_player[0].draw(ctx, 0, 0);

		ctx.restore();*/

		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius*sf * (this.pressed ? 1.3 : 1), 0, 2*Math.PI);
		ctx.fillStyle = "cyan";
		ctx.fill();
	}
}
