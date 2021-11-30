// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const licenseArray = ['MIT', 'Mozilla', 'Unlicense'];

//https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba
const licenseMIT = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
const licenseMozilla = '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)';
const licenseUnlicense = '[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)';

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'projectTitle',
        message: 'Project title:'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Description:'
    },
    {
        type: 'input',
        name: 'installationInstructions',
        message: 'Installation Instructions:'
    },
    {
        type: 'input',
        name: 'usageInformation',
        message: 'Usage Information:'
    },
    {
        type: 'input',
        name: 'contributionGuidelines',
        message: 'Contribution Guidelines:'
    },
    {
        type: 'input',
        name: 'testInstructions',
        message: 'Enter test instructions:'
    },
    {
        type: 'checkbox',
        name: 'license',
        message: 'Choose your license:',
        choices: licenseArray
    },
    {
        type: 'input',
        name: 'githubUsername',
        message: 'Enter github username:'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter email:'
    }
];

const promptUser = () => {
    return inquirer.prompt(questions)
};

// TODO: Create a function to write README file
// If no text entered, populate with "N/A"
function writeToFile(fileName, answers) {
    if(answers['description'] == "") {answers['description'] = "N/A";};
    if(answers['installationInstructions'] == "") {answers['installationInstructions'] = "N/A";};
    if(answers['usageInformation'] == "") {answers['usageInformation'] = "N/A";};
    if(answers['contributionGuidelines'] == "") {answers['contributionGuidelines'] = "N/A";};
    if(answers['testInstructions'] == "") {answers['testInstructions'] = "N/A";};

    // console.log('answers-license: ', answers['license']);
    switch (answers['license'][0]) {
        case 'MIT':
            answers['license'] = licenseMIT;
            break;
        case 'Mozilla':
            console.log('in case Mozilla');
            answers['license'] = licenseMozilla;
            console.log('answers[license: ', answers['license']);
            break;
        case 'Unlicense':
            answers['license'] = licenseUnlicense;
            break;
        default:
            answers['license'] = 'License not provided';
    };
    // console.log('answers[license: ', answers['license']);

    fs.writeFileSync(fileName,
`# ${answers['projectTitle']}
## Description
${answers['description']}
## Table of Contents
- [Installation Instructions](#installation-instructions)
- [Usage Information](#usage-information)
- [Contribution Guidelines](#contribution-guidelines)
- [Test Instructions](#test-instructions)
- [License](#license)
- [Questions](#questions)
## Installation Instructions
${answers['installationInstructions']}
## Usage Information
${answers['usageInformation']}
## Contribution Guidelines
${answers['contributionGuidelines']}
## Test Instructions
${answers['testInstructions']}
## License
${answers['license']}
## Questions
### Github account: www.github.com/${answers['githubUsername']}
### Email: ${answers['email']}`
    );
}

// TODO: Create a function to initialize app
function init() {
    promptUser()
        // Use writeFileSync method to use promises instead of a callback function
        // .then((answers) => fs.writeFileSync('README.md', answers))
        // .then((answers) => console.log(answers))
        .then((answers) => writeToFile('./generated-readme/README.md', answers))
        .catch((err) => console.error(err));
};


// Function call to initialize app
init();
