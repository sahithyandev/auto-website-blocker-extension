/**
 * @param {String} id 
 */
const $ = id => document.getElementById(id);

const CONSTS = {
    container: $('permanent-blocked-websites-container'),
    blockedWebsiteTemplate: $('blocked-website-template')
}

/**
 * creates "A blocked website" block and adds it to the UI
 * @param {String} blockedWebsite 
 */
function createBlockedWebsite(blockedWebsite) {
    let clone = CONSTS.blockedWebsiteTemplate.content.cloneNode(true).childNodes[1];
    clone.querySelector(".website-url").innerHTML = blockedWebsite;
    let deleteBtn = clone.querySelector(".delete-button");

    /** @todo Develop this delete functionality */
    deleteBtn.addEventListener('click', event => {
        console.log('pressed', event);
    })

    return clone;
}

browser.storage.local.get().then(s => {
    console.log('from popuip', s);
    if (s != undefined && Object.keys(s).length > 0) {
        CONSTS.container.append(...s["permanent-website-block"].map(createBlockedWebsite));
    }
})
console.log('hiii');