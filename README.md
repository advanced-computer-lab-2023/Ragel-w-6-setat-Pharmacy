# Pharma Space (Virtual Pharmacy)
![App Screenshot](https://media.discordapp.net/attachments/1157430089181577291/1159866558466773182/acl_pharma_2.png?ex=658edde8&is=657c68e8&hm=9b3bdb983cb4ac24d9e1109498ab29fadca90711c7767fd0214dbd73ef95089a&=&format=webp&quality=lossless&width=1307&height=482)
Pharma space is a comprehensive and innovative platform designed to enhance the efficiency and accessibility of healthcare services. The system caters to the needs of patients, pharmacists, and administrators, providing a seamless experience for managing medical information, prescriptions, and medication inventory.

## Motivation
The motivation behind this project stems from a deep commitment to enhancing healthcare accessibility. By creating a centralized platform, the goal is to make healthcare services readily available to a wider audience, ensuring patients can easily connect with pharmacists and access vital medical information.

## Build Status
TODO

## Code Style
This project follows a specific code style to ensure consistency and readability across the codebase. Adopting a consistent coding style is important for collaboration and maintenance.

We adhere to the [Standard Code Style Guide](https://standardjs.com/) for this project. Please review the guide before contributing to ensure that your code aligns with our established conventions.

## Screenshots
![Screenshot1](https://cdn.discordapp.com/attachments/1159865308102799441/1185783409600106629/Screenshot_2023-12-17_051232.png?ex=6590dddb&is=657e68db&hm=71edaceebecb50b8d41b01d3bb66398990c7bab32098bd17cc8fff173ea3fe60&)

![Screenshot2](https://mail.google.com/mail/u/0?ui=2&ik=6ae79bc92d&attid=0.3&permmsgid=msg-f:1785467382354526288&th=18c7411fdb49c050&view=att&disp=safe&realattid=f_lq8fzjmw2)

![Screenshot3](https://mail.google.com/mail/u/0?ui=2&ik=6ae79bc92d&attid=0.4&permmsgid=msg-f:1785467382354526288&th=18c7411fdb49c050&view=att&disp=safe&realattid=f_lq8fzjn03)

![Screenshot4](https://mail.google.com/mail/u/0?ui=2&ik=6ae79bc92d&attid=0.5&permmsgid=msg-f:1785467382354526288&th=18c7411fdb49c050&view=att&disp=safe&realattid=f_lq8fzjn44)

![Screenshot5](https://mail.google.com/mail/u/0?ui=2&ik=6ae79bc92d&attid=0.6&permmsgid=msg-f:1785467382354526288&th=18c7411fdb49c050&view=att&disp=safe&realattid=f_lq8fzjn85)

![Screenshot6](https://mail.google.com/mail/u/0?ui=2&ik=6ae79bc92d&attid=0.6&permmsgid=msg-f:1785497124882478045&th=18c75c2cd419f3dd&view=att&disp=safe&realattid=f_lq8wvcoz5)

![Screenshot7](https://mail.google.com/mail/u/0?ui=2&ik=6ae79bc92d&attid=0.3&permmsgid=msg-f:1785497200897582744&th=18c75c3e86f46698&view=att&disp=safe&realattid=f_lq8wx18v0)

## Tech/Framework used
- MERN Stack (MongoDB, Express.js, React.js, Node.js)
- JavaScript

## Key Features
**1. User Registration and Authentication:**
* Guests can register as patients, providing essential details such as username, name, email, password, date of birth, gender, and emergency contact information. 
* Pharmacists can submit requests for registration, including details like username, name, email, and professional qualifications.

**2. User Management:**
* Administrators have the ability to add or remove other administrators, ensuring smooth system operation.
* Removal of patients or pharmacists from the system is facilitated by administrators.

**3. Medicine Information:**
* Patients, pharmacists, and administrators can access a detailed list of available medicines, including images, prices, and descriptions.
* Pharmacists can view the quantity and sales data for each medicine.

**4. Cart Management and Checkout:**

* Patients can add both over-the-counter and prescription medicines to their cart.
* Multiple delivery addresses can be added and selected during the checkout process.
* Flexible payment options include wallet, credit card (using Stripe), or cash on delivery.

**5. Order Management:**

* Patients can view detailed order information, check the status, and cancel orders if needed.
* Pharmacies receive notifications for out-of-stock medicines and can manage inventory accordingly.

**6. Reporting and Analysis:**

* Administrators and pharmacists can generate total sales reports based on a chosen month.
* Pharmacists can filter sales reports based on specific medicines or dates.

**7. Communication Features:**

* A chat feature allows patients and pharmacists to communicate with each other.
* Pharmacists can also engage in doctor-patient communication.

**8. Wallet and Refunds:**

* Patients can view the amount in their wallet, including funds due to order cancellations.
* Pharmacists can track wallet funds related to monthly salary payments.

**9. Additional Functionalities:**

* Patients can view current and past orders, search for medicines, and explore alternatives for out-of-stock items.
* Pharmacists have the ability to archive and unarchive medicines, ensuring sales information is preserved.

## Code Examples
![Ex1](https://cdn.discordapp.com/attachments/1159865308102799441/1185780457913200640/image.png?ex=6590db1b&is=657e661b&hm=3d280f0be75961b6b37c6eb7743c58054e11cae034d2d9ea602f6c44b639c6c9&)

![Ex2](https://cdn.discordapp.com/attachments/1159865308102799441/1185780535730122782/image.png?ex=6590db2e&is=657e662e&hm=523f631585670f09b5241cd54d3c38a1574ef1e7542b51d6c40a22dbcd6ce970&)

![Ex3](https://cdn.discordapp.com/attachments/1159865308102799441/1185780606689362101/image.png?ex=6590db3f&is=657e663f&hm=01e125b3d9b4ae44a7958e33a9276cae5bbc72981e23e30224390ccbd17796b1&)

![Ex4](https://cdn.discordapp.com/attachments/1159865308102799441/1185780688834797588/image.png?ex=6590db52&is=657e6652&hm=ad2b65825d06ae1b7162ee0ebb7a5f83696ece330e4d1db072cf40d52b146bd2&)

![Ex5](https://cdn.discordapp.com/attachments/1159865308102799441/1185780760934883420/image.png?ex=6590db64&is=657e6664&hm=1ffab31ac590313012974918b8f7d3b45ba831fd505ab03c30b4b62b555cc729&)

## Installation
These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.
1. Click on `code` -> `Download ZIP`
2. Extract the zip file and open it in visual studio code.
3. Navigate to the `server` folder using the terminal and run the following command:

        npm install
4. Next, navigate to the `client` folder in the terminal and run the following command:
        
        npm install

### How To Use
To launch the project locally, follow these steps:

Navigate to the `server` folder using the terminal and run the following command:

        npm start

Next, navigate to the `client` folder in the terminal and run the following command:

        npm start

## API References
**1. Express.js(`express`)**
* **Description:** Web application framework for Node.js, used for building the backend server and handling HTTP requests.
* **Documentation:** [Express.js Documentation](https://expressjs.com/)

**2. Mongoose(`mongoose`)**
* **Description:** Elegant Object Data Modeling (ODM) library for MongoDB and Node.js, streamlining interaction with MongoDB.
* **Documentation:** [Mongoose Documentation](https://mongoosejs.com/)

**3. Axios(`axios`)**
* **Description:** Promise-based HTTP client for making HTTP requests, facilitating seamless communication with external APIs.
* **Documentation:** [Axios Documentation](https://axios-http.com/)

**4. Bcrypt(`bcrypt`)**
* **Description:** Library for hashing and salting passwords, fortifying the project's password security.
* **Documentation:** [Bcrypt Documentation](https://www.npmjs.com/package/bcrypt)

**5. Cors(`cors`)**
* **Description:** Middleware for Express.js enabling Cross-Origin Resource Sharing (CORS), granting controlled access to server resources.
* **Documentation:** [Cors Documentation](https://www.npmjs.com/package/cors/)

**6. Dotenv(`dotenv`)**
* **Description:** Zero-dependency module seamlessly loading environment variables from a `.env` file into `process.env`.
* **Documentation:** [Dotenv Documentation](https://www.npmjs.com/package/dotenv)

**7. Jsonwebtokens(`jsonwebtoken`)**
* **Description:** Robust library for creating and verifying JSON Web Tokens (JWT), a cornerstone for user authentication.
* **Documentation:** [Jsonwebtoken Documentation](https://www.npmjs.com/package/jsonwebtoken)

**8. Morgan(`morgan`)**
* **Description:** Express.js middleware providing an HTTP request logger, capturing essential information about incoming requests.
* **Documentation:** [Morgan Documentation](https://www.npmjs.com/package/morgan)

**9. Multer(`multer`)**
* **Description:** Middleware tailored for handling multipart/form-data, an essential tool for efficient file uploads.
* **Documentation:** [Multer Documentation](https://www.npmjs.com/package/multer)

**10. Nodemailer(`nodemailer`)**
* **Description:** Powerful module for sending emails, often utilized for tasks like dispatching confirmation emails.
* **Documentation:** [Nodemailer Documentation](https://nodemailer.com/about/)

**11. Nodemon(`nodemon`)**
* **Description:** Intelligent utility monitoring changes in source code and autonomously restarting the server.
* **Documentation:** [Nodemon Documentation](https://nodemon.io/)

**12. Socket.io(`^4.7.2`)**
* **Description:** Real-time bidirectional event-based communication library for Node.js. Facilitates real-time communication between web clients and servers.
* **Documentation:** [Socket.IO Documentation](https://socket.io/docs/v4/)

**13. Stripe(`@stripe/stripe-js` and `stripe`)**
* **Description:** Libraries dedicated to handling Stripe payments, a leading payment processing platform.
* **Documentation:** 
  - [Stripe.js Documentation](https://stripe.com/docs/payments/elements)
  - [Stripe Node.js Documentation](https://stripe.com/docs/payments/elements)


***For detailed information and usage instructions, refer to the official documentation linked above for each API.***

## Tests
To ensure the proper functioning of this project, you can perform various tests using tools like Postman. Below are some examples demonstrating how to test different aspects of the code.

***Prerequisites***
  - Before running the tests, make sure you have [Postman](https://www.postman.com/downloads/) installed on your machine.

![Ex1](https://cdn.discordapp.com/attachments/1159865308102799441/1185781458556702770/image.png?ex=6590dc0a&is=657e670a&hm=3c8f5b6849f52e70edafee868dc781b68079360474d001d849db7d86d339a9a4&)

![Ex2](https://cdn.discordapp.com/attachments/1159865308102799441/1185781507093184592/image.png?ex=6590dc16&is=657e6716&hm=39573f52ade0b3c1db3cdf6e7b981a3c9d98490293c2f8bbe6f92cb10dbe51ab&)

![Ex3](https://cdn.discordapp.com/attachments/1159865308102799441/1185781556950859846/image.png?ex=6590dc21&is=657e6721&hm=3ec87aaf1896c543524be3ae8269b72e73c1d889c564f60462765958e6ce5ee5&)

![Ex4](https://cdn.discordapp.com/attachments/1159865308102799441/1185781609773932594/image.png?ex=6590dc2e&is=657e672e&hm=a65e9ef8c99987ef371feb202da26fd4b05ded4b5f0ac861947026349c11c1f0&)

## Contribute
We welcome contributions from the community! If you'd like to contribute to the development of this project, follow these guidelines:

1. **Fork the Repository**: Click on the "Fork" button on the top right corner of this repository's page.

2. **Clone the Repository**: Clone the forked repository to your local machine using the following terminal command:

        git clone https://github.com/your-username/your-forked-repo.git

3. **Create a Branch:** Create a new branch for your contributions:
        
        git checkout -b feature/your-feature-name

4. **Make Changes:** Make your desired changes to the codebase.
5. **Commit Changes:** Commit your changes with a meaningful commit message:

        git commit -m "Add your meaningful commit message here"

6. **Push Changes:** Push your changes to your forked repository:

        git push origin feature/your-feature-name
7. **Create a Pull Request (PR):** Open a Pull Request against the main branch of the original repository. Provide a clear title and description for your changes.

8. **Code Review:** Participate in the code review process. Make any requested changes if needed.

9. **Merge:** Once your changes are approved, they will be merged into the main branch.

Thank you for contributing to our project! 🚀

## Credits
- [@02omar](https://github.com/02omar)
- [@Hauna9](https://github.com/Hauna9)
- [@shahdamerr](https://github.com/shahdamerr)
- [@LujainTa](https://github.com/LujainTa)
- [@habibahilal](https://github.com/habibahilal)
- [@mariamelgendy](https://github.com/mariamelgendy)
- [@sara2413](https://github.com/sara2413)

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
