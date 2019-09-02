function foo() {

}

var a = ['a', 'b', 'c'];

var b = [...a, 'foo'];

var c = foo(...a);

console.log(b);
