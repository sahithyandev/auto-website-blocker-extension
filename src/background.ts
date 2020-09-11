
// Imports
import { NotificationOptions, webRequestArg } from './types/types';
import { MenuID } from './consts';
import { extractURL } from './utils';

var storageObj = {
  "permanent-website-block": []
}

// Functions needed
function notify(options: NotificationOptions) {
  browser.notifications.create(options.id, {
    type: options.type || 'basic',
    title: options.title,
    message: options.message,
  })
}

function cancelRequest(details: webRequestArg) {
  console.log('blocking', details.url);
  notify({
    id: 'info',
    type: 'basic',
    title: 'Request blocked by Auto Website Blocker',
    message: `A web request to ${details.url} has been canceled by the Auto Website Blocker extension`
  })

  return { cancel: true };
}

/**
 * Checks whether a request should be cancelled or not
 */
function checkRequest(details: webRequestArg) {
  console.log({
    x: storageObj["permanent-website-block"],
    s: extractURL(details.url)
  })
  if (storageObj["permanent-website-block"].includes(extractURL(details.url))) {
    return cancelRequest(details);
  }
}

/**
 * Adds a specific URL to the list of "Permanently Blocked Websites"
 * @param url URL
 */
function addToBlockedWebsites(url: string) {
  const key = "permanent-website-block"
  storageObj[key].push(url)
  console.log(storageObj);

  browser.storage.local.set({
    [key]: storageObj[key]
  })
}

/**
 * @todo Develop this function
 * @param url URL to remove
 */
function removeFromBlockedWebsites(url: string) {
}

browser.menus.create({
  id: MenuID.PermanentWebsiteBlock,
  title: "Block this website",
  contexts: ["all"],
  type: 'radio'
})

// Listeners

browser.menus.onClicked.addListener((info, tab) => {
  console.log(info, tab);
  if (info.menuItemId == MenuID.PermanentWebsiteBlock) {
    let url = extractURL(info.pageUrl);
    addToBlockedWebsites(url);
    
    // if (storageManager.isInArray(key, url)) {
    //   storageManager.removeFromArray(key, url);
    // }
    // storageManager.addToArray(key, url);
  }
})

/** @todo Listen to websites that are blocked only */
browser.webRequest.onBeforeRequest.addListener(checkRequest, {
    urls: ["<all_urls>"]
}, ['blocking'])

browser.runtime.onInstalled.addListener(() => {
  console.log('onInstalled event');
  browser.storage.local.get(MenuID.PermanentWebsiteBlock).then((value) => {
    console.log(value);
    if (Object.keys(value).length == 0) {
      storageObj["permanent-website-block"] = [];
    } else {
      storageObj["permanent-website-block"] = value["permanent-website-block"] as string[];
    }
    console.log(storageObj);
  })
})

console.log('loadied');