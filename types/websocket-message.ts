import {Device} from "@/types/device";

 export  interface WebSocketMessage {
    type: string;
    devices?: Device[];
    deviceId?: string;
    pinId?: number;
    state?: string;
    sensor?: string;
    value?: boolean;
    device?: Device;
    update?: any;
    error?: string;
    message?: string;
}
