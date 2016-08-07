import * as _ from 'lodash';
import * as Promise from 'bluebird';

export default {
    stubData
};

function stubData(data: any, delay = 500) {
    return Promise.delay(delay)
        .then(() => {
            return data;
        });
}

