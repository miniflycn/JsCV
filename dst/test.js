/***********************************************
 *	<h2>CV_TEST</h2>
 *	This is a test for Browser.
 */
var CV_TYPEDARRAY = (function(){
		try{
			new ArrayBuffer(1);
		}catch(e){
			return false;
		}
		return true;
	})();
var CV_CANVAS = (function(){
		try{
			document.createElement("canvas").getContext("2d");
		}catch(e){
			return false;
		}
		return true;
	})();
