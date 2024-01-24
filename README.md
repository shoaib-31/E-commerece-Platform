# E-commerece-Platform

### How to setup locally?

- First Cone the project.
- After Cloning the project, firstly `npm install` in both client and server.
- Then, in the server make a **.env** file with variables `PORT=8000`, `MONGODB_URI="your mongodb uri"`, `JWT_SECRET="your jwt secret"` and finally `STRIPE_KEY="your stripe private key'`.
- Then in client/clientconfig.jsx set `url:"http://localhost:8000"` and `stripePublic:"your stripe public key"`.
- Then, go to the terminal and then go the directory client and run `npm run dev` and then open a different terminal and then go the the directory server and run `nodemon server.js` or `node server.js`.

## About this project

This project is a E-commerce Platform which be used to buy and sell products where users can both become a simple customer or a Business Owner who can add his products. It has been build using MERN stack technology with redux toolkit for state management of the application.
