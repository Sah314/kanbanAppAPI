    const routes = require('./routes');
    const bodyParser = require("body-parser");
    const express =require("express");
    const db=require("./utils/connection");
    const cors = require('cors');
    const app  =express();

    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    async function startServer() {
        try {
          await db.connect();
          app.use('/', routes);
          app.listen(5000, (err) => {
            if (err) {
              console.log('Error in server', err);
            } else {
              console.log(`Server is running on port 5000`);
            }
          });
        } catch (error) {
          console.error('Error connecting to the database:', error);
        }
      }
      
      startServer();