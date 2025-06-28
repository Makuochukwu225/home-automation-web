'use client';

import React, { useState, ChangeEvent } from 'react';

export default function Page() {
    const [file, setFile] = useState<File | null>(null);
    const [version, setVersion] = useState<string>('v1.0.0');
    const [uploading, setUploading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) setFile(selectedFile);
    };

    const handleUpload = async () => {
        if (!file) return alert('Please select a file.');

        setUploading(true);
        setError(null);
        setSuccess(false);

        try {
            const formData = new FormData();
            formData.append('file', file);

            // 1. Upload to Cloudinary (via backend)
            const uploadRes = await fetch('https://jay-rare-kindly.ngrok-free.app/api/v1/uploads', {
                method: 'POST',
                body: formData,
            });

            if (!uploadRes.ok) throw new Error('File upload failed');

            const uploadData = await uploadRes.json();

            console.log(uploadData);
            const cloudinaryUrl = uploadData?.data.secure_url;

            if (!cloudinaryUrl) throw new Error('Cloudinary URL missing');

            // 2. Save to firmware DB
            const firmwareRes = await fetch('https://jay-rare-kindly.ngrok-free.app/api/v1/firmware', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    version,
                    uploadedBy: 'admin', // Replace later with actual user
                    cloudinaryUrl,
                }),
            });

            if (!firmwareRes.ok) throw new Error('Failed to save firmware');

            setSuccess(true);
            setFile(null);
            setVersion('v1.0.0');
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-4">Upload Firmware</h2>

            {success && <p className="text-green-600 mb-4">Firmware uploaded successfully!</p>}
            {error && <p className="text-red-600 mb-4">{error}</p>}

            <div className="mb-4">
                <label className="block mb-1 font-medium">Version</label>
                <input
                    type="text"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Enter version (e.g. v1.0.0)"
                />
            </div>

            <div className="mb-4">
                <label className="block mb-1 font-medium">Firmware File</label>
                <input
                    type="file"
                    onChange={handleFileChange}
                    disabled={uploading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
            </div>

            <button
                onClick={handleUpload}
                disabled={uploading}
                className={`w-full py-2 font-semibold rounded-lg text-white ${
                    uploading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                } transition-colors`}
            >
                {uploading ? 'Uploading...' : 'Upload Firmware'}
            </button>
        </div>
    );
}
