# Bitcoin Candle Microservice

This project is a microservice using NodeJs, Express, Typescript, RabbitMQ, Docker, PM2, Socket.io and other technologies. First start the API and generate-service, the API will try to connect to the MongoDB database, create a connection with the web socket, try to connect to a rabbitmq service and if everything returns successfully, generate starts a loop which will be viewing updates in the Crypto coins API and will return an updated bitcoin value to the API, the API will transport the data to a controller and update a database.
