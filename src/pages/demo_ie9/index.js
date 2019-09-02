// import 'core-js';
// import "core-js/modules/es.promise";
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
// import "core-js/stable";
// import "regenerator-runtime/runtime";


import './index.scss';

import './plugins/arrow-functions.js';
import './plugins/async-to-generator.js';
import './plugins/classes.js';
import './plugins/object-assign.js';
import './plugins/spread.js';
console.log('demo_ie9');

// const r = [1, 2, 3].find((x) => x >= 2);
// console.log(r);

class Circle {}




function sleep(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, ms)
    })
}

// const a = 1;
//
// console.log(a);
//
// for(let i=0;i<100;i++) {
//     console.log(i);
// }

// function f() {
//     debugger;
// }

//arrow-functions
//Class
// function test_class() {
//
//     class Task {
//
//     }
//
//     var task = new Task();
//
//     console.log(task);
//
// }
//
// //Promise
// function test_promise() {
//
//     function task() {
//         return new Promise(function (resolve, reject) {
//             setTimeout(function () {
//                 resolve();
//             }, 3000);
//         });
//     }
//
//
//
//     task().then(function () {
//         console.log('promise') ;
//     });
//
//
//
// }
//
// test_class();
