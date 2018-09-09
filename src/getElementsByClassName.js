// var htmlStrings = [
//   '<div class="targetClassName"></div>',
//   '<div class="otherClassName targetClassName"></div>',
//   '<div><div class="targetClassName"></div></div>',
//   '<div><div class="targetClassName"><div class="targetClassName"></div></div></div>',
//   '<div><div></div><div><div class="targetClassName"></div></div></div>',
//   '<div><div class="targetClassName"></div><div class="targetClassName"></div></div>',
//   '<div><div class="somediv"><div class="innerdiv"><span class="targetClassName">yay</span></div></div></div>'
// ];

// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:

// You should use: document.body, element.childNodes, element.classList

//basecase: node has no children with matching className
var getElementsByClassName = function(className, node) {
	
	var output = [];

	var node = node || document.body;

	if (node.classList && node.classList.contains(className)) {
		output.push(node);
	}
	var children = node.childNodes;
	if(children) {
		for (var i = 0; i < children.length; i++) {
			var child = children[i];
			output = output.concat(getElementsByClassName(className, child));
		}
	}
	return output;
};





