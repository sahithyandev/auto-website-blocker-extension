import { BlockedItem } from "./blockedItem";
import { StorageObj } from "./storageObj";
import { MenuID } from "../consts";

/**
 * @important Not ready for use
*/
export class StorageManager {
    storageObj: StorageObj = {
        [MenuID.PermanentWebsiteBlock]: []
    }

    constructor() {
        throw "NOOOO. You can't use StorageManager now";
        browser.storage.local.get().then(result => {
            if (Object.keys(result).length != 0) {
                this.storageObj.permanentBlockedWebsites = result.permanentBlockedWebsites as unknown as BlockedItem[];
            }
        }).then(() => {console.log(this.storageObj.permanentBlockedWebsites)})
    }

    /**
     * 
     * @param key Key of the array
     * @param value value to add into the array
     */
    addToArray(key: string, value: any) {
        console.log('aaaa', this, key);
        /** @important @todo Change this variable name */        
        let x = this.storageObj[key];
        if (x && x instanceof Array) {
            x.push(value);
            browser.storage.local.set({
                [key]: this.storageObj[key]
            })
        }
        console.log(this.storageObj.permanentBlockedWebsites, x);
    }
}