
## Node.js application for Recipe app



This Node.js server provides the essential server functionality for the recipe website, enabling seamless interaction with the platform's features and content.

## Key Features
* **Using Express.js frame work.**
* **Postgresql in Node.js server.**
* **Middle ware for user authentication.**
* **Implements JWT token-based authorization.**
* **Follows MVC Architecture**
* **Rest ful API**


## Requirements

* Node 15 and above
* NPM 8 and above
* postgresql(pg-Admin, SQL-shell)

## Common setup

<ol>
  <li>Create new folder</li>
  <li>Open code editor(eg. vs code) in the newly created folder </li>
  <li>Open Terminal</li>
</ol>

Enter the command in the terminal
```bash
git init 
```

Clone the repo and install the dependencies.

```bash
git clone https://github.com/Abhinavabhi123/recipe_for_you_backend.git
cd recipe_for_you_frontend
```

```bash
npm install
```
---
* Open SQL shell 
* Enter your postgresql user name and password for get access to the        database.
* Open <em><strong> database.sql</strong></em> folder 
* Run the SQL command one by one
  ```apache
  CREATE DATABASE  recipe;
    ```
  ```apache
  \c recipe;
  ```
  ```apache
      CREATE TABLE  users (
      id serial PRIMARY KEY NOT NULL,
      name VARCHAR (80) NOT NULL,
      email VARCHAR (100) NOT NULL,
      image  VARCHAR (200) NOT Null,
      recipes text[] UNIQUE 
     );
  ```

## Start server

To start the express server, run the following command in the terminal

```bash
npm start
```
Then,

The server will run in [http://localhost:4000](http://localhost:400), There you can see the successful message in the terminal 

<br>
<br>
<br>
<br>
