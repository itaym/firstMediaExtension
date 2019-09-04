console.info('--------------------------------------');
console.info('---- First Media Fucking Facebook ----');
console.info('--------------------------------------');
debugger;

// let myString = `
// let myFn = function() { return 'fuck';};
// window.XMLHttpRequest = myFn;
// window.XDomainRequest = myFn;
// let XMLHttpRequest = myFn;
// let XDomainRequest = myFn;
debugger;
alert('')
// `;
// let header = document.getElementsByTagName('html');
//
// let script = document.createElement('script');
// script.src = 'js/XMLHttpRequest.js';
// //script.innerHTML = myString;
//
// header[0].appendChild(script);

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        console.log(details);
        return {cancel: false};
    },
    {urls: ["*://*/*"]},
    ["what"]);