window._474_recording = false;
window._474_dataArray = [];

function download(data) {

    const anchorElement = document.createElement("a");
    document.body.appendChild(anchorElement);
    anchorElement.style.display = 'none';
    const textJSON = JSON.stringify(data, null, '\t');
    const blob = new Blob([textJSON], {type: "octet/stream"});
    const url = window.URL.createObjectURL(blob);
    anchorElement.href = url;
    anchorElement.download = window._474_extra_oids + '.json';
    anchorElement.click();
    window.URL.revokeObjectURL(url);
}

(function () {

    let theURL;

    (function(xhr) {

        var XHR = XMLHttpRequest.prototype;

        var open = XHR.open;
        var send = XHR.send;
        var setRequestHeader = XHR.setRequestHeader;

        XHR.open = function(method, url) {
            this._method = method;
            this._url = url;
            this._requestHeaders = {};
            this._startTime = (new Date()).toISOString();

            return open.apply(this, arguments);
        };

        XHR.setRequestHeader = function(header, value) {
            this._requestHeaders[header] = value;
            return setRequestHeader.apply(this, arguments);
        };

        XHR.send = function(postData) {

            this.addEventListener('load', function() {
                var endTime = (new Date()).toISOString();

                let myUrl = this._url && this._url.toString ? this._url.toString() : this._url;
                if(myUrl) {

                    if (postData) {
                        if (typeof postData === 'string') {
                            try {
                                // here you get the REQUEST HEADERS, in JSON format, so you can also use JSON.parse
                                this._requestHeaders = postData;
                            } catch(err) {
                                console.log('Request Header JSON decode failed, transfer_encoding field could be base64');
                                console.log(err);
                            }
                        } else if (typeof postData === 'object' || typeof postData === 'array' || typeof postData === 'number' || typeof postData === 'boolean') {
                            // do something if you need
                        }
                    }

                    // here you get the RESPONSE HEADERS
                    var responseHeaders = this.getAllResponseHeaders();

                    if ( this.responseType != 'blob' && this.responseText) {
                        // responseText is string or null
                        try {
                            // here you get RESPONSE TEXT (BODY), in JSON format, so you can use JSON.parse
                            let arr = this.responseText;

                            // printing url, request headers, response headers, response body, to console

                            // console.log(this._url);
                            // console.log(JSON.parse(this._requestHeaders));
                            // console.log(responseHeaders);
                            // console.log(JSON.parse(arr));

                            if (window._474_recording && theURL && myUrl.indexOf(theURL) === 0) {

                                window._474_extra_oids = getDataFromString('extra_oids=["', decodeURIComponent(myUrl));
                                try
                                {
                                    let json = JSON.parse(this.responseText);

                                    window._474_dataArray = window._474_dataArray.concat(json.data);

                                    if (json["paging"] && json["paging"].next) {
                                        //theURL = json["paging"].next;
                                        console.log(json["paging"].next)
                                    }
                                }
                                catch (err) {

                                }
                            }

                        } catch(err) {
                            console.log("Error in responseType try catch");
                            console.log(err);
                        }
                    }

                }
            });

            return send.apply(this, arguments);
        };

    })(XMLHttpRequest);

    function getData (stringToFind) {

        let allScripts = document.querySelectorAll('script');

        for (let index in allScripts) {
            let script = allScripts[index];
            if (script.innerText.indexOf(stringToFind) > -1) {

                let innerText = script.innerText;

                let indexStart = innerText.indexOf(stringToFind, 0);
                let indexEnd1  = innerText.indexOf('"', indexStart+stringToFind.length);
                let indexEnd2  = innerText.indexOf('&', indexStart+stringToFind.length);
                let indexEnd = Math.min(indexEnd1 > -1 ? indexEnd1 : Number.MAX_SAFE_INTEGER, indexEnd2 > -1 ? indexEnd2 : Number.MAX_SAFE_INTEGER);
                return innerText.substring(indexStart+stringToFind.length, indexEnd);
            }
        }
    }
    function getDataFromString (stringToFind, stringToSearch) {

        let innerText = stringToSearch;

        let indexStart = innerText.indexOf(stringToFind, 0);
        let indexEnd1  = innerText.indexOf('"', indexStart+stringToFind.length);
        let indexEnd2  = innerText.indexOf('&', indexStart+stringToFind.length);
        let indexEnd = Math.min(indexEnd1 > -1 ? indexEnd1 : Number.MAX_SAFE_INTEGER, indexEnd2 > -1 ? indexEnd2 : Number.MAX_SAFE_INTEGER);
        return innerText.substring(indexStart+stringToFind.length, indexEnd);
    }
    function getDataFromURL (stringToFind) {

        let innerText = document.location.href;

        let indexStart = innerText.indexOf(stringToFind, 0);
        let indexEnd1  = innerText.indexOf('"', indexStart+stringToFind.length);
        let indexEnd2  = innerText.indexOf('&', indexStart+stringToFind.length);
        let indexEnd = Math.min(indexEnd1 > -1 ? indexEnd1 : Number.MAX_SAFE_INTEGER, indexEnd2 > -1 ? indexEnd2 : Number.MAX_SAFE_INTEGER);
        return innerText.substring(indexStart+stringToFind.length, indexEnd);
    }
    // noinspection SpellCheckingInspection
    let callUrl =   'https://graph.facebook.com/v4.0/act_%ACT%/activities';
    window._474_act_number = getDataFromURL('act=');

    callUrl = callUrl.replace('%ACT%', window._474_act_number);
    theURL = callUrl;

})();




