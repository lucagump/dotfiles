/*
 * (C) Copyright 2012-2014 Apple Inc
 */
var port; // Connection to native messaging host app.
var trackChanges = true;
var isSupportedOS = true;
var iCPState = 0;

// Commands
// Browser --> App
var CmdBeginBuildingBookmarkTree = 1;
var CmdAddFolderToTree = 2;
var CmdAddBookmarkToTree = 3;
var CmdEndBuildingBookmarkTree = 4;
var CmdOnChange = 5;
var CmdOnDidBMOp = 6;
var CmdOnFailBMOp = 7;
var CmdOnImportBegin = 8;
var CmdOnImportEnd = 9;
var CmdLaunchiCP = 10;

// App --> Browser
var CmdiCPStateChange = 50;
var CmdiCPAction = 51;
var CmdChangeAddFolder = 60;
var CmdChangeAddBookmark = 61;
var CmdChangeDeleteBookmark = 62;
var CmdChangeDeleteFolderRecursive = 63;
var CmdChangeDeleteFolder = 64;
var CmdChangeUpdate = 65;
var CmdChangeMove = 66;


function doMove(_id, _destId, _newIndex) {
    console.log("MOVE BM: " + _id + " => ^" + _destId + " @" + _newIndex);
    var cinfo = { parentId: _destId, index: _newIndex };
    chrome.bookmarks.move(_id, cinfo, function (_info) {
          if (_info) {
              console.log("DID MOVE: " + _info.id + " ^" + _info.parentId + " @" + _info.index);
              var cmd = { cmd: CmdOnDidBMOp, info: _info };
              try {
                  port.postMessage(cmd);
              }
              catch (e) {
              }
          }
          else {
              console.log("FAIL MOVE: ^" + _destId + ": " + _id + ": " + chrome.runtime.lastError);
              var cmd = { cmd: CmdOnFailBMOp, error: chrome.runtime.lastError, cinfo: cinfo, info: _info };
              try {
                  port.postMessage(cmd);
              }
              catch (e) {
              }
          }
      }
    );
}

function doAdd(_parentId, _title, _url, _index) {
    console.log("ADD BM: ^" + _parentId + " " + _title + " " + _url + " @" + _index);
    var cinfo = { parentId: _parentId, title: _title, url: _url };
    if (_index !== undefined && _index !== null)
        cinfo['index'] = _index;
    chrome.bookmarks.create(cinfo, function (_info) {
          if (_info) {
              console.log("DID ADD BM: ^" + _info.parentId + " " + _info.title + " " + _info.url + ": " + _info.id + " @" + _info.index);
              var cmd = { cmd: CmdOnDidBMOp, info: _info };
              try {
                  port.postMessage(cmd);
              }
              catch (e) {
              }
          }
          else {
              console.log("FAIL ADD BM: " + _parentId + " " + _title + ": " + chrome.runtime.lastError);
              var cmd = { cmd: CmdOnFailBMOp, error: chrome.runtime.lastError, cinfo: cinfo, info: _info };
              try {
                  port.postMessage(cmd);
              }
              catch (e) {
              }
          }
      }
    );
}
function doAddFolder(_parentId, _title, _index) {
    console.log("ADD FLD: ^" + _parentId + " " + _title + " @" + _index);
    var cinfo = { parentId: _parentId, title: _title };
    if (_index !== undefined && _index !== null)
        cinfo['index'] = _index;
    chrome.bookmarks.create(cinfo, function (_info) {
          if (_info) {
              console.log("DID ADD FLD: ^" + _info.parentId + " " + _info.title + ": " + _info.id + " @" + _info.index);
              var cmd = { cmd: CmdOnDidBMOp, info: _info };
              try {
                  port.postMessage(cmd);
              }
              catch (e) {
              }
          }
          else {
              console.log("FAIL ADD FLD: " + _parentId + " " + _title + ": " + chrome.runtime.lastError);
              var cmd = { cmd: CmdOnFailBMOp, error: chrome.runtime.lastError, cinfo: cinfo, info: _info };
              try {
                  port.postMessage(cmd);
              }
              catch (e) {
              }
          }
      }
    );
}
function doDelete(_id) {
    chrome.bookmarks.remove(_id, function () {
        console.log("DELETE: " + _id);
        var cmd = { cmd: CmdOnDidBMOp, id: _id };
        try {
            port.postMessage(cmd);
        }
        catch (e) {
        }
    });
}
function doDeleteFolderRecursively(_id) {
    chrome.bookmarks.removeTree(_id, function () {
        console.log("DELETE-TREE: " + _id);
        var cmd = { cmd: CmdOnDidBMOp, id: _id };
        try {
            port.postMessage(cmd);
        }
        catch (e) {
        }
    });
}
function doUpdate(_id, _title, _url) {
    var cinfo = {}
    if (_title != undefined && _title != null)
        cinfo['title'] = _title;
    if (_url != undefined && _url != null)
        cinfo['url'] = _url;
    var l = "UPDATE: " + _id + " title: " + _title + ", url: " + _url;
    console.log(l);
    chrome.bookmarks.update(_id, cinfo, function (_info) {
        if (_info) {
            console.log("DID UPDATE: " + _id + " title: " + _info.title + ", url: " + _info.url);
            var cmd = { cmd: CmdOnDidBMOp, info: _info };
            try {
                port.postMessage(cmd);
            }
            catch (e) {
            }
        }
        else {
            console.log("FAIL UPDATE: " + _title + ": " + chrome.runtime.lastError);
            var cmd = { cmd: CmdOnFailBMOp, error: chrome.runtime.lastError, cinfo: cinfo, info: _info };
            try {
                port.postMessage(cmd);
            }
            catch (e) {
            }
        }
    });
}

function addFolder(folder) {
    if (folder.children) {
        var count = folder.children.length;
        for (var i = 0; i < count; i++) {
            var bm = folder.children[i];
            //console.log("bm: " + bm.title);
            var bmSmall = { id: bm.id, parentId: bm.parentId, title: bm.title, index: bm.index };
            if (bm.children) {
                var cmd = { cmd: CmdAddFolderToTree, fld: bmSmall };
                port.postMessage(cmd);
                addFolder(bm);
            }
            else {
                // Bookmark
                if (bm.url) bmSmall.url = bm.url;
                var cmd = { cmd: CmdAddBookmarkToTree, bm: bmSmall };
                port.postMessage(cmd);
            }
        }
    }
}

function buildClientTree() {
    if (port) {
        console.log("asking Chrome for bookmark tree ...");
        chrome.bookmarks.getTree(function (_chromeRoot) {
            var bar = _chromeRoot[0].children[0];
            var menu = _chromeRoot[0].children[1];
            console.log("sending tree to app ...");
            // This returns all the children. JSON string could be too big.
            var barSmall = { id: bar.id, parentId: bar.parentId, title: bar.title, index: bar.index };
            var menuSmall = { id: menu.id, parentId: menu.parentId, title: menu.title, index: menu.index };
            var cmdBegin = { cmd: CmdBeginBuildingBookmarkTree, bar: barSmall, menu: menuSmall };
            try {
                port.postMessage(cmdBegin);
                addFolder(bar);
                addFolder(menu);
                var cmdEnd = { cmd: CmdEndBuildingBookmarkTree };
                port.postMessage(cmdEnd);
                console.log("tree sent to app.");
            }
            catch (e) {
            }
        });
    }
}

function oniCPStateChange(_iCPState, _buildClientTree) {
    console.log("iCP state changed: " + _iCPState + ", " + _buildClientTree);
    iCPState = _iCPState;
    var popups = chrome.extension.getViews({ type: "popup" });
    for (var k = 0; k < popups.length; k++) {
        popups[k].updatePopup();
    }
    if (_buildClientTree)
        buildClientTree();
}

function oniCPAction(_action) {
    if (_action == "ShowExtensionsPage")
        chrome.tabs.create({ url: "chrome://extensions", active: true });
}

function checkForValidOS() {
    // 5.0 (windows nt 6.1) applewebkit/537.36 (khtml, like gecko) 
    // 5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36
    var ua = window.navigator.appVersion;
    var regex = new RegExp("\\(Windows\\s*\\w*\\s*(\\d*)\\.(\\d*)", "i");
    var match = regex.exec(ua);
    if ((match == null) || (match.length != 3))
        return false; // Not Windows.
    if (match[1] >= 10)
        return true;  // Windows 10 or greater.
    if (match[1] < 6)
        return false; // XP or lower.
    if (match[2] < 1)
        return false; // Vista.
    return true;
}

if (!checkForValidOS()) {
    isSupportedOS = false;
    // Don't automatically uninstall in case extensions are being synced. Go dormant instead.
    // Only prompt on initial install.
    chrome.storage.local.get("hideUnsupportedOSPrompt", function (items) {
        if (!items.hideUnsupportedOSPrompt || (items.hideUnsupportedOSPrompt == 0)) {
            chrome.storage.local.set({ "hideUnsupportedOSPrompt": 1 });
            window.alert(chrome.i18n.getMessage("unsupportedOS"));
        }
    });
}
else {
    try {
        port = chrome.runtime.connectNative('com.apple.bookmarks');
        //console.log("Port: " + port);
        // Assume we are connected. Will be disconnected if not installed.
        iCPState = 1;
        port.onMessage.addListener(function (msg) {
            console.log("Received" + msg);
            if (msg.cmd) {
                console.log("Cmd: " + msg.cmd);
                switch (msg.cmd) {
                    case CmdiCPStateChange:
                        oniCPStateChange(msg.iCPState, msg.buildClientTree);
                        break;
                    case CmdiCPAction:
                        oniCPAction(msg.action);
                        break;
                    case CmdChangeAddFolder:
                        doAddFolder(msg.parentId, msg.title, msg.index);
                        break;
                    case CmdChangeAddBookmark:
                        doAdd(msg.parentId, msg.title, msg.url, msg.index);
                        break;
                    case CmdChangeDeleteBookmark:
                    case CmdChangeDeleteFolder:
                        doDelete(msg.id);
                        break;
                    case CmdChangeDeleteFolderRecursive:
                        doDeleteFolderRecursively(msg.id);
                        break;
                    case CmdChangeUpdate:
                        doUpdate(msg.id, msg.title, msg.url);
                        break;
                    case CmdChangeMove:
                        doMove(msg.id, msg.parentId, msg.index);
                        break;
                    default:
                        break;
                }
            }
            else {
                console.log("Received unknown msg: " + msg);
            }
        });
        port.onDisconnect.addListener(function () {
            console.log("Disconnected");
            iCPState = 0; // Not installed.
        });
    }
    catch (e) {
        console.log("can't call connect to native app.");
        iCPState = 0; // Not installed.
    }

    var bm = chrome.bookmarks;
    if (bm) {
        // wait to build client try until we get iCP state change notification

        // register all change notification handlers
        bm.onCreated.addListener(function (_id, _info) {
            console.log("created " + _id + ": " + _info.title + " @" + _info.index);
            var cmd = {
                cmd: CmdOnChange,
                type: "created",
                id: _id,
                parentId: _info.parentId,
                index: _info.index,
                title: _info.title,
                url: _info.url
            };
            try {
                port.postMessage(cmd);
            }
            catch (e) {
            }
        });
        bm.onRemoved.addListener(function (_id, _info) {
            console.log("removed " + _id + ": " + _info.title);
            var cmd = {
                cmd: CmdOnChange,
                type: "removed",
                id: _id,
                parentId: _info.parentId,
                index: _info.index
            };
            try {
                port.postMessage(cmd);
            }
            catch (e) {
            }
        });
        bm.onChanged.addListener(function (_id, _info) {
            console.log("changed " + _id + ": " + _info.title);
            var cmd = {
                cmd: CmdOnChange,
                type: "changed",
                id: _id,
                title: _info.title,
                url: _info.url
            };
            try {
                port.postMessage(cmd);
            }
            catch (e) {
            }
        });
        bm.onMoved.addListener(function (_id, _info) {
            console.log("moved " + _id + ": " + "^" + _info.oldParentId + " @" + _info.oldIndex + " => ^" + _info.parentId + " @" + _info.index);
            var cmd = {
                cmd: CmdOnChange,
                type: "moved",
                id: _id,
                oldParentId: _info.oldParentId,
                oldIndex: _info.oldIndex,
                parentId: _info.parentId,
                index: _info.index
            };
            try {
                port.postMessage(cmd);
            }
            catch (e) {
            }
        });
        bm.onChildrenReordered.addListener(function (_id, _info) {
            console.log("reorder " + _id + ": " + _info.title);
            var cmd = {
                cmd: CmdOnChange,
                type: "reorder",
                id: _id,
                childIds: _info.childIds
            };
            try {
                port.postMessage(cmd);
            }
            catch (e) {
            }
        });

        /* Removed. Some not so perfect coder set trackChanges,
           but never checked it, so importing ended up with duplicates.
        bm.onImportBegan.addListener(function() {
            trackChanges = false;
        });
        bm.onImportEnded.addListener(function() {
            trackChanges = true;
            // re-get tree
            buildClientTree();
        });
        */
    }
}

chrome.browserAction.setPopup({ 'popup': 'popup.html' });
