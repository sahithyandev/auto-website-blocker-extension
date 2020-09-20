/**
 * @param {String} id ID of the element to select
 */
const $ = id => document.getElementById(id);

const CONSTS = {
    container: $('permanent-blocked-websites-container'),
    blockedWebsiteTemplate: $('blocked-website-template')
}

// string[]
let blockedWebsites = []

browser.tabs.query({ active: true }).then(tabs => {
    document.getElementById("current-website-url").innerHTML = extractURL(tabs[0].url);
})

document.getElementById("block-current-website-button").addEventListener('click', event => {
    console.log('ev', event);
    let websiteURL = document.getElementById("current-website-url").innerHTML;
    console.log(websiteURL);
    blockWebsite(websiteURL);
})

/**
 * Creates "A blocked website" block and adds it to the UI
 * @param {String} blockedWebsite 
 */
function createBlockedWebsite(blockedWebsite) {
    let clone = CONSTS.blockedWebsiteTemplate.content.cloneNode(true).childNodes[1];
    clone.querySelector(".website-url").innerHTML = blockedWebsite;
    let deleteBtn = clone.querySelector(".delete-button");

    /** @important @todo Develop this delete functionality */
    deleteBtn.addEventListener('click', event => {
        console.log('pressed', event);
        unblockWebsite(document.querySelector(".website-url").innerHTML);
    })

    return clone;
}

/**
 * @param {String} url URL of website to unblock
 */
function unblockWebsite(url) {
    blockedWebsites = removeFromArr(blockedWebsites, url);
    browser.storage.local.set({
        "permanent-website-block": blockedWebsites
    })
}

/**
 * @param {String} url URL of website to block
 */
function blockWebsite(url) {
    blockedWebsites.push(url);

    browser.storage.local.set({
        "permanent-website-block": Array.from(new Set(blockedWebsites))
    })
    console.log(blockedWebsites);
}

browser.storage.local.get().then(s => {
    console.log('from popuip', s);
    if (s != undefined && Object.keys(s).length > 0) {
        blockedWebsites = s["permanent-website-block"];
        CONSTS.container.append(...blockedWebsites.map(createBlockedWebsite));
    } else if (Object.keys(s).length == 0) {
        CONSTS.container.innerHTML = 'No domains/hosts are blocked yet.'
    }
})

console.log('hiii');