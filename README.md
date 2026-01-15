# ChatApp Node.js

This is a simple ChatApp built using Node.js.

## Server-side Script Overview

This Node.js script implements a real-time chat application using Socket.IO. Here's a breakdown of its functionality:

- **Dependencies**: The script utilizes Express, HTTP, and Socket.IO.
- **Server Initialization**: It creates an Express server with Socket.IO attached.
- **Socket Connection**: Listens for new socket connections and handles events.
- **User Management**: Manages user joining, leaving, and tracking users in rooms.
- **Messaging**: Handles sending and receiving messages, including profanity filtering.
- **Private Messaging**: Allows users to send private messages to each other.
- **Location Sharing**: Supports sharing location data with other users.
- **Typing Indicators**: Implements typing indicators to notify other users.
- **Server Startup**: The server listens on a specified port and logs its status upon startup.

For detailed code explanation, refer to the provided server script.

## Screenshots

![Home](/screensshoots/home.gif)
![Nice Job](/screensshoots/userconnect.gif)

## Installation

To run the application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone [https://github.com/your-username/chatapp.git](https://github.com/dxtaner/chatApp-nodejs)
   ```

2. Navigate to the project directory:

   ```bash
   cd chatApp-nodejs
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm start
   ```

5. Open your web browser and navigate to `http://localhost:3042` to access the ChatApp.

## Technologies Used

- Node.js
- Express
- Socket.IO
- Bad Words (for profanity filtering)
- dotenv (for environment variables)

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the terms of the MIT license. See the [LICENSE](LICENSE) file for details.

## Links

- Repository: [[GitHub](https://github.com/your-username/chatapp)](https://github.com/dxtaner/chatApp-nodejs/)
