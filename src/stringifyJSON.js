// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

//****done****//
// var stringifiableObjects = [
//   9,
//   null,
//   true,
//   false,
//   'Hello world',
//   [],
//   [8],
//   ['hi'],
//   [8, 'hi'],
//   [1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999],
//   [8, [[], 3, 4]],
//   [[[['foo']]]],
//   {},
//   {'a': 'apple'},
//   {'foo': true, 'bar': false, 'baz': null},
//   {'boolean, true': true, 'boolean, false': false, 'null': null },
//   // basic nesting
//   {'a': {'b': 'c'}},
//   {'a': ['b', 'c']},
//   [{'a': 'b'}, {'c': 'd'}],
//   {'a': [], 'c': {}, 'b': true}
// ];

// unstringifiableValues = [
//   {
//     'functions': function() {},
//     'undefined': undefined
//   }
// ];

var parseableStrings = [
  // basic stuff
  '[]',
  '{"foo": ""}',
  '{}',
  '{"foo": "bar"}',
  '["one", "two"]',
  '{"a": "b", "c": "d"}',
  '[null,false,true]',
  '{"foo": true, "bar": false, "baz": null}',
  '[1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999]',
  '{"boolean, true": true, "boolean, false": false, "null": null }',

  // // // basic nesting
  // '{"a":{"b":"c"}}',
  // '{"a":["b", "c"]}',
  // '[{"a":"b"}, {"c":"d"}]',
  // '{"a":[],"c": {}, "b": true}',
  // '[[[["foo"]]]]',

  // escaping
  // '["\\\\\\"\\"a\\""]',
  // '["and you can\'t escape thi\s"]',

  // // everything all at once
  // '{"CoreletAPIVersion":2,"CoreletType":"standalone",' +
  //   '"documentation":"A corelet that provides the capability to upload' +
  //   ' a folderâ€™s contents into a userâ€™s locker.","functions":[' +
  //   '{"documentation":"Displays a dialog box that allows user to ' +
  //   'select a folder on the local system.","name":' +
  //   '"ShowBrowseDialog","parameters":[{"documentation":"The ' +
  //   'callback function for results.","name":"callback","required":' +
  //   'true,"type":"callback"}]},{"documentation":"Uploads all mp3 files' +
  //   ' in the folder provided.","name":"UploadFolder","parameters":' +
  //   '[{"documentation":"The path to upload mp3 files from."' +
  //   ',"name":"path","required":true,"type":"string"},{"documentation":' +
  //   ' "The callback function for progress.","name":"callback",' +
  //   '"required":true,"type":"callback"}]},{"documentation":"Returns' +
  //   ' the server name to the current locker service.",' +
  //   '"name":"GetLockerService","parameters":[]},{"documentation":' +
  //   '"Changes the name of the locker service.","name":"SetLockerSer' +
  //   'vice","parameters":[{"documentation":"The value of the locker' +
  //   ' service to set active.","name":"LockerService","required":true' +
  //   ',"type":"string"}]},{"documentation":"Downloads locker files to' +
  //   ' the suggested folder.","name":"DownloadFile","parameters":[{"' +
  //   'documentation":"The origin path of the locker file.",' +
  //   '"name":"path","required":true,"type":"string"},{"documentation"' +
  //   ':"The Window destination path of the locker file.",' +
  //   '"name":"destination","required":true,"type":"integer"},{"docum' +
  //   'entation":"The callback function for progress.","name":' +
  //   '"callback","required":true,"type":"callback"}]}],' +
  //   '"name":"LockerUploader","version":{"major":0,' +
  //   '"micro":1,"minor":0},"versionString":"0.0.1"}',
  // '{ "firstName": "John", "lastName" : "Smith", "age" : ' +
  //   '25, "address" : { "streetAddress": "21 2nd Street", ' +
  //   '"city" : "New York", "state" : "NY", "postalCode" : ' +
  //   ' "10021" }, "phoneNumber": [ { "type" : "home", ' +
  //   '"number": "212 555-1234" }, { "type" : "fax", ' +
  //   '"number": "646 555-4567" } ] }',
  // '{\r\n' +
  //   '          "glossary": {\n' +
  //   '              "title": "example glossary",\n\r' +
  //   '      \t\t"GlossDiv": {\r\n' +
  //   '                  "title": "S",\r\n' +
  //   '      \t\t\t"GlossList": {\r\n' +
  //   '                      "GlossEntry": {\r\n' +
  //   '                          "ID": "SGML",\r\n' +
  //   '      \t\t\t\t\t"SortAs": "SGML",\r\n' +
  //   '      \t\t\t\t\t"GlossTerm": "Standard Generalized ' +
  //   'Markup Language",\r\n' +
  //   '      \t\t\t\t\t"Acronym": "SGML",\r\n' +
  //   '      \t\t\t\t\t"Abbrev": "ISO 8879:1986",\r\n' +
  //   '      \t\t\t\t\t"GlossDef": {\r\n' +
  //   '                              "para": "A meta-markup language,' +
  //   ' used to create markup languages such as DocBook.",\r\n' +
  //   '      \t\t\t\t\t\t"GlossSeeAlso": ["GML", "XML"]\r\n' +
  //   '                          },\r\n' +
  //   '      \t\t\t\t\t"GlossSee": "markup"\r\n' +
  //   '                      }\r\n' +
  //   '                  }\r\n' +
  //   '              }\r\n' +
  //   '          }\r\n' +
  //   '      }\r\n'
];




var stringifyJSON =function(obj) {

  //  check for undefined outputs
  if (typeof obj === 'function' || typeof obj === undefined) {
      return undefined;
  }

	// check for primitive types
	else if (typeof obj === 'number' || typeof obj === 'boolean' || obj === null) {
		return String(obj);
  }

  //  check for string
  else if (typeof obj === 'string') {
    return '"' + obj.replace(/\"/g, '\\"') + '"';
  }

  //  check for array
  else if (Array.isArray(obj)) {
    return '[' + obj.map(stringifyJSON) + ']';
  }

  // check for obj   needs to look like: '{"a":1,"b":2,"c":3}' keys are in "a" whole thing is a string;
    //need to pull out keys with Object.keys() then foreach every key and obj[key] to string
  else if (obj instanceof Object) {
    var strKeys = Object.keys(obj);
    var objArray = [];
    strKeys.forEach(function(key) {
      var strKeys = stringifyJSON(key) + ':' + stringifyJSON(obj[key]);
      objArray.push(strKeys);
    });
    return '{' + objArray.join(",") + '}';
  }
};



console.log('JSON' + JSON.stringify(parseableStrings));
var expected = JSON.stringify(parseableStrings);

console.log('Mine' + stringifyJSON(parseableStrings));
var actual = stringifyJSON(parseableStrings);

console.log(expected === actual);