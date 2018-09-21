
// Notify background so it can inject cosmetic filter
chrome.runtime.sendMessage({
  action: 'PAGE_READY'
})
