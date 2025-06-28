
import React from 'react'
import {Device} from "@/types/device";

interface LightSensorComponentProps {
    device: Device;
}

export default function LightSensorComponent({device}:LightSensorComponentProps) {
    return (
        <div>
            {device.status && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-1 text-gray-700">Sensors:</h3>
                    {device.status.light !== undefined && (
                        <div className="flex flex-col">
                            <div className="flex justify-between items-center">
                                <span>Light Intensity:</span>
                                <span className="font-medium">{device.status.light}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                                <div
                                    className="bg-yellow-400 h-2.5 rounded-full"
                                    style={{ width: `${device.status.light}%` }}
                                ></div>
                            </div>
                        </div>
                    )}
                </div>
            )}

        </div>
    )
}
