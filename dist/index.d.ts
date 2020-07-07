import { ILoggerChannel } from "ts-composite-logger";
import { ILogMessage } from "ts-composite-logger";
export declare class MongoDB implements ILoggerChannel {
    private readonly connectUrl;
    private readonly dbName;
    private readonly collectionName;
    private client;
    constructor(url: string, db: string, collection: string);
    write(message: ILogMessage): Promise<void>;
    private insert;
    connect(): Promise<ILoggerChannel>;
}
