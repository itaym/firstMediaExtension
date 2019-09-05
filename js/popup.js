let _chrome = chrome;

window.addEventListener('load', function () {
    let start = document.getElementById('start');
    let end = document.getElementById('end');

    function onClick () {
        let action = this.innerText;
        // noinspection JSUnresolvedVariable
        _chrome.tabs.query({active: true, currentWindow: true}, function (tabs){
            _chrome.tabs.sendMessage(tabs[0].id, {action});

        });
    }

    start.addEventListener('click', onClick);
    end.addEventListener('click', onClick);

    _chrome.tabs.query({active: true, currentWindow: true}, function (tabs){
        _chrome.tabs.sendMessage(tabs[0].id, {action: "getState"});

    });
});



