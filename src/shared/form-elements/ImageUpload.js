import React, { useRef, useState, useEffect } from 'react';

import Button from '../UIElements/Button'

import './ImageUpload.css'



const ImageUpload = props => {
  const filePickerRef = useRef();
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);


  useEffect(() => {

    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file])


  const pickedHandler = event => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);

  }

  const pickImageHandler = () => {
    filePickerRef.current.click()
  }

  return (
    <div className="form-control image-upload">

      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
        file={file}
      />
      <div className={`image-upload ${props.center && 'center'}`}>

        <div className="image-upload__preview">


          {props.img ? <img
            src={previewUrl || process.env.REACT_APP_IMAGE_ROUTE + props.img}
            alt="Preview"
          />
            :
            !previewUrl ? <p>Please pick an image.</p>
              :
              <img src={previewUrl} alt="Preview" />}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
            </Button>
      </div>

    </div>


  );
};

export default ImageUpload;
