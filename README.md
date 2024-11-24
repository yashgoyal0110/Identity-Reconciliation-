This project is an **API-based identification service** that processes and handles data efficiently, offering robust error handling, modular code structure, and scalability. The API is hosted on [Render.com](https://render.com)
---

## API Endpoint

- **Identify Endpoint:**  
  `POST api/v1/identify`
  This endpoint handles identification requests by processing and validating the input data.


- **Complete API link:** 
  `https://identity-reconciliation-xpxz.onrender.com/api/v1/identify`

---

## Features

1. **Proper Error Handling:**  
   - All the operations are wrapped in `try-catch` blocks to ensure that runtime errors are caught and handled gracefully.  
   - Error messages are returned with appropriate HTTP status codes for better debugging and client communication.

2. **Modular Code Structure:**  
   - Queries are defined as separate functions in a dedicated file for easy reusability and clarity.  
   - Controllers are implemented in their respective files for handling business logic.  
   - Routing is managed using the `router` object to ensure clean and scalable code practices.

3. **Database and Query Management:**  
   - **Pool Query:**  
     The project uses **Node.js**'s `pg` library with a connection pool for executing database queries. This approach provides flexibility and efficiency.

4. **Prisma ORM:**
    - same project can also be done using ORMs like Prisma for easier interaction with database, but as it was not mentioned
    anywhere in the assignment to use ORMs that's why it implemented using Pool Query method

5. **Table Schema:**
   The database table schema used for the project is as follows:  

```sql
CREATE TABLE Contact (
    id INT AUTO_INCREMENT PRIMARY KEY,
    phoneNumber VARCHAR(15),
    email VARCHAR(255),
    linkedId INT DEFAULT NULL,
    linkPrecedence ENUM('primary', 'secondary') NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt DATETIME DEFAULT NULL
);
```
   
     
## Project Structure

```
Identity-Reconciliation/
│
├── config/
│   └── db.js                  # Database connection and credentials
│
├── controllers/
│   └── controller.js          # Contains route-specific business logic
│
├── query/
│   └── query.js               # Contains modular query functions
│
├── routes/
│   └── route.js               # Defines the API routes using the router object
│
├── node_modules/              # Dependency folder (excluded from Git via .gitignore)
│
├── server.js                  # Entry point of the application
├── package.json               # Project dependencies and scripts
├── package-lock.json          # Auto-generated file for exact dependency versions
├── .env                       # Environment variables (not included in version control)
└── .gitignore                 # Specifies files and folders to be excluded from Git
```



## How to Run

1. Clone the repository
2. cd `Identity-Reconciliation-`
3. npm install
4. set up database and schema as provided
5. write credentials in db.js file or get them from .env
5. node server.js --> run command to start the server
