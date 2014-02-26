function rgb (h, s, v)
{
	h = ( h < 0 ) ? 0 : ( (h >= 360) ? 359 : h );
	s = ( s < 0 ) ? 0 : ( (s >  100) ? 100 : s );
	v = ( v < 0 ) ? 0 : ( (v >  100) ? 100 : v );
	s /= 100;
	v /= 100;

	var hh = h/60;
	var c = v * s;
	var x = c * (1 - Math.abs(hh%2 - 1));
	var m = v - c;
	hh = Math.floor(hh);
	var rgb = {r: 0, g: 0, b: 0};

	switch (hh)
	{
		case 0:
			rgb = {r: Math.floor((c + m) * 255), g: Math.floor((x + m) * 255), b: Math.floor(m * 255)};
			break;
		case 1:
			rgb = {r: Math.floor((x + m) * 255), g: Math.floor((c + m) * 255), b: Math.floor(m * 255)};
			break;
		case 2:
			rgb = {r: Math.floor(m * 255), g: Math.floor((c + m) * 255), b: Math.floor((x + m) * 255)};
			break;
		case 3:
			rgb = {r: Math.floor(m * 255), g: Math.floor((x + m) * 255), b: Math.floor((c + m) * 255)};
			break;
		case 4:
			rgb = {r: Math.floor((x + m) * 255), g: Math.floor(m * 255), b: Math.floor((c + m) * 255)};
			break;
		case 5:
			rgb = {r: Math.floor((c + m) * 255), g: Math.floor(m * 255), b: Math.floor((x + m) * 255)};
			break;
	}

	var hex = (rgb.r * 65535 + rgb.g * 256 + rgb.b).toString(16, 6);
	if ( hex.length < 6 )
		while (hex.length < 6)
			hex = '0' + hex;

	return (hex);
}
