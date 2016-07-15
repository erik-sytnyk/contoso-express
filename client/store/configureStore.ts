import configureStoreProd from './configureStore.prod';
import configureStoreDev from './configureStore.dev';
import config from '../helpers/clientConfig';

let configure = null;

if (config.idDevLocal) {
    configure = configureStoreDev;
} else {
    configure = configureStoreProd;
}

export default configure;
