'use strict';
const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
const {dialog} = require('electron');
const fs = require('fs');


let mainWindow = null;

app.on('ready', function () {
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.webContents.openDevTools()

});

ipcMain.on('rename', function (event, data) {
    let files = data.files;
    let newName = data.name;
    let counter = data.numbering;

    for (let i = 0; i < files.length; i++) {
        let oldName = path.basename(files[i]);
        let nae = getNameAndExtension(oldName);

        let slash = "/";
        if (/^win/.test(process.platform)) {
            slash = "\\";
        }

        let filePath = path.dirname(files[i]);
        let renamedFile = filePath + slash + newName + (counter) + "." + nae.extension;
        fs.rename(files[i], renamedFile);
        counter++;
    }
});

function getNameAndExtension(file) {
    let retVal = {};
    for (let i = file.length - 1; i >= 0; i--) {
        if (file[i] === '.') {
            retVal.name = file.substring(0, i);
            retVal.extension = file.substring(i + 1);
            break;
        }
    }
    return retVal;
}