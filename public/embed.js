(function(){
  var els = document.querySelectorAll('[data-lux-widget]');
  for (var i = 0; i < els.length; i++) {
    var el = els[i];
    var widget = el.getAttribute('data-lux-widget');
    var key = el.getAttribute('data-api-key') || '';
    var symbol = el.getAttribute('data-symbol') || '';
    var theme = el.getAttribute('data-theme') || 'dark';
    var base = el.getAttribute('data-base-url') || 'https://markets.lux.network';
    var iframe = document.createElement('iframe');
    iframe.src = base + '/embed/' + widget + '?key=' + key + '&symbol=' + symbol + '&theme=' + theme;
    iframe.style.cssText = 'border:none;width:100%;height:100%';
    el.appendChild(iframe);
  }
})();
