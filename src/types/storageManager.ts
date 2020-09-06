import { BlockedItem } from "./blockedItem";

/**
 * @important Not ready for use
*/
export class StorageManager {
    permanentBlockedWebsites: BlockedItem[] = [];

    constructor() {
        browser.storage.local.get().then(result => {
            if (Object.keys(result).length != 0) {
                this.permanentBlockedWebsites = result.permanentBlockedWebsites as unknown as BlockedItem[];
            }
        }).then(() => {console.log(this.permanentBlockedWebsites)})
    }

    /**
     * 
     * @param key Key of the array
     * @param value value to add into the array
     */
    addToArray(key: string, value: any) {
        /** @important @todo Change this variable name */        
        let x = this[key];
        if (x && x instanceof Array) {
            x.push(value);
            browser.storage.local.set({
                [key]: this[key]
            })
        }
    }
}