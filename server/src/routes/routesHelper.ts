import * as _ from 'lodash';

let app = null;

export default init;

function init(expressApp) {
  app = expressApp;

  return {
    app,
    get: httpGet,
    post: httpPost,
    put: httpPut,
    delete: httpDelete
  };
}

function httpGet(path, handler) {
  const args = getRouteArguments(path, handler);
  app.get.apply(app, args);
}

function httpPost(path, handler) {
  const args = getRouteArguments(path, handler);
  app.post.apply(app, args);
}

function httpPut(path, handler) {
  const args = getRouteArguments(path, handler);
  app.put.apply(app, args);
}

function httpDelete(path, handler) {
  const args = getRouteArguments(path, handler);
  app.delete.apply(app, args);
}

function getRouteArguments(path, handler) {
  let result = [];

  result.push(path);
  result.push(handler);

  return result;
}
