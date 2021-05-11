import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import "./upload.css"


const UploadClip = () => {
    const history = useHistory(); // so that we can redirect after the image upload is successful
    const [clip, setClip] = useState(null);
    const [clipLoading, setClipLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("clip", clip);
        formData.append("title", title);
        formData.append("description",description)

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setClipLoading(true);

        const res = await fetch('/api/upload', {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            await res.json();
            setClipLoading(false);
            history.push("/");
        }
        else {
            setClipLoading(false);
            // a real app would probably use more advanced
            // error handling
            console.log("error");
        }
    }

    const updateClip = (e) => {
        const file = e.target.files[0];
        setClip(file);
    }

    return (
        <div className="uploadFormContainer" >
                <h1 className="uploadGreeting">Upload your clip here!</h1>
                <form className="uploadForm" onSubmit={handleSubmit}>
                    <input
                    type="file"
                    accept="clip/*"
                    onChange={updateClip}
                    className="fileUpload"
                    />
                    <textarea
                    type='text'
                    placeholder='Title'
                    value={title}
                    className="uploadTitle"
                    onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                    type='text'
                    placeholder='Description'
                    className="uploadDescription"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />

                    <button className="uploadSubmit" type="submit">Submit</button>
                    {(clipLoading)&& <p>Loading...</p>}
                </form>
            </div>
        )
}

export default UploadClip;
