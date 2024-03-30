    import routes from './routes/index.js';
    import bodyParser from "body-parser";
    import express from "express";
    import { connect } from "./utils/connection.js";
    import logger from './utils/logger.js';
    import cors from 'cors';
    const app =express();

    const corsOptions = {
      origin: 'http://localhost:3000',
      credentials: true, // Enable credentials (cookies)
    };
    
    app.use(cors(corsOptions));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    async function startServer() {
        try {
          await connect();
          app.use('/', routes);
          app.listen(5000, (err) => {
            if (err) {
              console.log('Error in server', err);
            } else {
              logger.info(`Server is running on port 5000`);
            }
          });
        } catch (error) {
          console.error('Error connecting to the database:', error);
        }
      }
      
      startServer();