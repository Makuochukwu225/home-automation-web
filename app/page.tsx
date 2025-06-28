"use client";

import { useEffect, useState } from "react";
import {Device} from "@/types/device";
import {WebSocketMessage} from "@/types/websocket-message";
import LightSensorComponent from "@/components/LightSensorComponent";
import TemperatureSensorComponent from "@/components/TemperatureSensorComponent";
import TimestampComponent from "@/components/TimestampComponent";
import DevicesListComponent from "@/components/DevicesListComponent";




export default function Home() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [connected, setConnected] = useState<boolean>(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ws: WebSocket;
    let reconnectTimer: NodeJS.Timeout;

    const connectWebSocket = () => {
      if (typeof window !== "undefined") {
        ws = new WebSocket("wss://jay-rare-kindly.ngrok-free.app/");

        ws.onopen = () => {
          console.log("Connected to WebSocket server");
          setConnected(true);
          setError(null);
        };

        ws.onmessage = (event: MessageEvent) => {
          try {
            const data: WebSocketMessage = JSON.parse(event.data);
            console.log("Received:", data);

            if (data.type === "devices_list" && data.devices) {
              console.log("Devices list received:", data.devices);
              setDevices(data.devices);
            }
            else if (data.type === "pin_state_update" && data.deviceId && data.pinId !== undefined) {
              console.log(`Pin update for ${data.deviceId}: Pin ${data.pinId} -> ${data.state}`);

              setDevices(prevDevices =>
                  prevDevices.map(device => {
                    if (device.id === data.deviceId) {
                      return {
                        ...device,
                        pins: device.pins.map(pin => {
                          if (pin.id === data.pinId) {
                            return {
                              ...pin,
                              state: data.state || pin.state,
                              value: data.value !== undefined ? data.value : (data.state === "HIGH")
                            };
                          }
                          return pin;
                        })
                      };
                    }
                    return device;
                  })
              );
            }
            else if (data.type === "error") {
              setError(data.message || "Unknown error occurred");
              console.error("Error from server:", data);
            }
            else if (data.type === "sensor_update" && data.deviceId && data.sensor) {
              setDevices(prevDevices =>
                  prevDevices.map(device => {
                    if (device.id === data.deviceId) {
                      return {
                        ...device,
                        status: {
                          ...(device.status || {}),
                          [data.sensor]: data.value
                        }
                      };
                    }
                    return device;
                  })
              );
            }
          } catch (error) {
            console.error("Error parsing WebSocket message:", error);
          }
        };

        ws.onclose = () => {
          console.log("Disconnected from WebSocket server");
          setConnected(false);

          // Try to reconnect after 5 seconds
          reconnectTimer = setTimeout(connectWebSocket, 5000);
        };

        ws.onerror = (error) => {
          console.error("WebSocket error:", error);
          setError("Connection error. Trying to reconnect...");
        };

        setSocket(ws);
      }
    };

    // Initial connection
    connectWebSocket();

    // Initial REST API fetch (fallback if WebSocket not working)
    const fetchDevices = async () => {
      try {
        const response = await fetch("https://jay-rare-kindly.ngrok-free.app/api/devices");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched devices via API:", data);

        if (data.devices && (!devices.length || !connected)) {
          setDevices(data.devices);
        }
      } catch (err) {
        console.error("Failed to fetch devices:", err);
      }
    };

    fetchDevices();

    // Cleanup on unmount
    return () => {
      if (ws) {
        ws.close();
      }
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
      }
    };
  }, []);

  const togglePin = (deviceId: string, pinId: number, currentState: string) => {
    // Toggle the state
    const newState = currentState === "HIGH" ? "LOW" : "HIGH";

    console.log(`Toggling pin ${pinId} for device ${deviceId} from ${currentState} to ${newState}`);

    // Optimistically update the UI
    setDevices(prevDevices =>
        prevDevices.map(device => {
          if (device.id === deviceId) {
            return {
              ...device,
              pins: device.pins.map(pin => {
                if (pin.id === pinId) {
                  return {
                    ...pin,
                    state: newState,
                    value: newState === "HIGH"
                  };
                }
                return pin;
              })
            };
          }
          return device;
        })
    );

    // Send command via WebSocket if connected
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
          JSON.stringify({
            type: "command",
            command: "toggle_pin",
            deviceId,
            pinId,
            state: newState,
          })
      );
    } else {
      // Fallback to REST API if WebSocket is not available
      fetch(`https://jay-rare-kindly.ngrok-free.app/api/devices/${deviceId}/command`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          command: "toggle_pin",
          pinId,
          state: newState,
        }),
      })
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log("Command sent successfully:", data);
          })
          .catch(err => {
            console.error("Failed to send command:", err);
            setError("Failed to send command. Please try again.");

            // Revert the optimistic update on error
            setDevices(prevDevices =>
                prevDevices.map(device => {
                  if (device.id === deviceId) {
                    return {
                      ...device,
                      pins: device.pins.map(pin => {
                        if (pin.id === pinId) {
                          return {
                            ...pin,
                            state: currentState,
                            value: currentState === "HIGH"
                          };
                        }
                        return pin;
                      })
                    };
                  }
                  return device;
                })
            );
          });
    }
  };

  const  assignedPin = (deviceId: string, pinId: number, loadType: string)=>{
if (socket && socket.readyState === WebSocket.OPEN){
  socket.send(
      JSON.stringify({
        type: "assign_load",
        command: "toggle_pin",
        deviceId,
        pinId,
        loadType: loadType,
      })
  );
}
  }

  return (
      <div className="min-h-screen flex flex-col items-center justify-start p-4 bg-gray-50">
        <title>Home Automation Dashboard</title>

        <main className="w-full max-w-6xl flex flex-col items-center">
          <h1 className="text-4xl font-bold text-center my-6 text-blue-600">
            Home Automation Dashboard
          </h1>

          <div className="mb-4 flex items-center space-x-4">
          <span
              className={`px-4 py-2 rounded-full text-white font-semibold ${
                  connected ? "bg-green-500" : "bg-red-500"
              }`}
          >
            {connected ? "Connected" : "Disconnected"}
          </span>

            {error && (
                <span className="px-4 py-2 rounded-full bg-yellow-500 text-white font-semibold">
              {error}
            </span>
            )}
          </div>

        <DevicesListComponent devices={devices} togglePin={togglePin} assignedPin={assignedPin}/>
        </main>
      </div>
  );
}
