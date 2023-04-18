const fs = require('fs');
const path = require('path');

const directoryPath = process.argv[2] + "/MetaRoot/";
const directoryFilePath = process.argv[2];
const fileName = 'installerInfo.ini';

fs.readFile(path.join(directoryPath, fileName), 'utf8', (err, data) => {
    if (err) throw err;

    const archivesLines = data.split('\n').filter(line => (
        line.includes('win-archives =') || 
        line.includes('mac-archives =') || 
        line.includes('win-supplements =') || 
        line.includes('mac-supplements =') || 
        line.includes('meta-archives =')
     ));
    const archivesString = archivesLines.join('\n');

     const winArchives = fs.readdirSync(directoryFilePath).find(file => (
        file.endsWith('.zip') && file.includes(')_Win_')
    ));
     const winSupplements = fs.readdirSync(directoryFilePath).find(file => (
        file.endsWith('.zip') && file.includes('_Supplements_')
     ));
     const metaArchives = fs.readdirSync(directoryFilePath).find(file => (
        file.endsWith('.zip') && file.includes('_MetaArchives_')
    ));
    const macArchives = winArchives.replace('_Win_', '_Mac_');
    const macSupplements = winSupplements.replace('_Win_', '_Mac_');

    const updatedData = data.replace(
    archivesString,
     `win-archives = ${winArchives}\nmac-archives = ${macArchives}\nwin-supplements = ${winSupplements}\nmac-supplements = ${macSupplements}\nmeta-archives = ${metaArchives}`
     );


     fs.writeFile(path.join(directoryPath, fileName), updatedData, (err) => {
    if (err) throw err;
        console.log('installerInfo.ini is updated successfully');
     });
});
