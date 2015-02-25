const { CC, Cc, Ci, Cu, Cm, Cr, components } = require('chrome');
Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/XPCOMUtils.jsm");
const SCHEME = "safe";
//const DDG_URI = Services.io.newURI("http://localhost:8080/%s", null, null);
const nsIURI = CC("@mozilla.org/network/simple-uri;1", "nsIURI");

var binaryData = "data:image/png;base64,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";
function SafeProtocolHandler() {}
SafeProtocolHandler.prototype = Object.freeze({
    classDescription: "Safe Protocol Handler",
    contractID: "@mozilla.org/network/protocol;1?name=" + SCHEME,
    classID: components.ID('{7c3311a6-3a2d-4090-9c26-e83c32e7870c}'),
    QueryInterface: XPCOMUtils.generateQI([Ci.nsIProtocolHandler]),
    scheme: SCHEME,
    defaultPort: -1,
    allowPort: function(port, scheme) {
        // This protocol handler does not support ports.
        return false;
    },
    protocolFlags: Ci.nsIProtocolHandler.URI_NOAUTH | Ci.nsIProtocolHandler.URI_LOADABLE_BY_ANYONE,
    newURI: function(aSpec, aOriginCharset, aBaseURI) {
        if (aBaseURI && aBaseURI.scheme == SCHEME) {
            return Services.io.newURI(aSpec, aOriginCharset, DDG_URI);
        }
        let rv = new nsIURI();
        rv.spec = aSpec;
        return rv;
    },
    newChannel: function(aURI) {
        //let spec = DDG_URI.spec.replace("%s", aURI.path);
        //let channel = Services.io.newChannel(spec, aURI.originCharset, null);
        //channel.originalURI = aURI;
        //return channel;
        var channel = new PipeChannel(aURI);
        //channel.setContentType('image/png');
        var result = channel.QueryInterface(Ci.nsIChannel);

        //console.log('channel: ', result.inputStreamChannel);
        return result;
    }
});

var PipeChannel = function(URI) {
    this.pipe = Cc["@mozilla.org/pipe;1"].createInstance(Ci.nsIPipe);
    this.pipe.init(true,true,0,0,null);
    this.inputStreamChannel = Cc["@mozilla.org/network/input-stream-channel;1"].createInstance(Ci.nsIInputStreamChannel);
    this.inputStreamChannel.setURI(URI);
    this.inputStreamChannel.contentStream = this.pipe.inputStream;
    this.request = this.inputStreamChannel.QueryInterface(Ci.nsIRequest);
    this.channel = this.inputStreamChannel.QueryInterface(Ci.nsIChannel);
};

PipeChannel.prototype = {
    QueryInterface: function(iid){
        if (iid.equals(Ci.nsIChannel) || iid.equals(Ci.nsIRequest) || iid.equals(Ci.nsISupports))
            return this;
        throw Cr.NS_NOINTERFACE;
    },

    get LOAD_NORMAL() {return this.request.LOAD_NORMAL},
    get LOAD_BACKGROUND() {return this.request.LOAD_BACKGROUND},
    get INHIBIT_CACHING() {return this.request.INHIBIT_CACHING},
    get INHIBIT_PERSISTENT_CACHING() {return this.request.INHIBIT_PERSISTENT_CACHING},
    get LOAD_BYPASS_CACHE() {return this.request.LOAD_BYPASS_CACHE},
    get LOAD_FROM_CACHE() {return this.request.LOAD_FROM_CACHE},
    get VALIDATE_ALWAYS() {return this.request.VALIDATE_ALWAYS},
    get VALIDATE_NEVER() {return this.request.VALIDATE_NEVER},
    get VALIDATE_ONCE_PER_SESSION() {return this.request.VALIDATE_ONCE_PER_SESSION},

    get loadFlags() {return this.request.loadFlags},
    set loadFlags(val) {this.request.loadFlags = val},
    get loadGroup() {return this.request.loadGroup},
    set loadGroup(val) {this.request.loadGroup = val},
    get name() {return this.request.name},
    get status() {return this.request.status},

    cancel: function(status) {this.request.cancel(status);},
    isPending: function() {return this.request.isPending();},
    resume: function() {this.request.resume();},
    suspend: function() {this.request.suspend();},

    get LOAD_DOCUMENT_URI() {return this.channel.LOAD_DOCUMENT_URI},
    get LOAD_RETARGETED_DOCUMENT_URI() {return this.channel.LOAD_RETARGETED_DOCUMENT_URI},
    get LOAD_REPLACE() {return this.channel.LOAD_REPLACE},
    get LOAD_INITIAL_DOCUMENT_URI() {return this.channel.LOAD_INITIAL_DOCUMENT_URI},
    get LOAD_TARGETED() {return this.channel.LOAD_TARGETED},

    get contentCharset() {return this.channel.contentCharset},
    set contentCharset(val) {this.channel.contentCharset = val},
    get contentLength() {return this.channel.contentLength},
    set contentLength(val) {this.channel.contentLength = val},
    get contentType() {
        console.log('DEMO - MIME TyPE');
        return this.channel.contentType;
    },
    set contentType(val) {
        this.channel.contentType = val;
    },
    get notificationCallbacks() {return this.channel.notificationCallbacks},
    set notificationCallbacks(val) {this.channel.notificationCallbacks = val},
    get originalURI() {return this.channel.originalURI},
    set originalURI(val) {this.channel.originalURI = val},
    get owner() {return this.channel.owner},
    set owner(val) {this.channel.owner = val},
    get securityInfo() {return this.channel.securityInfo},
    get URI() {return this.channel.URI},

    asyncOpen: function(listener, context) {
        this.channel.asyncOpen(listener, context);
        this.channel.contentType = 'image/png';
        try {
            if(false/* some reason to abort */) {
                this.request.cancel(Cr.NS_BINDING_FAILED);
                Cc["@mozilla.org/embedcomp/prompt-service;1"].getService(Ci.nsIPromptService).alert(null, 'Error message.', 'Error message.');
                return;
            }

            result = binaryData;
            this.pipe.outputStream.write(result, result.length);
            this.pipe.outputStream.close();
        } catch(err) {
            if (err.result != Cr.NS_BINDING_ABORTED) {
                Cu.reportError(err);
            }
        }
    },

    open: function() {return this.channel.open();},


    close: function() {
        this.pipe.outputStream.close();
    }
};


exports.SafeProtocolHandler = SafeProtocolHandler;