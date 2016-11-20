var bomb =
{
	x: 0,
	y: 0,
	offsetX: -1,
	offsetY: -1,
	radius: 0,

	init: function(x, y, radius)
	{
		this.x = x;
		this.y = y;
		this.radius = radius;
	},

	update: function()
	{
		
	},

	press: function(x, y)
	{
		offsetX = x - this.x;
		offsetY = y - this.y;
	},

	drag: function(x, y)
	{
		this.x = x - offsetX;
		this.y = y - offsetY;
	},

	release: function()
	{
		offsetX = -1;
		offsetY = -1;
	},

	draw: function(ctx, scaleFactor)
	{
		/*ctx.save();
		ctx.translate(this.x, this.y);
		s_player[0].draw(ctx, 0, 0);

		ctx.restore();*/

		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius*scaleFactor, 0, 2*Math.PI);
		ctx.fillStyle = "cyan";
		ctx.fill();
	}
}
