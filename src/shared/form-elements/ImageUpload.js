import React, { useRef, useState, useEffect } from 'react';
/* we use the useRef here to reference an actual DOM element(the image upload input element) */
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
      /* if a file upload is not done there is no point of continuing so we exit the function */
    }
    const fileReader = new FileReader(); //browser API
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
    /* notice how the API is being used to have a preview of a file */
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
    /* we get a function on onInput and we pass in above arguments */

  }

  const pickImageHandler = () => {
    filePickerRef.current.click()
    /* this induces the click event. so we can utilize the input element(which is invisible otherwise) */
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
      />
      <div className={`image-upload ${props.center && 'center'}`}>

        <div className="image-upload__preview">

          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
            </Button>
      </div>

    </div>


  );
};

export default ImageUpload;
