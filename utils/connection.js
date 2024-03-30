import { connections, disconnect as _disconnect, connect as _connect } from "mongoose";
import { config } from "dotenv";
config({path:'.env'});  


const connection = {};
export async function connect() {
    if (connection.isConnected) {
      console.log('already connected');
      return;
    }
    if (connections.length > 0) {
      connection.isConnected = connections[0].readyState;
      if (connection.isConnected === 1) {
        console.log('use previous connection');
        return;
      }
      await _disconnect();
    }
    const db = await _connect(process.env.MONGODB_URI,{useNewUrlParser: true,
      useUnifiedTopology: true});
    console.log('new connection');
    connection.isConnected = db.connections[0].readyState;
  }
  
  export async function disconnect() {
    if (connection.isConnected) {
      if (process.env.NODE_ENV === 'production') {
        await _disconnect();
        connection.isConnected = false;
      } else {
        console.log('not disconnected');
      }
    }
  }
const db = {connect,disconnect}
export default db;