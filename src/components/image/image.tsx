import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Uploadimage } from '../../redux/actions/image/uploadimage';
import { Box, Button, Grid, Input, Typography } from '@mui/material';
import { DeleteOutlined, DriveFolderUploadOutlined } from '@mui/icons-material';
import { useTheme } from '@emotion/react';
import { ShowLoader } from '../../redux/actions/loader';
import axios from 'axios';

export const Fileimage = (props : any) => {
  const WebSrn = localStorage.getItem('WebSrn') 
  const style = useTheme().palette.Components.uploadimage;
  const dispatch = useDispatch();
  const [link, setLink] = useState();
  const url = useSelector((state : any) => state.Api.Imagelink);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([`${url}/props.defaultImage`]);
  const [butnVisiablity, setButnVisiablity] = useState(true);
  const [imageName, setImageName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const allowedTypes = ['image/jpeg', 'image/png','image/webp', 'image/gif'];
  const maxSize = 20 * 1024 * 1024; // 7MB in bytes

  const validateFile = (file) => {
    if (!allowedTypes.includes(file.type)) {
      return 'Only JPG, PNG, and GIF images are allowed';
    }
    if (file.size > maxSize) {
      return 'Image size must be less than 1MB';
    }
    return null;
  };
  useEffect(()=>{
    setPreviewImages([`${url}${props.defaultImage}`])
  },[props.defaultImage])

  const handleFileChange = async (event) => {
    setErrorMessage(''); // Reset error message
    const files = Array.from(event.target.files);
    
    // Validate each file
    for (const file of files) {
      const error = validateFile(file);
      if (error) {
        setErrorMessage(error);
        return; // Stop processing if any file is invalid
      }
    }

    await setSelectedFiles(files);

    const newPreviewImages = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = function (e) {
        newPreviewImages.push(e.target.result);
        if (newPreviewImages.length === files.length) {
          setPreviewImages(newPreviewImages);
        }
      };
      await reader.readAsDataURL(file);
    }
    await setButnVisiablity(false);
    await handleUpload(files);
  };

const resizeImageTo600 = (file, quality = 0.7) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => (img.src = e.target.result);
    reader.onerror = reject;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      let { width, height } = img;

      // Keep aspect ratio, resize if width > 200
      if (width > 1500) {
        height = Math.round((height * 1500) / width);
        width = 1500;
      }

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) return reject("Resize failed");
          resolve(blob);
        },
        "image/jpeg",
        quality
      );
    };

    reader.readAsDataURL(file);
  });
};

const handleUpload = async (getparam) => {
  try {
    if (previewImages && getparam.length > 0) {
      const formData = new FormData();

      // Resize all images first
      for (let i = 0; i < getparam.length; i++) {
        const resizedBlob = await resizeImageTo600(getparam[i], 0.7);
        // Use original file name but keep as blob
        formData.append('images', resizedBlob, getparam[i].name);
      }

      formData.append('folderName', 'sami');

      const userToken = JSON.parse(sessionStorage.getItem('User_Data')).token;
      dispatch(ShowLoader('1'));

      const res = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${userToken}`
        }
      });

      dispatch(ShowLoader('0'));

      if (res.status === 200) {
        setLink(res.data.link);

        const myfunc = async () => {
          setImageName(res.data.link);
          document.getElementById('demo').value = res.data.link;

          const splitlink = await res.data.link.split('/', 6);
          const mainlink = `${splitlink[4]}`;
          await props.GetSelectedValue([mainlink, props.name]);
        };

        await myfunc();
      }

    }
  } catch (error) {
    console.error('Error uploading image:', error);
    setErrorMessage('Error uploading image. Please try again.');
    dispatch(ShowLoader('0'));
  }
};


  const handleDelete = (index) => {
    setButnVisiablity(true);
    const newPreviewImages = [...previewImages];
    newPreviewImages.splice(index, 1);
    setPreviewImages(newPreviewImages);

    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles.splice(index, 1);
    setSelectedFiles(newSelectedFiles);

    setImageName('');
    setErrorMessage('');
  };

  const dummyOnchange = () => {};

  return (
    <>
    <Box id="imageContainer">
        {imageName && previewImages.map((image, index) => (
          <Box key={index} sx={style.imagePreviewmain}>
            <a href={link} key={index} target='_blank' rel="noopener noreferrer">
              <Box sx={style.imagePreviewContainer}>
                <Box component="img" src={image} alt={`Preview ${index}`} sx={style.previewImage} />
              </Box>
            </a>
            <Button variant="contained" sx={style.button} color="secondary" type="button" onClick={() => handleDelete(index)}>
              <DeleteOutlined />
            </Button>
          </Box>
        ))}
      </Box>
      <Grid container>
        <Grid item lg={4}>
          <Box sx={{ display: butnVisiablity == true ? 'block' : 'none' }}>
            <Box sx={style.mainimageContainer}>
              <Input
                type="file"
                name={props.name}
                sx={style.file}
                onChange={handleFileChange}
                inputProps={{ accept: 'image/jpeg, image/png,image/webp, image/gif' }}
              />
              <DriveFolderUploadOutlined />
              <input type="text" name={props.name} id="demo" value={imageName} onChange={dummyOnchange} required={props.required} />
            </Box>
          </Box>

        </Grid>
        <Grid item lg={4}>
          {errorMessage && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {errorMessage}
            </Typography>
          )}
        </Grid>
      </Grid>
      
    </>
  );
};