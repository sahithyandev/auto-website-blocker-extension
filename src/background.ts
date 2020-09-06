
// Imports
import * as dayjs from 'dayjs';
import { NotificationOptions, webRequestArg } from './types/types';
import { MenuID } from './consts';
import { StorageManager } from './types/storageManager';

const storageManager = new StorageManager();
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
    let key = info.menuItemId as string;
    let url = info.pageUrl;
    // browser.storage.local.get(key).then(results=>{
    //   let newArr = results[key] as string[] || []
    //   newArr.push(url)
    //   browser.storage.local.set({
    //     [key]: newArr
    //   })
    // })
    storageManager.addToArray(key, url);
  }
})

browser.storage.onChanged.addListener((changes,area) => {
  console.log(changes, area);
})

browser.webRequest.onBeforeRequest.addListener(cancelRequest, {
    // urls: ["<all_urls>"]
    urls: ["*://*.facebook.com/*"]
}, ['blocking'])

console.log('loadied');