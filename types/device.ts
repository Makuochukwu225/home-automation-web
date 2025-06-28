import {Pin} from "@/types/pin";

export interface Device {
    id: string;
    pins: Pin[];
    capabilities?: string;
    lastSeen: string;
    online: boolean;
    status?: Record<string, any>;
}
