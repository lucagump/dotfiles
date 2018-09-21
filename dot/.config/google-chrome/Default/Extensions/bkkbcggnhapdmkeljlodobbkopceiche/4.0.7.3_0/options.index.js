/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export PBStorage */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PBStorageInstance__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PBCombinedMergedStorage__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PBCombinedMappedStorage__ = __webpack_require__(6);
/**
 * Created by sekot on 2016-10-27.
 */




class PBStorage {

  constructor(globalStore, storage) {
    this.storage = storage;
    //#TEMP - REMOVE THIS pb_defaultWhitelist
    this.pb_defaultWhitelist = this.createStorage("pb_defaultWhitelist");
    this.pb_whitelistManager = this.createStorage("pb_whitelistManager");
    this.pb_detectOverlays = this.createStorage("pb_detectOverlays");
    this.pb_hideBadge = this.createStorage("pb_hideBadge");
    this.pb_hideNotifications = this.createStorage("pb_hideNotifications");
    this.pb_installDate = this.createStorage("pb_installDate");
    this.pb_overlaylist = this.createStorage("pb_overlaylist");
    this.pb_numOfBlocks = this.createStorage("pb_numOfBlocks");
    this.pb_totalBlocksByType = this.createStorage("pb_totalBlocksByType");
    this.pb_tabswithoverlay = this.createStorage("pb_tabswithoverlay");
    this.pb_whitelist = this.createStorage("pb_whitelist");
    this.pb_counterBlockedSites = this.createStorage("pb_counterBlockedSites");
    this.pb_pause = this.createStorage("pb_pause");
    this.pb_siteWhenReport = this.createStorage("pb_siteWhenReport");
    this.pb_notFirstTimeToggle = this.createStorage("pb_notFirstTimeToggle");
    this.pb_GASettings = this.createStorage("pb_GASettings");
    this.pb_popupBlackList = this.createStorage("pb_popupBlackList");
    this.pb_disableContextMenu = this.createStorage("pb_disableContextMenu");
    this.pb_retentionData = this.createStorage("pb_retentionData");
    this.doNotShowNotifyList = this.createStorage("doNotShowNotifyList"); //hide notification on this domains list
    this.pb_overlayBlockedList = this.createStorage("pb_overlayBlockedList"); //list of block always overlays
    this.pb_lastNotificationDisplay = this.createStorage("pb_lastNotificationDisplay"); //last date when notification displayed
    this.pb_notification_size = this.createStorage("pb_notification_size"); //notification mode (maximized or minimized)
    this.pb_rating = this.createStorage("pb_rating"); //rating every x ntfs
    this.pb_OneTimeEvents = this.createStorage("pb_OneTimeEvents"); //do stuff one time

    this.all = this.many(this.pb_whitelist, this.pb_whitelistManager, this.pb_detectOverlays, this.pb_hideBadge, this.pb_hideNotifications, this.pb_installDate, this.pb_overlaylist, this.pb_numOfBlocks, this.pb_tabswithoverlay, this.pb_counterBlockedSites, this.pb_GASettings, this.pb_popupBlackList, this.pb_disableContextMenu, this.pb_retentionData, this.pb_pause, this.doNotShowNotifyList, this.pb_overlayBlockedList, this.pb_rating, this.pb_OneTimeEvents);
  }

  createStorage(key) {
    return new __WEBPACK_IMPORTED_MODULE_0__PBStorageInstance__["a" /* default */](key, this.storage);
  }

  many() {
    const store = new __WEBPACK_IMPORTED_MODULE_2__PBCombinedMappedStorage__["a" /* default */]();
    store.setParentStorage(this.storage);
    store.setStorages(arguments);
    return store;
  }

}

/**
 * Forced singleton which is an facade-like aggregation
 * of all available storage.
 * @type {PBStorage}
 */
const PBStorageSync = new PBStorage(chrome.storage, chrome.storage.local);

/* harmony default export */ __webpack_exports__["a"] = (PBStorageSync);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export now */
/* unused harmony export addScript */
/* harmony export (immutable) */ __webpack_exports__["j"] = getTabUrl;
/* unused harmony export removeScript */
/* unused harmony export saveAsBlob */
/* harmony export (immutable) */ __webpack_exports__["d"] = executeCode;
/* unused harmony export loadJsonAsset */
/* harmony export (immutable) */ __webpack_exports__["l"] = isDomainInList;
/* unused harmony export getDomainName */
/* unused harmony export toQueryString */
/* harmony export (immutable) */ __webpack_exports__["o"] = randId;
/* harmony export (immutable) */ __webpack_exports__["a"] = GUID;
/* harmony export (immutable) */ __webpack_exports__["h"] = getManifestInfo;
/* harmony export (immutable) */ __webpack_exports__["k"] = getTodayBlockCount;
/* harmony export (immutable) */ __webpack_exports__["c"] = copyTextToClipboard;
/* harmony export (immutable) */ __webpack_exports__["f"] = getBrowser;
/* harmony export (immutable) */ __webpack_exports__["i"] = getRandomInt;
/* harmony export (immutable) */ __webpack_exports__["n"] = isValidUrl;
/* harmony export (immutable) */ __webpack_exports__["e"] = getAbsoluteURL;
/* harmony export (immutable) */ __webpack_exports__["m"] = isI18N;
/* harmony export (immutable) */ __webpack_exports__["g"] = getI18N;
/* unused harmony export insertBeforeRoot */
/* unused harmony export sendGoogleAnalyticsEvent */
/* unused harmony export sendToBackground */
/* harmony export (immutable) */ __webpack_exports__["p"] = sendToActiveTab;
/* unused harmony export run */
function now() {
  return Math.floor(Date.now() / 1000);
}
function addScript(template) {
  let s = document.createElement("script");
  if (document.querySelector("#" + template.id) != undefined) {
    return;
  }
  if (template.src) {
    s.src = template.src;
  }
  if (template.textContent) {
    s.textContent = template.textContent;
  }
  s.setAttribute("id", template.id);
  insertBeforeRoot(s);
}

function getTabUrl() {
  return new Promise(resolve => {
    chrome.runtime.sendMessage({ name: 'requestTabUrl' }, function (response) {
      try {
        let url = new URL(response.url);

        resolve({ domain: url.hostname, href: url.href });
      } catch (e) {
        resolve({ domain: document.domain, href: location.href });
      }
    });
  });
}

function removeScript(template) {
  let addedScript = document.querySelector("#" + template.id);
  if (addedScript != undefined) {
    addedScript.parentNode.removeChild(addedScript);
  }
}
function saveAsBlob(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'blob';
  xhr.onload = function (e) {
    if (this.status == 200) {
      var url = URL.createObjectURL(this.response);
      callback(url);
    }
  };
  xhr.send();
}

function executeCode(code) {
  let s = document.createElement("script");
  s.textContent = code;

  insertBeforeRoot(s);

  s.remove();
}

function loadJsonAsset(jsonPath) {
  return $.getJSON(jsonPath);
}

/**
 * Checks whether domain fits the whitelist
 * @param String domain
 * @param Array [String] domainList
 * @returns {boolean}
 */
function isDomainInList(domain, domainList, returnValue) {
  domainList = domainList || [];

  for (var i = 0; i < domainList.length; i++) {
    var domainTail = domainList[i];
    if (new RegExp("\\b[(www\\.)|.*\.]?" + domainTail + "\\b").test(domain)) {
      return returnValue ? domainTail : true;
    }
  }
  return false;
}

function getDomainName(href) {
  var l = document.createElement("a");
  l.href = href;
  return l.hostname;
}

function toQueryString(obj) {
  return Object.keys(obj).filter(function (key) {
    return !!obj[key] || false === obj[key];
  }).map(function (key) {
    return key + '=' + obj[key];
  }).join('&');
}

function randId() {
  var randid = localStorage.getItem("randid");
  if (!randid) {
    var rr = function () {
      return ((1 + Math.random(Date.now() + 14)) * 0x10000 | 0).toString(28).substring(1);
    };
    randid = rr() + rr() + rr() + rr() + rr() + rr() + rr() + rr() + rr();
    localStorage.setItem("randid", randid);
  }
  return randid;
}

function GUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}

function getManifestInfo() {
  return chrome.runtime.getManifest();
}

class Retension {
  constructor(conf) {
    this.Storage = conf.Storage;
    this.GAEvents = conf.GAEvents;
    this.lastRetentionDay = 28;
    this.minHoursFromInstall = 8;

    this.Storage.requestGet().then(data => {
      this.data = this.initialize(data);

      this.report();
    });
  }

  initialize(data) {
    if (data && data.installDate && data.sentDays) {
      return data;
    } else {
      data = data || {};
      data.installDate = data.installDate ? data.installDate : (() => {
        this.GAEvents.Install();

        return Date.now();
      })();
      data.sentDays = data.sentDays || {};

      this.Storage.requestSet(data);

      return data;
    }
  }

  report() {
    if (!this.data.completed) {
      this.reportRetentoin();
    }

    this.reportAlive();

    setTimeout(this.report.bind(this), 1000 * 60 * 60);
  }

  reportRetentoin() {
    let now = new Date();
    let installDate = new Date(this.data.installDate);
    let installStart = this.getDateStart(installDate);
    let todayStart = this.getDateStart(now);
    let msStartDiff = Math.abs(todayStart - installStart);
    let hoursFromTrueInstall = Math.floor((now - installDate) / (1000 * 60 * 60));
    let daysDiff = Math.floor(msStartDiff / (1000 * 60 * 60 * 24));

    if (daysDiff > 0 && daysDiff <= this.lastRetentionDay) {
      if (!this.data.sentDays[daysDiff] && hoursFromTrueInstall > this.minHoursFromInstall) {
        this.GAEvents.Retentoin(daysDiff);

        this.data.sentDays[daysDiff] = true;
        this.Storage.requestSet(this.data);
      }
    } else if (daysDiff > this.lastRetentionDay) {
      this.data.completed = true;

      this.Storage.requestSet(this.data);
    }
  }

  reportAlive() {
    let now = new Date();
    let lastAliveTime = this.data.lastAliveTime;
    let todayStart = this.getDateStart(now).getTime();

    if (!lastAliveTime || lastAliveTime * 1 < todayStart) {
      this.GAEvents.Alive();

      this.data.lastAliveTime = now.getTime();
      this.Storage.requestSet(this.data);
    }
  }

  getDateStart(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getHours() >= 0 && date.getHours() < 5 ? date.getDate() - 1 : date.getDate(), 5, 0, 1); //day starts at 5PM
  }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = Retension;


function getTodayBlockCount(PBStorageSync, domain, callback) {
  function isBetweenTimeRange(dateRange) {
    let now = new Date();
    let start = new Date(dateRange[0]);
    let end = new Date(dateRange[1]);

    return now >= start && now < end;
  }

  PBStorageSync.pb_counterBlockedSites.get().then(response => {
    let data = (response || {})[domain];

    if (data && isBetweenTimeRange(data.currentTimeRange)) {
      callback(data.todayCount);
    } else {
      callback(0);
    }
  });
}

function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");

  // Place in top-left corner of screen regardless of scroll position.
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = '2em';
  textArea.style.height = '2em';

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = 0;

  // Clean up any borders.
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';

  // Avoid flash of white box if rendered for any reason.
  textArea.style.background = 'transparent';

  textArea.value = text;

  document.body.appendChild(textArea);

  textArea.select();

  try {
    var successful = document.execCommand('copy');
  } catch (err) {}

  document.body.removeChild(textArea);
}

function getBrowser() {
  if (/firefox/i.test(navigator.userAgent)) {
    return 'FF';
  }

  return 'CH';
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function isValidUrl(url) {
  return url.indexOf("http") === 0 && !url.includes("://localhost") && !url.includes("chrome/newtab");
}

function getAbsoluteURL(baseURL) {
  if (/^about:blank/i.test(baseURL)) {
    return baseURL;
  }

  if (/^(https?:)?\/\//.test(baseURL)) {
    return baseURL;
  }

  baseURL = location.origin + (!/^\//.test(baseURL) ? '/' : '') + baseURL;

  return baseURL;
}

function isI18N(id) {
  return !!chrome.i18n.getMessage(id);
}

function getI18N(msgName, alternative) {
  return chrome.i18n.getMessage(msgName) || chrome.i18n.getMessage(alternative || msgName) || msgName;
}

function insertBeforeRoot(dom) {
  const head = document.head;

  if (head) {
    head.appendChild(dom);
  } else {
    const rootDocument = document.documentElement;

    rootDocument.insertBefore(dom, rootDocument.firstChild);
  }
}

function sendGoogleAnalyticsEvent(data) {
  sendMessageToBackground({
    name: "trackEvent",
    category: data.category,
    action: data.action,
    label: data.label,
    isCount: data.isCount
  });
}

function sendToBackground(name, data) {
  chrome.runtime.sendMessage({ name: name, data: data || '' });
}

function sendToActiveTab(name, data) {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { name: name, data: data || '' });
  });
}

function run() {}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by sekot on 2016-10-27.
 */

/**
 * Entity that knows how to perform read write opperations to storage
 * @param String key name of storage
 * @param StorageArea storage
 * @param Event onChanged
 * @constructor
 */
class PBStorageInstance {
  constructor(key, storage) {
    this.key = key;
    this.storage = storage;
  }

  /**
   * Gets the value stored.
   * @returns {Promise}
   */
  get() {
    const self = this;
    return new Promise(resolve => {
      self.storage.get(self.key, value => {
        value = value[self.key];
        self.lastAnswer = value;
        resolve(value);
      });
    });
  }

  /**
   * Sets the new value
   * @param Onject value new value
   * @returns {Promise}
   */
  set(value) {
    const self = this;
    return new Promise(resolve => {
      const obj = {};
      obj[self.key] = value;
      self.storage.set(obj, resolve);
    });
  }

  /**
   * Gets current value, compares it with new and if different updates it
   * @param Onject value new value
   * @returns {Promise}
   */
  setIfNew(value) {
    const self = this;
    return new Promise(resolve => {
      self.get().then(v => {
        if (v == value) {
          resolve();
        } else {
          self.set(value).then(resolve);
        }
      });
    });
  }

  /**
   * Gets the value, updates it as updateFunction requires it
   * and sets the updated value
   * @param Function updateFunction function(value){return updatedValue;}
   * @returns {Promise}
   */
  update(updateFunction) {
    if (typeof updateFunction !== "function") {
      throw new Error("Illegal invocation. Function expected.");
    }
    const self = this;
    return new Promise(resolve => {
      self.get().then(value => {
        const updatedValue = updateFunction(value);
        self.setIfNew(updatedValue).then(resolve);
      });
    });
  }

  //same as set but first remove the key
  //solves a bug that set ignores the new value
  removeAndSet(value) {
    const self = this;

    return new Promise(resolve => {
      self.storage.remove(self.key, () => {
        self.set(value).then(function () {
          resolve();
        });
      });
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (PBStorageInstance);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PBStorageInstance__ = __webpack_require__(2);
/**
 * Created by sekot on 2016-10-27.
 */


/**
 * Class for multiple storages to be treated a one
 * Treat this as a composite pattern
 * @constructor
 */
class PBCombinedStorage {
  /**
   * Combines all results of all storages to a map name -> value
   * @param Map values {storage name : storage value}
   * @param Array storages array of storages
   * @returns {{}} Map with KEY as a name of storage and value as a value stored there
   * @constructor
   */
  static COMBINE_MAP(values, storages) {
    const responses = {};
    values.forEach((val, idx) => {
      responses[storages[idx].key] = val;
    });
    return responses;
  }

  /**
   * Combines all results of all storages to a single dimention domain
   * @param Map values {storage name : storage value}
   * @param Array storages array of storages
   * @returns {Array} array of all values of all storages merged to single dimention array
   * @constructor
   */
  static COMBINE_MERGE(values, storages) {
    let responses = [];
    values.forEach(val => {
      if (val instanceof Array) {
        responses = responses.concat(val);
      } else {
        responses.push(val);
      }
    });
    return responses;
  }

  constructor() {
    this.storages = [];
    this.setStorages(arguments);
  }

  getStoragesMapped() {
    const obj = {};

    for (const current of this.storages) {
      obj[current.key] = current;
    }

    return obj;
  }

  /**
   * Sets the array of storages used to combine result
   * @param storageArray
   */
  setStorages(storageArray) {
    for (let i = 0; i < storageArray.length; i++) {
      const currentArgument = storageArray[i];
      if (currentArgument instanceof __WEBPACK_IMPORTED_MODULE_0__PBStorageInstance__["a" /* default */] || currentArgument instanceof PBCombinedStorage) {
        this.storages.push(currentArgument);
      } else {
        throw new Error(`Illegal invocation. PBStorageInstance expected at [${i}].`);
      }
    }
  }

  /**
   *
   * @param Map values {storage name : storage value}
   * @param Array storages array of storages
   */
  combine(values, storages) {}

  /**
   * Gets all from all storages and combines the result
   * @returns {Promise}
   */
  get() {
    const self = this;
    const storages = this.storages;
    const promises = [];
    for (let i = 0; i < storages.length; i++) {
      promises.push(storages[i].get());
    }

    return new Promise(resolve => {
      Promise.all(promises).then(values => {
        resolve(self.combine(values, storages));
      });
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (PBCombinedStorage);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const Config = {
  "thank_you_page_CH": "https://poperblocker.com/welcome",
  "thank_you_page_FF": "https://poperblocker.com/welcome-firefox",
  "uninstall_page_CH": "https://poperblocker.com/uninstall/?",
  "uninstall_page_FF": "https://poperblocker.com/uninstall-firefox/?",
  "feedback_page": "https://poperblocker.com/feedback.html?from=ext",
  "contact_page": "https://poperblocker.com/contact-form.html",
  "appStore_CH": "https://chrome.google.com/webstore/detail/pop-up-blocker-for-chrome/bkkbcggnhapdmkeljlodobbkopceiche",
  "appStore_FF": "https://addons.mozilla.org/en-US/firefox/addon/poper-blocker-pop-up-blocker/",
  "extension_review_page_CH": "https://chrome.google.com/webstore/detail/pop-up-blocker-for-chrome/bkkbcggnhapdmkeljlodobbkopceiche/reviews",
  "extension_review_page_FF": "https://addons.mozilla.org/en-US/firefox/addon/poper-blocker-pop-up-blocker/reviews/add",
  "twitter_share_link": "https://twitter.com/intent/tweet?hashtags=popups&original_referer=https%3A%2F%2Fpoperblocker.com%3Fref%3Dfb_pp_share&related=socialmediahats&text=I'm%20using%20poper%20blocker%20to%20enjoy%20a%20popup%20free%20browsing%20experience%20pic.twitter.com%2FniqVgqfmAw&url=https%3A%2F%2Fgoo.gl%2FryoaEn&via=poper_blocker",
  "facebook_share_link": "https://www.facebook.com/dialog/share?app_id=1911035589168170&display=popup&href=https%3A%2F%2Fpoperblocker.com%3Fref%3Dfb_pp_share%3Fhl%3Den&hashtag=%23For_No_More_Popups_Click_Below",
  "overlay_check_API": "https://api2.poperblocker.com/view/update",
  "overlay_blocking_context_item_contexts": ["page", "frame", "selection", "link", "editable", "image", "video", "audio"],
  "googleSheetID": "1dRQsmt6DYMXGo3YeTQ442kV-xxG1LJfG41wEUpnWefM",
  "dataSettings": {
    strKeys: ["ga_allEvent_rate", "ni"],
    arrKeys: ["blacklist", "whitelist"]
  },
  "blockCountsToShowRate": 5,
  "blockCountsToShowRateAgain": 100, //user did not rate at the first time, then show the rate bar every THIS count
  //"defaultWhiteList": [],
  //"defaultWhiteListAllowed": ["disqus.com", "engage.wixapps.net", "linkedin.com", "google","www.gmail.com","www.pinterest.com","www.youtube.com","www.facebook.com","search.yahoo.com","chrome://newtab","www.food.com"],
  "defaultWhiteList": {
    "sites": [],
    "popups": ["disqus.com", "engage.wixapps.net", "linkedin.com", "google", "gmail.com", "www.pinterest.com", "www.youtube.com", "www.facebook.com", "myh.godaddy.com"]
  },
  "defaultBlackList": ["adrunnr", "successforyu.clickfunnels.com", "fmovies.se", "in-365-tagen.info", "5000-settimanale.com", "shop.mazzugioielli.com", "maxigossip.com", "lp.yazizim.com", "beyourxfriend.com", "99tab.com", "zzqrt.com", "canuck-method.net", "bewomenly.com", "playnow.guru", "datingforyou-48e1.kxcdn.com", "trafficnetworkads24.com", "sistemadedinerogratis.com", "canuckmethodprofit.co", "consumerresearchnetwork.com", "securemacfix.com", "zz3d3.ru", "zd1.quebec-bin.com", "hot-games4you.xyz", "om.elvenar.com", "superpccleanup.com", "gomediaz.com", "judithi.xyz", "free.atozmanuals.com", "yoursuccess.ravpage.co.il", "123hop.ir", "quizcliente.pw", "aussiemethod.biz", "hlpnowp-c.com", "picbumper.com", "shaneless.com", "anacondamonster.com", "altrk1.com", "health.todaydiets.com", "download.weatherblink.com", "happyluketh.com", "go.ameinfo.com", "50kaweek.net", "thepornsurvey.com", "ofsiite.ru", "fulltab.com", "1000spins.com", "time2play-online.net", "vintacars.com", "welcome.pussysaga.com", "free-desktop-games.com", "download.televisionfanatic.com", "theprofitsmaker.net", "sgad.info", "algocashmaster.net", "sunmaker.com", "topvipdreams.com", "watchmygirlfriend.gfpornvideos.com", "filesharefanatic.com", "safedownloadhub.com", "7awlalalam.blogspot.com", "tvplusnewtab.com", "trendingpatrol.com", "moneymorning.com", "ifileyou.com", "classifiedcanada.ca", "firefan.com", "methode-binaire.com", "letmetell.com", "kenduktur.com", "getafuk.com", "yotraleplahnte.ru", "jackpot.88beto.com", "pwwysydh.com", "search.queryrouter.com", "v.lvztxy.com", "pussysaga.com", "saffamethod.com", "prezzonline.com", "searchprivacy.website", "3d2819216eb4e1035879-7c248de0c99745406e9b749fc86ec3e4.ssl.cf1.rackcdn.com", "only2date.com", "mysagagame.com", "themillionaireinpjs.net", "wlt.kd2244.com", "quickprivacycheck.com", "hotchatdate.com", "autotraderbot.com", "z1.zedo.com", "youlucky2014.com", "traffic.getmyads.com", "appcloudprotected.com", "safensecure.com-allsites3.xyz", "newpoptab.com", "static.williamhill.com", "myhealthyblog.co", "greatestmobideals.com", "sweetclarity.com", "mgid.com", "securepccure.com", "autopengebygger.com", "am15.net", "es.reimageplus.com", "o2.promos-info.com", "it.reimageplus.com", "westsluts.com", "spinandwin.com-ser.pw", "reimageplus.com", "vodafone.promos-info.com", "vinnmatpengar.se", "movie.ienjoyapps.com", "love4single.com", "origin.getprice.com.au", "ohmydating.com", "lp.want-to-win.com", "yabuletchrome.ru", "bamdad.net", "gotositenow.com", "vcrypt.pw", "newtabtv.com", "mon.setsu.xyz", "youforgottorenewyourhosting.com", "zone-telechargement.ws", "land.pckeeper.software", "ad.adpop-1.com", "advancedpctools.com", "videos.randolphcountyheraldtribune.com", "web-start.org", "softreadynow.installupgradenowfreshandforyou.website", "uplod.ws", "pornhubcasino.com", "maxbet.ro", "2016prizefeed.com", "thevideo.me", "wantubad.com", "tavanero.com", "xcusmy.club", "daclips.in", "gaymenofporn.online", "jackpotcitycasino.com", "italian-method.com", "getsearchincognito.com", "youjustwonprize.com", "finanz-nachrichten.me", "quizcliente.site", "da.reimageplus.com", "jkanime.net", "britmoneymethod.com", "uae.souq.com", "ka.azzer.net", "safensecure.xyz", "8t.hootingrhejkz.online", "www6.blinkx.com", "wizzcaster.com", "comparaison-prix.com", "vodlocker.lol", "fr.reimageplus.com", "free.fromdoctopdf.com", "userscloud.com", "myprivatesearch.com", "fanli90.cn", "tutticodicisconto.it", "mediadec.com", "gogamego.thewhizproducts.com", "download.weatherblink.com", "free.videodownloadconverter.com", "we-are-gamers.com", "sesso.communityadult.net", "lp.blpmovies.com", "search.queryrouter.com", "bbb-johannesburg.localspecific.com", "lp.blpmovies.com", "go.ppixelm.com", "r0.ru", "sesso.communityadult.net", "bbb-johannesburg.localspecific.com", "ppixelm.com", "cyberguardianspe.info", "we-are-gamers.com", "loginfaster.com/new", "www.alfacart.com", "www.foresee.com", "mobile-win.com", "www.plusnetwork.com", "www.amicafarmacia.com", "www.ienjoyapps.com", "cheapcheap.io", "screenaddict.thewhizproducts.com", "nova.rambler.ru", "free.gamingwonderland.com", "p9328ujeiw1.ru", "mobilecasinoclub.co.uk", "pfhsystem.com", "regtuneup.com", "theprofitsmaker.net", "bodogpromotions.eu", "heroesreplay.org", "financialsecrets.info", "mymoneymakingapp.com", "sunmaker.com", "888casino-promotions.com", "vogliosesso.com", "scienceremix.com", "allinonedocs.com", "arabia.starzplay.com", "allirishcasino.com", "advancepctools.info", "movie.ienjoyapps.com", "surveyform001.s3-website-us-east-1.amazonaws.com", "mgs188.com", "pfhsystem.com", "lpeva.com", "ddsh8.com", "theprofitsmaker.net", "b2.ijquery11.com", "sporthero.thewhizmarketing.com", "securefastmac.tech", "seen-on-screen.thewhizmarketing.com", "1000spins.com", "search.queryrouter.com", "pfhsystem.com", "reimageplus.com", "offer.alibaba.com", "searchlistings.org", "search.queryrouter.com", "search.queryrouter.com", "mybinaryoptionsrobot.com", "duplicashapp.com", "search.queryrouter.com", "bestgame.directory", "droidclub.net", ".rivalo.com", "yoursuperprize.com", "mediaexplained.com", "om.elvenar.com", "shinar.club", "revitoleczemacream.com", "freelotto.com", "screenaddict.thewhizproducts.com", "download.bringmesports.com/", "allinonedocs.com", "driver-fixer.com", "arabydeal.com", "cleanyourcomputertoday.com", "arabydeal.com", "music.mixplugin.com", "1se.info", "survey12.com", "freesoftwaredlul.com", "pldist01.com", "ad.adpop-1.com", "searchanonymous.net", "abrst.pro", "muzikfury.thewhizmarketing.com", "lp.mbtrx.com", "th1.forfun.maxisize-pro.com", "watchmygirlfriend.gfpornbox.com", "new.freelotto.com", "desktoptrack.com", "search.queryrouter.com", "offer.alibaba.com", "1000spins.com", "promotions.coral.co.uk", "search.queryrouter.com", "tbsia.com", "tbsia.com", "multtaepyo.com", "search.queryrouter.com", "czechmethod.com", "consumerview.co", "wayretail.com", "72onbase.com", "funsafetab.com", "search.queryrouter.com", "speedyfiledownload.com", "driver-fixer.com", "arabydeal.com", "cleanyourcomputertoday.com", "arabydeal.com", "music.mixplugin.com", "1se.info", "survey12.com", "freesoftwaredlul.com", "pldist01.com", "ad.adpop-1.com", "searchanonymous.net", "abrst.pro", "muzikfury.thewhizmarketing.com", "lp.mbtrx.com", "th1.forfun.maxisize-pro.com", "watchmygirlfriend.gfpornbox.com", "new.freelotto.com", "desktoptrack.com", "search.queryrouter.com", "offer.alibaba.com", "1000spins.com", "promotions.coral.co.uk", "search.queryrouter.com", "tbsia.com", "tbsia.com", "surveyform001.s3-website-us-east-1.amazonaws.com", "mgs188.com", "pfhsystem.com", "lpeva.com", "ddsh8.com", "theprofitsmaker.net", "quantomcoding.com", "sporthero.thewhizmarketing.com", "popads.net", "onclkds.com", "consumerview.co", "12kotov.ru", "ruhotpair2.fingta.com", "easytelevisionaccessnow.com", "ahwrd.com", "lpeva.com", "ppgzf.com", "zjstx.com", "kituure.xyz", "join.pro-gaming-world.com", "mackeeperapp.mackeeper.com", "tracknotify.com", "2075.cdn.beyondhosting.net", "idollash.com", "ds.moviegoat.com", "fulltab.com", "rackcdn.com", "prestoris.com", "adsterra.com", "swampssovuuhusp.top", "streesusa.info", "freesoftwaredlul.com", "adreactor.com", "a-static.com", "codeonclick.com", "heheme.com", "adf.ly", "seen-on-screen.thewhizmarketing.com", "openload.co"]
};

/* harmony default export */ __webpack_exports__["a"] = (Config);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PBCombinedStorage__ = __webpack_require__(3);


/**
 * Combined storage which merges all results to one array
 * {whitelist: ['a', 'b'], blacklist: ['b', 'c']}
 * -> ['a', 'b', 'b', 'c']
 * @constructor
 */
class PBCombinedMergedStorage extends __WEBPACK_IMPORTED_MODULE_0__PBCombinedStorage__["a" /* default */] {
  constructor() {
    super();
    this.setStorages(arguments);
    this.combine = __WEBPACK_IMPORTED_MODULE_0__PBCombinedStorage__["a" /* default */].COMBINE_MERGE;
  }
}
;

/* unused harmony default export */ var _unused_webpack_default_export = (PBCombinedMergedStorage);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PBCombinedStorage__ = __webpack_require__(3);
/**
 * Created by sekot on 2016-10-27.
 */



/**
 * Combined storage which merges all results to map
 * {whitelist: ['a', 'b'], blacklist: ['b', 'c']}
 * -> {whitelist: ['a', 'b'], blacklist: ['b', 'c']}
 * @constructor
 */
class PBCombinedMappedStorage extends __WEBPACK_IMPORTED_MODULE_0__PBCombinedStorage__["a" /* default */] {
  constructor() {
    super();
    this.setStorages(arguments);
    this.combine = __WEBPACK_IMPORTED_MODULE_0__PBCombinedStorage__["a" /* default */].COMBINE_MAP;
    this.storages = [];
    this.parentStorage = null;
  }

  setParentStorage(parentStorage) {
    this.parentStorage = parentStorage;
    return this;
  }

  set(values) {
    // values = {pb_name:value}
    const self = this;
    return new Promise(resolve => {
      self.parentStorage.set(values, resolve);
    });
  }

  update(updateFunction) {
    const self = this;
    return new Promise(resolve => {
      self.get().then(mappedValues => {
        mappedValues = updateFunction(mappedValues);
        self.set(mappedValues).then(resolve);
      });
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (PBCombinedMappedStorage);

/***/ }),
/* 7 */
/***/ (function(module, exports) {

if (!Array.prototype.unique) {
  Array.prototype.unique = function () {
    const ko = {};
    this.forEach(item => {
      ko[item] = 1;
    });
    return Object.keys(ko);
  };
}

if (!Array.prototype.without) {
  Array.prototype.without = function (without) {
    return this.filter(v => !without.includes(v));
  };
}

if (!Array.prototype.remove) {
  Array.prototype.remove = function (item) {
    this.splice(this.indexOf(item), 1);
  };
}

if (!Array.prototype.contains) {
  Array.prototype.contains = function (item) {
    return this.includes(item);
  };
}

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function (tail) {
    return this.lastIndexOf(tail) + tail.length === this.length - 1;
  };
}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export WhitelistUpdater */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WhitelistManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PBStorage_PBStorageSync__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__const__ = __webpack_require__(4);



class WhitelistUpdater {
	constructor() {
		/*PBStorageSync.pb_whitelistManager.get().update(data => {
  	this.data = data;
  			this.init();
  });*/
	}
};

const WhitelistManager = {
	init({ userWhitelist }) {
		return Object.assign({
			defaultSites: __WEBPACK_IMPORTED_MODULE_1__const__["a" /* default */].defaultWhiteList.sites,
			defaultPopups: __WEBPACK_IMPORTED_MODULE_1__const__["a" /* default */].defaultWhiteList.popups
		}, {
			version: 0.1,
			userDefaultExclude: [],
			userWhitelist: userWhitelist
		});
	},

	getDefaultPopups() {
		return new Promise(async resolve => {
			const data = await __WEBPACK_IMPORTED_MODULE_0__PBStorage_PBStorageSync__["a" /* default */].pb_remoteWhitelist.get();

			resolve(data.popups);
		});
	},

	get() {
		return new Promise(async resolve => {
			const { defaultSites: def, userDefaultExclude: exclude, userWhitelist: user, defaultPopups: popups } = await __WEBPACK_IMPORTED_MODULE_0__PBStorage_PBStorageSync__["a" /* default */].pb_whitelistManager.get();

			resolve({
				sites: {
					def: def.without(exclude),
					user,
					all: def.without(exclude).concat(user)
				},
				popups
			});
		});
	},

	addDefaultUserExclude(...hosts) {
		return __WEBPACK_IMPORTED_MODULE_0__PBStorage_PBStorageSync__["a" /* default */].pb_whitelistManager.update(data => {
			const { userDefaultExclude: list = [] } = data;

			data.userDefaultExclude = list.concat(hosts).unique();

			return data;
		});
	},

	addUserWhitelist(...hosts) {
		return __WEBPACK_IMPORTED_MODULE_0__PBStorage_PBStorageSync__["a" /* default */].pb_whitelistManager.update(data => {
			const { userWhitelist: list = [] } = data;

			data.userWhitelist = list.concat(hosts).unique();

			return data;
		});
	},

	removeUserWhitelist(...hosts) {
		return __WEBPACK_IMPORTED_MODULE_0__PBStorage_PBStorageSync__["a" /* default */].pb_whitelistManager.update(data => {
			const { userWhitelist: list = [] } = data;

			data.userWhitelist = list.without(hosts);

			return data;
		});
	}
};



/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prototype_extend__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prototype_extend___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__prototype_extend__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PBStorage_PBStorageSync__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__whitelistManager__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__const__ = __webpack_require__(4);






const create_list = options => {
  const validurlregexp = /^((https?|ftp):\/\/)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

  let _tag = "";
  if (options.tag) {
    _tag = options.tag;
  }
  _tag = `${_tag}Box`;
  const _listtag = `${options.tag}List`;
  let _internal_data_list = [];
  const _storaqgeKey = options.storageListKey || undefined;
  const _save_function = options.saver || undefined;
  const _load_function = options.loader || undefined;

  function validateUrl(value) {
    return validurlregexp.test(value);
  }

  const add = async function add() {
    const pattern_value = $(`#${_tag}`).val();
    $(`#${_tag}`).val("").next().prop("disabled", true);
    let GAEventName = _tag == "whiteListBox" ? "Whitelist_add" : "Blacklist_add";
    if (validateUrl(pattern_value)) {
      const pattern = pattern_value.replace("http://", "").replace("https://", "").split("/")[0];
      if (pattern.length > 0) {
        const whitelist = await __WEBPACK_IMPORTED_MODULE_2__whitelistManager__["a" /* WhitelistManager */].get();

        if (Object(__WEBPACK_IMPORTED_MODULE_3__utils__["l" /* isDomainInList */])(pattern, whitelist.sites.user)) {
          showErrorAndRestore($(`#${_tag}`), "OP_urlExistsInList", "OP_whitelist");
        } else {
          _internal_data_list.push(pattern);
          renderList();

          __WEBPACK_IMPORTED_MODULE_2__whitelistManager__["a" /* WhitelistManager */].addUserWhitelist(pattern);
          $(`#${_tag}`).val("");
          sendGoogleAnalyticsEvent(GAEventName, pattern);
        }
      }
    } else {
      showErrorAndRestore($(`#${_tag}`), "urlNotValid", "");
    }
  };
  const remove = function (e) {
    let that = $(this);
    let domain = that.parent().find(".domain").text().trim();
    let GAEventName = _tag == "whiteListBox" ? "Whitelist_removed" : "Blacklist_removed";
    let index = _internal_data_list.indexOf(domain);
    let removedDomain = _internal_data_list.splice(index, 1).join();
    sendGoogleAnalyticsEvent(GAEventName, removedDomain);
    renderList();

    __WEBPACK_IMPORTED_MODULE_2__whitelistManager__["a" /* WhitelistManager */].removeUserWhitelist(removedDomain);
  };

  function showErrorAndRestore(sel, errorMsg, replaceStr) {
    sel.val("").attr("placeholder", Object(__WEBPACK_IMPORTED_MODULE_3__utils__["g" /* getI18N */])(errorMsg).replace("%s", Object(__WEBPACK_IMPORTED_MODULE_3__utils__["g" /* getI18N */])(replaceStr)));
    setTimeout(() => {
      sel.attr("placeholder", Object(__WEBPACK_IMPORTED_MODULE_3__utils__["g" /* getI18N */])("urlExamplePlaceholder"));
    }, 2000);
  }

  function renderList() {
    $(`#${_listtag}`).html($.map(_internal_data_list, item => item.indexOf("google.") === -1 ? `<div class='list-group-item'><img class='favicon' src='http://www.google.com/s2/favicons?domain=${item}'><span class="domain">${item} </span><span class='removeButton${_listtag} glyphicon glyphicon-remove'></span></div>` : "").join(""));
  }

  function save() {
    if (_save_function) {
      _save_function(_internal_data_list);
    } else {
      __WEBPACK_IMPORTED_MODULE_1__PBStorage_PBStorageSync__["a" /* default */][_storaqgeKey].set(_internal_data_list);
    }
  }

  function init() {
    $(`#${_tag}`).keyup(function (e) {
      let that = $(this);
      let thatBtn = that.next();
      if (e.which == 13) {
        add();
      }
      if (that.val()) {
        thatBtn.prop("disabled", false);
      } else {
        thatBtn.prop("disabled", true);
      }
    });
    $(`#${_tag}`).next().click(function (e) {
      add();
    });
    $(`#${_listtag}`).on("click", `.removeButton${_listtag}`, remove);
    __WEBPACK_IMPORTED_MODULE_2__whitelistManager__["a" /* WhitelistManager */].get().then(whitelist => {
      _internal_data_list = whitelist.sites.user.unique();

      renderList();
    });
  }

  return init();
};

class overlayBlockList {
  constructor() {
    this.items = [];

    this.createItems();
  }

  createItems() {
    __WEBPACK_IMPORTED_MODULE_1__PBStorage_PBStorageSync__["a" /* default */].pb_overlayBlockedList.get().then((list = {}) => {
      Object.values(list).forEach(item => {
        this.items.push(...item);
      });

      this.createList(this.items);
    });
  }

  removeItem(item) {
    __WEBPACK_IMPORTED_MODULE_1__PBStorage_PBStorageSync__["a" /* default */].pb_overlayBlockedList.update((list = {}) => {
      let domain = item.domain;
      let blocks = (list[domain] || []).filter(block => block.id != item.id);

      if (blocks.length) {
        list[domain] = blocks;
      } else {
        delete list[domain];
      }

      return list;
    });
  }

  parse(item) {
    let url = new URL(item.url);
    let isRoot = url.origin == url.href.replace(/\/$/, '');

    return {
      id: item.id,
      domain: url.host,
      url: url.href
    };
  }

  createList(items) {
    let container = $('#blackListList');

    items.forEach(item => {
      let row = $(`<div class='list-group-item'><img class='favicon' src='http://www.google.com/s2/favicons?domain=${item.domain}'><span class="domain">${item.domain} (found on ${item.url})</span><span class='remove glyphicon glyphicon-remove'></span></div>`);

      row.on('click', '.remove', e => {
        row.remove();

        this.removeItem(item);
      }).appendTo(container);
    });
  }
}

$(document).ready(() => {
  sendGoogleAnalyticsEvent("Shown");
  create_list({ tag: "whiteList", storageListKey: "pb_whitelist" });
  //create_list({tag: "blackList", saver: saveBlack, loader: loadBlack});

  new overlayBlockList();

  __WEBPACK_IMPORTED_MODULE_1__PBStorage_PBStorageSync__["a" /* default */].many(__WEBPACK_IMPORTED_MODULE_1__PBStorage_PBStorageSync__["a" /* default */].pb_hideBadge, __WEBPACK_IMPORTED_MODULE_1__PBStorage_PBStorageSync__["a" /* default */].pb_hideNotifications, __WEBPACK_IMPORTED_MODULE_1__PBStorage_PBStorageSync__["a" /* default */].pb_detectOverlays, __WEBPACK_IMPORTED_MODULE_1__PBStorage_PBStorageSync__["a" /* default */].pb_numOfBlocks, __WEBPACK_IMPORTED_MODULE_1__PBStorage_PBStorageSync__["a" /* default */].pb_disableContextMenu).get().then(settings => {
    if (!settings.pb_hideBadge) {
      $("#badgeToggle").prop("checked", true);
    }
    if (!settings.pb_hideNotifications) {
      $("#notificationToggle").prop("checked", true);
    }
    $("#overlaysToggle").prop("checked", settings.pb_detectOverlays);
    $("#overlayContextMenuToggle").prop("checked", !settings.pb_disableContextMenu);
    $("#count").html(`${settings.pb_numOfBlocks} popups blocked`);
    setCheckStatus($("input[type='checkbox']"));
  });
  $("[data-translate]").each(function () {
    $(this).html(Object(__WEBPACK_IMPORTED_MODULE_3__utils__["g" /* getI18N */])($(this).data("translate")));
  });
  $("#badgeToggle").change(() => {
    let show = $("#badgeToggle").prop("checked");
    chrome.runtime.sendMessage({ name: "badgeToggle", show: show });
    sendGoogleAnalyticsEvent("Show_a_badge", show ? "checked" : "unchecked");
  });
  $("#notificationToggle").change(() => {
    let show = $("#notificationToggle").prop("checked");
    __WEBPACK_IMPORTED_MODULE_1__PBStorage_PBStorageSync__["a" /* default */].pb_hideNotifications.set(!show);
    sendGoogleAnalyticsEvent("Show_on_page_notification", show ? "checked" : "unchecked");
  });
  $("#overlaysToggle").change(() => {
    const value = $("#overlaysToggle").prop("checked");
    sendGoogleAnalyticsEvent("Enable_overlay_blocking", value ? "checked" : "unchecked");
    chrome.runtime.sendMessage({ name: "optionsPage", pb_detectOverlays: value });
    __WEBPACK_IMPORTED_MODULE_1__PBStorage_PBStorageSync__["a" /* default */].pb_detectOverlays.set(value);
  });
  $("#overlayContextMenuToggle").change(() => {
    const disabled = !$("#overlayContextMenuToggle").prop("checked");
    sendGoogleAnalyticsEvent("Enable_overlay_blocking_menu", disabled ? "unchecked" : "checked");
    chrome.runtime.sendMessage({ name: "optionsPage", pb_disableContextMenu: disabled });
    __WEBPACK_IMPORTED_MODULE_1__PBStorage_PBStorageSync__["a" /* default */].pb_disableContextMenu.set(disabled);
  });

  $("#rate-options").on("click", rateUs);
  $("#bugreport-options").on("click", bugFeedback);
  $("#support-options").on("click", emailFeedback);
  $("body").on("change", "input[type='checkbox']", function () {
    setCheckStatus($(this));
  });
});

function saveBlack(blacklist) {
  const data = {};
  for (let i = 0; i < blacklist.length; i++) {
    data[blacklist[i]] = "black";
  }
  __WEBPACK_IMPORTED_MODULE_1__PBStorage_PBStorageSync__["a" /* default */].pb_overlaylist.set(data);
}

function loadBlack(settings, blacklist) {
  if (settings.pb_overlaylist) {
    Object.keys(settings.pb_overlaylist).forEach(el => {
      if (settings.pb_overlaylist[el] === "black") {
        blacklist.push(el);
      }
    });
  }
}

function rateUs() {
  sendGoogleAnalyticsEvent("Link_press", "Rate");
  chrome.tabs.create({ url: __WEBPACK_IMPORTED_MODULE_4__const__["a" /* default */]['extension_review_page_' + Object(__WEBPACK_IMPORTED_MODULE_3__utils__["f" /* getBrowser */])()] });
}

function bugFeedback() {
  sendGoogleAnalyticsEvent("Link_press", "Report");
  feedback("Report bug");
}

function emailFeedback() {
  sendGoogleAnalyticsEvent("Link_press", "Email_us");

  contactForm();
}

function feedback(body) {
  const bugRequest = __WEBPACK_IMPORTED_MODULE_4__const__["a" /* default */].feedback_page + `&subject=${body ? encodeURI(body) : ""}&message=`;
  chrome.tabs.create({ url: bugRequest });
}

function contactForm() {
  chrome.tabs.create({ url: __WEBPACK_IMPORTED_MODULE_4__const__["a" /* default */].contact_page });
}

/*
 send message to background to send google analytics event
 sometimes we do not need the label

 */
function sendGoogleAnalyticsEvent(action, label) {
  chrome.runtime.sendMessage({ name: "trackEvent", category: "Options_menu", action: action, label: label });
}

function setCheckStatus($selArr) {
  $selArr.each((i, sel) => {
    let parentLabel = $(sel).parent(".checboxLabel");
    let checked = $(sel).prop("checked");
    parentLabel.toggleClass("active", checked);
  });
}

/***/ })
/******/ ]);