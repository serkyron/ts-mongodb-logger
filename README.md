# MongoDB log channel for composite logger  
Use this package in your applications for logging to MongoDB.
You can learn more about composite logger [here](https://www.npmjs.com/package/ts-composite-logger).  
    
**npm install -S ts-mongodb-logger**  
    
## Usage  
    
    import {Logger} from "ts-composite-logger";
    import {MongoDB} from "ts-mongodb-logger";
      
    const mongo = new MongoDB(
        "mongodb://serkyron:password@localhost:27017/?authMechanism=SCRAM-SHA-1&authSource=dbname",
        "dbname",
        "log",
    );
    
    mongo.connect()
      .catch((e) => {console.error(e.message)});
  	
    global.logger = (new Logger())
      .addChannel(mongo);
  		
    global.logger.info("VM connected");
