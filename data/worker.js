try {
  function jsCallback (data) {
    self.postMessage(data.readString());
  }
  function runAddMethod(url, a, b) {
    var lib = ctypes.open(url);
    var funcType = new ctypes.FunctionType(ctypes.default_abi, ctypes.void_t, [ctypes.char.array(100)]);
    var funcPtrType = funcType.ptr;
    var callback = funcPtrType(jsCallback);
    lib.declare('add', ctypes.default_abi, ctypes.void_t, funcPtrType, ctypes.int32_t, ctypes.int32_t)(callback, a, b);
  }
  self.onmessage = function(messageFromClient) {
    var libUrl = messageFromClient.data.url;
    runAddMethod(libUrl, messageFromClient.data.a, messageFromClient.data.b);
  };
} catch (ex) {
  dump('\nWorker Exception: ' + ex);
}