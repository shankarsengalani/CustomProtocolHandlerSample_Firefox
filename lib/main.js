var { Cc, Ci, Cu } = require('chrome');
var addonSelf = require('sdk/self');
var actionButton = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var mod = require("sdk/page-mod");
var protocol = require('./protocolCtrl');
var nativeService = require('./nativeService');
var pageUrl = addonSelf.data.url('./index.html');
var mainPage;

actionButton.ActionButton({
  id: "MaidSafe",
  label: "MaidSafe",
  icon: {
    "16": "./images/icon-16.png",
    "32": "./images/icon-32.png",
    "64": "./images/icon-64.png"
  },
  onClick: handleClick
});

tabs.on('ready', function (tab) {
  mainPage = tab.attach({
    contentScriptFile: addonSelf.data.url('./contentScript.js')
  });
  mainPage.port.on('jsctypes', function(data) {
    console.log('Received data: '+ data.name);
    nativeService.nativeAdd(mainPage, parseInt(data.a), parseInt(data.b));
    //mainPage.port.emit('jsctypesResult', (parseInt(data.a) + parseInt(data.b)));
  });
});

function handleClick() {
  protocol.registerProtocol();
  tabs.open(pageUrl);
}