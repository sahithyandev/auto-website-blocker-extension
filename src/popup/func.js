/**
 * Remove a specified value from an array
 * @param {Array} arr Base array
 * @param {any} value Value to remove from the array
 */
function removeFromArr(arr, value) {
    let newArr = [];
    arr.forEach(v => {
        if (v != value) newArr.push(v);
    })

    return newArr;
}

/**
 * @param {string} absolutePath Path to extract URL
 */
const extractURL = (absolutePath) => {
    if (absolutePath == '') return '';

    let url = new URL(absolutePath);
    
    return `*://*.${extractHostname(url.host).join('.')}/*`
}

/**
 * Extracts the absolute hostname of a URL.hostname property
 * @param {string} hostname hostname to extract
 */
const extractHostname = (hostname) => {
    let parts = hostname.split('.');
    return parts.slice(parts.length - 2, parts.length);
}