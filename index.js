#! /usr/bin/env node
// StudentManagementSystem
import inquirer from 'inquirer';
import chalk from "chalk";
class Student {
    name;
    studentID;
    courses;
    balance;
    constructor(name) {
        this.name = name;
        this.studentID = this.generateStudentID();
        this.courses = [];
        this.balance = 0;
    }
    generateStudentID() {
        // Generate a unique 5-digit student ID
        return Math.random().toString(36).substr(2, 5).toUpperCase();
    }
    enroll(course) {
        this.courses.push(course);
    }
    viewBalance() {
        console.log(chalk.greenBright(`Balance for ${this.name}: $${this.balance}`));
    }
    payTuition(amount) {
        this.balance -= amount;
        console.log(chalk.cyanBright(`Payment of $${amount} processed for ${this.name}`));
        this.viewBalance();
    }
    showStatus() {
        console.log(chalk.greenBright(`Student Name: ${this.name}`));
        console.log(chalk.greenBright(`Student ID: ${this.studentID}`));
        console.log(chalk.greenBright(`Courses Enrolled: ${this.courses.join(', ')}`));
        this.viewBalance();
    }
}
class StudentManagementSystem {
    students;
    constructor() {
        this.students = new Map();
    }
    addStudent() {
        inquirer
            .prompt({
            type: 'input',
            name: 'name',
            message: chalk.yellowBright('Enter student name:'),
        })
            .then(answers => {
            const name = answers['name'];
            const student = new Student(name);
            this.students.set(student.studentID, student);
            console.log(chalk.cyanBright(`${name} added successfully with ID: ${student.studentID}`));
            this.showMainMenu();
        });
    }
    enrollStudent() {
        const studentChoices = Array.from(this.students.values()).map(student => ({
            name: student.name,
            value: student.studentID,
        }));
        inquirer
            .prompt([
            {
                type: 'list',
                name: 'studentID',
                message: chalk.yellowBright('Select student to enroll:'),
                choices: studentChoices,
            },
            {
                type: 'input',
                name: 'course',
                message: chalk.yellowBright('Enter course name to enroll:'),
            },
        ])
            .then(answers => {
            const studentID = answers['studentID'];
            const course = answers['course'];
            const student = this.students.get(studentID);
            if (student) {
                student.enroll(course);
                console.log(chalk.cyanBright(`${student.name} enrolled in ${course}`));
            }
            else {
                console.log(chalk.blue(`Student with ID ${studentID} not found`));
            }
            this.showMainMenu();
        });
    }
    viewBalance() {
        const studentChoices = Array.from(this.students.values()).map(student => ({
            name: student.name,
            value: student.studentID,
        }));
        inquirer
            .prompt({
            type: 'list',
            name: 'studentID',
            message: chalk.yellowBright('Select student to view balance:'),
            choices: studentChoices,
        })
            .then(answers => {
            const studentID = answers['studentID'];
            const student = this.students.get(studentID);
            if (student) {
                student.viewBalance();
            }
            else {
                console.log(chalk.blue(`Student with ID ${studentID} not found`));
            }
            this.showMainMenu();
        });
    }
    payTuition() {
        const studentChoices = Array.from(this.students.values()).map(student => ({
            name: student.name,
            value: student.studentID,
        }));
        inquirer
            .prompt([
            {
                type: 'list',
                name: 'studentID',
                message: chalk.yellowBright('Select student to pay tuition fees:'),
                choices: studentChoices,
            },
            {
                type: 'number',
                name: 'amount',
                message: chalk.yellowBright('Enter tuition fees to pay:'),
            },
        ])
            .then(answers => {
            const studentID = answers['studentID'];
            const amount = answers['amount'];
            const student = this.students.get(studentID);
            if (student) {
                student.payTuition(amount);
            }
            else {
                console.log(chalk.blue(`Student with ID ${studentID} not found`));
            }
            this.showMainMenu();
        });
    }
    showStatus() {
        const studentChoices = Array.from(this.students.values()).map(student => ({
            name: student.name,
            value: student.studentID,
        }));
        inquirer
            .prompt({
            type: 'list',
            name: 'studentID',
            message: chalk.yellowBright('Select student to show status:'),
            choices: studentChoices,
        })
            .then(answers => {
            const studentID = answers['studentID'];
            const student = this.students.get(studentID);
            if (student) {
                student.showStatus();
            }
            else {
                console.log(chalk.blue(`Student with ID ${studentID} not found`));
            }
            this.showMainMenu();
        });
    }
    showMainMenu() {
        inquirer
            .prompt({
            type: 'list',
            name: 'choice',
            message: chalk.yellowBright('Select an option:'),
            choices: [
                'Add Student',
                'Enroll Student In Course',
                'View Balance',
                'Pay Tuition Fees',
                'Show Status',
                'Exit',
            ],
        })
            .then(answers => {
            const choice = answers['choice'];
            switch (choice) {
                case 'Add Student':
                    this.addStudent();
                    break;
                case 'Enroll Student In Course':
                    this.enrollStudent();
                    break;
                case 'View Balance':
                    this.viewBalance();
                    break;
                case 'Pay Tuition Fees':
                    this.payTuition();
                    break;
                case 'Show Status':
                    this.showStatus();
                    break;
                case 'Exit':
                    console.log(chalk.red('Exiting program.'));
                    break;
            }
        });
    }
    start() {
        console.log(chalk.blueBright('Welcome to Student Management System\n'));
        this.showMainMenu();
    }
}
// Initialize and start the Student Management System
const studentSystem = new StudentManagementSystem();
studentSystem.start();
