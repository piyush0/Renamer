/**
 * Created by piyush0 on 06/06/17.
 */

const {ipcRenderer} = require('electron');
const {dialog} = require('electron').remote;
let selectedFiles = null;

window.onload = function () {
    let btnSelect = document.getElementById("btnSelect");
    btnSelect.onclick = function () {
        selectedFiles = dialog.showOpenDialog({title: "Renamer", properties: ['openFile', 'multiSelections']});
    };


    let name = document.getElementById("name");
    let btnRename = document.getElementById("rename");

    btnRename.onclick = function () {

        ipcRenderer.send('rename', {
            name: name.value,
            files: selectedFiles
        })
    }
};

