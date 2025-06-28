"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {Device} from "@/types/device";
import {WebSocketMessage} from "@/types/websocket-message";
// import {Device, WebSocketMessage} from "@/types";

// Define the context type
interface WebSocketContextType {
    socket: WebSocket | null;
    connected: boolean;
    error: string | null;
    lastMessage: MessageEvent | null;
    devices: Device[] | [];
}

// Create the context
const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

// WebSocket provider component
export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [connected, setConnected] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [lastMessage, setLastMessage] = useState<MessageEvent | null>(null);
    const [devices, setDevices] = useState<Device[]>([]);

    useEffect(() => {
        let ws: WebSocket;
        let reconnectTimer: NodeJS.Timeout;

        const connect = () => {
            ws = new WebSocket("wss://jay-rare-kindly.ngrok-free.app/");

            ws.onopen = () => {
                setConnected(true);
                setError(null);
            };

            ws.onmessage = (event: MessageEvent) => {
                const data: WebSocketMessage = JSON.parse(event.data);


                if (data.type === "devices_list" && data.devices){
                    setDevices(data.devices);
                }else if (data.type === "sensor_update" && data.deviceId){
                    setDevices(prevDevices =>
                        prevDevices.map(device => {
                            if (device.id === data.deviceId) {
                                return {
                                    ...device,
                                    status: {
                                        ...(device.status || {}),
                                        [data.sensor??""]: data.value
                                    }
                                };
                            }
                            return device;
                        })
                    );
                }

                console.log(data);
                setLastMessage(event);
            };

            ws.onclose = () => {
                setConnected(false);
                reconnectTimer = setTimeout(connect, 5000); // Try to reconnect after 5 seconds
            };

            ws.onerror = () => {
                setError("WebSocket error. Reconnecting...");
            };

            setSocket(ws);
        };

        connect();

        return () => {
            if (ws) ws.close();
            if (reconnectTimer) clearTimeout(reconnectTimer);
        };
    }, []);

    return (
        <WebSocketContext.Provider value={{ socket, connected, error, lastMessage,devices }}>
            {children}
        </WebSocketContext.Provider>
    );
};

// Custom hook to use the WebSocket context
export const useWebSocket = (): WebSocketContextType => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error("useWebSocket must be used within a WebSocketProvider");
    }
    return context;
};
