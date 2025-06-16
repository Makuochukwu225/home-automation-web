"use client";

import { HomePage } from "@/components/Homepage";

export default function App() {
  return (<div className="  w-full h-full  overflow-hidden overflow-y-scroll scrollbar-hide px-1">
    <HomePage/>
  </div>)
}

// import { useEffect, useState } from "react";

// // Define types for TypeScript
// interface Pin {
//   id: number;
//   state: string;
//   mode: string;
//   value: boolean;
//   loadType?: string;
// }

// interface Device {
//   id: string;
//   pins: Pin[];
//   capabilities?: string;
//   lastSeen: string;
//   online: boolean;
//   status?: Record<string, any>;
// }

// interface WebSocketMessage {
//   type: string;
//   devices?: Device[];
//   deviceId?: string;
//   pinId?: number;
//   state?: string;
//   sensor?: string;
//   value?: boolean;
//   device?: Device;
//   update?: any;
//   error?: string;
//   message?: string;
// }

// export default function Home() {
//   const [devices, setDevices] = useState<Device[]>([]);
//   const [connected, setConnected] = useState<boolean>(false);
//   const [socket, setSocket] = useState<WebSocket | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     let ws: WebSocket;
//     let reconnectTimer: NodeJS.Timeout;

//     const connectWebSocket = () => {
//       if (typeof window !== "undefined") {
//         ws = new WebSocket("wss://jay-rare-kindly.ngrok-free.app/");

//         ws.onopen = () => {
//           console.log("Connected to WebSocket server");
//           setConnected(true);
//           setError(null);
//         };

//         ws.onmessage = (event: MessageEvent) => {
//           try {
//             const data: WebSocketMessage = JSON.parse(event.data);
//             console.log("Received:", data);

//             if (data.type === "devices_list" && data.devices) {
//               console.log("Devices list received:", data.devices);
//               setDevices(data.devices);
//             }
//             else if (data.type === "pin_state_update" && data.deviceId && data.pinId !== undefined) {
//               console.log(`Pin update for ${data.deviceId}: Pin ${data.pinId} -> ${data.state}`);

//               setDevices(prevDevices =>
//                   prevDevices.map(device => {
//                     if (device.id === data.deviceId) {
//                       return {
//                         ...device,
//                         pins: device.pins.map(pin => {
//                           if (pin.id === data.pinId) {
//                             return {
//                               ...pin,
//                               state: data.state || pin.state,
//                               value: data.value !== undefined ? data.value : (data.state === "HIGH")
//                             };
//                           }
//                           return pin;
//                         })
//                       };
//                     }
//                     return device;
//                   })
//               );
//             }
//             else if (data.type === "error") {
//               setError(data.message || "Unknown error occurred");
//               console.error("Error from server:", data);
//             }
//             else if (data.type === "sensor_update" && data.deviceId && data.sensor) {
//               setDevices(prevDevices =>
//                   prevDevices.map(device => {
//                     if (device.id === data.deviceId) {
//                       return {
//                         ...device,
//                         status: {
//                           ...(device.status || {}),
//                           [data.sensor]: data.value
//                         }
//                       };
//                     }
//                     return device;
//                   })
//               );
//             }
//           } catch (error) {
//             console.error("Error parsing WebSocket message:", error);
//           }
//         };

//         ws.onclose = () => {
//           console.log("Disconnected from WebSocket server");
//           setConnected(false);

//           // Try to reconnect after 5 seconds
//           reconnectTimer = setTimeout(connectWebSocket, 5000);
//         };

//         ws.onerror = (error) => {
//           console.error("WebSocket error:", error);
//           setError("Connection error. Trying to reconnect...");
//         };

//         setSocket(ws);
//       }
//     };

//     // Initial connection
//     connectWebSocket();

//     // Initial REST API fetch (fallback if WebSocket not working)
//     const fetchDevices = async () => {
//       try {
//         const response = await fetch("https://jay-rare-kindly.ngrok-free.app/api/devices");
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         console.log("Fetched devices via API:", data);

//         if (data.devices && (!devices.length || !connected)) {
//           setDevices(data.devices);
//         }
//       } catch (err) {
//         console.error("Failed to fetch devices:", err);
//       }
//     };

//     fetchDevices();

//     // Cleanup on unmount
//     return () => {
//       if (ws) {
//         ws.close();
//       }
//       if (reconnectTimer) {
//         clearTimeout(reconnectTimer);
//       }
//     };
//   }, []);

//   const togglePin = (deviceId: string, pinId: number, currentState: string) => {
//     // Toggle the state
//     const newState = currentState === "HIGH" ? "LOW" : "HIGH";

//     console.log(`Toggling pin ${pinId} for device ${deviceId} from ${currentState} to ${newState}`);

//     // Optimistically update the UI
//     setDevices(prevDevices =>
//         prevDevices.map(device => {
//           if (device.id === deviceId) {
//             return {
//               ...device,
//               pins: device.pins.map(pin => {
//                 if (pin.id === pinId) {
//                   return {
//                     ...pin,
//                     state: newState,
//                     value: newState === "HIGH"
//                   };
//                 }
//                 return pin;
//               })
//             };
//           }
//           return device;
//         })
//     );

//     // Send command via WebSocket if connected
//     if (socket && socket.readyState === WebSocket.OPEN) {
//       socket.send(
//           JSON.stringify({
//             type: "command",
//             command: "toggle_pin",
//             deviceId,
//             pinId,
//             state: newState,
//           })
//       );
//     } else {
//       // Fallback to REST API if WebSocket is not available
//       fetch(`https://jay-rare-kindly.ngrok-free.app/api/devices/${deviceId}/command`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           command: "toggle_pin",
//           pinId,
//           state: newState,
//         }),
//       })
//           .then(response => {
//             if (!response.ok) {
//               throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             return response.json();
//           })
//           .then(data => {
//             console.log("Command sent successfully:", data);
//           })
//           .catch(err => {
//             console.error("Failed to send command:", err);
//             setError("Failed to send command. Please try again.");

//             // Revert the optimistic update on error
//             setDevices(prevDevices =>
//                 prevDevices.map(device => {
//                   if (device.id === deviceId) {
//                     return {
//                       ...device,
//                       pins: device.pins.map(pin => {
//                         if (pin.id === pinId) {
//                           return {
//                             ...pin,
//                             state: currentState,
//                             value: currentState === "HIGH"
//                           };
//                         }
//                         return pin;
//                       })
//                     };
//                   }
//                   return device;
//                 })
//             );
//           });
//     }
//   };

//   return (
//       <div className="min-h-screen flex flex-col items-center justify-start p-4 bg-gray-50">
//         <title>Home Automation Dashboard</title>

//         <main className="w-full max-w-6xl flex flex-col items-center">
//           <h1 className="text-4xl font-bold text-center my-6 text-blue-600">
//             Home Automation Dashboard
//           </h1>

//           <div className="mb-4 flex items-center space-x-4">
//           <span
//               className={`px-4 py-2 rounded-full text-white font-semibold ${
//                   connected ? "bg-green-500" : "bg-red-500"
//               }`}
//           >
//             {connected ? "Connected" : "Disconnected"}
//           </span>

//             {error && (
//                 <span className="px-4 py-2 rounded-full bg-yellow-500 text-white font-semibold">
//               {error}
//             </span>
//             )}
//           </div>

//           <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
//             {devices.length === 0 ? (
//                 <p className="text-gray-500 text-center col-span-full">
//                   No devices connected
//                 </p>
//             ) : (
//                 devices.map((device) => (
//                     <div
//                         key={device.id}
//                         className={`bg-white shadow-md rounded-lg p-6 flex flex-col ${
//                             device.online === false ? "opacity-60" : ""
//                         }`}
//                     >
//                       <div className="flex justify-between items-center">
//                         <h2 className="text-2xl font-semibold text-blue-500 break-words">
//                           {device.id}
//                         </h2>
//                         <span
//                             className={`h-3 w-3 rounded-full ${
//                                 device.online !== false ? "bg-green-500" : "bg-gray-400"
//                             }`}
//                         ></span>
//                       </div>

//                       {device.capabilities && (
//                           <div className="mt-4">
//                             <h3 className="text-lg font-semibold mb-1 text-gray-700">Capabilities:</h3>
//                             <p className="text-gray-600">{device.capabilities}</p>
//                           </div>
//                       )}

//                       <div className="mt-4">
//                         <h3 className="text-lg font-semibold mb-1 text-gray-700">Pins:</h3>
//                         {device.pins && device.pins.length > 0 ? (
//                             device.pins.map((pin) => (
//                                 <div key={pin.id} className="flex justify-between items-center py-1">
//                         <span className="text-gray-600">
//                           Pin {pin.id}
//                           {pin.loadType ? ` (${pin.loadType})` : ''}:
//                         </span>
//                                   <button
//                                       onClick={() => togglePin(device.id, pin.id, pin.state)}
//                                       disabled={device.online === false}
//                                       className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
//                                           pin.value || pin.state === "HIGH"
//                                               ? "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
//                                               : "bg-gray-700 text-white hover:bg-gray-800"
//                                       } ${device.online === false ? "cursor-not-allowed" : ""}`}
//                                   >
//                                     {pin.value || pin.state === "HIGH" ? "ON" : "OFF"}
//                                   </button>
//                                 </div>
//                             ))
//                         ) : (
//                             <p className="text-gray-600">No pins available for this device</p>
//                         )}
//                       </div>

//                       {device.status && Object.keys(device.status).length > 0 && (
//                           <div className="mt-4">
//                             <h3 className="text-lg font-semibold mb-1 text-gray-700">Sensor Data:</h3>
//                             {Object.entries(device.status).map(([key, value]) => (
//                                 <div key={key} className="flex justify-between items-center py-1">
//                                   <span className="text-gray-600 capitalize">{key}:</span>
//                                   <span className="font-medium">{value}</span>
//                                 </div>
//                             ))}
//                           </div>
//                       )}

//                       {device.status && (
//                           <div className="mt-4">
//                             <h3 className="text-lg font-semibold mb-1 text-gray-700">Sensors:</h3>
//                             {device.status.light !== undefined && (
//                                 <div className="flex flex-col">
//                                   <div className="flex justify-between items-center">
//                                     <span>Light Intensity:</span>
//                                     <span className="font-medium">{device.status.light}%</span>
//                                   </div>
//                                   <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
//                                     <div
//                                         className="bg-yellow-400 h-2.5 rounded-full"
//                                         style={{ width: `${device.status.light}%` }}
//                                     ></div>
//                                   </div>
//                                 </div>
//                             )}
//                           </div>
//                       )}

//                       <div className="mt-4 text-sm text-gray-500">
//                         Last seen: {new Date(device.lastSeen).toLocaleString()}
//                       </div>
//                     </div>
//                 ))
//             )}
//           </div>
//         </main>
//       </div>
//   );
// }
