import pathHelper from '../helpers/pathHelper';
import * as fs from 'fs';

let originalPath = pathHelper.getRelative('typings');
let destinationPath = pathHelper.getRelative('client', 'typings');

fs.symlink(originalPath, destinationPath, 'dir', (err) => {
    if (err) return console.log(err);

    console.log('Symlink successfully created!');
});