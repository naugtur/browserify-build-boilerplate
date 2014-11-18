var q = require("q");

module.exports = {
    promiseStuff: function () {
        var defer = q.defer();

        //I just promise stuff
        //and never do it

        return defer.promise;
    }
}