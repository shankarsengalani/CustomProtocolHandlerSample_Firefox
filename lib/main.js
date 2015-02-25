var { Cc, Ci, Cu } = require('chrome');
var actionButton = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var protocol = require('./protocolCtrl');

actionButton.ActionButton({
    id : "MaidSafe",
    label: "MaidSafe",
    icon: {
        "16": "./images/icon-16.png",
        "32": "./images/icon-32.png",
        "64": "./images/icon-64.png"
    },
    onClick: handleClick
});

function handleClick() {
    protocol.registerProtocol();
}

tabs.on('open', function(tab) {
    //protocol.checkElementForProtocol(tab);
});
