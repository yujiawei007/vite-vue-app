(function(){"use strict";let s=1;function e(){s++,self.postMessage(s),setTimeout(e,1e3)}e(),self.onmessage=t=>{postMessage(t.data+" \u5475\u5475~")}})();
