"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

// Define the context type
interface WebSocketContextType {
    socket: WebSocket | null;
    connected: boolean;
    error: string | null;
    lastMessage: MessageEvent | null;
}

// Create the context
const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

// WebSocket provider component
export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [connected, setConnected] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [lastMessage, setLastMessage] = useState<MessageEvent | null>(null);

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
        <WebSocketContext.Provider value={{ socket, connected, error, lastMessage }}>
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
