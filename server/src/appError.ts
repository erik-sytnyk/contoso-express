import * as _ from 'lodash';

interface IAppError {
    uiShow: boolean;
    log: boolean;
    type: string;
    code: string;
    data: Object;
    message: string;
    isAppError: boolean;
}

interface AppErrorOptions {
    uiShow: boolean,
    log: boolean,
    data: Object
}

export class AppError implements AppError {
    message = '';
    uiShow = true;
    log = false;
    type = '';
    code = '';
    data: Object;
    isAppError = true;

    constructor(message: string, options?: Object);
    constructor(type: string, code: string, options?: Object);

    constructor(...args: any[]) {
        Error.captureStackTrace(this, this.constructor);


        //signature type, code, options
        if (_.isString(args[0]) && _.isString(args[1])) {
            this.type = args[0];
            this.code = args[1];
            _.merge(this, args[2]);
        }
        //signature message, options
        else if (_.isString(args[0])) {
            this.message = args[0];
            _.merge(this, args[1]);
        } else {
            throw new Error('Unsupported AppError signature');
        }
    }
}

export default AppError;