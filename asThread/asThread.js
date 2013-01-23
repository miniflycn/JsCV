(function(host){

var version = "0.1a",
	minImm = 1,
	max = 10,
	time = 200;	
	
var expando = "asThread" + ( version + Math.random() ).replace( /\D/g, "" ),
	cache = {},
	length = 0,
	setImm = null,
	firing = false,
	callbacks = [],
	begin = 0,
	end = 0;
	
var tool_slice = callbacks.slice,
	tool_nullFun = function(){};

/********************
 *	Hack from: David Baron
 *	http://dbaron.org/log/20100309-faster-timeouts
 */
 
if(!(setImm = msSetImmediate)){
	var msSetImmediate,
		timeouts = [],
		messageName = expando + "-message",
	handleMessage = function(__event){
		if (__event.source === window && __event.data == messageName) {
			__event.stopPropagation();
			if (timeouts.length > 0) {
				var __fn = timeouts.shift();
				__fn();
			}
		}
	};
	setImm = function (__fn) {
		timeouts.push(__fn);
		window.postMessage(messageName, "*");
	};
}

window.addEventListener("message", handleMessage, true);

function fire(){
	var fn;
	begin = begin || (new Date()).getTime();
	firing = true;
	for(var i = callbacks.length; i--;){
		callbacks.shift().fire();
	}
	firing = false;
	end = (new Date()).getTime();
	if(fn = callbacks.shift()){
		(end - begin) > time ? 
		(begin = (new Date()).getTime()) && setImm(function(){fn.fire();}) : fn.fire();
	}
}

function __Thread(__name){
	if(__name){
		this.name = cache[__name] = __name
		length++;
	}
	this.args = undefined;
	this.returnVal = undefined;
	this.callbacks = [];
	this.self = this;
	this.fired = false;
}
__Thread.prototype = {

	constructor: Thread,
	
	__package: function(__fn, __delay){
		var self = this;
		if(!__delay){
			return function(){
				var args = self.args || [],
					returnVal;
				self.returnVal ? args.push(self.returnVal) : null;
				args ? (returnVal = __fn.apply(self.self, args)) : (returnVal = __fn.apply(self.self));
				returnVal !== undefined ? self.returnVal = returnVal : null;
				
				callbacks.length > 0 ? self.fireOther() : self.fire();
			};
		}else{
			return function(){
				setTimeout(function(){
					var args = self.args || [],
						returnVal;
					self.returnVal ? args.push(self.returnVal) : null;
					args ? (returnVal = __fn.apply(self.self, args)) : (returnVal = __fn.apply(self.self));
					returnVal !== undefined ? self.returnVal = returnVal : null;
					
					self.fire();
				}, __delay);
				
				callbacks.length > 0 ? self.fireOther() : null;
			}
		}
	},
	
	__package2: function(__fn){
		var self = this;
		return function(){
			setImm(function(){
				var args = self.args || [];
				self.returnVal ? args.push(self.returnVal) : null;
				args ? __fn.apply(self.self, args) : __fn.apply(self.self);
					
				self.fire();
			});
				
			callbacks.length > 0 ? self.fireOther() : null;
		}
	},
	
	fireOther: function(){
		this.stop();
		if(firing) return;
		fire();
		
		return this;
	},
	
	stop: function(){	
		callbacks.push(this);
		
		return this;
	},
	
	fire: function(){
		var fn,
			ret = this;
		(fn = this.callbacks.shift()) ? fn() : (ret = false);
		
		return ret;
	},
	
	define: function(){
		if(!arguments.length) return;
		var args = tool_slice.call(arguments);
		for(var i = args.length; i--;){
			args[i] === undefined ? (args[i] = this.args[i]) : null;
		}
		this.args = args;
		
		return this;
	},
	
	then: function(__fn, __delay){
		this.callbacks.push(this.__package(__fn, __delay));
		
		return this;
	},
	
	imm: function(__fn){
		this.callbacks.push(this.__package2(__fn));
		
		return this;
	},
	
	wait: function(__delay){
		return this.then(tool_nullFun, __delay);
	},
	
	run: function(){
		if(!this.fired){
			if(arguments.length){
				this.define(tool_slice.call(arguments));
			}
			this.fired = true;
			this.fire();
		}
	},
	
	loop: function(__n){
		var self = this,
			ret = new __Thread();
			ret.index = 0;
			ret.args = [0];
		ret.fire = function(){
			var fn,
				ret = this;
		
			if(fn = this.callbacks[this.index]){
				this.index++;
				fn();
			}else{
				if(++this.args[0] >= __n){
					self.fire()
				}else{
					this.index = 0;
					this.fire();
				}
			}
	
			return ret;
		};
		ret.define = function(){
			var tmp = tool_slice.call(arguments)
			tmp.unshift(this.args[0]);
			this.args = tmp;
			return this;
		}
		ret.loopEnd = function(){
			var that = this;
				
			self.callbacks.push(function(){that.run();});
				
			return self;
		};
		return ret;
	}
}

cache[expando] = new __Thread(expando);

function Thread(__name){
	if(length >= max){
		throw "Too much Threads to be created."
	}
	return !__name ? cache[expando] : 
			cache[__name] ? cache[__name] : 
			(new __Thread(__name));
}

host.Thread = Thread;

})(window);