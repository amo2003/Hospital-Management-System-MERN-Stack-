import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import './ImgUploder.css';

function ImguploderPage() {
    const [image, setImage] = useState(null);
    const [allImage, setAllImage] = useState(null);

  const submitImg = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);

    try {
        const result = await axios.post(
            "http://localhost:5000/uplodeImage",
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );

        console.log(result.data); 
        alert("Image uploaded!");
        getImage(); 
    } catch (error) {
        console.error("Upload failed:", error);
        alert("Upload error: " + error.message);
    }
};


    const onImgChange = (e) => {
        setImage(e.target.files[0]);
    };

    const getImage = async() => {
        try{
            const result = await axios.get("http://localhost:5000/getImage");
            setAllImage(result.data.data);
        }catch(e){
            console.log("Err getting image", e);
        }
    };

    useEffect(() => {
        getImage();
    },[]);

  return (
    <div>
      <div className="image-uploader-page">
      <div className="image-upload-card">
        <h1>Upload Image</h1>
        <form onSubmit={submitImg}>
            <input type="file" accept='image/*' onChange={onImgChange}></input>
            <button type="submit">Upload</button>
        </form>

        </div>
    <div className="image-gallery">
        {allImage === null ? "" : allImage.map((data, index) => (
    <img
        key={index}
        src={`http://localhost:5000/files/${data.Image}`}  // use 'Image' if schema uses 'Image'
        height={200}
        width={200}
        alt=""
        style={{ margin: "10px" }}
    />
))}

      </div>
    </div>
    </div>
  );
}

export default ImguploderPage;
