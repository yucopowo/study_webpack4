function bar(){
    return new Promise(function (resolve) {
        resolve();
    });
}

async function foo() {
    await bar();
}

(async ()=>{

    await foo();
    console.log('foo');

})();
