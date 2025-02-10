
<a id="readme-top"></a>

<!-- ABOUT THE PROJECT -->
## About TodoApp project

[![Todo Page](Docsfiles/Todo_page.png)](Docsfiles/Todo_page.png)

The TodoApp is a full-stack web application built with React.js and C#, allowing users to manage a collection of todos efficiently. The system provides a user-friendly interface for performing CRUD operations (Create, Read, Update, Delete) on todos.

The frontend is developed using React.js for an interactive user experience.
The backend is powered by C#.NET to handle API requests and data management.

### Key Features:
- ✅ View a list of todos with detailed information.
- ✅ Add new Todo to the list of todos.
- ✅ Edit and update todo details.
- ✅ Delete todos from list of todos.

This system is ideal for managing a todo list, tracking todos, TodosAPP is designed with security in mind, ensuring data protection through user authentication. The backend is secured using JWT authentication, preventing unauthorized access.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## Built With

This project was built with:

### Frontend
- React.js – UI development library.
- React Router – Enables navigation within the app.
- Bootstrap – CSS Framework for developing responsive websites.
### Backend
- ASP.NET 8 – Framework for building scalable REST APIs.
- Entity Framework Core – ORM for database operations.
- JWT Authentication – Secure user authentication.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Prerequisites

Before starting the application, ensure you have the following installed:

* .NET 8 SDK – Download [https://dotnet.microsoft.com/en-us/download/dotnet/8.0](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
* Node.js – Download [https://nodejs.org/en](https://nodejs.org/en)
* npm (Node Package Manager) – Included with Node.js installation.

## Installation
Install project dependencies on your local machine. These commands install the necessary packages and their dependencies. Run the application using Docker or without Docker.

### Frontend
1. Go to project directory
    ```sh
   cd Frontend/todoapp
   ```
2. Install dependencies
   ```sh
   npm install
   ```
Run frontend using docker:

3. Build and run frontend
   ```sh
   docker build -t todoapp-frontend .
   docker run -p 3000:3000 todoapp-frontend
   ```
### Backend 
1. Go to project directory
    ```sh
   cd Backend/api
   ```
2. Install dependencies
   ```sh
   dotnet restore
   ```
Run backend using docker:

3. Build and run backend 
   ```sh
   docker build -t todoapp-backend .
   docker run -p 5252:5252 todoapp-backend
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## API Endpoints
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET    | /api/todo | Retrieve a list of all todos |
| GET    | /api/todo/{id} | Retrieve a specific todo by ID |
| POST   | /api/todo | Add a new todo |
| PUT    | /api/todo/{id} | Update an existing todo by ID |
| DELETE | /api/todo/{id} | Delete a todo by ID |

<!-- LICENSE -->
## License

Distributed under the Apache License 2.0. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>