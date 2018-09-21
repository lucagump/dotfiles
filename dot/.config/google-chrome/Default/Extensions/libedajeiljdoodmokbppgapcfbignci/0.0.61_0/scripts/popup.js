var qrOption = $("#qr-checkbox");

function init(){
    attachEvents();
    getOptions();
}

function attachEvents(){
    qrOption.on("click", setOptions);
    chrome.runtime.onMessage.addListener(gotMessage);
}

function gotMessage(request, sender, sendResponse) {
    if (sender.tab && request.closePopup){
        window.close();
    }
}

function getOptions(){
    chrome.storage.sync.get("qrEnable",gotOptions);
}

function gotOptions(data){
    //console.log(data);
    if(data.qrEnable == undefined){
        chrome.storage.sync.set({"qrEnable":true});
        data.qrEnable = true;
    }
    qrOption.prop("checked", data.qrEnable);
}

function setOptions(){
    //console.log("setting changes");
    chrome.storage.sync.set({"qrEnable":qrOption.prop("checked")});
}

init();