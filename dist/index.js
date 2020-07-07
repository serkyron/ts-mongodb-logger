"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class MongoDB {
    constructor(url, db, collection) {
        this.connectUrl = url;
        this.dbName = db;
        this.collectionName = collection;
    }
    write(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.client) {
                throw new Error("Channel not connected to DB");
            }
            const db = this.client.db(this.dbName);
            const collection = db.collection(this.collectionName);
            yield this.insert(collection, message);
        });
    }
    insert(collection, message) {
        return new Promise((resolve, reject) => {
            collection.insertOne(message, (error, result) => {
                if (error) {
                    return reject(error);
                }
                return resolve();
            });
        });
    }
    connect() {
        return new Promise((resolve, reject) => {
            mongodb_1.MongoClient.connect(this.connectUrl, { useNewUrlParser: true }, (err, client) => {
                if (err) {
                    return reject(err);
                }
                this.client = client;
                resolve(this);
            });
        });
    }
}
exports.MongoDB = MongoDB;
//# sourceMappingURL=index.js.map