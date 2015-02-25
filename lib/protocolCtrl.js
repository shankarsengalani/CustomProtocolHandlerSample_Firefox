var protocolService = require('./protocolService');

exports.registerProtocol = function() {
    protocolService.register();
};

exports.checkElementForProtocol = function(tab) {
    protocolService.searchForProtocol(tab);
};

exports.watchRequestForProtocol = function() {

};
