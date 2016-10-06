var fs = require('fs-extra');
var path = require('path');
var Promise = require('bluebird');
var resources = require('../public/vendor.json').staticResources;
var _ = require('lodash');

var destPrefix = 'public/static';

try {
    _.forEach(resources, (item) => {
        fs.copySync(item.from, path.join(destPrefix, item.to));
        console.log("Copied: " + item.from);
    });
} catch (err) {
    console.log(err);
}
