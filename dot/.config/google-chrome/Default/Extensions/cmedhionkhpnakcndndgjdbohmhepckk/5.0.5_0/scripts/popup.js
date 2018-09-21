
domReady(() => {
  translateHTML()
  bindCheckboxes()
})

function domReady (callback) {
  if (document.readyState === 'complete') {
    callback()
  } else {
    window.addEventListener('load', callback, false);
  }
}

function translateHTML (dataKey = 'message') {
  const $elements = document.getElementsByTagName('*')
  for (let i = 0; i < $elements.length; i++) {
    if ($elements[i].dataset && $elements[i].dataset[dataKey]) {
      $elements[i].innerHTML = chrome.i18n.getMessage($elements[i].dataset[dataKey])
    }
  }
}

function bindCheckboxes() {
  const settings = Array.from(document.querySelectorAll('.setting'))
  settings.forEach($setting => {
    const $input = $setting.querySelector('input')
    $input.checked = localStorage[$input.name] === 'true'
    $setting.addEventListener('mousedown', function(event) {
      localStorage[$input.name] = !$input.checked
    })
  })
}
