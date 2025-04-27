type DeviceStatusValue = string | number | boolean | null | undefined;

export interface DeviceStatus {
    [key: string]: DeviceStatusValue;
}

export interface Device {
    id: string;
    capabilities: string;
    status?: DeviceStatus;
    lastSeen: string | Date;
    pins: Pin[];
}

export interface DeviceUpdateData {
    type: string;
    sensor?: string;
    component?: string;
    state?: boolean;
    value?: string;
}

export interface Pin {
    id: number;
    mode: "input" | "output" | "sensor";
    value: boolean | number | null;
    state: string;
}

export interface WebSocketMessage {
    type: string;
    devices?: Device[];
    device?: Device;
    deviceId?: string;
    update?: DeviceUpdateData;
}
