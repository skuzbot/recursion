// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

//****done****//
// var func = function(x) {return x;}; // undefined
// 'undefined'
// var num = 298;      // '298'
// var str = 'goose';  // '"goose"'
// var boo = true; // 'true' or 'false'
// 'null'


var arr = [1, 2, 3, 4]; 		//  '[1,2,3,4]'
var obj = {a: 1, b: 2, c: 3}; 	//	'{"a":1,"b":2,"c":3}'






var stringifyJSON = function(obj) {

        //****check for undefined outputs
    if (typeof obj === 'function' || typeof obj === undefined) {
        return undefined;
    }

	//****check for primitive types
	if (typeof obj === 'number' || typeof obj === 'boolean' || typeof obj === null) {
		return String(obj);
	}

    //****check for string
    if (typeof obj === 'string') {
        return '"' + obj + '"';
    }




};


//console.log(func(num));
//console.log(JSON.stringify(num));
var expected = JSON.stringify(str);

//console.log(stringifyJSON(num));
var actual = stringifyJSON(str);

console.log(expected === actual);