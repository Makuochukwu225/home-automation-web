import React from 'react'
import TemperatureSensorComponent from "@/components/TemperatureSensorComponent";
import LightSensorComponent from "@/components/LightSensorComponent";
import TimestampComponent from "@/components/TimestampComponent";
import {Device} from "@/types/device";

interface DeviceListProp {
    devices: Device[];
    togglePin: (deviceId: string, pinId: number, currentState: string) => void;
    assignedPin: (deviceId: string, pinId: number, loadType: string) => void;
}

export default function DevicesListComponent({devices,togglePin,assignedPin}:DeviceListProp) {
    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
            {devices.length === 0 ? (
                <p className="text-gray-500 text-center col-span-full">
                    No devices connected
                </p>
            ) : (
                devices.map((device) => (
                    <div
                        key={device.id}
                        className={`bg-white shadow-md rounded-lg p-6 flex flex-col ${
                            device.online === false ? "opacity-60" : ""
                        }`}
                    >
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-semibold text-blue-500 break-words">
                                {device.id}
                            </h2>
                            <span
                                className={`h-3 w-3 rounded-full ${
                                    device.online !== false ? "bg-green-500" : "bg-gray-400"
                                }`}
                            ></span>
                        </div>

                        {device.capabilities && (
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold mb-1 text-gray-700">Capabilities:</h3>
                                <p className="text-gray-600">{device.capabilities}</p>
                            </div>
                        )}

                        <div className="mt-4">
                            <h3 className="text-lg font-semibold mb-1 text-gray-700">Pins:</h3>
                            {device.pins && device.pins.length > 0 ? (
                                device.pins.map((pin) => (
                                    <div key={pin.id} className="flex justify-between items-center py-1">
                                        <span className="text-gray-600">
                                            Pin {pin.id} {pin.loadType ? ` (${pin.loadType})` : ''}:
                                        </span>
                                        <button
                                            onClick={() => assignedPin(device.id, pin.id, "LED")}
                                            className={`px-4 py-2 rounded-full cursor-pointer text-sm font-bold transition-colors ${
                                                pin.loadType
                                                    ? "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                                                    : "bg-gray-700 text-white hover:bg-gray-800"
                                            } ${pin.loadType ? "cursor-not-allowed" : ""}`}
                                        >
                                            {pin.loadType ? "Assigned" : "Assign"}
                                        </button>

                                        <button
                                            onClick={() => togglePin(device.id, pin.id, pin.state)}
                                            disabled={device.online === false}
                                            className={`px-4 py-2 rounded-full cursor-pointer text-sm font-bold transition-colors ${
                                                pin.value || pin.state === "HIGH"
                                                    ? "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
                                                    : "bg-gray-700 text-white hover:bg-gray-800"
                                            } ${device.online === false ? "cursor-not-allowed" : ""}`}
                                        >
                                            {pin.value || pin.state === "HIGH" ? "ON" : "OFF"}
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-600">No pins available for this device</p>
                            )}
                        </div>

                        <TemperatureSensorComponent device={device}/>

                        <LightSensorComponent device={device}/>

                        <TimestampComponent device={device}/>


                    </div>
                ))
            )}
        </div>
    )
}
