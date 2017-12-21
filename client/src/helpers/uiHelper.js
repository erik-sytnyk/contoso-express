import _ from 'lodash';
import toastr from 'toastr';

export default {
  showMessage,
  showWarning,
  showError
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
