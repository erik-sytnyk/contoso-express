import configureStoreProd from './configureStore.prod';
import configureStoreDev from './configureStore.dev';

let configure = null;

if (process.env.NODE_ENV === 'production') {
    configure = configureStoreProd;
} else {
    configure = configureStoreDev;
}

export default configure;