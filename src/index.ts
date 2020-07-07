import {MongoClient} from "mongodb";
import {ILoggerChannel} from "ts-composite-logger";
import {ILogMessage} from "ts-composite-logger";

export class MongoDB implements ILoggerChannel {
    private readonly connectUrl: string;
    private readonly dbName: string;
    private readonly collectionName: string;
    private client;

    constructor(url: string, db: string, collection: string) {
        this.connectUrl = url;
        this.dbName = db;
        this.collectionName = collection;
    }

    public async write(message: ILogMessage) {
        if (!this.client) {
            throw new Error("Channel not connected to DB");
        }

        const db = this.client.db(this.dbName);
        const collection = db.collection(this.collectionName);
        await this.insert(collection, message);
    }

    private insert(collection, message: ILogMessage) {
        return new Promise((resolve, reject) => {
            collection.insertOne(message, (error, result) => {
                if (error) {
                    return reject(error);
                }

                return resolve();
            });
        });
    }

    public connect(): Promise<ILoggerChannel> {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.connectUrl, { useNewUrlParser: true }, (err, client) => {
                if (err) {
                    return reject(err);
                }

                this.client = client;
                resolve(this);
            });
        });
    }
}
