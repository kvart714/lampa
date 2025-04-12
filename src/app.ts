function full(params: any, oncomplete: any, onerror: any) {
    // https://github.com/yumata/lampa-source/blob/main/src/utils/reguest.js
    // https://github.com/yumata/lampa-source/blob/main/plugins/collections/api.js
    
    oncomplete({
        "secuses": true,
        "page": 1,
        "results": Lampa.Storage.get('transmissionData', [])
    });
}

function clear() {
    network.clear();
}
var Api = {
    full: full,
    clear: clear
};

function component(object: any) {
    var comp = new Lampa.InteractionCategory(object);
    comp.create = function() {
        Api.full(object, this.build.bind(this), this.empty.bind(this));
    };
    comp.nextPageReuest = function(object, resolve, reject) {
        Api.full(object, resolve.bind(comp), reject.bind(comp));
    };
    return comp;
}