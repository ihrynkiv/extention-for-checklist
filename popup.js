const BASE_URL = 'http://localhost:3000/checklist'

const getCurrentTabData = (tabs) => {
    const url = tabs[0].url
    const arr = tabs[0].title.split(' ')
    const author = arr[arr.length - 7]
    const [repo] = arr[arr.length - 1].split('/').slice(-1)
    const name = arr.slice(0, -8).join(' ')

    return {url, author, repo, name}
}

chrome.tabs.query({}, function(tabs) {
    const foundTab = tabs.find(tab => {
        let domain = (new URL(tab.url));
        return BASE_URL.includes(domain.origin)
    })

    if (foundTab) {
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
            const {url, author, name, repo} = getCurrentTabData(tabs)
            chrome.tabs.update(foundTab.id, {highlighted: true, url: `${BASE_URL}?url=${url}&name=${name}&author=${author}&repo=${repo}`});
        });
    } else {
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
            const {url, author, name, repo} = getCurrentTabData(tabs)
            chrome.tabs.create({url: `${BASE_URL}?url=${url}&name=${name}&author=${author}&repo=${repo}`});
        });
    }
} );