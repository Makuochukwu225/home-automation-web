import React from 'react';
import {Device} from "@/types/device";

interface TimestampComponentProps {
    device: Device;
}

export default function TimestampComponent({device}:TimestampComponentProps) {
    return (
        <div>
            <div className="mt-4 text-sm text-gray-500">
                Last seen: {new Date(device.lastSeen).toLocaleString()}
            </div>
        </div>
    )
}
