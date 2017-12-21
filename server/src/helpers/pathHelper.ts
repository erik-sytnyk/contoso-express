import * as path from 'path';

let profileData = {
  production: {
    root: '../',
    data: './data',
    local: './local',
    client: './client'
  },
  development: {
    root: '../../..',
    data: './data',
    local: './local',
    client: '../client/build'
  }
};

let rootPath = getRootPath();

export default {
  path,
  getRelative: getRelativePath,
  getDataRelative: getDataRelativePath,
  getLocalRelative: getLocalRelativePath,
  getClientRelative: getClientRelativePath
};

function getDataRelativePath(...paths) {
  return getRelativePath('data', ...paths);
}

function getLocalRelativePath(...paths) {
  return getRelativePath('local', ...paths);
}

function getClientRelativePath(...paths) {
  return getRelativePath('client', ...paths);
}

function getRelativePath(profileFolder, ...paths: string[]) {
  let folderRelative = profileData[getCurrentProfile()][profileFolder];

  if (!folderRelative) throw Error(`Cannot find relative folder profile '${profileFolder}'`);

  paths.unshift(folderRelative);
  paths.unshift(rootPath);

  return path.join.apply(this, paths);
}

function getRootPath() {
  //TODO work around for ts-node
  if (path.extname(__filename) === '.ts') {
    profileData.development.root = '../..';
  }

  let rootRelative = profileData[getCurrentProfile()].root;

  if (!rootRelative) throw Error('Cannot find root folder');

  return path.join(__dirname, rootRelative);
}

function getCurrentProfile() {
  let env = process.env['NODE_ENV'];

  return env ? env : 'development';
}
