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

var stringifiableObjects = [
  9,
  null,
  true,
  false,
  'Hello world',
  [],
  [8],
  ['hi'],
  [8, 'hi'],
  [1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999],
  [8, [[], 3, 4]],
  [[[['foo']]]],
  // {},
  // {'a': 'apple'},
  // {'foo': true, 'bar': false, 'baz': null},
  // {'boolean, true': true, 'boolean, false': false, 'null': null },
  // // basic nesting
  // {'a': {'b': 'c'}},
  // {'a': ['b', 'c']},
  // [{'a': 'b'}, {'c': 'd'}],
  // {'a': [], 'c': {}, 'b': true}
];




var stringifyJSON = function(obj) {

    //  check for undefined outputs
    if (typeof obj === 'function' || typeof obj === undefined) {
        return undefined;
    }


	// check for primitive types
	if (typeof obj === 'number' || typeof obj === 'boolean' || obj === null) {
		return String(obj);
	}

    //

    //  check for string
    if (typeof obj === 'string') {
        return '"' + obj + '"';
    }

    //  check for array
    if (Array.isArray(obj)) {
        return '[' + obj.map(stringifyJSON) + ']';
    }



};


//console.log(func(num));
console.log('JSON' + JSON.stringify(stringifiableObjects));
var expected = JSON.stringify(stringifiableObjects);

console.log('Mine' + stringifyJSON(stringifiableObjects));
var actual = stringifyJSON(stringifiableObjects);

console.log(expected === actual);