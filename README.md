# Sweet Shop 🍭

A full-stack web application for a Sweet Shop where users can browse, select, and purchase sweets online. The app features a modern, interactive frontend built with React and Tailwind CSS, and a robust backend powered by Spring Boot and MongoDB.  

---

## **Table of Contents**
- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Setup Instructions](#setup-instructions)
- [Backend](#backend)
- [Frontend](#frontend)
- [Screenshots](#screenshots)
- [My AI Usage](#my-ai-usage)
- [Test Reports](#test-reports)
- [License](#license)

---

## **Project Overview**

Sweet Shop is designed to provide users with a seamless online candy and sweet shopping experience. Key functionalities include:

- User registration and login
- Browse, search, and filter sweets
- Add sweets to cart and checkout
- Real-time updates for cart and stock availability
- Interactive hero section with animated sweets

---

## **Features**

- **Responsive Design:** Works on desktop, tablet, and mobile.  
- **Interactive Hero Section:** Background animations with changing sweets, typewriter effect, and floating candy icons.  
- **User Management:** Registration and login with form validation.  
- **Shopping Cart & Checkout:** Add, remove, and purchase sweets.  
- **Real-time Updates:** Cart, stock, and notifications update without refreshing the page.  

---

## **Technology Stack**

| Layer       | Technology                                                 |
|------------ |------------------------------------------------------------|
| Frontend    | ReactJS, Tailwind CSS, React Router                        |
| Backend     | Spring Boot, Java, MySQL                                   |
| Versioning  | Git, GitHub                                                |
| Tools       | VS Code, IntelliJ IDEA , PostMan                           |

-----------------------------------------------------------------------------

## **Setup Instructions**

### **Backend**

1. Navigate to backend folder:
   ```bash
   cd backend
2. Install Dependencies
    mvn clean install

3. Configure MySQL connection in application.properties:
   # MySQL Database Configuration
    spring.datasource.url=jdbc:mysql://localhost:your_port_number/sweetshop
    spring.datasource.username=root
    spring.datasource.password=yourpassword
    spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

    # JPA / Hibernate
    spring.jpa.hibernate.ddl-auto=update
    spring.jpa.show-sql=true
    spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect 

4. Run the Spring Boot application:
    mvn spring-boot:run

5. API endpoints will be available at http://localhost:8080.

Frontend (ReactJS)

1. Navigate to frontend folder:
    cd frontend

2. Install dependencies:
    npm install

3. Start development server:
    npm run dev or npm start

4. Open browser at http://localhost:your_frontend_port.
    Note: Ensure backend is running before using the frontend for API requests.

## SCREENSHOTS
Hero-section
Footer
Login
Register
DashBoard
AdminPanel


## My AI Usage

I used AI responsibly to augment development, not replace it.

Tools Used:

ChatGPT, Gemini, Lovable

How I Used AI:

Generated boilerplate code for backend controllers and services.

Generated Json Data for Testing backend services Endpoints in PostMan.

Assisted in writing frontend JSX components for the hero section and reusable card components.

Suggested Tailwind CSS layouts and animations.

Reflection:

AI accelerated the initial setup and boilerplate generation.

I carefully reviewed and modified all AI-generated code to ensure it matched my project’s architecture and best practices.

This workflow allowed me to focus on implementing core business logic instead of writing repetitive boilerplate.

## Test Reports

## Backend API Testing:
I used Postman to test all backend API endpoints, including:

User registration and login
CRUD operations for sweets
Cart functionality
Example API Test Results in Postman:

Endpoint	        Method	    Status	    Notes
/api/users/register	POST	    201	        User created successfully
/api/users/login	POST	    200	        Returns JWT token
/api/sweets	        GET	        200	        Returns all sweets
/api/sweets/add	    POST	    200	        Adds sweet to cart
/api/sweets/remove	DELETE	    200	        Removes sweet from cart
/api/sweets/update  PUT         200         Upadte sweet data


## License
This project is for educational purposes. All rights reserved.

GitHub Repository: https://github.com/Aditi1318/Sweet-Shop-App
VERCEL LINK https://sweet-shop-app.vercel.app/