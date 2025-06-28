"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { Download, AlertCircle, Edit } from "lucide-react"; // Import Lucide icons

export default function FirmwareList() {
    const [firmwares, setFirmwares] = useState([]);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFirmware, setSelectedFirmware] = useState<any>(null);
    const [newVersionFile, setNewVersionFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const fetchFirmwares = async () => {
            try {
                const response = await axiosInstance.get("/api/v1/firmware");
                setFirmwares(response.data);
            } catch (err: any) {
                setError(err.response?.data?.message || err.message);
            }
        };

        fetchFirmwares();
    }, []);

    const updateFirmwares = async (firmware: string) => {
        try {
            const response = await axiosInstance.post("/api/v1/update-firmware",{
                firmware: firmware,
            });

            console.log(response);

        } catch (err: any) {
            setError(err.response?.data?.message || err.message);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setNewVersionFile(file);
        }
    };

    const handleUpdateFirmware = async () => {
        if (!newVersionFile) {
            alert("Please select a firmware file to upload.");
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append("file", newVersionFile);

        try {
            const response = await axiosInstance.put(
                `/api/v1/firmware/${selectedFirmware._id}`,
                formData
            );
            alert("Firmware updated successfully!");
            setIsModalOpen(false); // Close the modal
            setUploading(false);
            setSelectedFirmware(null);
            setNewVersionFile(null);
            // Refresh the list
            const updatedFirmwares = await axiosInstance.get("/api/v1/firmware");
            setFirmwares(updatedFirmwares.data);
        } catch (err: any) {
            alert("Failed to update firmware: " + err.message);
            setUploading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-gradient-to-r from-indigo-50 to-white rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Uploaded Firmwares</h2>

            {error && (
                <div className="text-red-600 mb-4 flex items-center space-x-2 bg-red-100 p-3 rounded-lg">
                    <AlertCircle className="w-6 h-6" />
                    <span>{error}</span>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {firmwares.map((firmware: any) => (
                    <div
                        key={firmware._id}
                        className="p-6 border border-gray-300 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
                    >
                        <div className="mb-4">
                            <div className="text-lg font-semibold text-gray-800">
                                Version:{" "}
                                <span className="font-medium text-indigo-600">{firmware.version}</span>
                            </div>
                            <div className="text-sm text-gray-500">Uploaded By: {firmware.uploadedBy}</div>
                        </div>
                        <div className="flex items-center space-x-3 mb-4">
                            <a
                                href={firmware.cloudinaryUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="cursor-pointer inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                            >
                                <Download className="w-5 h-5 mr-2" />
                                Download Firmware
                            </a>
                            <button
                                onClick={() => {
                                    updateFirmwares(firmware)
                                    // setSelectedFirmware(firmware);
                                    // setIsModalOpen(true);
                                }}
                                className="cursor-pointer inline-flex items-center text-yellow-600 hover:text-yellow-800 font-medium transition-colors"
                            >
                                <Edit className="w-5 h-5 mr-2" />
                                Update Firmware
                            </button>
                        </div>
                        <div className="text-xs text-gray-400">
                            Uploaded on: {new Date(firmware.uploadDate).toLocaleString()}
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for updating firmware */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-2xl font-semibold mb-4">Update Firmware</h3>
                        <div className="mb-4">
                            <label htmlFor="newFirmware" className="block text-gray-700 mb-2">
                                Select New Firmware File
                            </label>
                            <input
                                type="file"
                                id="newFirmware"
                                onChange={handleFileChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                disabled={uploading}
                            />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="py-2 px-4 text-white bg-gray-400 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateFirmware}
                                disabled={uploading}
                                className={`py-2 px-4 text-white bg-blue-600 rounded-lg ${
                                    uploading ? "bg-gray-400" : "hover:bg-blue-700"
                                }`}
                            >
                                {uploading ? "Uploading..." : "Update"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
