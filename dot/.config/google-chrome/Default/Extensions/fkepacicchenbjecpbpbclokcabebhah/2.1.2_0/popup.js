/*
 * (C) Copyright 2012-2014 Apple Inc
 */

function updatePopup() {
  var bgPage       = chrome.extension.getBackgroundPage();
  var downloadPage = document.getElementById('downloadPage');
  var signinPage   = document.getElementById('signinPage');
  
  switch (bgPage.iCPState) {
    case 0: // Not installed.
      if (signinPage)
        signinPage.style.display = 'none';
      if (downloadPage)
        downloadPage.style.display = 'block';
      break;
      
    case 1: // Installed but not logged in.
      if (downloadPage)
        downloadPage.style.display = 'none';
      if (signinPage) {
        signinPage.style.display = 'block';
        var message = document.getElementById('signinMessage');
        if (message)
          message.textContent = chrome.i18n.getMessage('signinMessage');
      }
      break;
      
    case 2: // Logged in.
    default:
      if (downloadPage)
        downloadPage.style.display = 'none';
      if (signinPage) {
        signinPage.style.display = 'block';
        var message = document.getElementById('signinMessage');
        if (message)
          message.textContent = chrome.i18n.getMessage('syncedMessage');
      }
      break;
  }
}

function loadPopup() {
  var bgPage       = chrome.extension.getBackgroundPage();
  var downloadPage = document.getElementById('downloadPage');
  var signinPage   = document.getElementById('signinPage');
  var metroPage    = document.getElementById('metroPage');

  if (downloadPage) {
    var message = document.getElementById('downloadMessage');
    if (message)
      message.textContent = chrome.i18n.getMessage('downloadMessage');

    var button = document.getElementById('downloadButton');
    if (button) {
      button.textContent = chrome.i18n.getMessage('downloadButton');
      button.addEventListener("click", function(_event) {
        var href = this.href;
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          if (tabs && tabs[0])
            chrome.tabs.update(tabs[0].id, { url: href });
          window.close();
        });
      });
    }
  }
  if (signinPage) {
    var message = document.getElementById('signinMessage');
    if (message)
      message.textContent = chrome.i18n.getMessage('signinMessage');
      
    var button = document.getElementById('signinButton');
    if (button) {
      var port = bgPage.port;
      button.textContent = chrome.i18n.getMessage('signinButton');
      button.addEventListener("click", function(_event) {
        try {
          var cmd = { cmd: bgPage.CmdLaunchiCP };
          port.postMessage(cmd);
        }
        catch (e) {
        }
        window.close();
      });
    }
  }
  if (metroPage) {
    var message = document.getElementById('metroMessage');
    if (message) {
      if (bgPage.isSupportedOS)
        message.textContent = chrome.i18n.getMessage('metroMessage');
      else
        message.textContent = chrome.i18n.getMessage('unsupportedOS');
    }
    var okButton = document.getElementById('metroButton');
    if (okButton) {
      okButton.textContent = chrome.i18n.getMessage('okButton');
      okButton.addEventListener("click", function() { window.close(); });
    }
  }

  var dismissButton = document.getElementById('dismiss');
  if (dismissButton)
    dismissButton.addEventListener("click", function() { window.close(); });

  if (bgPage.isMetroMode || !bgPage.isSupportedOS) {
    document.body.style.width = '450px';
    if (downloadPage)
      downloadPage.style.display = 'none';
    if (signinPage)
      signinPage.style.display = 'none';
    metroPage.style.display = 'block';
  }
  else
    updatePopup();
  document.body.classList.remove("loading");
}

window.addEventListener('load', function() { loadPopup(); });
