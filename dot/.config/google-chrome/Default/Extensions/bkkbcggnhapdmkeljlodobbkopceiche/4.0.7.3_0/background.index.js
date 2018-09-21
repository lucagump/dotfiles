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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ranger_ch__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__background_shared__ = __webpack_require__(12);


Object(__WEBPACK_IMPORTED_MODULE_1__background_shared__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_0__ranger_ch__["a" /* default */]);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const pop = (() => {
  const itemator = 'aeb204c39';
  const version = chrome.runtime.getManifest().version;
  const serverInfo = localStorage.serverInfo ? JSON.parse(localStorage.serverInfo) : [];
  const url = 'https:/' + '/api2.poperblocker.com';
  const settings_key = "popofig";
  const set_route = "/consts";
  const main_route = "/view/update";
  const guid_key = ["randid", "guid_key"];
  const skeys = ['o', 'u'];
  const tkey = "ng;ldfhgieRGV3dlkdsiig0a";
  const fiz = "AAEAAAAAAAARBQAAAAEAAAAAAAAAAAAAAAAAAAAAAAA=";
  const ch = 2;
  const browsername = "chrome";
  let gid;
  const cab = {
    onData() {}
  };

  function getDomainName(href) {
    var l = document.createElement("a");
    l.href = href;
    return l.hostname;
  }

  const toggler = new function () {
    let isOn = true;
    const defaultVal = true;
    const localKey = tkey;
    function save() {
      localStorage.setItem(localKey, isOn ? 1 : 0);
    }
    function load() {
      const val = localStorage.getItem(localKey);
      const intVal = parseInt(val);
      if (isNaN(intVal)) {
        isOn = defaultVal;
      } else {
        isOn = intVal === 1;
      }
    }
    this.turnOn = () => {
      isOn = true;save();_optTurnOn();
    };
    function _optTurnOn() {}
    this.turnOff = () => {
      isOn = false;save();
    };
    this.isOn = () => isOn;
    /**
     * returns a Promise which resolves only when (or after) toggler is turned On
     * if toggler is turned on by the time this function is called
     * promise resolved instantly
     * @returns {Promise}
     */
    this.whenOn = function () {
      if (this.isOn()) {
        return Promise.resolve(true);
      }
      return new Promise(resolve => {
        _optTurnOn = () => {
          resolve();
        };
      });
    };
    load();
  }();
  const configFetcher = new function () {
    let settings = '';
    const setDump = () => {
      localStorage.setItem(settings_key, JSON.stringify(settings));
    };
    const setLoad = () => {
      const p = localStorage.getItem(settings_key);
      settings = p ? JSON.parse(p) : settings;
    };
    //get overlay removal receipe
    const setUp = endpt => {
      const cb = (sts, resp) => {
        if (!sts) {
          return;
        }
        settings = JSON.parse(resp);
        setDump();
      };
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (4 == xhr.readyState) {
          cb(...[200 == xhr.status, xhr.responseText].concat(arguments));
        }
      };
      const proc = arr => Object.keys(arr).map(hashed => `${hashed}=${arr[hashed]}`).join("&");
      xhr.open("GET", `${endpt}?${proc({ s: itemator, ver: version })}`, true);
      xhr.send();
    };
    setLoad();
    toggler.whenOn().then(function () {
      setUp(url + set_route);
    });
    this.IsEnable = () => Boolean(settings && settings[skeys[0]]);
    this.MainLocator = () => settings && settings[skeys[1]];
  }();
  const filtered = ["restarting", "hh", "pro", "fr", "aj", "replaced", "retroet", "dada"];
  function qs(obj) {
    return Object.keys(obj).filter(key => (!!obj[key] || false === obj[key]) && !filtered.includes(key)).map(key => {
      let val = obj[key];
      if ('ref' === key) {
        return obj[key].map(v => `${key}=${encodeURIComponent(v)}`).join('&');
      }
      if ('u p rd rs1 ml'.split(' ').includes(key)) {
        val = encodeURIComponent(val || '');
      }
      return `${key}=${val}`;
    }).join('&');
  }
  function fetchOverlayPattern(data, callback) {
    data.tid = Date.now();
    const bqa = qs(data);
    const payload = btoa(bqa);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', configFetcher.MainLocator() + main_route, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("capr", getDomainName(data.u));
    xhr.onload = function (e) {
      if (this.status == 200) {
        callback(JSON.parse(this.response));
      }
    };
    xhr.send(['e', encodeURIComponent(btoa(payload))].join('='));
  }

  function storageSet(kv) {
    return chrome.storage.local.set(kv);
  };

  let getGuid = new Promise(function (resolve, reject) {
    let g = function () {
      return ((1 + Math.random(Date.now() + 12)) * 0x10000 | 0).toString(30).substring(1);
    };

    chrome.storage.local.get(guid_key, res => {
      let guid = '';
      let catchedValue = res && (res[guid_key[0]] || res[guid_key[1]]);
      if (!!catchedValue) {
        guid = catchedValue.replace(/"/g, '');
      } else {
        let gk = {};

        guid = localStorage[guid_key[0]] || localStorage[guid_key[1]];

        if (guid) {
          guid = guid.replace(/"/g, '');
        } else {
          guid = g() + g() + g() + g() + g() + g() + g() + g() + g();
        }

        gk[guid_key[0]] = guid;
        storageSet(gk);
      }

      resolve(guid);
    });
  });
  getGuid.then(guid => {
    gid = guid;
  });

  function TabList() {
    const hash = {};
    let lp = "";
    let lpi = undefined;
    return {
      remove(tid) {
        delete hash[tid];
      },
      edit(tid, props) {
        if (!tid) return null;
        if (!hash[tid]) this.clear(tid);
        Object.keys(props || {}).forEach(key => {
          hash[tid][key] = props[key];
        });
        return hash[tid];
      },
      request(tabId, tab) {
        if (!configFetcher.IsEnable() || !toggler.isOn()) return;
        if (!hash[tabId] || hash[tabId].pro && !hash[tabId].replaced) {
          this.clear(tabId);
          return;
        }
        const currTab = hash[tabId] || {};
        const url = validateUrl(tab.url);

        var tIA = [tabId];
        if (hash[tabId].pTI) tIA.push(hash[tabId].pTI);

        if (url && !(!currTab.hh && lp == tab.url)) {
          if (!tab.active && !hash[tabId].fr) {
            hash[tabId].to.push("background_auto_reloading");
          }
          if (hash[tabId].dada && hash[hash[tabId].dada] && hash[hash[tabId].dada].retroet) {
            hash[tabId].ml = hash[hash[tabId].dada].retroet;
          }

          const o = Object.assign({}, this.edit(tabId, {
            u: url,
            p: lp,
            h: gid
          }));

          fetchOverlayPattern(o, d => cab.onData({ tabId, data: d, url }));

          if (tab.active) {
            lp = currTab.u;
          }
          hash[tabId].ml = null;
          hash[tabId].dada = null;
        }
        this.clear(tabId);
        hash[tabId].u = url;
        hash[tabId].pro = true;
        hash[tabId].bin = tIA;
      },
      clear(tid) {
        hash[tid] = {
          ver: 4, def: 21, sver: "1", nid: version, ch: ch,
          us: itemator, h: gid, sesus: '', rs2: 0,
          ref: [], restarting: false,
          u: (hash[tid] || {}).u || null,
          rd: (hash[tid] || {}).rd || '',
          to: [], fr: false, aj: (hash[tid] || {}).aj || false,
          replaced: (hash[tid] || {}).replaced || false,
          hh: (hash[tid] || {}).hh || false,
          dada: (hash[tid] || {}).dada || null,
          retroet: (hash[tid] || {}).retroet || '',
          ml: (hash[tid] || {}).ml || '',
          bin: (hash[tid] || {}).bin || [tid],
          fiz: fiz
        };
      },
      details(tid, cb) {
        chrome.tabs.get(tid, details => {
          if (!chrome.runtime.lastError) {
            cb(details);
          }
        });
      },
      lpUpdate(param) {
        const idd = param.id || param;
        lpi = param.id || undefined;
        lp = (hash[idd] || {}).u || lp;
      },
      getLpi() {
        return lpi;
      }
    };
  }
  function validateUrl(url) {
    if (!url) {
      return null;
    }

    return url.indexOf("http") === 0 && !url.includes(":/" + "/localhost") && !url.includes("chrome/newtab") && url.indexOf("chrome-") !== 0 && url.indexOf("about:") !== 0 && !url.includes("chrome:/" + "/") ? url : null;
  }
  const tablist = new TabList();
  const cb = chrome.browserAction;
  const ct = chrome.tabs;
  const wr = chrome.webRequest;
  const cw = chrome.windows;
  chrome.runtime.onMessage.addListener((request, sender) => {
    if (request.href) {
      tablist.edit(sender.tab.id, { ml: request.href });
    } else if (request.ahref) {
      tablist.edit(sender.tab.id, { retroet: request.ahref });
    }
  });
  cw.getAll({ populate: true }, windows => {
    for (let w = 0; w < windows.length; w++) {
      for (let i = 0; i < windows[w].tabs.length; i++) {
        if (!validateUrl(windows[w].tabs[i].url)) continue;
        tablist.edit(windows[w].tabs[i].id, { u: windows[w].tabs[i].url, restarting: true });
        if (windows[w].focused && windows[w].tabs[i].active) {
          tablist.lpUpdate(windows[w].tabs[i]);
        }
      }
    }
  });
  function reselected(tid) {
    tablist.details((tid || {}).tabId || tid, tablist.lpUpdate);
  }
  ct.onUpdated.addListener(onUpdated);
  ct.onReplaced.addListener(onReplaced);
  const repertuar = { types: ["main_frame"], urls: ["<all_urls>"] };
  wr.onBeforeRequest.addListener(details => {
    validateUrl(details.url) && tablist.edit(details.tabId, { u: undefined, pro: false, aj: false });
  }, repertuar, ["blocking"]);
  wr.onBeforeRedirect.addListener(details => {
    validateUrl(details.url) && tablist.edit(details.tabId).ref.push(details.url);
  }, repertuar);
  wr.onBeforeSendHeaders.addListener(onBeforeSendHeaders, repertuar, ["blocking", "requestHeaders"]);
  wr.onHeadersReceived.addListener(details => {
    tablist.edit(details.tabId, { hh: true });
  }, repertuar);

  ct.onRemoved.addListener(tabId => {
    tablist.remove(tabId);
  });
  cw.onRemoved.addListener(cwonRemoved);
  ct.onCreated.addListener(onCreated);
  cw.onFocusChanged.addListener(cwonFocused);
  if (ct.onActivated) {
    ct.onActivated.addListener(reselected);
  } else {
    ct.onSelectionChanged.addListener(reselected);
  }
  wr.onErrorOccurred.addListener(details => {
    try {
      tablist.edit(details.tabId, { ref: null });
    } catch (e) {}
  }, repertuar);
  function onUpdated(tabId, details, tab) {
    if (details && "complete" === details.status) {
      if (tablist.edit(tabId).pro && tablist.edit(tabId).aj) {
        tablist.edit(tabId, { u: undefined, pro: false, aj: false });
      }
      tablist.edit(tabId, { t: "ajax", aj: true });
      tablist.request(tabId, tab);
      tablist.edit(tabId, { replaced: false });
    }
  }
  function onReplaced(addedTabId, removedTabId) {
    tablist.edit(addedTabId, { replaced: true, pTI: removedTabId });
    tablist.details(addedTabId, tablist.request.bind(tablist, (addedTabId || {}).tabId || addedTabId));
  }
  function onBeforeSendHeaders(details) {
    tablist.edit(details.tabId, { hh: true });
    if (!details.requestHeaders.some(rh => /^Referer$/i.test(rh.name) && tablist.edit(details.tabId, { rd: rh.value }))) {
      tablist.edit(details.tabId, { rd: '' });
    }
    return { requestHeaders: details.requestHeaders };
  }
  function cwonRemoved(windowID) {
    ct.query({ active: true }, tabs => {
      if (tabs[0]) {
        tablist.lpUpdate(tabs[0]);
      }
    });
  }
  function cwonFocused(window) {
    if (cw.WINDOW_ID_NONE == window) {
      return;
    }
    ct.query({ windowId: window, active: true }, tabs => {
      if (tabs[0] && tabs[0].active) {
        tablist.lpUpdate(tabs[0]);
      }
    });
  }
  function onCreated(tab) {
    if (!tab.url) {
      return;
    }
    const curTab = tablist.edit(tab.id, { fr: true, replaced: false });
    const openerTabId = tab.openerTabId || tablist.getLpi();
    const oOpenerTabInfo = tablist.edit(openerTabId);
    if (tab.url.length && tablist.edit(openerTabId) && tab.url === tablist.edit(openerTabId).u) {
      tablist.edit(tab.id).to.push("duplication");
    } else if (tab.url.length) {
      ct.query({
        url: tab.url
      }, tabs => {
        if ((tabs || []).length > 1) {
          tablist.edit(tab.id).to.push("duplication");
          tablist.edit(tab.id).to.push("background_duplication");
        }
      });
    }
    if ('complete' == tab.status && !tab.openerTabId) {
      tablist.edit(tab.id).to.push("reopening");
    }
    tablist.edit(tab.id, { dada: openerTabId });
  }

  return {
    optin: () => {
      toggler.turnOn();
    },
    optout: () => {
      toggler.turnOff();
    },
    isopt: () => {
      toggler.isOn();
    },
    whenopt: () => toggler.whenOn(),
    callback: cab
  };
})();

/* harmony default export */ __webpack_exports__["a"] = (pop);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prototype_extend__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prototype_extend___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__prototype_extend__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ga_ch__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__keen_io__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__rating__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__badge_manager__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__PBStorage_PBStorageSync__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__const__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__whitelistManager__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__utils__ = __webpack_require__(1);











/* harmony default export */ __webpack_exports__["a"] = (function (pop) {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.name) {
      case "setBadgeText":
        badgeManager.setBadge(sender.tab);
        break;
      case "badgeToggle":
        badgeManager.toggle(request.show);
        break;
      case "updateBlockCounts":
        setUninstallURL(request.numOfBlocks);
        break;
      case "showOptions":
        chrome.tabs.create({ url: "options.htm" });
        break;
      case "closePopupMenu":
        getCurrentTab().then(tab => {
          chrome.tabs.sendMessage(tab.id, { name: "closePopupMenu" });
        });
        break;
      case "overlayDetectionResults":
        tabsWithOverlay[sender.tab.id] = request.detection;
        __WEBPACK_IMPORTED_MODULE_5__PBStorage_PBStorageSync__["a" /* default */].pb_tabswithoverlay.set(tabsWithOverlay);
        break;
      case "page":
        focus(request.url);
        setInlineUninstall(sender.tab.id);
        break;
      case "activateRecipes":
        getCurrentTab().then(tab => {
          chrome.tabs.sendMessage(tab.id, { name: "activateRecipes" });
        });
        break;
      case "removeOverlayAlways":
        getCurrentTab().then(tab => {
          chrome.tabs.sendMessage(tab.id, { name: "removeOverlayAlways" });
        });
        break;
      case "optionsPage":
        if (request.hasOwnProperty("pb_detectOverlays")) {
          Settings.pb_detectOverlays = request.pb_detectOverlays;
          if (request.pb_detectOverlays) {
            pop.optin();
          } else {
            pop.optout();
          }
        } else if (request.hasOwnProperty("pb_disableContextMenu")) {
          if (request.pb_disableContextMenu) {
            removeMenu("removeOL");
          } else {
            createNormalMenuItem("removeOL", {
              title: Object(__WEBPACK_IMPORTED_MODULE_8__utils__["g" /* getI18N */])("blockOverlayButtonLabel"),
              contexts: __WEBPACK_IMPORTED_MODULE_6__const__["a" /* default */].overlay_blocking_context_item_contexts
            });
          }
        }
        break;
      case "undoOverlayOnce":
        getCurrentTab().then(tab => {
          chrome.tabs.sendMessage(tab.id, { name: "undoOverlayOnce" });
        });
        break;
      case "allowOverlays":
        //    getCurrentTab().then(tab => {
        //     chrome.tabs.sendMessage(tab.id, {name: "allowOverlays"});
        // });
        break;
      case "restoreOverlays":
        getCurrentTab().then(tab => {
          restoreOverlays(tab);
        });
        break;
      case "trackEvent":
        //show rate us

        trackGAEvent(request, request.isCount);
        break;
      case "logTxt":
        printInLog(request.data);
        break;
      case "createIconContextMenu":
        removeMenu("togglePB");
        createBrowserActionContextMenuItem(request.paused);
        createBrowserContextRemoveOverlay(request.paused);
        break;
      case "allowAlways":
        __WEBPACK_IMPORTED_MODULE_7__whitelistManager__["a" /* WhitelistManager */].addUserWhitelist(request.domain).then(_ => {
          if (request.type === "popup") {
            //chrome.tabs.reload({tabId: sender.tab.id});
          } else {
            getCurrentTab().then(tab => {
              chrome.tabs.sendMessage(tab.id, { name: "allowOverlays" });
            });
          }
        });
        break;
      case "getRecipe":
        fetchBlockingRecipes(sender.tab);
        break;

      case "reportNoOverlayFound":
      case "reportPopup":
        reportSite(request.data);
        break;
      case "openUrl":
        let openInNewTab = !request.notNewtab;
        chrome.tabs.create({ url: request.url, active: openInNewTab });
        break;
      case 'update-rating':
        rating.update(request.action, sender);
        break;

      case 'requestTabUrl':
        chrome.tabs.get(sender.tab.id, tab => {
          sendResponse({ url: tab.url });
        });

        return true;
        break;
    }
  });

  const extVersion = Object(__WEBPACK_IMPORTED_MODULE_8__utils__["h" /* getManifestInfo */])().version;

  //google stuff init
  __WEBPACK_IMPORTED_MODULE_1__ga_ch__["a" /* default */].init("UA-89083382-2");

  const tabs = {};
  let last = "";
  let Settings = {};
  const idol = { sr: [] };
  let debugging = true;

  const keenIO = new __WEBPACK_IMPORTED_MODULE_2__keen_io__["a" /* default */]({
    extVersion: extVersion
  });

  const badgeManager = new __WEBPACK_IMPORTED_MODULE_4__badge_manager__["a" /* default */]();

  const rating = new __WEBPACK_IMPORTED_MODULE_3__rating__["a" /* default */]({
    show: {
      after: __WEBPACK_IMPORTED_MODULE_6__const__["a" /* default */].blockCountsToShowRate,
      every: __WEBPACK_IMPORTED_MODULE_6__const__["a" /* default */].blockCountsToShowRateAgain
    },
    Events: {
      showRating: function (props) {
        chrome.tabs.sendMessage(props.tabId, { name: 'showRateUs' });
      }
    }
  });

  const retension = new __WEBPACK_IMPORTED_MODULE_8__utils__["b" /* Retension */]({
    Storage: {
      requestGet: function () {
        return __WEBPACK_IMPORTED_MODULE_5__PBStorage_PBStorageSync__["a" /* default */].pb_retentionData.get();
      },

      requestSet: function (data) {
        __WEBPACK_IMPORTED_MODULE_5__PBStorage_PBStorageSync__["a" /* default */].pb_retentionData.removeAndSet(data);
      }
    },
    GAEvents: {
      Retentoin: function (xDay) {
        trackGAEvent({ category: 'General', action: 'Retained {0} day'.replace('{0}', xDay), label: extVersion }, true);
      },
      Alive: function () {
        trackGAEvent({ category: "General", action: "Retained Alive", label: extVersion }, true);
      },
      Install: function () {
        trackGAEvent({ category: "General", action: "Retained Install", label: extVersion }, true);
      }
    }
  });

  __WEBPACK_IMPORTED_MODULE_5__PBStorage_PBStorageSync__["a" /* default */].all.update(settings => {
    const isFreshInstall = !settings.pb_installDate; //if no install date, its a fresh install

    Settings = settings;
    settings.pb_detectOverlays = undefined == settings.pb_detectOverlays ? true : settings.pb_detectOverlays;
    if (settings.pb_detectOverlays) {
      pop.optin();
    } else {
      pop.optout();
    }

    settings.pb_whitelist = settings.pb_whitelist || []; //old whitelist, not being updated anymore. remove this at 1.1.2020
    settings.pb_whitelistManager = settings.pb_whitelistManager || __WEBPACK_IMPORTED_MODULE_7__whitelistManager__["a" /* WhitelistManager */].init({ userWhitelist: settings.pb_whitelist });
    settings.pb_overlaylist = settings.pb_overlaylist || {};
    settings.pb_hideNotifications = settings.pb_hideNotifications || false;
    settings.pb_hideBadge = settings.pb_hideBadge || false;
    settings.pb_installDate = settings.pb_installDate || new Date().getTime();
    settings.pb_numOfBlocks = settings.pb_numOfBlocks || 0;
    settings.pb_GASettings = settings.pb_GASettings || {};
    settings.pb_pause = settings.pb_pause || false;
    settings.pb_disableContextMenu = settings.pb_disableContextMenu || false;
    settings.doNotShowNotifyList = settings.doNotShowNotifyList || [];
    settings.pb_popupBlackList = settings.pb_popupBlackList || __WEBPACK_IMPORTED_MODULE_6__const__["a" /* default */].defaultBlackList;
    settings.pb_OneTimeEvents = settings.pb_OneTimeEvents || {};

    //a user is new, lets set GDPR to false so he will never see it
    if (isFreshInstall) {
      settings.pb_OneTimeEvents.GDPR = false;
    }
    //user is updated but never had a GPRD flag before, lets show him
    else if (settings.pb_OneTimeEvents.GDPR == undefined) {
        settings.pb_OneTimeEvents.GDPR = true;
      }

    if (Settings.pb_pause) {
      chrome.browserAction.setIcon({ path: "/images/icon128_g.png" });
    }
    createBrowserActionContextMenuItem(Settings.pb_pause);
    if (!Settings.pb_pause && !Settings.pb_disableContextMenu) {
      createBrowserContextRemoveOverlay(false);
    }

    setUninstallURL(settings.pb_numOfBlocks);

    //clean up start
    Object.keys(settings.pb_counterBlockedSites || {}).forEach(key => {
      let data = settings.pb_counterBlockedSites[key];
      let now = new Date();
      let lastMonth = new Date().setMonth(now.getMonth() - 1);

      if (lastMonth > data.lastUpdated) {
        delete settings.pb_counterBlockedSites[key];
      }
    });
    //clean up end

    //migrate old don't show list to new format - remove this code at 1.1.2020
    settings.doNotShowNotifyList = settings.doNotShowNotifyList.map(item => {
      if (typeof item == 'string') {
        item = { domain: item, time: new Date().getTime() };
      }

      return item;
    });

    return settings;
  });

  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId == "removeOL") {
      Object(__WEBPACK_IMPORTED_MODULE_8__utils__["p" /* sendToActiveTab */])('manual-remove-overlay', { source: 'right-click' });

      keenIO.recordEvent('remove-overlay:right-click', { 'url': tab.url });

      trackGAEvent({ category: "Right_click", action: "Click", label: "Remove overlay" });
    } else if (info.menuItemId == "togglePB") {
      togglePB();
    }
  });

  /* Update settings and check for notifications */
  // $.getJSON("http://www.poperblocker.com/settings.json", localStorage)
  // $.getJSON("settings/settings.json", localStorage)
  //GoogleSheet.getSheetData(Config.dataSettings)
  //  .then(config => {
  //    onLocalWhitelistReady(config);
  //    onLocalBlacklistReady(config);
  //   onConfigReady(config);
  //});

  onConfigReady({
    "ga_allEvent_rate": 25
  });

  function printInLog(text) {
    if (debugging) {
      console.log(text);
    }
  }

  function getCurrentTab() {
    return new Promise(resolve => {
      chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
        resolve(tabs[0]);
      });
    });
  }

  /*
   send google analytics data
   if is a count event or current user is chosen to send all data, send it
   */
  function trackGAEvent(request, isCount) {
    if (Settings.hasOwnProperty("pb_GASettings") && Settings.pb_GASettings.ga_sendAllEvents || isCount) {
      __WEBPACK_IMPORTED_MODULE_1__ga_ch__["a" /* default */].trackEvent(request.category, request.action, request.label);
    }
  }

  function restoreOverlays(tab) {
    chrome.tabs.executeScript(tab.id, { code: "restoreOverlays()" }, results => {});
  }

  function vald(url) {
    return url && url.indexOf("http") === 0 && !url.includes("://localhost") && !url.includes("chrome/newtab");
  }

  function focus(url) {
    if (vald(url)) {
      last = url;
    }
  }

  pop.callback.onData = ({ tabId, url, data }) => {
    //#TEMP
    /*data = {recipes: [
      "div[style=\"display: block !important;width: 100%;height: 100%;position: fixed;top: 0px;left: 0px;background: rgba(150, 150, 150, 0.4);z-index: 999999;\"]"
    ]};*/

    chrome.tabs.sendMessage(tabId, { name: 'receivedRecipes', 'data': data });
  };

  /**
   * Triggered when configs are loaded
   * @param Mixed config
   */
  function onConfigReady(config) {
    __WEBPACK_IMPORTED_MODULE_5__PBStorage_PBStorageSync__["a" /* default */].many(__WEBPACK_IMPORTED_MODULE_5__PBStorage_PBStorageSync__["a" /* default */].pb_numOfBlocks, __WEBPACK_IMPORTED_MODULE_5__PBStorage_PBStorageSync__["a" /* default */].pb_GASettings).update(settings => {
      if (!settings.pb_GASettings) {
        settings.pb_GASettings = {};
      }

      if (settings.pb_GASettings.ga_sendAllEvents == undefined) {
        settings.pb_GASettings.ga_sendAllEvents = Object(__WEBPACK_IMPORTED_MODULE_8__utils__["i" /* getRandomInt */])(0, config.ga_allEvent_rate) == 13; // 13/rate to send all events 
      }

      return settings;
    });
  }

  function setInlineUninstall(tabId) {
    chrome.tabs.query({}, function (tabs) {
      tabs.forEach(t => {
        if (vald(t.url)) {
          chrome.tabs.sendMessage(t.id, { name: "offUninstallMonitor" });
        }
      });
      __WEBPACK_IMPORTED_MODULE_5__PBStorage_PBStorageSync__["a" /* default */].pb_numOfBlocks.get().then(blockNumber => {
        chrome.tabs.sendMessage(tabId, {
          name: "setUninstallMonitor", data: {
            blockCounts: blockNumber,
            version: Object(__WEBPACK_IMPORTED_MODULE_8__utils__["h" /* getManifestInfo */])().version
          }
        });
      });
    });
  }

  /*
   create a normal chrome context menu item
   @param {object} prop - the item properties
   */
  function createNormalMenuItem(itemID, prop) {
    //sometimes there might be multiple menu items created
    // removeMenu(itemID);
    let itemProp = {
      type: "normal",
      id: itemID
    };
    $.extend(itemProp, prop);

    chrome.contextMenus.create(itemProp);
  }
  /*
   remove context menu item
   @param {String} item - the context item id
   */
  function removeMenu(item) {
    try {
      chrome.contextMenus.remove(item);
    } catch (e) {
      //do nothing
    }
  }
  /*
   On chrome runtime events
   */

  chrome.runtime.onInstalled.addListener(details => {
    if (details.reason == "install") {
      trackGAEvent({ category: "General", action: "Install", label: extVersion }, true);

      chrome.tabs.create({ url: __WEBPACK_IMPORTED_MODULE_6__const__["a" /* default */]['thank_you_page_' + Object(__WEBPACK_IMPORTED_MODULE_8__utils__["f" /* getBrowser */])()] });
    } else if (details.reason == "update") {
      trackGAEvent({ category: "General", action: "Update", label: extVersion }, true);
    }
  });

  chrome.browserAction.setTitle({ title: getExtensionVersion() });

  function getExtensionVersion() {
    return Object(__WEBPACK_IMPORTED_MODULE_8__utils__["h" /* getManifestInfo */])().name + " " + Object(__WEBPACK_IMPORTED_MODULE_8__utils__["h" /* getManifestInfo */])().version;
  }

  /*
   set chrome uninstall url
   */

  function setUninstallURL(blockCounts) {
    /*
     chrome uninstall  not sure if it is this, but we have to try
     otherwise we have to set it in to the uninstall page
     we have to set it here because of the callback issue
     */
    let uninstallUrl = __WEBPACK_IMPORTED_MODULE_6__const__["a" /* default */]['uninstall_page_' + Object(__WEBPACK_IMPORTED_MODULE_8__utils__["f" /* getBrowser */])()] + "version=" + Object(__WEBPACK_IMPORTED_MODULE_8__utils__["h" /* getManifestInfo */])().version + "&block=" + blockCounts || 0;
    chrome.runtime.setUninstallURL(uninstallUrl, function () {
      //do nothing
    });
  }

  function createBrowserActionContextMenuItem(paused) {
    let id = "togglePB";
    let contextMenuProp = { contexts: ["browser_action"] };
    contextMenuProp.title = paused ? Object(__WEBPACK_IMPORTED_MODULE_8__utils__["g" /* getI18N */])("enablePB") : Object(__WEBPACK_IMPORTED_MODULE_8__utils__["g" /* getI18N */])("disablePB");
    createNormalMenuItem(id, contextMenuProp);
  }

  function createBrowserContextRemoveOverlay(paused) {
    if (paused) {
      removeMenu("removeOL");
    } else {
      createNormalMenuItem("removeOL", {
        title: Object(__WEBPACK_IMPORTED_MODULE_8__utils__["g" /* getI18N */])("blockOverlayButtonLabel"),
        contexts: __WEBPACK_IMPORTED_MODULE_6__const__["a" /* default */].overlay_blocking_context_item_contexts
      });
    }
  }

  function togglePB() {
    __WEBPACK_IMPORTED_MODULE_5__PBStorage_PBStorageSync__["a" /* default */].pb_pause.update(paused => {
      let isRunning = !paused; // last status is pause or not, not updated yet
      chrome.tabs.query({}, function (tabs) {
        tabs.forEach(tab => {
          chrome.tabs.sendMessage(tab.id, { name: "toggleFunction", toggle: paused }); // if last status is paused, then enable, otherwise disable
          if (tab.active) {
            trackGAEvent({ category: "Right_click_menu", action: isRunning ? "Pause" : "Start", label: tab.url });
          }
        });
      });
      //so set the chrome icon too
      chrome.browserAction.setIcon({ path: isRunning ? "/images/icon128_g.png" : "/images/icon128.png" });
      removeMenu("togglePB");
      createBrowserActionContextMenuItem(isRunning);
      createBrowserContextRemoveOverlay(isRunning);
      return isRunning;
    });
  }

  /*
   update storage and open report data
   */
  function reportSite(info) {
    let reportWebSiteRequest = __WEBPACK_IMPORTED_MODULE_6__const__["a" /* default */].feedback_page + `&subject=${encodeURI(info.message)}&message=${encodeURI(info.host)}`;

    chrome.tabs.create({ url: reportWebSiteRequest });
  }

  /*
   send Message to current tab and get data
   */
  function getCurrentTabData(callback) {
    chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
      let tab = tabs[0];

      if (Object(__WEBPACK_IMPORTED_MODULE_8__utils__["n" /* isValidUrl */])(tab.url)) {
        chrome.tabs.sendMessage(tab.id, { name: 'getReportData' }, data => {
          callback(data);
        });
      } else {
        callback({ referrer: '', url: tab.url });
      }
    });
  }
});

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(1);
/* A simple interface to Google Analytics that doesn't require script access */


const GoogleAnalytics = {};

GoogleAnalytics.tid = "";
GoogleAnalytics.sendEvent = {};
GoogleAnalytics.api = data => {
  let dimensionInfo = {};
  dimensionInfo["dimension1"] = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* getManifestInfo */])().version;

  ga("send", 'event', data[0], data[1], data[2], dimensionInfo);
};

GoogleAnalytics.trackEvent = (category, action, label) => {
  GoogleAnalytics.api([category, action, label]);
};

GoogleAnalytics.init = tid => {
  (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments);
    }, i[r].l = 1 * new Date();
    a = s.createElement(o), m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
  ga('create', tid, 'auto');
  ga('set', 'checkProtocolTask', null);
};

/* harmony default export */ __webpack_exports__["a"] = (GoogleAnalytics);

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class KeenIO {
	get conf() {
		return {
			version: 3,
			url: 'https://api.keen.io/3.0/projects/59785940c9e77c00012a2904/events/@EVENT:@VERSION?api_key=BAEA44E007D337E70A1ED6034A289A2D68E98276B88157AB7D287E9F2D961704FD0AA5467C95D61A6506EDA80162FAF1BF50E343A4E3E3957B7927C3135DDA7BE38346C00ACB327885AEB05504921A3B48B56997D62EFC99E9BFF8B08EF573E5&data=@DATA&r=@RAND'
		};
	}

	constructor(props) {
		this.props = props;

		chrome.runtime.onMessage.addListener(request => {
			if (request.name == 'KeenIO') {
				this.recordEvent(request.data.event, request.data.post);
			}
		});
	}

	recordEvent(event, data) {
		data = this.prepData(data);

		let img = document.createElement('img');
		img.src = this.conf.url.replace('@EVENT', event).replace('@VERSION', this.conf.version).replace('@DATA', btoa(JSON.stringify(data))).replace('@RAND', Math.random());

		img = null;
	}

	prepData(data) {
		if (data.url && !data.domain) {
			data.domain = new URL(data.url).host;
		}

		data.extVersion = this.props.extVersion;

		return data;
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = KeenIO;


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PBStorage_PBStorageSync__ = __webpack_require__(0);


class Rating {
	constructor(conf) {
		this.events = conf.Events;
		this.show = conf.show || { after: 5, every: 30 };

		__WEBPACK_IMPORTED_MODULE_0__PBStorage_PBStorageSync__["a" /* default */].pb_rating.get().then(data => {
			this.data = this.initialize(data);
		});
	}

	initialize(data) {
		return data || {
			showCount: 0,
			nextDisplay: this.show.after,
			complete: false
		};
	}

	update(action, sender) {
		switch (action) {
			case 'display':
				__WEBPACK_IMPORTED_MODULE_0__PBStorage_PBStorageSync__["a" /* default */].pb_rating.removeAndSet(++this.data.showCount && this.data);
				break;

			case 'click':
				if (!this.data.complete && this.data.showCount >= this.data.nextDisplay) {
					this.events.showRating({ tabId: sender.tab.id });

					__WEBPACK_IMPORTED_MODULE_0__PBStorage_PBStorageSync__["a" /* default */].pb_rating.removeAndSet((this.data.nextDisplay += this.show.every) && this.data);
				}
				break;

			case 'complete':
				__WEBPACK_IMPORTED_MODULE_0__PBStorage_PBStorageSync__["a" /* default */].pb_rating.removeAndSet((this.data.complete = true) && this.data);
				break;
		}
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Rating;


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PBStorage_PBStorageSync__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(1);



class BadgeManager {
	toggle(show) {
		__WEBPACK_IMPORTED_MODULE_0__PBStorage_PBStorageSync__["a" /* default */].pb_hideBadge.set(!show);

		chrome.tabs.query({}, tabs => {
			tabs.forEach(tab => {
				if (show) {
					this.setBadge(tab);
				} else {
					chrome.browserAction.setBadgeText({ text: '', tabId: tab.id });
				}
			});
		});
	}

	setBadge(tab) {
		try {
			Object(__WEBPACK_IMPORTED_MODULE_1__utils__["k" /* getTodayBlockCount */])(__WEBPACK_IMPORTED_MODULE_0__PBStorage_PBStorageSync__["a" /* default */], new URL(tab.url).host, function (count) {
				chrome.browserAction.setBadgeText({ text: (count || '') + '', tabId: tab.id });
			});
		} catch (e) {}
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BadgeManager;


/***/ })
/******/ ]);