console.info('-------------------------------------------');
console.info('---- First Media Extract Facebook Data ----');
console.info('-------------------------------------------');

let html = document.getElementsByTagName('html')[0];

let script = document.createElement('script');
script.src = chrome.extension.getURL('js/injected.js');
script.onload = function() {
    this.remove();
};
html.appendChild(script);

function startRecording() {
    let script = document.createElement('script');
    script.innerText = 'window._474_recording = true;';
    script.innerText += 'document.body.style.border="5px solid red"';
    script.onload = function() {
        this.remove();
    };
    html.appendChild(script);
}
function endRecording() {
    let script = document.createElement('script');
    script.innerText = 'window._474_recording = false; download(window._474_dataArray);window._474_dataArray=[];';
    script.innerText += 'document.body.style.border="none"';
    script.onload = function() {
        this.remove();
    };
    html.appendChild(script);
}

chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        switch(message.action) {
            case "getState":
                break;
            case "START":
                startRecording();
                break;
            case "END":
                endRecording();
                break;
            default:
                sendResponse(window._474_recording);
        }
        sendResponse(window._474_recording);
    }
);
