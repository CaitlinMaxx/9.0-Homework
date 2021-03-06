var inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const util = require("util");

const validator = async (input) => {
    if (input !== '') {
       return 'Incorrect asnwer';
    }
    return true;
 };


inquirer
    .prompt([
        {
            type: "input",
            message: "What is your GitHub username?",
            name: "username",
            validator: validator()
        
        },
        {
            type: "input",
            message: "What is the name of your application?",
            name: "appName",
            validator: validator()
        },
        {
            type: "input",
            message: "Can you descibe you application?",
            name: "description",
            validator: validator()
        },
        {
            type: "confirm",
            message: "Are there other software/applications you need to install to use the app?",
            name: "installation1",

            
        },
        {
            type: "input",
            message: "Who is this application for?",
            name: "whoFor",
            validator: validator()
        },
        {
            type: "input",
            message: "What are you supposed to achieve/create with this application?",
            name: "usage",
            validator: validator()
        },
        {
            type: "confirm",
            message: "Do you have a copyright/licence for the application?",
            name: "licence1",
        },
        {
            type: "confirm",
            message: "Was there other people involved in the development of this application you would like to credit?",
            name: "credits1",
        },
    ])
    .then(async answers => {
        const queryUrl = "https://api.github.com/users/" + answers.username;
        axios
        .get(queryUrl)
        .then(function(res) {
        const names = res.data.name
        const email = res.data.email
        const profilePic = res.data.avatar_url
        

        if ("credits1" === "yes") {
            inquirer
                .prompt(
                    {
                        type: "input",
                        message: "What is/are they?",
                        name: "credits2",
                        validator: validator()
                    })
        }

        if ("licence1" === "yes") {
            inquirer
                .prompt(
                    {
                        type: "input",
                        message: "What is/are they?",
                        name: "licence2",
                        validator: validator()
                    })
        }
       
        if ("installation1" === "yes") {
            inquirer
                .prompt(
                    {
                        type: "input",
                        message: "What is/are they?",
                        name: "installation2",
                        validator: validator()
                    })
        }

        if ("installation1" === "yes") {
            var install = 
            `These are the software you'll need to install:
            ${answers.installation2}`
        }
        else {
            var install = "You don't need to install any additional software."
        }
        if ("credits1" === "yes") {
            var credit = 
            `Contributers:
            ${answers.credits2}`
        }
        else {
            var credit = ""
        }
        if ("licence1" === "yes") {
            var licence = 
            `
            
            licence:
            ${answers.licence2}
            `
        }
        else {
            var licence = ""
        }
        
        const README = 
        `#${answers.appName}
        ##Table of Contents:
        - Description
        - Installation
        - Usage
        - Contributers

        ##Description
        ${answers.description}

        ##Installation
        ${install}
        
        ##Usage
        As a ${answers.whoFor}, I want to ${answers.usage}

        ${credit}${licence}
        ${names}
        ${email}
        ${profilePic}`
        

        fs.writeFile("Generated_README.md", README, function(err) {

        if (err) {
            return console.log(err);
        }
        
        console.log("Success!");
        
        });
        });
    });