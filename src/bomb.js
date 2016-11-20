var bomb =
{
	x: 0,
	y: 0,
	offsetX: -1,
	offsetY: -1,

	init: function(x, y)
	{
		this.x = x;
		this.y = y;
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

	draw: function(ctx)
	{
		ctx.save();
		ctx.translate(this.x, this.y);
		s_player[0].draw(ctx, 0, 0);

		ctx.restore();
	}
}
