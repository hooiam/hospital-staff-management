# Hospital Staff Management

This project is a Hospital Staff Management System that includes:
- **Backend**: Node.js (Express) with Sequelize ORM and MySQL database
- **Frontend**: React
- **Database**: MySQL

The system allows you to perform CRUD operations on hospital staff, manage roles, permissions, and authenticate users.

## Tech Stack & Major Packages
 - [NodeJS](https://nodejs.org/)
 - [React JS](https://react.dev/)
 - [ExpressJS](https://expressjs.com/)
 - [MySQL](https://www.mysql.com/)
 - [Sequelize](https://sequelize.org/)
 - [React Rourter](https://reactrouter.com/en/main)
 - [JSON Web Token](https://jwt.io/)
 - [Mocha JS](https://mochajs.org/)
 - [Chai JS](https://www.chaijs.com/)
 - [Sinon JS](https://sinonjs.org/)

## Setup Instructions

### Prerequisite 

*In order to setup and run this project in local please make sure you have installed **NodeJS** and **MySQL** into your machine. The compatible versions are **v21.7.1** and **v8.0.39** respectively*

### Clone the repository

`git clone https://github.com/hooiam/hospital-staff-management.git`

### Backend Setup

Visit `/server` directory and paste the below lines into a `.env` file
```
MYSQL_DATABASE=DB_NAME
MYSQL_USER=DB_USER
MYSQL_PASSWORD=DB_PASS
PORT=5000
NODE_ENV=development
```
Next, please run the following command from your terminal or command promt

```
npm i && npm start

```
### Unit Testing
To run unit testing, please run the below command
`npm test`

### Fronted Setup

Visit `/client` directory and paste the below lines into a `.env` file
```
VITE_REACT_APP_API_URL=http://localhost:5000 # Change the url based on your setup
```
Next, please run the following command from your terminal or command promt

```
npm i && npm run dev

```
Visit http://localhost:5174/ to login. Deafult admin password i.e `55` will be prefilled into the login form. This can't be changed using the app. Once logged in, admin needs to create one or more roles using permission set. One or more staff records can be created using those roles.

***Please note - The contact number for each staff is considered as password of the system. So when a staff wants to login they need to use their respective contact number for login. For admin it's `55`***


## Technical Informations
 - For database layer, used [Sequelize](https://sequelize.org/) ORM, hooks and associates to create, read, update and delete records. 
 - For backend applicatoin layer, express router, middleware, exception handling middleware are created for security and error handling
 - For authentication [JWT](https://jwt.io/) has been used
 - For unit testing, Mocha JS and [Chai JS](https://www.chaijs.com/) has been used and [Sinon JS](https://sinonjs.org/) for stubbing
 - In frontend React Router, Navigator, Protected Routes has been used for secuirity.

## What's Next?
- WIP on docker composer setup to containerize this entire app
- Enhancement in frontend and backend app in terms of permformace and security and bug fixes
- Continue to buile this by adding more features to it

## Report a bug
To report a bug please create a issue. I will look into it once I am free and try to resolve it.

## Support Me 💚
If you found this useful please give me a 🌟 in github. Thank you 👍