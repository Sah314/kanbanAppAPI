const mongoose=require("mongoose");
const dotenv = require("dotenv");
dotenv.config({path:'.env'});  


const connection = {};
async function connect() {
    if (connection.isConnected) {
      console.log('already connected');
      return;
    }
    if (mongoose.connections.length > 0) {
      connection.isConnected = mongoose.connections[0].readyState;
      if (connection.isConnected === 1) {
        console.log('use previous connection');
        return;
      }
      await mongoose.disconnect();
    }
    console.log(process.env.MONGODB_URI);
    const db = await mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true,
      useUnifiedTopology: true});
    console.log('new connection');
    connection.isConnected = db.connections[0].readyState;
  }
  
  async function disconnect() {
    if (connection.isConnected) {
      if (process.env.NODE_ENV === 'production') {
        await mongoose.disconnect();
        connection.isConnected = false;
      } else {
        console.log('not disconnected');
      }
    }
  }
const db = {connect,disconnect}
module.exports= db;