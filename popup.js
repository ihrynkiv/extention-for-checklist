chrome.tabs.query({}, function(tabs) {
    const foundTab = tabs.find(tab => {
        let domain = (new URL(tab.url));
        return domain.origin.includes('localhost:3000')
    })

    const origin = new URL(foundTab.url).origin
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
        const url = tabs[0].url
        const arr = tabs[0].title.split(' ')
        const author = arr[arr.length - 7]
        const [repo] = arr[arr.length - 1].split('/').slice(-1)
        const name = arr.slice(0, -8).join(' ')

        chrome.tabs.update(foundTab.id, {highlighted: true, url: `${origin}?url=${url}&name=${name}&author=${author}&repo=${repo}`});
    });
} );