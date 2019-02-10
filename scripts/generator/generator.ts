'use strict';
///<reference path="../../index.d.ts" />
import './Extensions';

// Do this as the first thing so that any code reading it knows the right env.
// @ts-ignore
import * as Inquirer from "inquirer";
import * as Fs from 'fs';
import * as ChangeCase from "change-case";

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
    throw err;
});

const CURR_DIR = process.cwd();
const ENCODING = 'utf8';

export function validateClassName(input: string) {
    if (/^([A-Za-z])+$/.test(input) && input.length > 0) return true;
    else return 'Project name may only include letters and may not be empty.'
}

export type ClassChoice = 'api' | 'store' | 'model' | 'entity';

export function createClassFile(answers: Inquirer.Answers, classChoiceOverride?: ClassChoice) {
    const classChoice: ClassChoice = classChoiceOverride ? classChoiceOverride : answers['classChoice'];
    const className: string = answers['className'];
    // const resourceName: string = answers['resourceName'];

    if (classChoice == "entity") {
        createClassFile(answers, 'api');
        createClassFile(answers, 'store');
        createClassFile(answers, 'model');
        return;
    }

    const srcIndex = CURR_DIR.indexOf('/src');

    let newFilePath = "";
    let fileName = "";
    let fileExtension = ".ts";
    let templateFileName = "";

    if (srcIndex === -1) {
        if (CURR_DIR.endsWith('scripts')) {
            newFilePath = `${CURR_DIR}/../src`;
        } else {
            newFilePath = `${CURR_DIR}/src`;
        }
    } else {
        newFilePath = CURR_DIR.slice(srcIndex + 4, CURR_DIR.length - 1);
    }

    newFilePath += "/app";

    switch (classChoice) {
        case "api":
            newFilePath += "/api";
            fileName = `${ChangeCase.title(className)}sApi`;
            templateFileName = "ApiTemplate";
            break;
        case "store":
            newFilePath += "/data/stores";
            fileName = `${ChangeCase.title(className)}Store`;
            templateFileName = "StoreTemplate";
            break;
        case "model":
            newFilePath += "/data/models";
            fileName = ChangeCase.title(className);
            templateFileName = "ModelTemplate";

    }

    newFilePath += `/${fileName}${fileExtension}`;

    let fileContent = getTemplateFileContents(templateFileName);

    fileContent = fileContent.replaceAll('{{ENTITY_NAME_TITLE}}', ChangeCase.title(className));
    fileContent = fileContent.replaceAll('{{ENTITY_NAME_CAMEL}}', ChangeCase.camel(className));

    Fs.writeFileSync(newFilePath, fileContent, ENCODING);

    console.log(`SUCCESS: Created ${ChangeCase.title(classChoice)} Class.`);
}

export function getTemplateFileContents(templateName: string) {
    const srcIndex = CURR_DIR.indexOf('/src');
    let filePath = "";
    if (srcIndex === -1) {
        if (CURR_DIR.endsWith('scripts')) {
            filePath = `${CURR_DIR}/generator`;
        } else {
            filePath = `${CURR_DIR}/scripts/generator`;
        }
    } else {
        filePath = `${CURR_DIR.slice(srcIndex, CURR_DIR.length - 1)}/scripts/generator`;
    }
    filePath += `/templates/${templateName}.txt`;

    return Fs.readFileSync(filePath, ENCODING);
}

export function startPrompt() {
    const CHOICES: Inquirer.ChoiceType[] = [
        {
            name: 'Api Class',
            value: 'api'
        },
        {
            name: 'Store Class',
            value: 'store'
        },
        {
            name: 'Model Class',
            value: 'model'
        },
        {
            name: 'Full Entity (Api, Store & Model Classes)',
            value: 'entity'
        }
    ];

    const QUESTIONS: Inquirer.Question[] = [
        {
            name: 'classChoice',
            type: 'list',
            message: 'What class would you like to generate?',
            choices: CHOICES
        },
        {
            name: 'className',
            type: 'input',
            message: 'Class name: ',
            validate: validateClassName
        },
        // {
        //     name: 'resourceName',
        //     type: 'input',
        //     message: 'Resource name (optional): ',
        //     validate: validateClassName,
        //     default: ''
        // }
    ];

    Inquirer.prompt(QUESTIONS)
        .then(createClassFile)
        .catch(console.log)
}

startPrompt();