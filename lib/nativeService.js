const { Cc, Cu, Ci, ChromeWorker } = require('chrome');
var self = require('sdk/self');
Cu.import("resource://gre/modules/ctypes.jsm");
Cu.import("resource://gre/modules/Services.jsm");

exports.nativeAdd = function(mainPage, a_, b_) {
  try {
    var worker = new ChromeWorker(self.data.url("worker.js"));
    var nativeUrl = self.data.url("addSample.dll");
    nativeUrl = Services.io.newURI(nativeUrl,null,null).QueryInterface(Ci.nsIFileURL).file.path;
    worker.onmessage = function(msg) {
      mainPage.port.emit('jsctypesResult', msg.data);
    };
    worker.postMessage({
      url: nativeUrl,
      a: a_,
      b: b_
    });
  } catch (ex) {
    dump('\nMain Thread Expection: ' + ex);
  }
};
