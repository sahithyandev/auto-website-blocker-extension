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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var consts_1 = __webpack_require__(1);
var utils_1 = __webpack_require__(2);
var storageObj = {
    "permanent-website-block": []
};
// Functions needed
function notify(options) {
    browser.notifications.create(options.id, {
        type: options.type || 'basic',
        title: options.title,
        message: options.message,
    });
}
function cancelRequest(details) {
    console.log('blocking', details.url);
    notify({
        id: 'info',
        type: 'basic',
        title: 'Request blocked by Auto Website Blocker',
        message: "A web request to " + details.url + " has been canceled by the Auto Website Blocker extension"
    });
    return { cancel: true };
}
/**
 * Checks whether a request should be cancelled or not
 */
function checkRequest(details) {
    console.log({
        x: storageObj["permanent-website-block"],
        s: utils_1.extractURL(details.url)
    });
    if (storageObj["permanent-website-block"].includes(utils_1.extractURL(details.url))) {
        return cancelRequest(details);
    }
}
/**
 * Adds a specific URL to the list of "Permanently Blocked Websites"
 * @param url URL
 */
function addToBlockedWebsites(url) {
    var _a;
    var key = "permanent-website-block";
    storageObj[key].push(url);
    console.log(storageObj);
    browser.storage.local.set((_a = {},
        _a[key] = storageObj[key],
        _a));
}
/**
 * Removes a URL from the list of "Permanently Blocked Websites"
 * @param url URL to remove
 */
function removeFromBlockedWebsites(url) {
    if (url == undefined)
        return 'URL undefined';
    var key = "permanent-website-block";
    var newArr = [];
    for (var _i = 0, _a = storageObj[key]; _i < _a.length; _i++) {
        var blockedURL = _a[_i];
        if (blockedURL != url)
            newArr.push(blockedURL);
    }
    storageObj[key] = newArr;
    console.log('after delete', storageObj);
}
browser.menus.create({
    id: consts_1.MenuID.PermanentWebsiteBlock,
    title: "Block this website",
    contexts: ["all"],
    type: 'radio'
});
// Listeners
browser.menus.onClicked.addListener(function (info, tab) {
    console.log(info, tab);
    if (info.menuItemId == consts_1.MenuID.PermanentWebsiteBlock) {
        var url = utils_1.extractURL(info.pageUrl);
        addToBlockedWebsites(url);
        // if (storageManager.isInArray(key, url)) {
        //   storageManager.removeFromArray(key, url);
        // }
        // storageManager.addToArray(key, url);
    }
});
/** @todo Listen to websites that are blocked only */
browser.webRequest.onBeforeRequest.addListener(checkRequest, {
    urls: ["<all_urls>"]
}, ['blocking']);
browser.runtime.onInstalled.addListener(function () {
    var _a;
    console.log('onInstalled event');
    // for testing
    browser.storage.local.set((_a = {}, _a[consts_1.MenuID.PermanentWebsiteBlock] = ["*://*.facebook.com/*", "*://*.youtube.com/*"], _a));
    browser.storage.local.get(consts_1.MenuID.PermanentWebsiteBlock).then(function (value) {
        console.log(value);
        if (Object.keys(value).length == 0) {
            storageObj["permanent-website-block"] = [];
        }
        else {
            storageObj["permanent-website-block"] = value["permanent-website-block"];
        }
        console.log(storageObj);
    });
});
console.log('loadied');


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuID = void 0;
exports.MenuID = {
    PermanentWebsiteBlock: "permanent-website-block"
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.extractURL = void 0;
/**
 * Extract the absolute URL path to a general one
 * @param absolutePath The URL path to extract
 */
exports.extractURL = function (absolutePath) {
    if (absolutePath == '')
        return '';
    var url = new URL(absolutePath);
    return "*://*." + extractHostname(url.host).join('.') + "/*";
};
/**
 * Extracts the absolute hostname of a URL.hostname property
 * @param hostname hostname to extract
 */
var extractHostname = function (hostname) {
    var parts = hostname.split('.');
    return parts.slice(parts.length - 2, parts.length);
};


/***/ })
/******/ ]);