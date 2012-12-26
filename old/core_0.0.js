/*!
 * JsCV JavaScript Library v1.0
 *
 * Copyright 2012 WhiteSnow
 * Released under the MIT license
 *
 */

/***********************************************
 *	<h2>CV_DATATYPE</h2>
 *	It just can be CV_8I, CV_8U, CV_RGBA, CV_GRAY, CV_16I, CV_16U, CV_32I, CV_32U, CV_32F or CV_64F.
 */
var CV_8I = function(__row, __col, __channel, __buffer){
	this.buffer = __buffer || new ArrayBuffer(__row * __col * __channel);
	this.bytes = 1;
	this.data = new Int8Array(this.buffer);
	this.type = "CV_8I";
},
	CV_8U = function(__row, __col, __channel, __buffer){
	this.buffer = __buffer || new ArrayBuffer(__row * __col * __channel);
	this.bytes = 1;
	this.data = new Uint8Array(this.buffer);
	this.type = "CV_8U";
},
	CV_RGBA = function(__row, __col, __data, __buffer){
	this.channel = 4;
	this.buffer = __buffer || new ArrayBuffer(__row * __col * 4);
	this.bytes = 1;
	this.data = new Uint8ClampedArray(this.buffer);
	__data && this.data.set(__data);
	this.type = "CV_RGBA";
},
	CV_GRAY = function(__row, __col, __data, __buffer){
	this.channel = 2;
	this.buffer = __buffer || new ArrayBuffer(__row * __col * 2);
	this.bytes = 1;
	this.data = new Uint8ClampedArray(this.buffer);
	__data && this.data.set(__data);
	this.type = "CV_GRAY";
},
	CV_16I = function(__row, __col, __channel, __buffer){
	this.buffer = __buffer || new ArrayBuffer(__row * __col * __channel * 2);
	this.bytes = 2;
	this.data = new Int16Array(this.buffer);
	this.type = "CV_16I";
},
	CV_16U = function(__row, __col, __channel, __buffer){
	this.buffer = __buffer || new ArrayBuffer(__row * __col * __channel * 2);
	this.bytes = 2;
	this.data = new Uint16Array(this.buffer);
	this.type = "CV_16U";
},
	CV_32I = function(__row, __col, __channel, __buffer){
	this.buffer = __buffer || new ArrayBuffer(__row * __col * __channel * 4);
	this.bytes = 4;
	this.data = new Int32Array(this.buffer);
	this.type = "CV_32I";
},
	CV_32U = function(__row, __col, __channel, __buffer){
	this.buffer = __buffer || new ArrayBuffer(__row * __col * __channel * 4);
	this.bytes = 4;
	this.data = new Uint32Array(this.buffer);
	this.type = "CV_32U";
},
	CV_32F = function(__row, __col, __channel, __buffer){
	this.buffer = __buffer || new ArrayBuffer(__row * __col * __channel * 4);
	this.bytes = 4;
	this.data = new Float32Array(this.buffer);
	this.type = "CV_32F";
},
	CV_64F = function(__row, __col, __channel, __buffer){
	this.buffer = __buffer || new ArrayBuffer(__row * __col * __channel * 8);
	this.bytes = 8;
	this.data = new Float64Array(this.buffer);
	this.type = "CV_64F";
};

/***********************************************
 *	<h2>CV_CvtCode</h2>
 *	It just can be CV_RGB2GRAY.
 */
var CV_RGBA2GRAY = 0,
	CV_GRAY2RGBA = 1;

/***********************************************
 *	<h2>CV_BORDER_TYPE</h2>
 *	It just can be CV_BORDER_REPLICATE, CV_BORDER_REFLECT, CV_BORDER_REFLECT_101, CV_BORDER_WRAP, CV_BORDER_CONSTANT.
 */
var CV_BORDER_REPLICATE = 1,
	CV_BORDER_REFLECT = 2,
	CV_BORDER_REFLECT_101 = 3,
	CV_BORDER_WRAP = 4,
	CV_BORDER_CONSTANT = 5;

/***********************************************
 *	<h2>CV_THRESH_TYPE</h2>
 *	It just can be CV_THRESH_BINARY, CV_THRESH_BINARY_INV, CV_THRESH_TRUNC, CV_THRESH_TOZERO, CV_THRESH_TOZERO_INV.
 */
var CV_THRESH_BINARY = function(__value, __thresh, __maxVal){
	return __value > __thresh ? __maxVal : 0;
},
	CV_THRESH_BINARY_INV = function(__value, __thresh, __maxVal){
	return __value > __thresh ? 0 : __maxVal;
},
	CV_THRESH_TRUNC = function(__value, __thresh, __maxVal){
	return __value > __thresh ? __thresh : 0;
},
	CV_THRESH_TOZERO = function(__value, __thresh, __maxVal){
	return __value > __thresh ? __value : 0;
},
	CV_THRESH_TOZERO_INV = function(__value, __thresh, __maxVal){
	return __value > __thresh ? 0 : __value;
};


(function(__host){
/***********************************************
 *	<h2>Common Tool</h2>
 */
var host = __host,
	cv = {}; 

var iCanvas = document.createElement("canvas"),
	iCtx = iCanvas.getContext("2d");
	
function iResize(__width, __height){
	iCanvas.width = __width;
	iCanvas.height = __height;
}

/***********************************************
 *	<h2>Mat</h2>
 *	<b>Constructors</b>
 *	Mat()
 *	Mat(int row, int col, Function type, int channel)
 *	Mat(int row, int col, CV_RGBA, TypedArray data)
 *	Mat(int row, int col, Function type, int channel, ArrayBuffer buffer)
 *	Mat(int row, int col, CV_RGBA, TypedArray data, ArrayBuffer buffer)
 *	<b>Parameters</b>
 *	row - Number of rows in a 2D array
 *	col - Number of columns in a 2D array
 *	type - Array type. Use CV_8U, ..., CV_64F to create matrices.
 *	channel - Number of channels in a 2D array
 *	buffer - An ArrayBuffer.
 */
var Mat = function(__row, __col, __type, __channel, __buffer){
	this.row = __row || 0;
	this.col = __col || 0;
	this.channel = __channel;
	__type && __type.call(this, __row, __col, __channel, __buffer);
};
cv.Mat = Mat;
/***********************************************
 *	<h3>Mat.getType</h3>
 *	Gets the type of the data.
 *	<b>Method</b>
 *	String Mat.getType()
 */
Mat.prototype.getType = function(){
	if(this.type !== "CV_RGBA"){
		return (this.type + this.channel + "C");
	}else{
		return this.type;
	}
};
/***********************************************
 *	<h3>Mat.toString</h3>
 *	Gets a String representing the value of the Mat.
 *	<b>Method</b>
 *	String Mat.toString()
 */
Mat.prototype.toString = function(){
	var tempData = this.data,
		text = "Mat("+ this.type +") = {\n",
		num = this.col * this.channel;
	for(var i = 0; i < this.row; i++){
		text += "["
		for(var j = 0; j < num; j++){
			text += (tempData[i * num + j] + ",");
		}
		text += "]\n";
	}
	text += "}";
	return text;
};
/***********************************************
 *	<h3>Mat.depth</h3>
 *	Returns the depth of a matrix element.
 *	<b>Method</b>
 *	Function Mat.depth()
 */
Mat.prototype.depth = function(){
	return eval(this.type);
};
/***********************************************
 *	<h3>Mat.clone</h3>
 *	Creates a full copy of the array and the underlying data.
 *	<b>Method</b>
 *	Mat Mat.clone()
 */
Mat.prototype.clone = function(){
	var tempMat;
	if(this.type === "CV_RGBA"){
		tempMat = new Mat(this.row, this.col, eval(this.type), this.data);
	}else{
		tempMat = new Mat(this.row, this.col, eval(this.type), this.channel);
		tempMat.data = this.data.subarray(0);
	}
	return tempMat;
};
/***********************************************
 *	<h3>Mat.getRow</h3>
 *	Returns a reference to the specified array element.
 *	<b>Method</b>
 *	TypedArray Mat.at(String type, int i)
 *	TypedArray Mat.at(String type, int i, int j)
 *	type - the returned TypedArray type.
 *	i – Index along the dimension 0.
 *	j – Index along the dimension 1.
 */
Mat.prototype.getRow = function(__i){
	var len = this.col * this.channel,
		rowLen = len * this.bytes;
	switch(this.type){
		case "CV_8I":
			return new Int8Array(this.buffer, __i *  rowLen, len);
			break;
		case "CV_8U":
			return new Uint8Array(this.buffer, __i *  rowLen, len);
			break;
		case "CV_RGBA":
		case "CV_GRAY":
			return new Uint8ClampedArray(this.buffer, __i *  rowLen, len);
			break;
		case "CV_16I":
			return new Int16Array(this.buffer, __i *  rowLen, len);
			break;
		case "CV_16U":
			return new Uint16Array(this.buffer, __i *  rowLen, len);
			break;
		case "CV_32I":
			return new Int32Array(this.buffer, __i *  rowLen, len);
			break;
		case "CV_32U":
			return new Uint32Array(this.buffer, __i *  rowLen, len);
			break;
		case "CV_32F":
			return new Float32Array(this.buffer, __i *  rowLen, len);
			break;
		case "CV_G64F":
			return new Float64Array(this.buffer, __i *  rowLen, len);
			break;
	}
}
/***********************************************
 *	<h3>Mat.at</h3>
 *	Returns a reference to the specified array element.
 *	<b>Method</b>
 *	TypedArray Mat.at(String type, int i)
 *	TypedArray Mat.at(String type, int i, int j)
 *	type - the returned TypedArray type.
 *	i – Index along the dimension 0.
 *	j – Index along the dimension 1.
 */
Mat.prototype.at = function(__type, __x, __y){
	var x = __x || 0,
		y = __y || 0,
		rowLen = this.col * this.channel * this.bytes,
		len = 1;
	
	if(__type.indexOf("Vec") > -1){
		var temp = __type.match(/Vec(\d+)([a-z])/);
		len = parseInt(temp[1]);
		switch(temp[2]){
			case "b":
				__type = "uchar";
				break;
			case "s":
				__type = "short";
				break;
			case "i":
				__type = "int";
				break;
			case "f":
				__type = "float";
				break;
			case "d":
				__type = "double";
				break;
		}
	}

	switch(__type){
		case "uchar":
			return new Uint8Array(this.buffer, (y * rowLen + x), len);
			break;
		case "short":
			return new Int16Array(this.buffer, (y * rowLen + x * 2), len);
			break;
		case "int":
			return new Int32Array(this.buffer, (y * rowLen + x * 4), len);
			break;
		case "float":
			return new Float32Array(this.buffer, (y * rowLen + x * 4), len);
			break;
		case "doulble":
			return new Float64Array(this.buffer, (y * rowLen + x * 8), len);
			break;
		default:
			console.error("Unknown/unsupported data type.");
	}

};

/***********************************************
 *	<h2>imread</h2>
 *	Loads an image from a file.
 *	<b>Method</b>
 *	Mat imread(Image in)
 *	<b>Parameters</b>
 *	in - The input Image.
 */
var imread = function(__image){
	var width = __image.width,
		height = __image.height;
	iResize(width, height);
	iCtx.drawImage(__image, 0, 0);
	var imageData = iCtx.getImageData(0, 0, width, height),
		tempMat = new Mat(height, width, CV_RGBA, imageData.data);
	imageData = null;
	iCtx.clearRect(0, 0, width, height);
	return tempMat;
};
cv.imread = imread;

/***********************************************
 *	<h2>imwrite</h2>
 *	Saves an image to a specified file.
 *	<b>Method</b>
 *	bool imwrite(Mat in)
 *	<b>Parameters</b>
 *	in - The input Mat.
 */
var imwrite = function(__imgMat, __type){
	if(__imgMat.type === "CV_GRAY"){
		__imgMat = cvtColor(__imgMat, CV_GRAY2RGBA);
	}
	if(__imgMat.type === "CV_RGBA"){
		var width = __imgMat.col,
			height = __imgMat.row,
			imageData = iCtx.createImageData(width, height);
		imageData.data.set(__imgMat.data);
		iResize(width, height);
		iCtx.putImageData(imageData, 0, 0);
		var data = iCanvas.toDataURL();
		iCtx.clearRect(0, 0, width, height);
		location.href = data.replace("image/png", "image/octet-stream");
		return true;
	}else{
		console.error("Unsupported data type!");
		return false;
	}
};
cv.imwrite = imwrite;

/***********************************************
 *	<h2>convertScaleAbs</h2>
 *	Calculates the first, second, third, or mixed image derivatives using an extended Sobel operator.
 *	<b>Method</b>
 *	Mat convertScaleAbs(Mat src, Mat dst )
 *	<b>Parameters</b>
 *	src – input image.
 *	dst – output Mat.
 */
function convertScaleAbs(__src, __dst){
	var height = __src.row,
		width = __src.col,
		channel = __src.channel,
		sData = __src.data;
		
	if(!__dst){
		if(channel === 2)
			dst = new Mat(height, width, CV_GRAY);
		else if(channel === 4)
			dst = new Mat(height, width, CV_RGBA);
		else
			dst = new Mat(height, width, CV_8I, channel);
	}else{
		dst = __dst;
	}
	
	var dData = dst.data;

	var i, j, c;
	
	for(i = height; i--;){
		for(j = width * channel; j--;){
			dData[i * width * channel + j] = Math.abs(sData[i * width * channel + j]);
		}
	}
	
	return dst;
};
cv.convertScaleAbs = convertScaleAbs;

/***********************************************
 *	<h2>addWeighted</h2>
 *	Calculates the weighted sum of two arrays.
 *	<b>Method</b>
 *	Mat addWeighted(Mat src1, double alpha, Mat src2, double beta, double gamma, Mat dst)
 *	<b>Parameters</b>
 *	src1 – first input array.
 *	alpha – weight of the first array elements.
 *	src2 – second input array of the same size and channel number as src1.
 *	beta – weight of the second array elements.
 *	gamma – scalar added to each sum.
 *	dst – output Mat.
 */
var addWeighted = function(__src1, __alpha, __src2, __beta, __gamma, __dst){
	var height = __src1.row,
		width = __src1.col,
		channel = __src1.channel,
		gamma = __gamma || 0;
	if(height !== __src2.row || width !== __src2.col || channel !== __src2.channel){
		console.error("Src2 must be the same size and channel number as src1!");
		return null;
	}
	
	if(!__dst){
		if(__src1.type.match(/CV\_\d+/))
			dst = new Mat(height, width, __src1.depth(), channel);
		else
			dst = new Mat(height, width, __src1.depth());
	}else{
		dst = __dst;
	}
	
	var dData = dst.data,
		s1Data = __src1.data,
		s2Data = __src2.data;
	
	var i;
	
	for(i = height * width * channel; i--;)
		dData[i] = __alpha * s1Data[i] + __beta * s2Data[i] + gamma;
		
	return dst;
};
cv.addWeighted = addWeighted;

/***********************************************
 *	<h2>cvtColor</h2>
 *	Converts an image from one color space to another.
 *	<b>Method</b>
 *	Mat cvtColor(Mat src, int code)
 *	Mat cvtColor(Mat src, int code, Mat dst)
 *	<b>Parameters</b>
 *	src – input image: 8-bit unsigned, 16-bit unsigned ( CV_16U ), or single-precision floating-point.
 *	code – color space conversion code.
 *	<b>Explain</b>
 *	CV_RGBA2GRAY - 
 *		RGB[A] to Gray: Y <- 0.299 * R + 0.587 * G + 0.114 * B
 *	CV_GRAY2RGBA - 
 *		Gray to RGB[A]: R <- Y, G <- Y, B <- Y, A <- 255
 */
var cvtColor = function(__src, __code){
	if(__src.type && __src.type.indexOf("CV_") > -1){
		var row = __src.row,
			col = __src.col;
		switch(__code){
			case CV_RGBA2GRAY:
				var dst = new Mat(row, col, CV_GRAY);
					data = dst.data,
					data2 = __src.data;
				var pix = __src.row * __src.col * 2;
				while (pix > 0){
					data[pix -= 2] = (data2[2 * pix] * 299 + data2[2 * pix + 1] * 587 + data2[2 * pix + 2] * 114) / 1000;
					data[pix + 1] = data2[2 * pix + 3];
				}
				break;
			case CV_GRAY2RGBA:
				var dst = new Mat(row, col, CV_RGBA);
					data = dst.data,
					data2 = __src.data;
				var pix1, pix2, pix3, pix = __src.row * __src.col * 4;
				while (pix > 0){
					data[pix -= 4] = data[pix + 1] = data[pix + 2] = data2[pix / 2];
					data[pix3 = pix + 3] = data2[pix / 2 + 1];
				}
				break;
		}
	}else{
		console.error("Unsupported data type!");
	}
	return dst;
};
cv.cvtColor = cvtColor;

/***********************************************
 *	<h3>brightnessContrast</h3>
 *	Changes the contrast and brightness of an image
 *	<b>Method</b>
 *	Mat brightnessContrast(Mat src, int brightness, int contrast)
 *	<b>Parameters</b>
 *	src – Source image.
 *	brightness – brightness control value, it should be range in [-255, 255];
 *	contrast – contrast control value, it should be range in [-255, 255];
 */
var brightnessContrast = function(__src, __brightness, __contrast){
	if(__src.type === "CV_RGBA"){
		var sData = __src.data,
			width = __src.col,
			height = __src.row,
			dst = new Mat(height, width, CV_RGBA),
			dData = dst.data,
			brightness = Math.max(-255, Math.min(255, __brightness)),
			contrast = Math.max(-255, Math.min(255, __contrast));
		
		var gray = cvtColor(__src, CV_RGBA2GRAY),
			allValue = 0,
			gData = gray.data;
		var y, x, c;
		
		for(y = height; y--;){
			for(x = width; x--;){
				allValue += gData[(y * width + x) * 2];
			}
		}
		
		var r, g, b, offset, gAverage = Math.floor(allValue / (height * width));
		
		for(y = height; y--;){
			for(x = width; x--;){
				offset = (y * width + x) * 4;
				dData[offset] = sData[offset] + brightness; 
				dData[offset + 1] = sData[offset + 1] + brightness; 
				dData[offset + 2] = sData[offset + 2] + brightness; 
			
				if(contrast >= 0){ 
					for(c = 3; c--;){ 
						if(dData[offset + c] >= gAverage){ 
							dData[offset + c] = dData[offset + c] + (255 - gAverage) * contrast / 255; 
						}else{ 
							dData[offset + c] = dData[offset + c] - (gAverage * contrast / 255); 
						} 
					} 
				}else{
					dData[offset] = dData[offset] + (dData[offset] - gAverage) * contrast / 255; 
					dData[offset + 1] = dData[offset + 1] + (dData[offset + 1] - gAverage) * contrast / 255; 
					dData[offset + 2] = dData[offset + 2] + (dData[offset + 2] - gAverage) * contrast / 255; 
				}
				
				dData[offset + 3] = 255;
			}
		}
	}else{
		console.error("Unsupported data type!");
	}
	return dst;
};
cv.brightnessContrast = brightnessContrast;

/*
 Various border types, image boundaries are denoted with '|'

 * BORDER_REPLICATE:     aaaaaa|abcdefgh|hhhhhhh
 * BORDER_REFLECT:       fedcba|abcdefgh|hgfedcb
 * BORDER_REFLECT_101:   gfedcb|abcdefgh|gfedcba
 * BORDER_WRAP:          cdefgh|abcdefgh|abcdefg
 * BORDER_CONSTANT:      iiiiii|abcdefgh|iiiiiii  with some specified 'i'
 */
/***********************************************
 *	<h2>borderInterpolate</h2>
 *	Computes the source location of an extrapolated pixel.
 *	<b>Method</b>
 *	int borderInterpolate(int p, int len, int borderType)
 *	<b>Parameters</b>
 *	p – 0-based coordinate of the extrapolated pixel along one of the axes, likely <0 or >= len .
 *	len – Length of the array along the corresponding axis.
 *	borderType – Border type. When borderType==CV_BORDER_CONSTANT , the function always returns -1, regardless of p and len .
 */
var borderInterpolate = function(__p, __len, __borderType){
	if(__p < 0 || __p >= __len){
		switch(__borderType){
			case CV_BORDER_REPLICATE:
				__p = __p < 0 ? 0 : __len - 1;
				break;
			case CV_BORDER_REFLECT:
			case CV_BORDER_REFLECT_101:
				var delta = __borderType == CV_BORDER_REFLECT_101;
				if(__len == 1)
					return 0;
				do{
					if(__p < 0)
						__p = -__p - 1 + delta;
					else
						__p = __len - 1 - (__p - __len) - delta;
				}while(__p < 0 || __p >= __len)
				break;
			case CV_BORDER_WRAP:
				if(__p < 0)
					__p -= ((__p - __len + 1) / __len) * __len;
				if(__p >= __len)
					__p %= __len;
				break;
			case CV_BORDER_CONSTANT:
				__p = -1;
			default:
				console.error("Unknown/unsupported border type.");
		}
	}
	return __p;
};
cv.borderInterpolate = borderInterpolate;

/***********************************************
 *	<h2>copyMakeBorder</h2>
 *	Forms a border around an image.
 *	<b>Method</b>
 *	Mat copyMakeBorder(Mat src)
 *	Mat copyMakeBorder(Mat src, int top, int left = top, int bottom = top, int right = left, int borderType = CV_BORDER_REFLECT, Array value = [0, 0, 0, 255])
 *	<b>Parameters</b>
 *	src – Source image.
 *	top -
 *	left -
 *	bottom -
 *	right – Parameter specifying how many pixels in each direction from the source image rectangle to extrapolate. For example, top=1, bottom=1, left=1, right=1 mean that 1 pixel-wide border needs to be built.
 *	borderType – Border type. When borderType==CV_BORDER_CONSTANT , the function always returns -1, regardless of p and len .
 *	value – Border value if borderType==BORDER_CONSTANT .
 */
var copyMakeBorder = function(__src, __top, __left, __bottom, __right, __borderType, __value){
	if(__src.type != "CV_RGBA"){
		console.error("Unsupported data type!");
	}
	if(__borderType === CV_BORDER_CONSTANT){
		return copyMakeConstBorder_8u(__src, __top, __left, __bottom, __right, __value);
	}else{
		return copyMakeBorder_8U(__src, __top, __left, __bottom, __right, __borderType);
	}
};
cv.copyMakeBorder = copyMakeBorder;
//NOT CV_BORDER_CONSTANT
function copyMakeBorder_8U(__src, __top, __left, __bottom, __right, __borderType){
	var i, j;
	var width = __src.col,
		height = __src.row;
	var top = __top,
		left = __left || __top,
		right = __right || left,
		bottom = __bottom || top,
		dstWidth = width + left + right,
		dstHeight = height + top + bottom,
		borderType = borderType || CV_BORDER_REFLECT;
	var buffer = new ArrayBuffer(dstHeight * dstWidth * 4),
		tab = new Uint32Array(left + right);
		
	var buffer2 = new ArrayBuffer(height * width * 4);
	(new Uint8ClampedArray(buffer2)).set(__src.data);
	
	for(i = 0; i < left; i++){
		tab[i] = borderInterpolate(i - left, width, borderType);
	}
	for(i = 0; i < right; i++){
		tab[i + left] = borderInterpolate(width + i, width, borderType);
	}
	
	var tempArray, data;
	
	for(i = 0; i < height; i++){
		tempArray = new Uint32Array(buffer, (i + top) * dstWidth * 4, dstWidth);
		data = new Uint32Array(buffer2, i * width * 4, width);
		for(j = 0; j < left; j++)
			tempArray[j] = data[tab[j]];
		for(j = 0; j < right; j++)
			tempArray[j + width + left] = data[tab[j + left]];
		tempArray.set(data, left);
	}
	
	var allArray = new Uint32Array(buffer);
	for(i = 0; i < top; i++){
		j = borderInterpolate(i - top, height, borderType);
		tempArray = new Uint32Array(buffer, i * dstWidth * 4, dstWidth);
		tempArray.set(allArray.subarray((j + top) * dstWidth, (j + top + 1) * dstWidth));
	}
	for(i = 0; i < bottom; i++){
		j = borderInterpolate(i + height, height, borderType);
		tempArray = new Uint32Array(buffer, (i + top + height) * dstWidth * 4, dstWidth);
		tempArray.set(allArray.subarray((j + top) * dstWidth, (j + top + 1) * dstWidth));
	}
	
	return new Mat(dstHeight, dstWidth, CV_RGBA, new Uint8ClampedArray(buffer));
}
//CV_BORDER_CONSTANT
function copyMakeConstBorder_8u(__src, __top, __left, __bottom, __right, __value){
	var i, j;
	var width = __src.col,
		height = __src.row;
	var top = __top,
		left = __left || __top,
		right = __right || left,
		bottom = __bottom || top,
		dstWidth = width + left + right,
		dstHeight = height + top + bottom,
		value = __value || [0, 0, 0, 255];
	var constBuf = new ArrayBuffer(dstWidth * 4),
		constArray = new Uint8ClampedArray(constBuf);
		buffer = new ArrayBuffer(dstHeight * dstWidth * 4);
		
	var buffer2 = new ArrayBuffer(height * width * 4);
	(new Uint8ClampedArray(buffer2)).set(__src.data);
	
	for(i = 0; i < dstWidth; i++){
		for( j = 0; j < 4; j++){
			constArray[i * 4 + j] = value[j];
		}
	}
	
	constArray = new Uint32Array(constBuf);
	var tempArray;
	
	for(i = 0; i < height; i++){
		tempArray = new Uint32Array(buffer, (i + top) * dstWidth * 4, left);
		tempArray.set(constArray.subarray(0, left));
		tempArray = new Uint32Array(buffer, ((i + top + 1) * dstWidth - right) * 4, right);
		tempArray.set(constArray.subarray(0, right));
		tempArray = new Uint32Array(buffer, ((i + top) * dstWidth + left) * 4, width);
		tempArray.set(new Uint32Array(buffer2, i * width * 4, width));
	}
	
	for(i = 0; i < top; i++){
		tempArray = new Uint32Array(buffer, i * dstWidth * 4, dstWidth);
		tempArray.set(constArray);
	}
	
	for(i = 0; i < bottom; i++){
		tempArray = new Uint32Array(buffer, (i + top + height) * dstWidth * 4, dstWidth);
		tempArray.set(constArray);
	}
	
	return new Mat(dstHeight, dstWidth, CV_RGBA, new Uint8ClampedArray(buffer));
}

/***********************************************
 *	<h2>blur</h2>
 *	Blurs an image using the normalized box filter.
 *	<b>Method</b>
 *	Mat blur(Mat src, int size1 = 3, int size2 = size1)
 *	Mat blur(Mat src, int size1, int size2 = size1, int borderType = CV_BORDER_REFLECT)
 *	Mat blur(Mat src, int size1, int size2 = size1, int borderType = CV_BORDER_REFLECT, Mat dst)
 *	<b>Parameters</b>
 *	src – Source image.
 *	size1 – The first parameter of the blur operation, the aperture width. Must be a positive odd number (1, 3, 5, ...).
 *	size2 – The second parameter of the blur operation, the aperture height. If size2 is zero, it is set to size1 . Otherwise it must be a positive odd number.
 *	borderType – Border type. When borderType==CV_BORDER_CONSTANT , the function always returns -1, regardless of p and len .
 *	dst – output image of the same size and type as src.
 */
var blur = function(__src, __size1, __size2, __borderType, __dst){
	if(__src.type && __src.type == "CV_RGBA"){
		var height = __src.row,
			width = __src.col,
			dst = __dst || new Mat(height, width, CV_RGBA),
			dstData = dst.data;
		var size1 = __size1 || 3,
			size2 = __size2 || size1,
			size = size1 * size2;
		if(size1 % 2 !== 1 || size2 % 2 !== 1){
			console.error("Unsupported size!");
			return __src;
		}
		var startX = Math.floor(size1 / 2),
			startY = Math.floor(size2 / 2);
		var withBorderMat = copyMakeBorder(__src, startY, startX, 0, 0, __borderType),
			mData = withBorderMat.data,
			mWidth = withBorderMat.col;
		
		var newValue, nowX, offsetY, offsetI;
		var i, j, c, y, x;
		
		for(i = height; i--;){
			offsetI = i * width;
			for(j = width; j--;){
				for(c = 3; c--;){
					newValue = 0;
					for(y = size2; y--;){
						offsetY = (y + i) * mWidth * 4;
						for(x = size1; x--;){
							nowX = (x + j) * 4 + c;
							newValue += mData[offsetY + nowX];
						}
					}
					dstData[(j + offsetI) * 4 + c] = newValue / size;
				}
				dstData[(j + offsetI) * 4 + 3] = mData[offsetY + startY * mWidth * 4 + (j + startX) * 4 + 3];
			}
		}
		
	}else{
		console.error("Unsupported data type!");
	}
	return dst;
};
cv.blur = blur;

/***********************************************
 *	<h2>GaussianBlur</h2>
 *	Blurs an image using the normalized box filter.
 *	<b>Method</b>
 *	Mat GaussianBlur(Mat src, int ksize1, int ksize2 = 0, double sigmaX, double sigmaY = 0, int borderType=CV_BORDER_REFLECT )
 *	<b>Parameters</b>
 *	src – Source image.
 *	size1 – The first parameter of the blur operation, the aperture width. Must be a positive odd number (1, 3, 5, ...).
 *	size2 – The second parameter of the blur operation, the aperture height. If size2 is zero, it is set to size1 . Otherwise it must be a positive odd number.
 *	sigmaX – Gaussian kernel standard deviation in X direction.
 *	sigmaY – Gaussian kernel standard deviation in Y direction; if sigmaY is zero, it is set to be equal to sigmaX, if both sigmas are zeros, they are computed from ksize.width and ksize.height.
 *	borderType – Border type. When borderType==CV_BORDER_CONSTANT , the function always returns -1, regardless of p and len .
 *	dst – output image of the same size and type as src.
 */
var GaussianBlur = function(__src, __size1, __size2, __sigma1, __sigma2, __borderType, __dst){
	if(__src.type && __src.type == "CV_RGBA"){
		var height = __src.row,
			width = __src.col,
			dst = __dst || new Mat(height, width, CV_RGBA),
			dstData = dst.data;
		var sigma1 = __sigma1 || 0,
			sigma2 = __sigma2 || __sigma1;
		var size1 = __size1 || Math.round(sigma1 * 6 + 1) | 1,
			size2 = __size2 || Math.round(sigma2 * 6 + 1) | 1,
			size = size1 * size2;
		if(size1 % 2 !== 1 || size2 % 2 !== 1){
			console.error("Unsupported size!");
			return __src;
		}
		var startX = Math.floor(size1 / 2),
			startY = Math.floor(size2 / 2);
		var withBorderMat = copyMakeBorder(__src, startY, startX, 0, 0, __borderType),
			mData = withBorderMat.data,
			mWidth = withBorderMat.col;
			
		var kernel1 = getGaussianKernel(size1, sigma1),
			kernel2, 
			kernel = new Array(size1 * size2);
		
		if(size1 === size2 && sigma1 === sigma2)
			kernel2 = kernel1;
		else
			kernel2 = getGaussianKernel(size2, sigma2);
		
		var i, j, c, y, x;
		
		for(i = kernel2.length; i--;){
			for(j = kernel1.length; j--;){
				kernel[i * size1 + j] = kernel2[i] * kernel1[j];
			}
		}
		
		var newValue, nowX, offsetY, offsetI;
		
		for(i = height; i--;){
			offsetI = i * width;
			for(j = width; j--;){
				for(c = 3; c--;){
					newValue = 0;
					for(y = size2; y--;){
						offsetY = (y + i) * mWidth * 4;
						for(x = size1; x--;){
							nowX = (x + j) * 4 + c;
							newValue += (mData[offsetY + nowX] * kernel[y * size1 + x]);
						}
					}
					dstData[(j + offsetI) * 4 + c] = newValue;
				}
				dstData[(j + offsetI) * 4 + 3] = mData[offsetY + startY * mWidth * 4 + (j + startX) * 4 + 3];
			}
		}
		
	}else{
		console.error("Unsupported data type!");
	}
	return dst;
};
cv.GaussianBlur = GaussianBlur;

/***********************************************
 *	<h2>getGaussianKernel</h2>
 *	Returns Gaussian filter coefficients.
 *	<b>Method</b>
 *	Array getGaussianKernel(int ksize, double sigma)
 *	<b>Parameters</b>
 *	ksize – Aperture size. It should be odd and positive.
 *	sigma – Gaussian standard deviation. If it is non-positive, it is computed from ksize as sigma = 0.3*((ksize-1)*0.5 - 1) + 0.8 .
 */
var getGaussianKernel = function(__n, __sigma){
	var SMALL_GAUSSIAN_SIZE = 7,
		smallGaussianTab = [[1],
							[0.25, 0.5, 0.25],
							[0.0625, 0.25, 0.375, 0.25, 0.0625],
							[0.03125, 0.109375, 0.21875, 0.28125, 0.21875, 0.109375, 0.03125]
		];
		
	var fixedKernel = __n & 2 == 1 && __n <= SMALL_GAUSSIAN_SIZE && __sigma <= 0 ? smallGaussianTab[__n >> 1] : 0;
	
	var sigmaX = __sigma > 0 ? __sigma : ((__n - 1) * 0.5 - 1) * 0.3 + 0.8,
		scale2X = -0.5 / (sigmaX * sigmaX),
		sum = 0;
	
	var i, x, t, kernel = [];
	
	for(i = 0; i < __n; i++){
		x = i - (__n - 1) * 0.5;
		t = fixedKernel ? fixedKernel[i] : Math.exp(scale2X * x * x);
		kernel[i] = t;
		sum += t;
	}
	
	sum = 1 / sum;
	
	for(i = __n; i--;){
		kernel[i] *= sum;
	}
	
	return kernel;
};
cv.getGaussianKernel = getGaussianKernel;

/***********************************************
 *	<h2>medianBlur</h2>
 *	Blurs an image using the normalized box filter.
 *	<b>Method</b>
 *	Mat blur(Mat src, int size1 = 3, int size2 = size1)
 *	Mat blur(Mat src, int size1, int size2 = size1, int borderType = CV_BORDER_REFLECT)
 *	Mat blur(Mat src, int size1, int size2 = size1, int borderType = CV_BORDER_REFLECT, Mat dst)
 *	<b>Parameters</b>
 *	src – Source image.
 *	size1 – The first parameter of the blur operation, the aperture width. Must be a positive odd number (1, 3, 5, ...).
 *	size2 – The second parameter of the blur operation, the aperture height. If size2 is zero, it is set to size1 . Otherwise it must be a positive odd number.
 *	borderType – Border type. When borderType==CV_BORDER_CONSTANT , the function always returns -1, regardless of p and len .
 *	dst – output image of the same size and type as src.
 */
var medianBlur = function(__src, __size1, __size2, __borderType, __dst){
	if(__src.type && __src.type == "CV_RGBA"){
		var height = __src.row,
			width = __src.col,
			dst = __dst || new Mat(height, width, CV_RGBA),
			dstData = dst.data;
		var size1 = __size1 || 3,
			size2 = __size2 || size1,
			size = size1 * size2;
		if(size1 % 2 !== 1 || size2 % 2 !== 1){
			console.error("Unsupported size!");
			return __src;
		}
		var startX = Math.floor(size1 / 2),
			startY = Math.floor(size2 / 2);
		var withBorderMat = copyMakeBorder(__src, startY, startX, 0, 0, __borderType),
			mData = withBorderMat.data,
			mWidth = withBorderMat.col;
		
		var newValue = [], nowX, offsetY, offsetI;
		var i, j, c, y, x;
		
		for(i = height; i--;){
			offsetI = i * width;
			for(j = width; j--;){
				for(c = 3; c--;){
					for(y = size2; y--;){
						offsetY = (y + i) * mWidth * 4;
						for(x = size1; x--;){
							nowX = (x + j) * 4 + c;
							newValue[y * size1 + x] = mData[offsetY + nowX];
						}
					}
					newValue.sort();
					dstData[(j + offsetI) * 4 + c] = newValue[Math.round(size / 2)];
				}
				dstData[(j + offsetI) * 4 + 3] = mData[offsetY + startY * mWidth * 4 + (j + startX) * 4 + 3];
			}
		}
		
	}else{
		console.error("Unsupported data type!");
	}
	return dst;
}; 
cv.medianBlur = medianBlur;

/***********************************************
 *	<h2>bilateralFilter</h2>
 *	Blurs an image using the normalized box filter.
 *	<b>Method</b>
 *	Mat bilateralFilter(Mat src, int ksize1, int ksize2 = 0, double sigmaX, double sigmaY = 0, int borderType=CV_BORDER_REFLECT )
 *	<b>Parameters</b>
 *	src – Source image.
 *	size – The parameter of the blur operation, the aperture width. Must be a positive odd number (1, 3, 5, ...).
 *	sigmaColor – Filter sigma in the color space. A larger value of the parameter means that farther colors within the pixel neighborhood (see sigmaSpace ) will be mixed together, resulting in larger areas of semi-equal color.
 *	sigmaSpace – Filter sigma in the coordinate space. A larger value of the parameter means that farther pixels will influence each other as long as their colors are close enough (see sigmaColor ). When d>0 , it specifies the neighborhood size regardless of sigmaSpace . Otherwise, d is proportional to sigmaSpace .
 *	borderType – Border type. When borderType==CV_BORDER_CONSTANT , the function always returns -1, regardless of p and len .
 *	dst – output image of the same size and type as src.
 */
var bilateralFilter = function(__src, __size, __sigmaColor, __sigmaSpace, __borderType, __dst){
	if(__src.type && __src.type == "CV_RGBA"){
		var height = __src.row,
			width = __src.col,
			dst = __dst || new Mat(height, width, CV_RGBA),
			dstData = dst.data,
			sData = __src.data;
		var sigmaColor = __sigmaColor || 5,
			sigmaSpace = __sigmaSpace || 0.2;
		var __size = __size || Math.round(sigmaSpace * 6 + 1) | 1,
			size = __size * __size;
		if(__size % 2 !== 1){
			console.error("Unsupported size!");
			return __src;
		}
		var start = Math.floor(__size / 2);
		var withBorderMat = copyMakeBorder(__src, start, start, 0, 0, __borderType),
			mData = withBorderMat.data,
			mWidth = withBorderMat.col;
			
		var kernel1 = getGaussianKernel(__size, sigmaColor),
			kernel = new Array(size);
		
		var i, j, c, y, x;
		
		for(i = kernel1.length; i--;){
			for(j = kernel1.length; j--;){
				kernel[i * __size + j] = kernel1[i] * kernel1[j];
			}
		}
		
		var dist, underValue, overValue, anchor, v, nowX, offsetY, offsetI;
		
		for(i = height; i--;){
			offsetI = i * width;
			for(j = width; j--;){
				for(c = 3; c--;){
					underValue = 0;
					overValue = 0;
					for(y = __size; y--;){
						offsetY = (y + i) * mWidth * 4;
						anchor = sData[(i * width + j) * 4 + c];
						for(x = __size; x--;){
							nowX = (x + j) * 4 + c;
							dist = anchor - mData[offsetY + nowX];
							v = kernel[y * __size + x] * Math.exp(-1 * dist * dist / sigmaColor * sigmaColor);
							underValue += v;
							overValue += v * mData[offsetY + nowX];
						}
					}
					dstData[(j + offsetI) * 4 + c] = overValue / underValue;
				}
				dstData[(j + offsetI) * 4 + 3] = mData[offsetY + start * mWidth * 4 + (j + start) * 4 + 3];
			}
		}
		
	}else{
		console.error("Unsupported data type!");
	}
	return dst;
};
cv.bilateralFilter = bilateralFilter;

/***********************************************
 *	<h2>filter2D</h2>
 *	Blurs an image using the normalized box filter.
 *	<b>Method</b>
 *	Mat filter2D(Mat src, Function ddepth, Mat kernel, int borderType=CV_BORDER_REFLECT, Mat dst )
 *	<b>Parameters</b>
 *	src – input image.
 *	ddepth –desired depth of the destination image; if it is negative, it will be the same as src.depth().
 *	kernel – convolution kernel (or rather a correlation kernel), a single-channel floating point matrix; if you want to apply different kernels to different channels, split the image into separate color planes using split() and process them individually.
 *	borderType – Border type. When borderType==CV_BORDER_CONSTANT , the function always returns -1, regardless of p and len .
 *	dst – output image of the same size and type as src.
 */
var filter2D = function(__src, __depth, __kernel, __borderType, __dst){
	var height = __src.row,
		width = __src.col,
		dst = __dst || new Mat(height, width, __depth || __src.depth()),
		dstData = dst.data,
		sData = __src.data,
		channel = __src.channel;
	var size1 = __kernel.col,
		size2 = __kernel.row,
		kData = __kernel.data;
	
	if(size1 % 2 !== 1 || size2 % 2 !== 1){
		console.error("Unsupported size!");
		return __src;
	}
	
	var startX = Math.floor(size1 / 2),
		startY = Math.floor(size2 / 2);
	var withBorderMat = copyMakeBorder(__src, startY, startX, 0, 0, __borderType),
		mData = withBorderMat.data,
		mWidth = withBorderMat.col;
		
	var newValue, nowX, offsetY, offsetI;
		
	for(i = height; i--;){
		offsetI = i * width;
		for(j = width; j--;){
			for(c = channel; c--;){
				newValue = 0;
				for(y = size2; y--;){
					offsetY = (y + i) * mWidth * channel;
					for(x = size1; x--;){
						nowX = (x + j) * channel + c;
						newValue += (mData[offsetY + nowX] * kData[y * size1 + x]);
					}
				}
				dstData[(j + offsetI) * channel + c] = newValue;
			}
		}
	}
	
	return dst;
};
cv.filter2D = filter2D;

/***********************************************
 *	<h2>threshold</h2>
 *	Applies a fixed-level threshold to each array element.
 *	<b>Method</b>
 *	Mat threshold(Mat src, Function thresh, uchar maxVal, int threshouldType=CV_THRESH_BINARY, Mat dst )
 *	<b>Parameters</b>
 *	src – Source array.
 *	thresh – Threshold value.
 *	maxVal – Maximum value to use with THRESH_BINARY and THRESH_BINARY_INV thresholding types.
 *	dst – output image of the same size and type as src.
 */
var threshold = function(__src, __thresh, __maxVal, __thresholdType, __dst){
	if(__src.type && __src.type == "CV_GRAY"){
		var width = __src.col,
			height = __src.row,
			sData = __src.data,
			dst = __dst || new Mat(height, width, CV_GRAY),
			dData = dst.data,
			maxVal = __maxVal || 255,
			threshouldType = __thresholdType || CV_THRESH_BINARY;
			
		var i, j, offset;
		
		for(i = height; i--;){
			for(j = width; j--;){
				offset = (i * width + j) * 2;
				dData[offset] = thresholdType(sData[offset], __thresh, __maxVal);
				dData[offset + 1] = sData[offset + 1];
			}
		}
		
	}else{
		console.error("Unsupported data type!");
	}
	
	return dst;
};
cv.threshold = threshold;

/***********************************************
 *	<h2>Sobel</h2>
 *	Calculates the first, second, third, or mixed image derivatives using an extended Sobel operator.
 *	<b>Method</b>
 *	Mat Sobel(Mat src, int dx, int dy, int ksize=3, int borderType=CV_BORDER_REFLECT, Mat dst )
 *	<b>Parameters</b>
 *	src – input image.
 *	xorder – order of the derivative x.
 *	yorder – order of the derivative y.
 *	ksize – size of the extended Sobel kernel; it must be 3.
 *	borderType – Border type. When borderType==CV_BORDER_CONSTANT , the function always returns -1, regardless of p and len .
 *	dst – output Mat.
 */
var Sobel = function(__src, __xorder, __yorder, __size, __borderType, __dst){
	if(__src.type && __src.type === "CV_RGBA"){
		var kernel,
			height = __src.row,
			width = __src.col,
			dst = __dst || new Mat(height, width, CV_16I, 2),
			dstData = dst.data,
			size = __size || 3,
			channel = dst.channel;
		switch(size){
			case 3:
				if(__xorder){
					kernel = [-1, 0, 1,
							  -2, 0, 2,
							  -1, 0, 1
							 ];
				}else if(__yorder){
					kernel = [-1, -2, -1,
							   0,  0,  0,
							   1,  2,  1
							 ];
				}
				break;
			default:
				console.error("Unknown/unsupported size.");
			
		}
		
		RGBA216IC2Filter(__src, size, height, width, channel, kernel, dstData, __borderType);

	}else{
		console.error("Unsupported data type!");
	}
	return dst;
};
cv.Sobel = Sobel;
//CV_RGBA to CV_16IC2 filter
function RGBA216IC2Filter(__src, size, height, width, channel, kernel, dstData, __borderType){
	var start = Math.floor(size / 2);
		
	var withBorderMat = copyMakeBorder(__src, start, start, 0, 0, __borderType);
	withBorderMat = cvtColor(withBorderMat, CV_RGBA2GRAY);
			
	var mData = withBorderMat.data,
		mWidth = withBorderMat.col;
		
	var i, j, y, x, c;
	var newValue, nowX, offsetY, offsetI;
		
	for(i = height; i--;){
		offsetI = i * width;
		for(j = width; j--;){
			newValue = 0;
			for(y = size; y--;){
				offsetY = (y + i) * mWidth * 2;
				for(x = size; x--;){
					nowX = (x + j) * 2;
					newValue += (mData[offsetY + nowX] * kernel[y * size + x]);
				}
			}
			for(c = channel - 1; c--;)
				dstData[(j + offsetI) * channel + c] = newValue;
			dstData[(j + offsetI + 1) * channel - 1] = mData[offsetY + start * mWidth * 2 + (j + start) * 2 + 1];
		}
	}
}

/***********************************************
 *	<h2>Laplacian</h2>
 *	Calculates the Laplacian of an image.
 *	<b>Method</b>
 *	Mat Laplacian(Mat src, int ksize=1, int borderType=CV_BORDER_REFLECT, Mat dst )
 *	<b>Parameters</b>
 *	src – input image.
 *	ksize – The aperture size used to compute the second-derivative filters. It must be 1.
 *	borderType – Border type. When borderType==CV_BORDER_CONSTANT , the function always returns -1, regardless of p and len .
 *	dst – output Mat.
 */
var Laplacian = function(__src, __size, __borderType, __dst){
	if(__src.type && __src.type === "CV_RGBA"){
		var kernel,
			height = __src.row,
			width = __src.col,
			dst = __dst || new Mat(height, width, CV_16I, 2),
			dstData = dst.data,
			size = __size || 1,
			channel = dst.channel;
		switch(size){
			case 1:
				kernel = [0,  1, 0,
						  1, -4, 1,
						  0,  1, 0
						 ];
				size = 3;
				break;
			default:
				console.error("Unknown/unsupported size.");
			
		}
		
		RGBA216IC2Filter(__src, size, height, width, channel, kernel, dstData, __borderType);
	}else{
		console.error("Unsupported data type!");
	}
	return dst;
};
cv.Laplacian = Laplacian;

/***********************************************
 *	<h2>Scharr</h2>
 *	Calculates the first x- or y- image derivative using Scharr operator.
 *	<b>Method</b>
 *	Mat Scharr(Mat src, int dx, int dy, int ksize=3, int borderType=CV_BORDER_REFLECT, Mat dst )
 *	<b>Parameters</b>
 *	src – input image.
 *	xorder – order of the derivative x.
 *	yorder – order of the derivative y.
 *	ksize – size of the extended Scharr kernel; it must be 3.
 *	borderType – Border type. When borderType==CV_BORDER_CONSTANT , the function always returns -1, regardless of p and len .
 *	dst – output Mat.
 */
var Scharr = function(__src, __xorder, __yorder, __size, __borderType, __dst){
	if(__src.type && __src.type === "CV_RGBA"){
		var kernel,
			height = __src.row,
			width = __src.col,
			dst = __dst || new Mat(height, width, CV_16I, 2),
			dstData = dst.data,
			size = __size || 3,
			channel = dst.channel;
		switch(size){
			case 3:
				if(__xorder){
					kernel = [ -3, 0,  3,
							  -10, 0, 10,
							   -3, 0,  3
							 ];
				}else if(__yorder){
					kernel = [-3, -10, -3,
							   0,   0,  0,
							   3,  10,  3
							 ];
				}
				break;
			default:
				console.error("Unknown/unsupported size.");
			
		}
		
		RGBA216IC2Filter(__src, size, height, width, channel, kernel, dstData, __borderType);

	}else{
		console.error("Unsupported data type!");
	}
	return dst;
};
cv.Scharr = Scharr;





host.cv = cv;

})(this);