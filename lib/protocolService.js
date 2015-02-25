var { Cm, Ci } = require('chrome');
Cm.QueryInterface(Ci.nsIComponentRegistrar);
var protocolXpcom = require('./protocolXPCom');

function ProtocolFactory(component) {
    this.createInstance = function(outer, iid) {
        if (outer) {
            throw Cr.NS_ERROR_NO_AGGREGATION;
        }
        return new component();
    };
    this.register = function() {
        Cm.registerFactory(component.prototype.classID,
            component.prototype.classDescription,
            component.prototype.contractID,
            this);
    };
    this.unregister = function() {
        Cm.unregisterFactory(component.prototype.classID, this);
    };
    Object.freeze(this);
}

exports.register = function() {
    var protocolFac = new ProtocolFactory(protocolXpcom.SafeProtocolHandler);
    protocolFac.register();
};

exports.searchForProtocol = function(tab) {

};

