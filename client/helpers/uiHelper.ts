import * as _ from 'lodash';
import * as toastr from 'toastr';

export default {
    showMessage: showMessage,
    showWarning: showWarning,
    showError: showError
};

function setToasterOptions() {
    toastr.options.positionClass = 'toast-bottom-right';
}

setToasterOptions();

function showError(err) {
    let errorMessage = err;

    if (_.isError(err)) {
        errorMessage = err.message;
    }

    toastr.error(errorMessage);
}

function showWarning(message) {
    toastr.warning(message);
}

function showMessage(message) {
    toastr.success(message);
}