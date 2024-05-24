import React, { useRef } from 'react';

function UploadImage() {
  const fileInput = useRef();
  const uploadImage = async () => {
    const file = fileInput.current.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      console.log('Image uploaded successfully');
    } else {
      console.error('Image upload failed');
    }

  };


  return (
    <div>
      <input type="file" ref={fileInput} accept="image/png" />
      <button onClick={uploadImage}>Upload</button>
    </div>
  );
}


export default UploadImage;