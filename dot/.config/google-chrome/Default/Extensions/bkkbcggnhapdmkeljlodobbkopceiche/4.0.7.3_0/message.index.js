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
/******/ 	return __webpack_require__(__webpack_require__.s = 28);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
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

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__const__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__content_message__ = __webpack_require__(29);




($ => {
  let decodeData = decodeURIComponent(atob(location.search.substr(1)));
  let data = JSON.parse(decodeData);

  $(() => {
    showNotification(data);
  });

  function showNotification(data) {
    let message = new __WEBPACK_IMPORTED_MODULE_2__content_message__["a" /* Message */]({
      config: __WEBPACK_IMPORTED_MODULE_0__const__["a" /* default */],
      id: data.id,
      title: data.title,
      subTitle: data.subTitle,
      icon: data.icon,
      showHide: data.showHide,
      showResize: data.showResize,
      source: data.source,
      size: data.size,
      buttons: data.buttons.map(id => {
        return {
          id: id,
          label: Object(__WEBPACK_IMPORTED_MODULE_1__utils__["g" /* getI18N */])(id),
          labelMin: Object(__WEBPACK_IMPORTED_MODULE_1__utils__["g" /* getI18N */])(id + '_min', id)
        };
      }),
      props: data.props
    });

    message.on('copyAppStoreLink', () => {
      Object(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* copyTextToClipboard */])(__WEBPACK_IMPORTED_MODULE_0__const__["a" /* default */]['appStore_' + Object(__WEBPACK_IMPORTED_MODULE_1__utils__["f" /* getBrowser */])()]);
    });
  }
})(jQuery);

/***/ }),

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(1);


class Message {
  constructor(options) {
    this.template = $('#message-template').html();
    this.message = this.render({ options });

    return $(this);
  }

  render({ options }) {
    const message = $(this.template).addClass(`${options.size}`).appendTo('body');

    if (options.icon) {
      message.find('.message-icon').html('<img src="' + options.icon + '">').removeClass('hidden');
    }

    if (options.title) {
      message.find('.message-title').html(options.title).removeClass('hidden');
    }

    if (options.subTitle) {
      message.find('.message-subtitle').html(options.subTitle).removeClass('hidden');
    }

    if (options.showHide) {
      message.find('.message-hide').removeClass('hidden');
    }

    if (options.showResize) {
      message.find('.message-resize').removeClass('hidden');
    }

    if (options.buttons.length) {
      let buttons = message.find('.message-buttons').removeClass('hidden');

      options.buttons.forEach(button => {
        let btn = $(`<div data-id="${button.id}" data-label="${button.label}" data-label-min="${button.labelMin}"></div>`);

        btn.on('click', e => {
          let id = $(e.target).data('id');

          parent.postMessage({ action: 'pb-message-btn-click', id: id, source: options.source, toastId: options.id }, '*');

          this.prevntBrowserBlock({ id: button.id, options });
        });

        btn.addClass('tooltip').data('tooltip', button.id + '_TT').data('tooltip-delay', 1500);

        buttons.append(btn);
      });
    }

    if (options.props.showStars) {
      let stars = message.find('.message-stars').removeClass('hidden');
      let hint = message.find('.stars-hint');

      message.addClass('rating');

      stars.on('mouseenter', 'span', e => {
        let msg = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["g" /* getI18N */])('NTF_Stars_' + $(e.target).data('score'));

        hint.html(msg);
      });

      stars.on('mouseleave', 'span', e => {
        hint.html('');
      });

      stars.on('click', 'span', e => {
        let score = $(e.target).data('score');

        parent.postMessage({ action: 'pb-message-rating', score: score, source: options.source, toastId: options.id }, '*');
      });
    }

    if (options.props.showShare) {
      let share = message.find('.message-share').removeClass('hidden');

      message.addClass('share');

      share.on('click', 'span', e => {
        let media = $(e.target).data('media');
        let position = e.target.getBoundingClientRect();

        //due to security reasons copy link must be inside the iframe
        if (media == 'link') {
          $(this).trigger('copyAppStoreLink');
        } else {
          this.prevntBrowserBlock(media);
        }

        parent.postMessage({ action: 'pb-message-share', media: media, position: { left: position.left, top: position.top }, toastId: options.id }, '*');
      });
    }

    this.initEvents({ message, options });
    this.initButtons({ message, options });
    this.initTooltips({ message, options });

    parent.postMessage({ action: 'pb-message-display', source: options.source, toastId: options.id }, '*');

    return message;
  }

  initEvents({ message, options }) {
    message.on('click', 'div[data-id]', e => {
      parent.postMessage({ action: 'pb-message-close', triggerEvent: false, quickClose: true, toastId: options.id }, '*');
    });

    message.on('click', '.message-close', () => {
      parent.postMessage({ action: 'pb-message-close', triggerEvent: true, source: options.source, toastId: options.id }, '*');
    });

    message.on('click', '.message-resize', () => {
      options.size = options.size == 'maximized' ? 'minimized' : 'maximized';

      message.toggleClass('maximized minimized');

      this.initButtons({ message, options });
      parent.postMessage({ action: 'message-resize', resize: options.size, toastId: options.id }, '*');
    });

    message.on('click', '.message-hide', () => {
      parent.postMessage({ action: 'message-hide', toastId: options.id }, '*');
    });
  }

  initButtons({ message, options }) {
    message.find('.message-buttons > div').each((i, btn) => {
      btn = $(btn);

      btn.html(btn.data(options.size == 'maximized' ? 'label' : 'labelMin'));
    });
  }

  initTooltips({ message, options }) {
    message.find('.tooltip').each((i, btn) => {
      btn = $(btn);
      let tooltip = btn.data('tooltip');
      let tooltipDelay = btn.data('tooltip-delay') * 1;
      let hoverTimeout;

      btn.on('mouseover', e => {
        hoverTimeout = setTimeout(() => {
          let position = e.target.getBoundingClientRect();
          let xCenter = position.left + e.target.offsetWidth / 2;
          let yCenter = position.bottom;

          parent.postMessage({ action: 'pb-message-tooltip-over', position: { xCenter, yCenter }, id: tooltip, toastId: options.id }, '*');
        }, tooltipDelay);
      }).on('mouseleave', () => {
        clearTimeout(hoverTimeout);

        parent.postMessage({ action: 'pb-message-tooltip-out', toastId: options.id }, '*');
      });
    });
  }

  prevntBrowserBlock({ id, options }) {
    let args = [];

    switch (id) {
      case 'allowOnce':
      case 'allowAlways':
        args = options.props.winArgs;
        break;

      case 'twitter':
        args = [options.config.twitter_share_link, 'poper_share', 'width=730,height=260,top=150,left=' + (screen.availWidth / 2 - 365)];
        break;

      case 'facebook':
        args = [options.config.facebook_share_link, 'poper_share', 'width=730,height=360,top=150,left=' + (screen.availWidth / 2 - 365)];
        break;

      default:
        return;
        break;
    }

    //if url doesn't have http in the beginning we need to add
    if (!/^https?\:/.test(args[0]) && !/^about:blank/i.test(args[0])) {
      //url can start with //site.com or just site.com
      args[0] = 'http:' + (/^\/\//.test(args[0]) ? '' : '//') + args[0];
    }

    //in firefox you can't open a new tab directly with external url (don't know why, seems like FF bug)
    //so we need to open a local html url and do a redirect
    if (/firefox/i.test(navigator.userAgent)) {
      args[0] = 'firefox/ff-open.html?u=' + encodeURIComponent(args[0]);
    }

    window.open(args[0] || '', args[1] || '', args[2] || '');
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Message;


/***/ }),

/***/ 4:
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

/***/ })

/******/ });