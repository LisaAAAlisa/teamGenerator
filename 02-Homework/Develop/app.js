const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
// After the user has input all employees desired, call the render function (required
// above) and pass in an array containing all employee objects; the render function will
// generate and return a block of HTML including templated divs for each employee!
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the render function. Now write it to a file named team.html in the
// output folder. You can use the variable outputPath above target this location.
// Hint: you may need to check if the output folder exists and create it if it
// does not.
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided render function to work! ```
const collectInputs = async (inputs = []) => {
    const prompts = [
        {
            type: 'list',
            name: 'employeeType',
            message: 'EmployeeType: ',
            choices: ['Manager', 'Engineer', 'Intern']
        },
        {
            type: 'input',
            name: 'name',
            message: 'Name: '
        },
        {
            type: 'input',
            name: 'email',
            message: 'Email: '
        },
        {
            type: 'input',
            name: 'empID',
            message: 'Eployee ID: '
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'Office Number: ',
            when: (answers) => answers.employeeType === 'Manager'
        },
        {
            type: 'input',
            name: 'github',
            message: 'GitHub Repository: ',
            when: (answers) => answers.employeeType === 'Engineer'
        },
        {
            type: 'input',
            name: 'school',
            message: 'School: ',
            when: (answers) => answers.employeeType === 'Intern'
        },
        {
            type: 'confirm',
            name: 'again',
            message: 'Enter another input? ',
            default: true
        }
    ];
    const { again, ...answers } = await inquirer.prompt(prompts);
    const newInputs = [...inputs, answers];
    return again ? collectInputs(newInputs) : newInputs;
};

function getManualInputs() {
    const employeeInputs = [
        {
            employeeType: "Manager",
            name: "Arthur",
            id: "4",
            email: "alangham@gmail.com",
            officeNumber: "1"
        },
        {
            employeeType: "Engineer",
            name: "Alisa",
            id: "3",
            email: "alisa@gmail.com",
            github: "https://github.com/LisaAAAlisa"
        },
        {
            employeeType: "Engineer",
            name: "Jane",
            id: "1",
            email: "jane@gmail.com",
            github: "https://github.com/LisaAAAlisa"
        },
        {
            employeeType: "Intern",
            name: "Paul",
            id: "2",
            email: "paul@gmail.com",
            school: "Rice"
        }
    ]
    return (employeeInputs);
}
function generateEngteamHtml(inputs) {
    var employeeObjects = [];
    for (i = 0; i < inputs.length; i++) {
        var type = inputs[i].employeeType;
        if (type === "Manager") {
            employeeObjects.push(new Manager(inputs[i].name, inputs[i].id, inputs[i].email, inputs[i].officeNumber));
        }
        else if (type === "Intern") {
            employeeObjects.push(new Intern(inputs[i].name, inputs[i].id, inputs[i].email, inputs[i].school));
        }
        else {
            employeeObjects.push(new Engineer(inputs[i].name, inputs[i].id, inputs[i].email, inputs[i].github));
        }
    }
    return employeeObjects;
}

function writeEngTeamHTML(engTeamHTML) {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFile(outputPath, engTeamHTML, (err) =>
        err ? console.log(err) : console.log('Success!')
    );    
}


var main = async () => {
    const inputs = await collectInputs();
    // console.log(inputs);
    // const inputs = getManualInputs();
    const engteam = generateEngteamHtml(inputs);
    const engteamhtml = render(engteam);
  writeEngTeamHTML(engteamhtml);
}


main();






// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
