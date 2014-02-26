Math.gcd = function (a, b)
{
	while (a != 0 && b != 0)
	{
		if (a >= b)
			a = a % b;
		else
			b = b % a;
	}
	return a + b;
}

function extend (Child, Parent)
{
	var F = function() { }
	F.prototype = Parent.prototype
	Child.prototype = new F()
	Child.prototype.constructor = Child
	Child.superclass = Parent.prototype	
}

function drawFunc (name, color)
{
	this.step = 0.01;
	this.r1 = 0;
	this.r2 = 0;
	this.h = 0;
	this.x = 0;
	this.y = 0;
	this.currIteration = 0;
	this.maxIterations = 0;
	this.stopped = false;
	this.color = color || '#000000';
	this.name = name;

	var temp = document.getElementById('info');
	if ( temp )
		temp.innerHTML += '<div class="progress-bar" id="' + this.name + '-pb"><div class="progress-wrapper"><div class="progress-border"><div class="progress-body" id="' + name + '" style="background-color: ' + this.color + '"></div></div></div></div>'

	this.func = function ()
	{
	}

	this.randomInit = function (maxSize)
	{
	}

	this.next = function ()
	{
		this.func();
		this.currIteration += this.step;
		var temp = document.getElementById(this.name);

		if ( temp )
			temp.style.width = Math.round(this.currIteration / this.maxIterations * 100) + '%';

		if ( this.currIteration >= this.maxIterations )
			this.stopped = true;
	}

	this.free = function ()
	{
		if ( document.getElementById(this.name + '-pb') )
			document.getElementById(this.name + '-pb').parentNode.removeChild(document.getElementById(this.name + '-pb'));
	}

	this.getStep = function ()
	{
		return this.step;
	}

	this.getR1 = function ()
	{
		return this.r1;
	}

	this.getR2 = function ()
	{
		return this.r2;
	}

	this.getH = function ()
	{
		return this.h;
	}

	this.getX = function ()
	{
		return this.x;
	}

	this.getY = function ()
	{
		return this.y;
	}

	this.getCurrIteration = function ()
	{
		return this.currIteration;
	}

	this.getMaxIterations = function ()
	{
		return this.maxIterations;
	}

	this.calcMaxIterations = function ()
	{
		this.maxIterations = Math.abs(Math.ceil(2 * 3.14 * this.r2/Math.gcd(this.r1, this.r2)));
	}

	this.isStopped = function ()
	{
		return this.stopped;
	}

	this.getColor = function ()
	{
		return this.color;
	}

	this.getName = function ()
	{
		return this.name;
	}
}

function drawHyp (name, color)
{
	drawHyp.superclass.constructor.call(this, name, color);

	this.randomInit = function (maxSize)
	{
		var p05 = Math.round(maxSize * 0.05);
		var p10 = Math.round(maxSize * 0.10);
		var p16 = Math.round(maxSize * 0.16);
		var p37 = Math.round(maxSize * 0.37);
		var p50 = Math.round(maxSize * 0.50);

		this.r1 = p37 + Math.floor(Math.random() * p50);
		this.h  = p05 + Math.floor(Math.random() * p16);
		this.r2 = p10 + Math.floor(Math.random() * (maxSize + this.h - this.r1 - p10));
		this.calcMaxIterations();
	}

	this.func = function ()
	{
		this.x = (this.r1 - this.r2) * Math.cos(this.currIteration) + this.h * Math.cos((this.r1 - this.r2) / this.r2 * this.currIteration);
		this.y = (this.r1 - this.r2) * Math.sin(this.currIteration) - this.h * Math.sin((this.r1 - this.r2) / this.r2 * this.currIteration);
	}
}
extend(drawHyp, drawFunc);

function drawEpi (name, color)
{
	drawEpi.superclass.constructor.call(this, name, color);

	this.randomInit = function (maxSize)
	{
		var p10 = Math.round(maxSize * 0.10);
		var p12 = Math.round(maxSize * 0.12);
		var p16 = Math.round(maxSize * 0.16);
		var p25 = Math.round(maxSize * 0.25);

		this.r1 = p10 + Math.floor(Math.random() * p25);
		this.h  = p12 + Math.floor(Math.random() * p16);
		this.r2 = p10 + Math.floor(Math.random() * (maxSize - this.h - this.r1 - p10));
		this.calcMaxIterations();
	}

	this.func = function ()
	{
		this.x = (this.r1 + this.r2) * Math.cos(this.currIteration) - this.h * Math.cos((this.r1 + this.r2) / this.r2 * this.currIteration);
		this.y = (this.r1 + this.r2) * Math.sin(this.currIteration) - this.h * Math.sin((this.r1 + this.r2) / this.r2 * this.currIteration);
	}
}
extend(drawEpi, drawFunc);

function spirograph ( ctx, func )
{
	this.ctx = ctx;
	this.maxSize = ctx.canvas.width / 2;
	this.func = func;
	this.func.randomInit(this.maxSize);
	this.timer = null;

	var self = this;
	this.timer = setInterval(function() {self.next();}, 1);

	this.next = function()
	{
		if ( !this.func.isStopped() )
		{
			this.func.next();
			this.ctx.fillStyle = this.func.getColor();
			this.ctx.fillRect(this.maxSize + this.func.getX(), this.maxSize + this.func.getY(), 0.5, 0.5);
			this.ctx.save();
		}
		else
		{
			this.stop();
		}
	}

	this.stop = function()
	{
		clearInterval(this.timer);
	}

	this.free = function()
	{
		this.stop();
		this.func.free();
	}
}

