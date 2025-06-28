import { Device } from '@/types/device';
import React from 'react';

interface TemperatureSensorComponentProps {
    device: Device;
}

export default function TemperatureSensorComponent({device}:TemperatureSensorComponentProps) {
    return (
        <div>
            {device.status && Object.keys(device.status).length > 0 && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-1 text-gray-700">Sensor Data:</h3>
                    {Object.entries(device.status).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center py-1">
                            <span className="text-gray-600 capitalize">{key}:</span>
                            <span className="font-medium">{value}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
