import { Optional, OptionalChildren } from '../shared/serializerHelper';
import * as Model from './model'
import { ISerializeable, Serialize } from '../shared/iserializeable';
import { Group } from './group';

export interface IHealthCheck {
    name: string;
    url: string;
    /**
     * The interval is a number of seconds (default 60s)
     */
    interval?: string;
    /**
     * the timeout is a number of milliseconds (default 0ms)
     */
    timeout?: string;
}

export class HealthCheck implements ISerializeable {
    
    private name: string;
    private url: string;
    /**
     * The interval is a number of seconds (default 60s)
     */
    private interval?: string;
    /**
     * the timeout is a number of milliseconds (default 0ms)
     */
    private timeout?: string;

    constructor(healthCheck: IHealthCheck) {
        this.name = healthCheck.name;
        this.url = healthCheck.url;
        this.interval = healthCheck.interval;
        this.url = healthCheck.url;
    }

    public serialize(parentContext: 'model' | 'views') {
        return Serialize(`healthCheck "${this.name}" "${this.url}" ${Optional(this.interval)} ${Optional(this.timeout)}`);
    }
}
