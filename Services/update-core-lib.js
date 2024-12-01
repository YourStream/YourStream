const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const version = process.argv[2];
const libName = "@yourstream/core";

const servicesList = fs.readdirSync(path.join(__dirname), { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

(() => {
    console.log(`Updating ${libName} to version ${version} in all services`);
    console.log('-----------------------------------------------');
    console.log("Services to update:");
    servicesList.forEach(async service => {
        console.log(service);
        const packageJsonPath = path.join(__dirname, service, 'package.json');
        const packageJson = JSON.parse(await fs.readFileSync(packageJsonPath, 'utf8'));
        packageJson.dependencies[libName] = version;
        await fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        await execSync(`cd ${path.join(__dirname, service)} && npm i`,);
    });
    console.log('-----------------------------------------------');

    console.log('Done!');
})();