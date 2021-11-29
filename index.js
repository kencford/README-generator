// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const licenseArray = ['MIT', 'Github', 'Google'];

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
        name: 'userInformation',
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
    console.log('filenane: ', fileName);
    console.log('answers: ', answers);
    if(answers['description'] == "") {answers['description'] = "N/A";};
    if(answers['installationInstructions'] == "") {answers['installationInstructions'] = "N/A";};
    if(answers['userInformation'] == "") {answers['userInformation'] = "N/A";};
    if(answers['contributionGuidelines'] == "") {answers['contributionGuidelines'] = "N/A";};
    if(answers['testInstructions'] == "") {answers['testInstructions'] = "N/A";};
    fs.writeFileSync(fileName,
`# ${answers['projectTitle']}
## Description
${answers['description']}
## Table of Contents
 - [Installation Instructions](#Installation Instructions)
## Installation Instructions
${answers['installationInstructions']}
## User Information
${answers['userInformation']}
## Contribution Guidelines
${answers['contributionGuidelines']}
## Test Instructions
${answers['testInstructions']}
## License
${answers['license']}
## Questions
### Github username: ${answers['githubUsername']}
### Github username: ${answers['email']}`
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
