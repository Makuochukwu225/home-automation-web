"use client";

import { HomePage } from "@/components/Homepage";
import {useWebSocket} from "@/context/WebSocketProvider";


export default function App() {


  // const [devices, setDevices] = useState<Device[]>([]);
  // const [connected, setConnected] = useState<boolean>(false);
  // const [socket, setSocket] = useState<WebSocket | null>(null);
  // const [error, setError] = useState<string | null>(null);
  //
  // useEffect(() => {
  //   let ws: WebSocket;
  //   let reconnectTimer: NodeJS.Timeout;
  //
  //   const connectWebSocket = () => {
  //     if (typeof window !== "undefined") {
  //       ws = new WebSocket("wss://jay-rare-kindly.ngrok-free.app/");
  //
  //       ws.onopen = () => {
  //         console.log("Connected to WebSocket server");
  //         setConnected(true);
  //         setError(null);
  //       };
  //
  //       ws.onmessage = (event: MessageEvent) => {
  //         try {
  //           const data: WebSocketMessage = JSON.parse(event.data);
  //           console.log("Received:", data);
  //
  //           if (data.type === "devices_list" && data.devices) {
  //             console.log("Devices list received:", data.devices);
  //             setDevices(data.devices);
  //           }
  //           else if (data.type === "pin_state_update" && data.deviceId) {
  //             console.log(`Pin update for ${data.deviceId}:`);
  //
  //
  //           }
  //           else if (data.type === "error") {
  //             console.error("Error from server:", data);
  //           }
  //           else if (data.type === "sensor_update" && data.deviceId) {
  //
  //           }
  //         } catch (error) {
  //           console.error("Error parsing WebSocket message:", error);
  //         }
  //       };
  //
  //       ws.onclose = () => {
  //         console.log("Disconnected from WebSocket server");
  //         setConnected(false);
  //
  //         // Try to reconnect after 5 seconds
  //         reconnectTimer = setTimeout(connectWebSocket, 5000);
  //       };
  //
  //       ws.onerror = (error) => {
  //         console.error("WebSocket error:", error);
  //         setError("Connection error. Trying to reconnect...");
  //       };
  //
  //       setSocket(ws);
  //     }
  //   };
  //
  //
  //   // Initial connection
  //   connectWebSocket();
  //
  //   // Initial REST API fetch (fallback if WebSocket not working)
  //   const fetchDevices = async () => {
  //     try {
  //       const response = await fetch("https://jay-rare-kindly.ngrok-free.app/api/devices");
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       const data = await response.json();
  //       console.log("Fetched devices via API:", data);
  //
  //       if (data.devices && (!devices.length || !connected)) {
  //         setDevices(data.devices);
  //       }
  //     } catch (err) {
  //       console.error("Failed to fetch devices:", err);
  //     }
  //   };
  //
  //   fetchDevices();
  //
  //   // Cleanup on unmount
  //   return () => {
  //     if (ws) {
  //       ws.close();
  //     }
  //     if (reconnectTimer) {
  //       clearTimeout(reconnectTimer);
  //     }
  //   };
  // }, []);
  return (<div className="  w-full h-full  overflow-hidden overflow-y-scroll scrollbar-hide px-1">
    <HomePage/>
  </div>)
}
