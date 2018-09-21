const YOUTUBE_REGEX = /^https?:\/\/(\w*.)?youtube.com/i
const YOUTUBE_AD_REGEX = /(doubleclick\.net)|(adservice\.google\.)|(youtube\.com\/api\/stats\/ads)|(&ad_type=)|(&adurl=)|(-pagead-id.)|(doubleclick\.com)|(\/ad_status.)|(\/api\/ads\/)|(\/googleads)|(\/pagead\/gen_)|(\/pagead\/lvz?)|(\/pubads.)|(\/pubads_)|(\/securepubads)|(=adunit&)|(googlesyndication\.com)|(innovid\.com)|(tubemogul\.com)|(youtube\.com\/pagead\/)|(google\.com\/pagead\/)/
const YOUTUBE_ANNOTATIONS_REGEX = /^https?:\/\/(\w*.)?youtube\.com\/annotations_invideo\?/
const tabTracker = new Set()
const log = () => {}

log('%cINIT EXTENSION', 'color: green;')

const settings = {
  ads: localStorage.ads === 'true',
  annotations: localStorage.ads === 'true'
}

// Sync setting changes from other conext parts of the extension
window.addEventListener('storage', ({ key, newValue }) => {
  if (['ads', 'annotations'].includes(key)) {
    log('%cAPPLY SETTING', 'color: green;', `settings.${key}=${newValue}`)
    settings[key] = newValue === 'true'
  }
})

// Find Youtube Tabs and add them to the tabTracker
chrome.webRequest.onBeforeRequest.addListener(({ tabId, url }) => {
  if (YOUTUBE_REGEX.test(url)) {
    tabTracker.add(tabId)
  } else {
    tabTracker.delete(tabId)
  }
}, {
    urls: [ 'http://*/*', 'https://*/*' ],
    types: [ 'main_frame' ]
  }
)

// Add cosmetic filters to all youtube tabs
chrome.runtime.onMessage.addListener(({ action }, { tab }, sendResponse) => {
  if (action === 'PAGE_READY') {
    log('%cINJECT_COSMETIC_FILTER', 'color: green;')
    if(settings.ads && tabTracker.has(tab.id)) {
      chrome.tabs.insertCSS({
        file: 'styles/ad-hiding-filters.css',
        runAt: 'document_start'
      })
    }
  }
});

// Block ad/annotation request inside youtube tabs
chrome.webRequest.onBeforeRequest.addListener(({ tabId, url }) => {
  // Check if youtube tab
  if (!tabTracker.has(tabId)) {
    return
  }

  if (settings.ads && YOUTUBE_AD_REGEX.test(url)) {
    log('%cBLOCK AD', 'color: red;', url)
    return { cancel: true }
  }

  if (settings.annotations && YOUTUBE_ANNOTATIONS_REGEX.test(url)) {
    log('%cBLOCK ANNOTATION', 'color: red;', url)
    return { cancel: true }
  }

  log('%cALLOW', 'color: green;', url)
}, {
    urls: ['http://*/*', 'https://*/*'],
    types: [
      'script',
      'image',
      'xmlhttprequest',
      'sub_frame'
    ]
  }, ['blocking']
)

chrome.runtime.onInstalled.addListener(({ reason }, previousVersion) => {
  if (reason === 'install') {
    // Initially set settings
    localStorage.ads = settings.ads = true
    localStorage.annotations = settings.annotations = false
  }

  if (reason == 'update') {
    // Migrate old settings
    if (localStorage.adblockEnabled) {
      try {
        localStorage.ads = settings.ads = JSON.parse(localStorage.adblockEnabled).data
        localStorage.annotations = settings.annotations = JSON.parse(localStorage.annotationsBlockEnabled).data
        delete localStorage.adblockEnabled
        delete localStorage.annotationsBlockEnabled
        delete localStorage.autoUpdate
      } catch (error) {}
    }
  }
})
