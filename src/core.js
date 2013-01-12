/*!
 * JsCV JavaScript Library
 *
 * Core Module v0.2
 *
 * Copyright 2012 WhiteSnow
 * Released under the MIT license
 *
 */
//	Supported Chrome 10+ , IE 10+ , Firefox 4+ , Maxthon 3.4.5+ , Opera 11.64+ , Safari 5.1+
/***********************************************
 *	<h2>CV_DATATYPE</h2>
 *	It just can be CV_8I, CV_8U, CV_RGBA, CV_GRAY, CV_16I, CV_16U, CV_32I, CV_32U, CV_32F or CV_64F.
 */
function CV_8I(__row, __col, __channel, __buffer){
	this.buffer = __buffer || new ArrayBuffer(__row * __col * __channel);
	this.bytes = 1;
	this.data = new Int8Array(this.buffer);
	this.type = "CV_8I";
}
function CV_8U(__row, __col, __channel, __buffer){
	this.buffer = __buffer || new ArrayBuffer(__row * __col * __channel);
	this.bytes = 1;
	this.data = new Uint8Array(this.buffer);
	this.type = "CV_8U";
}
function CV_RGBA(__row, __col, __data, __buffer){
	this.channel = 4;
	this.buffer = __buffer || new ArrayBuffer(__row * __col * 4);
	this.bytes = 1;
	this.data = new Uint8ClampedArray(this.buffer);
	__data && this.data.set(__data);
	this.type = "CV_RGBA";
}
function CV_GRAY(__row, __col, __data, __buffer){
	this.channel = 1;
	this.buffer = __buffer || new ArrayBuffer(__row * __col);
	this.bytes = 1;
	this.data = new Uint8ClampedArray(this.buffer);
	__data && this.data.set(__data);
	this.type = "CV_GRAY";
}
function CV_16I(__row, __col, __channel, __buffer){
	this.buffer = __buffer || new ArrayBuffer(__row * __col * __channel * 2);
	this.bytes = 2;
	this.data = new Int16Array(this.buffer);
	this.type = "CV_16I";
}
function CV_16U(__row, __col, __channel, __buffer){
	this.buffer = __buffer || new ArrayBuffer(__row * __col * __channel * 2);
	this.bytes = 2;
	this.data = new Uint16Array(this.buffer);
	this.type = "CV_16U";
}
function CV_32I(__row, __col, __channel, __buffer){
	this.buffer = __buffer || new ArrayBuffer(__row * __col * __channel * 4);
	this.bytes = 4;
	this.data = new Int32Array(this.buffer);
	this.type = "CV_32I";
}
function CV_32U(__row, __col, __channel, __buffer){
	this.buffer = __buffer || new ArrayBuffer(__row * __col * __channel * 4);
	this.bytes = 4;
	this.data = new Uint32Array(this.buffer);
	this.type = "CV_32U";
}
function CV_32F(__row, __col, __channel, __buffer){
	this.buffer = __buffer || new ArrayBuffer(__row * __col * __channel * 4);
	this.bytes = 4;
	this.data = new Float32Array(this.buffer);
	this.type = "CV_32F";
}
function CV_64F(__row, __col, __channel, __buffer){
	this.buffer = __buffer || new ArrayBuffer(__row * __col * __channel * 8);
	this.bytes = 8;
	this.data = new Float64Array(this.buffer);
	this.type = "CV_64F";
}

/***********************************************
 *	<h2>CV_CvtCode</h2>
 *	It just can be CV_RGB2GRAY.
 */
var CV_RGBA2GRAY = 0x01,
	CV_GRAY2RGBA = 0x02,
	CV_RGBA2GRAY_DUFF = 0x03;

/***********************************************
 *	<h2>CV_BORDER_TYPE</h2>
 *	It just can be CV_BORDER_REPLICATE, CV_BORDER_REFLECT, CV_BORDER_REFLECT_101, CV_BORDER_WRAP, CV_BORDER_CONSTANT.
 */
var CV_BORDER_REPLICATE = 0x01,
	CV_BORDER_REFLECT = 0x02,
	CV_BORDER_REFLECT_101 = 0x03,
	CV_BORDER_WRAP = 0x04,
	CV_BORDER_CONSTANT = 0x05;

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

var JsCV_MODULE = "CORE",
	JsCV_MODULE_VERSION = "0.2";

/***********************************************
 *	<h2>JsCV LOG System</h2>
 */
var JsCV_ERROR_ON = console && true,
	JsCV_LOG_ON = console && true;
	
var UNSPPORT_DATA_TYPE = "Unknown/unsupported data type.",
	UNSPPORT_BORDER_TYPE = "Unknown/unsupported border type.",
	UNSPPORT_SIZE = "The kernel size must be odd nor larger than 7.",
	IS_UNDEFINED_OR_NULL = "This value shouldn't be undefined, Null or 0",
	MAT_SIZE_ERROR = "Mat's size is not equal to data size.";

function JsCV_ERROR(__callee, __msg, __line){
	this.funciton = __callee.toString();
	this.line = __line;
	this.module_verision = JsCV_MODULE_VERSION;
	this.module = JsCV_MODULE;
	this.error = "[JsCV_ERROR] " + __msg;
}

function log(__msg){
	JsCV_LOG_ON && console.log("[JsCV_LOG] " + __msg);
}

function error(__callee, __msg, __line){
	JsCV_ERROR_ON && console.dir(new JsCV_ERROR(__callee, __msg, __line));
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
	this.row = __row || error(arguments.callee, IS_UNDEFINED_OR_NULL/* {line} */);
	this.col = __col || error(arguments.callee, IS_UNDEFINED_OR_NULL/* {line} */);
	this.channel = __channel;
	__type ? __type.call(this, __row, __col, __channel, __buffer) : error(arguments.callee, UNSPPORT_DATA_TYPE/* {line} */);
	this.data.length === this.row * this.col * this.channel || error(arguments.callee, MAT_SIZE_ERROR/* {line} */);
};
cv.Mat = Mat;
/***********************************************
 *	<h3>Mat.getType</h3>
 *	Gets the type of the data.
 *	<b>Method</b>
 *	String Mat.getType()
 */
Mat.prototype.getType = function(){
	if(this.type.match(/CV\_[0-9]/)){
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
		tempMat = new Mat(this.row, this.col, this.depth(), this.data);
	}else{
		tempMat = new Mat(this.row, this.col, this.depth(), this.channel);
		tempMat.data = this.data.subarray(0);
	}
	return tempMat;
};
/***********************************************
 *	<h3>Mat.getRow</h3>
 *	Returns a reference to the specified array element.
 *	<b>Method</b>
 *	Rect Mat.getRow(int y)
 *	y – A 0-based row index.
 */
Mat.prototype.getRow = function(__i){
	var len = this.col * this.channel,
		rowLen = len * this.bytes,
		i = __i || 0;
		
	var array = new this.data.constructor(this.buffer, i *  rowLen, len);
	return new Rect(array, this.channel);
};
/***********************************************
 *	<h3>Mat.getRow</h3>
 *	Returns a reference to the specified array element.
 *	<b>Method</b>
 *	Rect Mat.getCol(int x)
 *	x – A 0-based column index.
 */
Mat.prototype.getCol = function(__i){
	var len = this.col * this.channel,
		rowLen = len * this.bytes,
		array = [],
		i = __i || 0;
	
	function getAllElement(__constructor){
		var row = this.row,
			channel = this.channel;
		for(var j = 0; j < row; j++){
			array.push(new __constructor(this.buffer, j * rowLen + i, 1 * channel));
		}
	}
	
	getAllElement(this.data.constructor);
	
	return new Rect(array, this.channel);
};
/***********************************************
 *	<h3>Mat.rowRange</h3>
 *	Creates a matrix header for the specified row span.
 *	<b>Method</b>
 *	Rect Mat.rowRange(int startrow, int endrow)
 *	startrow – An inclusive 0-based start index of the row span.
 *	endrow – An exclusive 0-based ending index of the row span.
 */
Mat.prototype.rowRange = function(__i, __j){
	var len = this.col * this.channel,
		rowLen = len * this.bytes,
		array = [],
		i = __i || 0,
		j = __j || this.row;
		
	function getAllElement(__constructor){
		var row = this.row;
		for(var k = i; k <= j; k++){
			array.push(new __constructor(this.buffer, k * rowLen, len));
		}
	}
	
	getAllElement(this.data.constructor);
	
	return new Rect(array, this.channel);
};
/***********************************************
 *	<h3>Mat.colRange</h3>
 *	Creates a matrix header for the specified row span.
 *	<b>Method</b>
 *	Rect Mat.colRange(int startcol, int endcol)
 *	startcol – An inclusive 0-based start index of the column span.
 *	endcol – An exclusive 0-based ending index of the column span.
 */
Mat.prototype.colRange = function(__i, __j){
	var len = this.col * this.channel,
		rowLen = len * this.bytes,
		array = [],
		i = __i || 0,
		j = __j || this.col;
		
	function getAllElement(__constructor){
		var row = this.row
			channel = this.channel;
		for(var k = 0; k < row; k++){
			array.push(new __constructor(this.buffer, k * rowLen + __i, (__j - __i + 1) * channel));
		}
	}
	
	getAllElement(Float64Array);
	
	return new Rect(array, this.channel);
};
/***********************************************
 *	<h3>Mat.convertTo</h3>
 *	Creates a matrix header for the specified row span.
 *	<b>Method</b>
 *	Array Mat.convertTo(Function type, Mat dst)
 *	type - Array type. Use CV_8U, ..., CV_64F to create new matrices.
 *	dst – output Mat.
 */
Mat.prototype.convertTo = function(__type, __dst){
	var dst = __dst || new Mat(this.row, this.col, __type),
		dBuffer = dst.buffer;
	switch(__type.toString().match(/function\s+(CV_[0-9A-Z]+)/)[1]){
		case "CV_8I":
			(new Int8Array(dBuffer)).set(this.data);
			break;
		case "CV_8U":
			(new Uint8Array(dBuffer)).set(this.data);
			break;
		case "CV_RGBA":
		case "CV_GRAY":
			(new Uint8ClampedArray(dBuffer)).set(this.data);
			break;
		case "CV_16I":
			(new Int16Array(dBuffer)).set(this.data);
			break;
		case "CV_16U":
			(new Uint16Array(dBuffer)).set(this.data);
			break;
		case "CV_32I":
			(new Int32Array(dBuffer)).set(this.data);
			break;
		case "CV_32U":
			(new Uint32Array(dBuffer)).set(this.data);
			break;
		case "CV_32F":
			(new Float32Array(dBuffer)).set(this.data);
			break;
		case "CV_64F":
			(new Float64Array(dBuffer)).set(this.data);
			break;
	}
	
	return dst;
};
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
	var type = __type || error(arguments.callee, IS_UNDEFINED_OR_NULL/* {line} */);
	var x = __x || 0,
		y = __y || 0,
		rowLen = this.col * this.channel * this.bytes,
		len = 1;
	
	if(type.indexOf("Vec") > -1){
		var temp = __type.match(/Vec(\d+)([a-z])/);
		len = parseInt(temp[1]);
		switch(temp[2]){
			case "b":
				type = "uchar";
				break;
			case "s":
				type = "short";
				break;
			case "i":
				type = "int";
				break;
			case "f":
				type = "float";
				break;
			case "d":
				type = "double";
				break;
		}
	}

	switch(type){
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
			error(arguments.callee, UNSPPORT_DATA_TYPE/* {line} */);
	}

};

/***********************************************
 *	<h2>Rect</h2>
 *	<b>Constructors</b>
 *	Rect()
 *	Mat(Array<TrypeArray> data, int channel)
 *	<b>Parameters</b>
 *	data - a Rect data.
 *	channel - Number of channels in a 2D Rect.
 */
var Rect = function(__array, __channel){
	this.data = __array || [];
	this.channel = __channel || error(arguments.callee, IS_UNDEFINED_OR_NULL/* {line} */);
};
cv.Rect = Rect;

/***********************************************
 *	<h2>imread</h2>
 *	Loads an image from a file.
 *	<b>Method</b>
 *	Mat imread(Image in)
 *	<b>Parameters</b>
 *	in - The input Image.
 */
var imread = function(__image){
	__image || error(arguments.callee, IS_UNDEFINED_OR_NULL/* {line} */);
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
 *	flag - if output the image or just show the image.
 */
var imwrite = function(__imgMat, __flag){
	__imgMat || error(arguments.callee, IS_UNDEFINED_OR_NULL/* {line} */);
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
		location.href = __flag ? data.replace("image/png", "image/octet-stream") : data;
		return true;
	}else{
		error(arguments.callee, UNSPPORT_DATA_TYPE/* {line} */);
		return false;
	}
};
cv.imwrite = imwrite;

function RGBA2ImageData(__imgMat){
	__imgMat || error(arguments.callee, IS_UNDEFINED_OR_NULL/* {line} */);
	if(__imgMat.type === "CV_GRAY"){
		__imgMat = cvtColor(__imgMat, CV_GRAY2RGBA);
	}
    var width = __imgMat.col,
        height = __imgMat.row,
        imageData = iCtx.createImageData(width, height);
    imageData.data.set(__imgMat.data);
    return imageData;
}
cv.RGBA2ImageData = RGBA2ImageData;

/***********************************************
 *	<h2>convertScaleAbs</h2>
 *	Calculates the first, second, third, or mixed image derivatives using an extended Sobel operator.
 *	<b>Method</b>
 *	Mat convertScaleAbs(Mat src, Mat dst )
 *	<b>Parameters</b>
 *	src – input image.
 *	dst – output Mat.
 */
var convertScaleAbs = function(__src, __dst){
	__src || error(arguments.callee, IS_UNDEFINED_OR_NULL/* {line} */);
	var height = __src.row,
		width = __src.col,
		channel = __src.channel,
		sData = __src.data;
		
	if(!__dst){
		if(channel === 1)
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
	(__src1 && __src2) || error(arguments.callee, IS_UNDEFINED_OR_NULL/* {line} */);
	var height = __src1.row,
		width = __src1.col,
		alpha = __alpha || 0,
		beta = __beta || 0,
		channel = __src1.channel,
		gamma = __gamma || 0;
	if(height !== __src2.row || width !== __src2.col || channel !== __src2.channel){
		error(arguments.callee, "Src2 must be the same size and channel number as src1!"/* {line} */);
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
	__src || error(arguments.callee, IS_UNDEFINED_OR_NULL/* {line} */);
	if(__src.type && __src.type.indexOf("CV_") > -1){
		var row = __src.row,
			col = __src.col;
		switch(__code){
			case CV_RGBA2GRAY:
				var dst = new Mat(row, col, CV_GRAY),
					data = dst.data,
					data2 = __src.data;
				var pix = row * col;
				while (pix){
					// 9798 / 32768 = 0.29901123046875
					// 19235 / 32768 = 0.587005615234375
					// 3736 / 32768 = 0.114013671875
					data[--pix] = (data2[4 * pix] * 9798 + data2[4 * pix + 1] * 19235 + data2[4 * pix + 2] * 3736) >> 15;
				}
				break;
			case CV_RGBA2GRAY_DUFF:
				var dst = new Mat(row, col, CV_GRAY),
					data = dst.data,
					data2 = __src.data;
				var total = row * col,
					length = total >> 3,
					i = length,
					rStartAt, gStartAt;
				for(; i--;){
					gStartAt = i << 3;
					rStartAt = gStartAt << 2;
					data[gStartAt] = (data2[rStartAt] * 9798 + data2[++rStartAt] * 19235 + data2[++rStartAt] * 3736) >> 15;
					rStartAt++;
					data[++gStartAt] = (data2[++rStartAt] * 9798 + data2[++rStartAt] * 19235 + data2[++rStartAt] * 3736) >> 15;
					rStartAt++;
					data[++gStartAt] = (data2[++rStartAt] * 9798 + data2[++rStartAt] * 19235 + data2[++rStartAt] * 3736) >> 15;
					rStartAt++;
					data[++gStartAt] = (data2[++rStartAt] * 9798 + data2[++rStartAt] * 19235 + data2[++rStartAt] * 3736) >> 15;
					rStartAt++;
					data[++gStartAt] = (data2[++rStartAt] * 9798 + data2[++rStartAt] * 19235 + data2[++rStartAt] * 3736) >> 15;
					rStartAt++;
					data[++gStartAt] = (data2[++rStartAt] * 9798 + data2[++rStartAt] * 19235 + data2[++rStartAt] * 3736) >> 15;
					rStartAt++;
					data[++gStartAt] = (data2[++rStartAt] * 9798 + data2[++rStartAt] * 19235 + data2[++rStartAt] * 3736) >> 15;
					rStartAt++;
					data[++gStartAt] = (data2[++rStartAt] * 9798 + data2[++rStartAt] * 19235 + data2[++rStartAt] * 3736) >> 15;
				}
				gStartAt = length << 3;
				rStartAt = gStartAt << 2;
				for(; gStartAt < total;){
					data[gStartAt++] = (data2[rStartAt++] * 9798 + data2[rStartAt++] * 19235 + data2[rStartAt++] * 3736) >> 15;
					rStartAt++;
				}
				break;
			case CV_GRAY2RGBA:
				var dst = new Mat(row, col, CV_RGBA),
					data = dst.data,
					data2 = __src.data;
				var pix1, pix2, pix3, pix = (__src.row * __src.col) << 2;
				while (pix){
					data[pix -= 4] = data[pix + 1] = data[pix + 2] = data2[pix >> 2];
					data[pix3 = pix + 3] = 255;
				}
				break;
		}
	}else{
		error(arguments.callee, UNSPPORT_DATA_TYPE/* {line} */);
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
	__src || error(arguments.callee, IS_UNDEFINED_OR_NULL/* {line} */);
	if(__src.type === "CV_RGBA"){
		var sData = __src.data,
			width = __src.col,
			height = __src.row,
			dst = new Mat(height, width, CV_RGBA),
			dData = dst.data,
			brightness = Math.max(-255, Math.min(255, __brightness || 0)),
			contrast = Math.max(-255, Math.min(255, __contrast || 0));
		
		var gray = cvtColor(__src, CV_RGBA2GRAY),
			allValue = 0,
			gData = gray.data;
		var y, x, c;
		
		for(y = height; y--;){
			for(x = width; x--;){
				allValue += gData[y * width + x];
			}
		}
		
		var r, g, b, offset, gAverage = (allValue / (height * width)) | 0;
		
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
		error(arguments.callee, UNSPPORT_DATA_TYPE/* {line} */);
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
function borderInterpolate(__p, __len, __borderType){
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
				error(arguments.callee, UNSPPORT_BORDER_TYPE/* {line} */);
		}
	}
	return __p;
};

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
	if(__src.type !== "CV_RGBA" && __src.type !== "CV_GRAY"){
		error(arguments.callee, UNSPPORT_DATA_TYPE/* {line} */);
	}
	if(__borderType === CV_BORDER_CONSTANT){
		return copyMakeConstBorder_8U(__src, __top, __left, __bottom, __right, __value);
	}else{
		return copyMakeBorder_8U(__src, __top, __left, __bottom, __right, __borderType);
	}
};
cv.copyMakeBorder = copyMakeBorder;
//NOT CV_BORDER_CONSTANT
function copyMakeBorder_8U(__src, __top, __left, __bottom, __right, __borderType){
	var i, j, k;
	var width = __src.col,
		height = __src.row,
		channel = __src.channel;
	var top = __top,
		left = __left || __top,
		right = __right || left,
		bottom = __bottom || top;
		
	(top === -1) && (top = 0);
	(left === -1) && (left = 0);
	(right === -1) && (right = 0);
	(bottom === -1) && (bottom = 0);
	
	var dstWidth = width + left + right,
		dstHeight = height + top + bottom,
		borderType = __borderType || CV_BORDER_REFLECT;
	
	var buffer = new ArrayBuffer(dstHeight * dstWidth * channel),
		tab, TypedArray, c;
	
	if(false){	//This way is slower in FireFox 17.0.1.
		tab = new Uint32Array(left + right);
		for(i = left; i--;){
			tab[i] = borderInterpolate(i - left, width, borderType);
		}
		for(i = right; i--;){
			tab[i + left] = borderInterpolate(width + i, width, borderType);
		}
		TypedArray = Uint32Array;
		c = 1;
	}else{
		tab = new Uint32Array((left + right) * channel);
		for(i = left; i--;){
			j = borderInterpolate(i - left, width, borderType) * channel;
			for(k = channel; k--;)
				tab[i * channel + k] = j + k;
		}
		for(i = right; i--;){
			j = borderInterpolate(width + i, width, borderType) * channel;
			for(k = channel; k--;)
				tab[(i + left) * channel + k] = j + k;
		}
		TypedArray = Uint8Array;
		c = channel;
		left *= c;
		right *= c;
	}
	
	var tempArray, data,
		dLen = dstWidth * c,
		sLen = width * c;
	
	//Reading TypedArray sequentially is faster.
	for(i = 0; i < height; i++){
		tempArray = new TypedArray(buffer, (i + top) * dstWidth * channel, dLen);
		data = new TypedArray(__src.buffer, i * width * channel, sLen);
		for(j = 0; j < left; j++)
			tempArray[j] = data[tab[j]];
		for(j = 0; j < right; j++)
			tempArray[j + sLen + left] = data[tab[j + left]];
		tempArray.set(data, left);
	}
	
	var allArray = new TypedArray(buffer);
	for(i = 0; i < top; i++){
		j = borderInterpolate(i - top, height, borderType);
		tempArray = new TypedArray(buffer, i * dstWidth * channel, dLen);
		tempArray.set(allArray.subarray((j + top) * dLen, (j + top + 1) * dLen));
	}
	for(i = 0; i < bottom; i++){
		j = borderInterpolate(i + height, height, borderType);
		tempArray = new TypedArray(buffer, (i + top + height) * dstWidth * channel, dLen);
		tempArray.set(allArray.subarray((j + top) * dLen, (j + top + 1) * dLen));
	}
	
	return new Mat(dstHeight, dstWidth, __src.depth(), null, buffer);
}
//CV_BORDER_CONSTANT
function copyMakeConstBorder_8U(__src, __top, __left, __bottom, __right, __value){
	var i, j;
	var width = __src.col,
		height = __src.row,
		channel = __src.channel;
	var top = __top,
		left = __left || __top,
		right = __right || left,
		bottom = __bottom || top;
		
	(top === -1) && (top = 0);
	(left === -1) && (left = 0);
	(right === -1) && (right = 0);
	(bottom === -1) && (bottom = 0);
	
	var dstWidth = width + left + right,
		dstHeight = height + top + bottom,
		value = __value || [0, 0, 0, 255];
	var constBuf = new ArrayBuffer(dstWidth * channel),
		constArray = new Uint8Array(constBuf),
		buffer = new ArrayBuffer(dstHeight * dstWidth * channel);
	
	for(i = 0; i < dstWidth; i++){
		for( j = 0; j < channel; j++){
			constArray[i * channel + j] = value[j];
		}
	}
	
	var TypedArray, c;
	
	if(channel === 4){
		TypedArray = Uint32Array;
		c = 1;
	}else{
		TypedArray = Uint8Array;
		c = channel;
	}
	
	constArray = new TypedArray(constBuf);
	var tempArray,
		rLeft = c * left,
		rRight = c * right,
		sLen = c * width,
		dLen = c * dstWidth;
	
	for(i = 0; i < height; i++){
		tempArray = new TypedArray(buffer, (i + top) * dstWidth * channel, rLeft);
		tempArray.set(constArray.subarray(0, rLeft));
		tempArray = new TypedArray(buffer, ((i + top + 1) * dstWidth - right) * channel, rRight);
		tempArray.set(constArray.subarray(0, rRight));
		tempArray = new TypedArray(buffer, ((i + top) * dstWidth + left) * channel, sLen);
		tempArray.set(new TypedArray(__src.buffer, i * width * channel, sLen));
	}
	
	for(i = 0; i < top; i++){
		tempArray = new TypedArray(buffer, i * dstWidth * channel, dLen);
		tempArray.set(constArray);
	}
	
	for(i = 0; i < bottom; i++){
		tempArray = new TypedArray(buffer, (i + top + height) * dstWidth * channel, dLen);
		tempArray.set(constArray);
	}
	
	return new Mat(dstHeight, dstWidth, __src.depth(), null, buffer);
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
	__src || error(arguments.callee, IS_UNDEFINED_OR_NULL/* {line} */);
	if(__src.type && __src.type == "CV_RGBA"){
		var height = __src.row,
			width = __src.col,
			dst = __dst || new Mat(height, width, CV_RGBA),
			dstData = dst.data;
		var size1 = __size1 || 3,
			size2 = __size2 || size1;
		if(size1 & 1 === 0 || size2 & 1 === 0){
			error(arguments.callee, UNSPPORT_SIZE/* {line} */);
			return __src;
		}
		var startX = size1 >> 1,
			startY = size2 >> 1;
		var withBorderMat = copyMakeBorder(__src, -1, startX, 0, 0, __borderType),
			mData = withBorderMat.data,
			mWidth = withBorderMat.col;
		
		var newValue, offset, offsetI;
		var i, j, c, y, x;
		
		for(i = height; i--;){
			offsetI = i * width;
			for(j = width; j--;){
				for(c = 3; c--;){
					newValue = 0;
					for(x = size1; x--;){
						offset = i * mWidth * 4 + (x + j) * 4 + c;
						newValue += mData[offset];
					}
					dstData[(j + offsetI) * 4 + c] = newValue / size1;
				}
				dstData[(j + offsetI) * 4 + 3] = mData[(i + startY) * mWidth * 4 + (j + startX) * 4 + 3];
			}
		}
		
		withBorderMat = copyMakeBorder(dst, startY, -1, 0, 0, __borderType);
		mData = withBorderMat.data;
		mWidth = withBorderMat.col;
		
		for(i = height; i--;){
			offsetI = i * width;
			for(j = width; j--;){
				for(c = 3; c--;){
					newValue = 0;
					for(y = size2; y--;){
						offset = (y + i) * mWidth * 4 + j * 4 + c;
						newValue += mData[offset];
					}
					dstData[(j + offsetI) * 4 + c] = newValue / size2;
				}
			}
		}
		
	}else{
		error(arguments.callee, UNSPPORT_DATA_TYPE/* {line} */);
	}
	return dst;
};
cv.blur = blur;
//old verision
var blurOld = function(__src, __size1, __size2, __borderType, __dst){
	__src || error(arguments.callee, IS_UNDEFINED_OR_NULL/* {line} */);
	if(__src.type && __src.type == "CV_RGBA"){
		var height = __src.row,
			width = __src.col,
			dst = __dst || new Mat(height, width, CV_RGBA),
			dstData = dst.data;
		var size1 = __size1 || 3,
			size2 = __size2 || size1,
			size = size1 * size2;
		if(size1 & 1 === 0 || size2 & 1 === 0){
			error(arguments.callee, UNSPPORT_SIZE/* {line} */);
			return __src;
		}
		var startX = size1 >> 1,
			startY = size2 >> 1;
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
		error(arguments.callee, UNSPPORT_DATA_TYPE/* {line} */);
	}
	return dst;
};
cv.blurOld = blurOld;

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
	__src || error(arguments.callee, IS_UNDEFINED_OR_NULL/* {line} */);
	if(__src.type && __src.type == "CV_RGBA"){
		var height = __src.row,
			width = __src.col,
			dst = __dst || new Mat(height, width, CV_RGBA),
			dstData = dst.data;
		var sigma1 = __sigma1 || 0,
			sigma2 = __sigma2 || __sigma1;
		var size1 = __size1 || Math.round(sigma1 * 6 + 1) | 1,
			size2 = __size2 || Math.round(sigma2 * 6 + 1) | 1;
		if(size1 & 1 === 0 || size2 & 1 === 0){
			error(arguments.callee, UNSPPORT_SIZE/* {line} */);
			return __src;
		}
		var startX = size1 >> 1,
			startY = size2 >> 1;
		var withBorderMat = copyMakeBorder(__src, -1, startX, 0, 0, __borderType),
			mData = withBorderMat.data,
			mWidth = withBorderMat.col;
			
		var kernel1 = getGaussianKernel(size1, sigma1),
			kernel2;
		
		if(size1 === size2 && sigma1 === sigma2)
			kernel2 = kernel1;
		else
			kernel2 = getGaussianKernel(size2, sigma2);
		
		var i, j, c, y, x;
		
		var newValue, offset, offsetI;
		
		for(i = height; i--;){
			offsetI = i * width;
			for(j = width; j--;){
				for(c = 3; c--;){
					newValue = 0;
					for(x = size1; x--;){
						offset = i * mWidth * 4 + (x + j) * 4 + c;
						newValue += (mData[offset] * kernel1[x]);
					}
					dstData[(j + offsetI) * 4 + c] = newValue;
				}
				dstData[(j + offsetI) * 4 + 3] = mData[(i + startY) * mWidth * 4 + (j + startX) * 4 + 3];
			}
		}
		
		withBorderMat = copyMakeBorder(dst, startY, -1, 0, 0, __borderType);
		mData = withBorderMat.data;
		mWidth = withBorderMat.col;
		
		for(i = height; i--;){
			offsetI = i * width;
			for(j = width; j--;){
				for(c = 3; c--;){
					newValue = 0;
					for(y = size2; y--;){
						offset = (y + i) * mWidth * 4 + j * 4 + c;
						newValue += (mData[offset] * kernel2[y]);
					}
					dstData[(j + offsetI) * 4 + c] = newValue;
				}
			}
		}
		
	}else{
		error(arguments.callee, UNSPPORT_DATA_TYPE/* {line} */);
	}
	return dst;
};
cv.GaussianBlur = GaussianBlur;
//old verision
var GaussianBlurOld = function(__src, __size1, __size2, __sigma1, __sigma2, __borderType, __dst){
	__src || error(arguments.callee, IS_UNDEFINED_OR_NULL/* {line} */);
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
		if(size1 & 1 === 0 || size2 & 1 === 0){
			error(arguments.callee, UNSPPORT_SIZE/* {line} */);
			return __src;
		}
		var startX = size1 >> 1,
			startY = size2 >> 1;
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
		error(arguments.callee, UNSPPORT_DATA_TYPE/* {line} */);
	}
	return dst;
};
cv.GaussianBlurOld = GaussianBlurOld;

/***********************************************
 *	<h2>getGaussianKernel</h2>
 *	Returns Gaussian filter coefficients.
 *	<b>Method</b>
 *	Array getGaussianKernel(int ksize, double sigma)
 *	<b>Parameters</b>
 *	ksize – Aperture size. It should be odd and positive.
 *	sigma – Gaussian standard deviation. If it is non-positive, it is computed from ksize as sigma = 0.3*((ksize-1)*0.5 - 1) + 0.8 .
 */
function getGaussianKernel(__n, __sigma){
	var SMALL_GAUSSIAN_SIZE = 7,
		smallGaussianTab = [[1],
							[0.25, 0.5, 0.25],
							[0.0625, 0.25, 0.375, 0.25, 0.0625],
							[0.03125, 0.109375, 0.21875, 0.28125, 0.21875, 0.109375, 0.03125]
		];
		
	var fixedKernel = __n & 1 == 1 && __n <= SMALL_GAUSSIAN_SIZE && __sigma <= 0 ? smallGaussianTab[__n >> 1] : 0;
	
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
	__src || error(arguments.callee, IS_UNDEFINED_OR_NULL/* {line} */);
	if(__src.type && __src.type == "CV_RGBA"){
		var height = __src.row,
			width = __src.col,
			dst = __dst || new Mat(height, width, CV_RGBA),
			dstData = dst.data;
		var size1 = __size1 || 3,
			size2 = __size2 || size1,
			size = size1 * size2;
		if(size1 & 1 === 0 || size2 & 1 === 0){
			error(arguments.callee, UNSPPORT_SIZE/* {line} */);
			return __src;
		}
		var startX = size1 >> 1,
			startY = size2 >> 1;
		var withBorderMat = copyMakeBorder(__src, startY, startX, 0, 0, __borderType),
			mData = withBorderMat.data,
			mWidth = withBorderMat.col;
		
		var newValue = [], nowX, offsetY, offsetI;
		var i, j, c, y, x;
		
		var median = (size >> 1) + 1; 
		
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
					dstData[(j + offsetI) * 4 + c] = newValue[median];
				}
				dstData[(j + offsetI) * 4 + 3] = mData[offsetY + startY * mWidth * 4 + (j + startX) * 4 + 3];
			}
		}
		
	}else{
		error(arguments.callee, UNSPPORT_DATA_TYPE/* {line} */);
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
		if(__size & 1  === 0){
			error(arguments.callee, UNSPPORT_SIZE/* {line} */);
			return __src;
		}
		var start = __size >> 1;
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
		error(arguments.callee, UNSPPORT_DATA_TYPE/* {line} */);
	}
	return dst;
};
//cv.bilateralFilter = bilateralFilter;
//Unfinished

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
	(__src && __kernel) || error(arguments.callee, IS_UNDEFINED_OR_NULL/* {line} */);
	var height = __src.row,
		width = __src.col,
		dst = __dst || new Mat(height, width, __depth || __src.depth()),
		dstData = dst.data,
		sData = __src.data,
		channel = __src.channel;
	var size1 = __kernel.col,
		size2 = __kernel.row,
		kData = __kernel.data;
	
	if(size1 & 1 === 0 || size2 & 1 === 0){
		error(arguments.callee, UNSPPORT_SIZE/* {line} */);
		return __src;
	}
	
	var startX = size1 >> 1,
		startY = size2 >> 1;
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
 *	<h2>filter2D</h2>
 *	Blurs an image using a separable linear filter.
 *	<b>Method</b>
 *	Mat separableLinearFilter(Mat src, Function ddepth, Array rowKernel, Array colKernel, int borderType=CV_BORDER_REFLECT, Mat dst )
 *	<b>Parameters</b>
 *	src – input image.
 *	ddepth –desired depth of the destination image; if it is negative, it will be the same as src.depth().
 *	rowKernel – Coefficients for filtering each row, a single-channel floating point Array; if you want to apply different kernels to different channels, split the image into separate color planes using split() and process them individually.
 *	colKernel – Coefficients for filtering each col.
 *	borderType – Border type. When borderType==CV_BORDER_CONSTANT , the function always returns -1, regardless of p and len .
 *	dst – output image of the same size and type as src.
 */
var separableLinearFilter = function(__src, __depth, __rowKernel, __colKernel, __borderType, __dst){
	(__src && __rowKernel && __colKernel) || error(arguments.callee, IS_UNDEFINED_OR_NULL/* {line} */);
	var height = __src.row,
		width = __src.col,
		dst = __dst || new Mat(height, width, __depth || __src.depth()),
		dstData = dst.data,
		sData = __src.data,
		channel = __src.channel;
	var size1 = __rowKernel.length,
		size2 = __colKernel.length;
	
	if(size1 & 1 === 0 || size2 & 1 === 0){
		error(arguments.callee, UNSPPORT_SIZE/* {line} */);
		return __src;
	}
	
	var startX = size1 >> 1,
		startY = size2 >> 1;
	var withBorderMat = copyMakeBorder(__src, -1, startX, 0, 0, __borderType),
		mData = withBorderMat.data,
		mWidth = withBorderMat.col;
		
	var i, j, c, y, x;
		
	var newValue, offset, offsetI;
		
	for(i = height; i--;){
		offsetI = i * width;
		for(j = width; j--;){
			for(c = 3; c--;){
				newValue = 0;
				for(x = size1; x--;){
					offset = i * mWidth * 4 + (x + j) * 4 + c;
					newValue += (mData[offset] * __rowKernel[x]);
				}
				dstData[(j + offsetI) * 4 + c] = newValue;
			}
			dstData[(j + offsetI) * 4 + 3] = mData[(i + startY) * mWidth * 4 + (j + startX) * 4 + 3];
		}
	}
		
	withBorderMat = copyMakeBorder(dst, startY, -1, 0, 0, __borderType);
	mData = withBorderMat.data;
	mWidth = withBorderMat.col;
		
	for(i = height; i--;){
		offsetI = i * width;
		for(j = width; j--;){
			for(c = 3; c--;){
				newValue = 0;
				for(y = size2; y--;){
					offset = (y + i) * mWidth * 4 + j * 4 + c;
					newValue += (mData[offset] * __colKernel[y]);
				}
				dstData[(j + offsetI) * 4 + c] = newValue;
			}
		}
	}

};
cv.separableLinearFilter = separableLinearFilter;

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
	(__src && __thresh) || error(arguments.callee, IS_UNDEFINED_OR_NULL/* {line} */);
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
				offset = i * width + j;
				dData[offset] = threshouldType(sData[offset], __thresh, maxVal);
			}
		}
		
	}else{
		error(arguments.callee, UNSPPORT_DATA_TYPE/* {line} */);
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
 *	ksize – size of the extended Sobel kernel; it must be 1, 3, 5.
 *	borderType – Border type. When borderType==CV_BORDER_CONSTANT , the function always returns -1, regardless of p and len .
 *	dst – output Mat.
 */
var Sobel = function(__src, __xorder, __yorder, __size, __borderType, __dst){
	(__src && (__xorder ^ __yorder)) || error(arguments.callee, IS_UNDEFINED_OR_NULL/* {line} */);
	if(__src.type && __src.type === "CV_GRAY"){
		var kernel1,
			kernel2,
			height = __src.row,
			width = __src.col,
			dst = __dst || new Mat(height, width, CV_16I, 1),
			dstData = dst.data
			size = __size || 3;
		switch(size){
			case 1:
				size = 3;
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
			case 5:
				if(__xorder){
					kernel = [-1, -2, 0, 2, 1,
							  -4, -8, 0, 8, 4,
							  -6,-12, 0,12, 6,
							  -4, -8, 0, 8, 4,
							  -1, -2, 0, 2, 1
							 ];
				}else if(__yorder){
					kernel = [-1, -4, -6, -4, -1,
							  -2, -8,-12, -8, -2,
							   0,  0,  0,  0,  0,
							   2,  8, 12,  8,  2,
							   1,  4,  6,  4,  1
							 ];
				}
				break;
			default:
				error(arguments.callee, UNSPPORT_SIZE/* {line} */);
			
		}
		
		GRAY216IC1Filter(__src, size, height, width, kernel, dstData, __borderType);

	}else{
		error(arguments.callee, UNSPPORT_DATA_TYPE/* {line} */);
	}
	return dst;
};
cv.Sobel = Sobel;

//CV_GRAY to CV_16IC1 filter
function GRAY216IC1Filter(__src, size, height, width, kernel, dstData, __borderType){
	var start = size >> 1;
		
	var withBorderMat = copyMakeBorder(__src, start, start, 0, 0, __borderType);
			
	var mData = withBorderMat.data,
		mWidth = withBorderMat.col;
		
	var i, j, y, x, c;
	var newValue, nowX, offsetY, offsetI;
		
	for(i = height; i--;){
		offsetI = i * width;
		for(j = width; j--;){
			newValue = 0;
			for(y = size; y--;){
				offsetY = (y + i) * mWidth;
				for(x = size; x--;){
					nowX = x + j;
					newValue += (mData[offsetY + nowX] * kernel[y * size + x]);
				}
			}
			dstData[j + offsetI] = newValue;
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
 *	ksize – The aperture size used to compute the second-derivative filters. It must be 1, 3, 5.
 *	borderType – Border type. When borderType==CV_BORDER_CONSTANT , the function always returns -1, regardless of p and len .
 *	dst – output Mat.
 */
var Laplacian = function(__src, __size, __borderType, __dst){
	__src || error(arguments.callee, IS_UNDEFINED_OR_NULL/* {line} */);
	if(__src.type && __src.type === "CV_GRAY"){
		var kernel,
			height = __src.row,
			width = __src.col,
			dst = __dst || new Mat(height, width, CV_16I, 1),
			dstData = dst.data,
			size = __size || 3;
		switch(size){
			case 1:
				kernel = [0,  1, 0,
						  1, -4, 1,
						  0,  1, 0
						 ];
				size = 3;
				break;
			case 3:
				kernel = [2, 0, 2,
						  0,-8, 0,
						  2, 0, 2
						 ];
				break;
			default:
				error(arguments.callee, UNSPPORT_SIZE/* {line} */);
			
		}
		
		GRAY216IC1Filter(__src, size, height, width, kernel, dstData, __borderType);
	}else{
		error(arguments.callee, UNSPPORT_DATA_TYPE/* {line} */);
	}
	return dst;
};
cv.Laplacian = Laplacian;

/***********************************************
 *	<h2>Scharr</h2>
 *	Calculates the first x- or y- image derivative using Scharr operator.
 *	<b>Method</b>
 *	Mat Scharr(Mat src, int dx, int dy, int borderType=CV_BORDER_REFLECT, Mat dst )
 *	<b>Parameters</b>
 *	src – input image.
 *	xorder – order of the derivative x.
 *	yorder – order of the derivative y.
 *	borderType – Border type. When borderType==CV_BORDER_CONSTANT , the function always returns -1, regardless of p and len .
 *	dst – output Mat.
 */
var Scharr = function(__src, __xorder, __yorder, __borderType, __dst){
	(__src && (__xorder ^ __yorder)) || error(arguments.callee, IS_UNDEFINED_OR_NULL/* {line} */);
	if(__src.type && __src.type === "CV_GRAY"){
		var kernel,
			height = __src.row,
			width = __src.col,
			dst = __dst || new Mat(height, width, CV_16I, 1),
			dstData = dst.data,
			size = 3;
			
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
		
		GRAY216IC1Filter(__src, size, height, width, kernel, dstData, __borderType);

	}else{
		error(arguments.callee, UNSPPORT_DATA_TYPE/* {line} */);
	}
	return dst;
};
cv.Scharr = Scharr;

/***********************************************
 *	<h2>remap</h2>
 *	Applies a generic geometrical transformation to an image.
 *	<b>Method</b>
 *	Mat remap(Mat src, Int32Array mapX, Int32Array mapY, Mat dst )
 *	Mat remap(Mat src, Function mapX, Function mapY, Mat dst )
 *	<b>Parameters</b>
 *	src – input image.
 *	mapX – The first map of x values.
 *	mapY – The second map of y values.
 *	dst – output Mat.
 */
var remap = function(__src, __mapX, __mapY, __dst){
	(__src && __mapX && __mapY) || error(arguments.callee, IS_UNDEFINED_OR_NULL/* {line} */);
	
	if(__src.type !== "CV_RGBA")
		error(arguments.callee, UNSPPORT_DATA_TYPE/* {line} */);
	
	if(typeof __mapX === "function" && typeof __mapY === "function"){
		return remap4function(__src, __mapX, __mapY, __dst);
	}else if(__mapX instanceof Int32Arrray || __mapY instanceof Int32Array){
		return remap4array(__src, __mapX, __mapY, __dst);
	}else{
		error(arguments.callee, UNSPPORT_DATA_TYPE/* {line} */);
		return __dst || __src;
	}
};
cv.remap = remap;
//remap for array
function remap4array(__src, __mapX, __mapY, __dst){
	var height = __src.row,
		width = __src.col,
		sData = __src.data,
		dst = __dst || new Mat(height, width, CV_RGBA),
		dData = dst.data;
	
	var i, j, offset, mapset;
	
	for(j = height; j--;){
		for(i = width; i--;){
			offset = (j * width + i) << 2;
			mapset = (__mapY[i][j] * width + __mapX[i][j]) << 2;
			dData[offset] = sData[mapset];
			dData[offset + 1] = sData[mapset + 1];
			dData[offset + 2] = sData[mapset + 2];
			dData[offset + 3] = sData[mapset + 3];
		}
	}
	return dst;
}
//remap for function
function remap4function(__src, __mapX, __mapY, __dst){
	var height = __src.row,
		width = __src.col,
		sData = __src.data,
		dst = __dst || new Mat(height, width, CV_RGBA),
		dData = dst.data;
	
	var i, j, offset, mapset;
	
	for(j = height; j--;){
		for(i = width; i--;){
			offset = (j * width + i) << 2;
			mapset = (__mapY(i, j) * width + __mapX(i, j)) << 2;
			dData[offset] = sData[mapset];
			dData[offset + 1] = sData[mapset + 1];
			dData[offset + 2] = sData[mapset + 2];
			dData[offset + 3] = sData[mapset + 3];
		}
	}
	return dst;
}

/***********************************************
 *	<h2>getRotationArray2D</h2>
 *	Calculates the affine matrix of 2d rotation.
 *	<b>Method</b>
 *	Array getRotationArray2D(double angle)
 *	<b>Parameters</b>
 *	angle – The rotation angle in degrees.
 *	x -
 *	y -
 */
var getRotationArray2D = function(__angle, __x, __y){
	var sin = Math.sin(__angle) || 0,
		cos = Math.cos(__angle) || 1,
		x = __x || 0,
		y = __y || 0;
	
	return [cos, -sin, x,
			cos, sin, y
			];
};
cv.getRotationArray2D = getRotationArray2D;

/***********************************************
 *	<h2>warpAffine</h2>
 *	Applies a generic geometrical transformation to an image.
 *	<b>Method</b>
 *	Mat warpAffine(Mat src, Array rotArray, Mat dst )
 *	<b>Parameters</b>
 *	src – input image.
 *	rotArray - the transformation matrix.
 *	dst – output Mat.
 */
var warpAffine = function(__src, __rotArray, __dst){
	(__src && __rotArray) || error(arguments.callee, IS_UNDEFINED_OR_NULL/* {line} */);
	if(__src.type && __src.type === "CV_RGBA"){
		var height = __src.row,
			width = __src.col,
			dst = __dst || new Mat(height, width, CV_RGBA),
			sData = new Uint32Array(__src.buffer),
			dData = new Uint32Array(dst.buffer);
		
		var i, j, xs, ys, x, y, nowPix;
		
		for(j = 0, nowPix = 0; j < height; j++){
			xs = __rotArray[1] * j + __rotArray[2];
			ys = __rotArray[4] * j + __rotArray[5];
			for(i = 0; i < width; i++, nowPix++, xs += __rotArray[0], ys += __rotArray[3]){
				
				if(xs > 0 && ys > 0 && xs < width && ys < height){
					
					y = (__rotArray[3] * i + __rotArray[4] * j + __rotArray[5]) | 0;
					x = (__rotArray[0] * i + __rotArray[1] * j + __rotArray[2]) | 0;
					
					dData[nowPix] = sData[y * width + x];
				}else{
					dData[nowPix] = 4278190080;	//Black
				}
			}
		}
	}else{
		error(arguments.callee, UNSPPORT_DATA_TYPE/* {line} */);
	}
	return dst;
};
cv.warpAffine = warpAffine;

/***********************************************
 *	<h2>pyrDown</h2>
 *	Blurs an image and downsamples it.
 *	<b>Method</b>
 *	Mat pyrDown(Mat src, Mat dst )
 *	<b>Parameters</b>
 *	src – input image.
 *	dst – output Mat.
 */
var pyrDown = function(__src, __dst){
	__src || error(arguments.callee, IS_UNDEFINED_OR_NULL/* {line} */);
	if(__src.type && __src.type == "CV_RGBA"){
		var width = __src.col,
			height = __src.row,
			dWidth = ((width & 1) + width) / 2,
			dHeight = ((height & 1) + height) / 2,
			sData = __src.data,
			dst = __dst || new Mat(dHeight, dWidth, CV_RGBA),
			dstData = dst.data;
		
		var withBorderMat = copyMakeBorder(__src, 2, 2, 0, 0),
			mData = withBorderMat.data,
			mWidth = withBorderMat.col;
		
		var newValue, nowX, offsetY, offsetI, dOffsetI, i, j;
		
		var kernel = [1,  4,  6,  4, 1,
					  4, 16, 24, 16, 4,
					  6, 24, 36, 24, 6,
					  4, 16, 24, 16, 4,
					  1,  4,  6,  4, 1
					 ];
		
		for(i = dHeight; i--;){
			dOffsetI = i * dWidth;
			for(j = dWidth; j--;){
				for(c = 3; c--;){
					newValue = 0;
					for(y = 5; y--;){
						offsetY = (y + i * 2) * mWidth * 4;
						for(x = 5; x--;){
							nowX = (x + j * 2) * 4 + c;
							newValue += (mData[offsetY + nowX] * kernel[y * 5 + x]);
						}
					}
					dstData[(j + dOffsetI) * 4 + c] = newValue / 256;
				}
				dstData[(j + dOffsetI) * 4 + 3] = mData[offsetY + 2 * mWidth * 4 + (j * 2 + 2) * 4 + 3];
			}
		}
		
	}else{
		error(arguments.callee, UNSPPORT_DATA_TYPE/* {line} */);
	}
	
	return dst;
};
cv.pyrDown = pyrDown;

/***********************************************
 *	<h2>pyrUp</h2>
 *	Upsamples an image and then blurs it.
 *	<b>Method</b>
 *	Mat pyrUp(Mat src, Mat dst )
 *	<b>Parameters</b>
 *	src – input image.
 *	dst – output Mat.
 */
var pyrUp = function(__src, __dst){
	__src || error(arguments.callee, IS_UNDEFINED_OR_NULL/* {line} */);
	if(__src.type && __src.type == "CV_RGBA"){
		var width = __src.col,
			height = __src.row,
			dWidth = width * 2,
			dHeight = height * 2,
			sData = __src.data,
			dst = __dst || new Mat(dHeight, dWidth, CV_RGBA),
			dstData = dst.data;
		
		var withBorderMat = copyMakeBorder(__src, 2, 2, 0, 0),
			mData = withBorderMat.data,
			mWidth = withBorderMat.col;
		
		var newValue, nowX, offsetY, offsetI, dOffsetI, i, j;
		
		var kernel = [1,  4,  6,  4, 1,
					  4, 16, 24, 16, 4,
					  6, 24, 36, 24, 6,
					  4, 16, 24, 16, 4,
					  1,  4,  6,  4, 1
					 ];
		
		for(i = dHeight; i--;){
			dOffsetI = i * dWidth;
			for(j = dWidth; j--;){
				for(c = 3; c--;){
					newValue = 0;
					for(y = 2 + (i & 1); y--;){
						offsetY = (y + ((i + 1) >> 1)) * mWidth * 4;
						for(x = 2 + (j & 1); x--;){
							nowX = (x + ((j + 1) >> 1)) * 4 + c;
							newValue += (mData[offsetY + nowX] * kernel[(y * 2 + (i & 1 ^ 1)) * 5 + (x * 2 + (j & 1 ^ 1))]);
						}
					}
					dstData[(j + dOffsetI) * 4 + c] = newValue / 64;
				}
				dstData[(j + dOffsetI) * 4 + 3] = mData[offsetY + 2 * mWidth * 4 + (((j + 1) >> 1) + 2) * 4 + 3];
			}
		}
		
	}else{
		error(arguments.callee, UNSPPORT_DATA_TYPE/* {line} */);
	}
	
	return dst;
};
cv.pyrUp = pyrUp;

/***********************************************
 *	<h2>dilate</h2>
 *	Dilates an image by using a specific structuring element.
 *	<b>Method</b>
 *	Mat dilate(Mat src, int size, int borderType, Mat dst )
 *	<b>Parameters</b>
 *	src – input image.
 *	size – Size of the structuring element.
 *	borderType – pixel extrapolation method.
 *	dst – output Mat.
 */
var dilate = function(__src, __size, __borderType, __dst){
	__src || error(arguments.callee, IS_UNDEFINED_OR_NULL/* {line} */);
	if(__src.type && __src.type == "CV_RGBA"){
		var width = __src.col,
			height = __src.row,
			size = __size || 3,
			dst = __dst || new Mat(height, width, CV_RGBA),
			dstData = dst.data;
		
		var start = size >> 1;
		var withBorderMat = copyMakeBorder(__src, -1, start, 0, 0, __borderType),
			mData = withBorderMat.data,
			mWidth = withBorderMat.col;
		
		var newOffset, total, nowX, offsetY, offsetI, nowOffset, i, j;
		
		if(size & 1 === 0){
			error(arguments.callee, UNSPPORT_SIZE/* {line} */);
			return __src;
		}
		
		for(i = height; i--;){
			offsetI = i * width;
			for(j = width; j--;){
				newOffset = 0;
				total = 0;
				offsetY = i * mWidth * 4;
				for(x = size; x--;){
					nowOffset = offsetY + (x + j) * 4;
					(mData[nowOffset] + mData[nowOffset + 1] + mData[nowOffset + 2] > total) && (total = mData[nowOffset] + mData[nowOffset + 1] + mData[nowOffset + 2]) && (newOffset = nowOffset);
				}
				dstData[(j + offsetI) * 4] = mData[newOffset];
				dstData[(j + offsetI) * 4 + 1] = mData[newOffset + 1];
				dstData[(j + offsetI) * 4 + 2] = mData[newOffset + 2];
				dstData[(j + offsetI) * 4 + 3] = mData[newOffset + 3];
			}
		}
		
		withBorderMat = copyMakeBorder(dst, start, -1, 0, 0, __borderType);
		mData = withBorderMat.data;
		mWidth = withBorderMat.col;
		
		for(i = height; i--;){
			offsetI = i * width;
			for(j = width; j--;){
				newOffset = 0;
				total = 0;
				for(y = size; y--;){
					nowOffset = (y + i) * mWidth * 4 + j * 4;
					(mData[nowOffset] + mData[nowOffset + 1] + mData[nowOffset + 2] > total) && (total = mData[nowOffset] + mData[nowOffset + 1] + mData[nowOffset + 2]) && (newOffset = nowOffset);
				}
				dstData[(j + offsetI) * 4] = mData[newOffset];
				dstData[(j + offsetI) * 4 + 1] = mData[newOffset + 1];
				dstData[(j + offsetI) * 4 + 2] = mData[newOffset + 2];
				dstData[(j + offsetI) * 4 + 3] = mData[newOffset + 3];
			}
		}
		
	}else{
		error(arguments.callee, UNSPPORT_DATA_TYPE/* {line} */);
	}
	return dst;
};
cv.dilate = dilate;

/***********************************************
 *	<h2>erode</h2>
 *	Erodes an image by using a specific structuring element.
 *	<b>Method</b>
 *	Mat erode(Mat src, int size, int borderType, Mat dst )
 *	<b>Parameters</b>
 *	src – input image.
 *	size – Size of the structuring element.
 *	borderType – pixel extrapolation method.
 *	dst – output Mat.
 */
var erode = function(__src, __size, __borderType, __dst){
	__src || error(arguments.callee, IS_UNDEFINED_OR_NULL/* {line} */);
	if(__src.type && __src.type == "CV_RGBA"){
		var width = __src.col,
			height = __src.row,
			size = __size || 3,
			dst = __dst || new Mat(height, width, CV_RGBA),
			dstData = dst.data;
		
		var start = size >> 1;
		var withBorderMat = copyMakeBorder(__src, -1, start, 0, 0, __borderType),
			mData = withBorderMat.data,
			mWidth = withBorderMat.col;
		
		var newOffset, total, nowX, offsetY, offsetI, nowOffset, i, j;
		
		if(size & 1 === 0){
			error(arguments.callee, UNSPPORT_SIZE/* {line} */);
			return __src;
		}
		
		for(i = height; i--;){
			offsetI = i * width;
			for(j = width; j--;){
				newOffset = 0;
				total = 765;
				offsetY = i * mWidth * 4;
				for(x = size; x--;){
					nowOffset = offsetY + (x + j) * 4;
					(mData[nowOffset] + mData[nowOffset + 1] + mData[nowOffset + 2] < total) && ((total = mData[nowOffset] + mData[nowOffset + 1] + mData[nowOffset + 2]) || true) && (newOffset = nowOffset);
				}
				dstData[(j + offsetI) * 4] = mData[newOffset];
				dstData[(j + offsetI) * 4 + 1] = mData[newOffset + 1];
				dstData[(j + offsetI) * 4 + 2] = mData[newOffset + 2];
				dstData[(j + offsetI) * 4 + 3] = mData[newOffset + 3];
			}
		}
		
		withBorderMat = copyMakeBorder(dst, start, -1, 0, 0, __borderType);
		mData = withBorderMat.data;
		mWidth = withBorderMat.col;
		
		for(i = height; i--;){
			offsetI = i * width;
			for(j = width; j--;){
				newOffset = 0;
				total = 765;
				for(y = size; y--;){
					nowOffset = (y + i) * mWidth * 4 + j * 4;
					(mData[nowOffset] + mData[nowOffset + 1] + mData[nowOffset + 2] < total) && ((total = mData[nowOffset] + mData[nowOffset + 1] + mData[nowOffset + 2]) || true) && (newOffset = nowOffset);
				}
				dstData[(j + offsetI) * 4] = mData[newOffset];
				dstData[(j + offsetI) * 4 + 1] = mData[newOffset + 1];
				dstData[(j + offsetI) * 4 + 2] = mData[newOffset + 2];
				dstData[(j + offsetI) * 4 + 3] = mData[newOffset + 3];
			}
		}
		
	}else{
		error(arguments.callee, UNSPPORT_DATA_TYPE/* {line} */);
	}
	return dst;
};
cv.erode = erode;


host.cv = cv;
this.__cv20121221 = cv;

})(this);