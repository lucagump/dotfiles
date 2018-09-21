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
/******/ 	return __webpack_require__(__webpack_require__.s = 27);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
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

/***/ 2:
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

/***/ 27:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PBStorage_PBStorageSync__ = __webpack_require__(0);
/**
 * Created by yrst on 11/29/2016.
 *
 * this file injects in to our feedback page to send message
 */


/*
 user come to this page from our menu (report button)
 set the message with the url rather than only host
 SMLR-1479
 */
if (window.location.search.indexOf("from=ext") !== -1) {
  sendGoogleAnalytics("Shown");

  __WEBPACK_IMPORTED_MODULE_0__PBStorage_PBStorageSync__["a" /* default */].pb_reportData.get().then(reportData => {
    $("#form_message").val(reportData.siteWhenReport);
    $("#form_prevURL").val(reportData.lastVisit);
    $("#form_lastClosedURL").val(reportData.lastClosedURL);

    $("button[type='submit']").click(function () {
      sendGoogleAnalytics("Send", reportData.siteWhenReport);
    });
  });
}

function sendGoogleAnalytics(action, label) {
  chrome.runtime.sendMessage({ name: "trackEvent", category: "Report_page", action: action, label: label });
}

/***/ }),

/***/ 3:
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

/***/ 5:
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

/***/ 6:
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

/***/ })

/******/ });