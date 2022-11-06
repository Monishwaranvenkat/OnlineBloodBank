# Online Blood Bank - React

Online Blood Bank is an online application that brings dignity to Life of people by making Quality blood and blood samples available when needed.

**Screenshots of the application are added in screenshots folder**
## Functional Requirements Built
### User Module
* User signup and login with validation. Uses ( **JWT Authentication and Authorization**)
* User can donate blood periodically.
* User can request blood.
* User profile edit
### Admin Module
* manage all users (block, unblock).
* manage blood bank and transactions of blood.
## Installation

1) It has two folders **client** and **server**.
2) client folder has front end code ( **React** ).
3) server folder has backend code (**Spring Boot**)
3) **MYSQL Database should be created before starting the application.**

#### MYSQL DB Creation

1) Open the terminal. Execute the following command
```mysql
mysql -u root --protocol=tcp -p
```
2) It will be prompted for the password. Enter the password.
3) Create Database named **bloodbank** by the following command.
```mysql
create database bloodbank;
```

The name should be exactly correct.

#### Client Installation 
* Open the terminal. Initially, it will be in the root directory.
* Go to the client directory through the terminal by executing the following command
```bash
cd client 
```
* Install the necessary packages and libraries.
Use the package manager [npm](https://www.npmjs.com/) to install.

```bash
npm install
```
* Start the client-server by the following command. It runs on **PORT 8080**

```bash
npm start
```
#### Server Installation 

* Open a new terminal. Initially, it will be in the root directory.
* Go to the server directory through the terminal by executing the following command
```bash
cd server
```
* Install the necessary packages and libraries.
Use the package manager [mvn](https://mvnrepository.com/) to install.

```bash
mvn clean install
```
* Start the server with the following command. It runs on **PORT 8081**

```bash
mvn spring-boot:run
```

