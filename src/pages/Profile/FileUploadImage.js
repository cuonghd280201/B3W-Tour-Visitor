import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { imageDb } from '../../utils/firebase'; // Import Firebase Storage reference

const FileUploadImage = ({ setUploadedImageUrl }) => {
    const [img, setImg] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImg(file);
    };

    const handleUpload = async () => {
        if (!img) {
            console.error('No image selected.');
            return;
        }

        try {
            const imgRef = ref(imageDb, `files/${uuidv4()}`); // Reference with a unique UUID

            // Upload the image
            const snapshot = await uploadBytes(imgRef, img);
            console.log('File uploaded successfully!', snapshot);

            // Get the URL of the uploaded image
            const url = await getDownloadURL(imgRef);
            console.log('Image URL:', url);

            // Set the uploaded image URL
            setUploadedImageUrl(url);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default FileUploadImage;
