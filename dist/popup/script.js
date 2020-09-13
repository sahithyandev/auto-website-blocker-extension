let container = document.getElementById('permanent-blocked-websites-container');

browser.storage.local.get().then(s => {
    console.log('from popuip', s);
    container.innerHTML = s["permanent-website-block"].map(c => {
        return `<span>${c}</span>`
    }).join('<br/>');
})
console.log('hiii');