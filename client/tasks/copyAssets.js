var fs = require('fs-extra');
var path = require('path');
var Promise = require('bluebird');
var resources = require('../public/vendor.json').staticResources;
var _ = require('lodash');

try {
    _.forEach(resources, (item) => {
        fs.copySync(item.from, path.join('public/static', item.to));
        console.log("Copied: " + item.from);
    });
} catch (err) {
    console.log(err);
}
