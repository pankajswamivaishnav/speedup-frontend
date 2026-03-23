import { UploadOutlined } from '@ant-design/icons';
import { Button, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useRef, useState } from 'react';

interface UploadImageProps {
  image?: { public_id: string; url: string };
  setImage: (data: { public_id: string; url: string }) => void;
  setIsUploading?: (value: boolean) => void;
}

const UploadImage = ({ image, setImage, setIsUploading }: UploadImageProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [chooseFile, setChooseFile] = useState<string>();

  //---------- Handlers -------------
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setChooseFile(file?.name);
      setIsUploading?.(true);
      // ------ Cloudinary upload image ---------
      const formData = new FormData();
      formData.append('file', file!);
      formData.append('upload_preset', 'speedup');
      formData.append('folder', 'speedup');
      try {
        const response = await axios.post(`https://api.cloudinary.com/v1_1/dd8tchl1d/image/upload`, formData);
        setImage({
          public_id: response.data.public_id,
          url: response.data.url
        });
      } catch (error) {
        console.error('Upload failed:', error);
      } finally {
        setIsUploading?.(false);
      }
    }
  };

  return (
    <div>
      <Grid item xs={12}>
        <Typography color="error.main">
          <Typography component="span" color="textSecondary">
            Recommended resolution is 640*640 with file size
          </Typography>
        </Typography>
        <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />

        <Button
          variant="outlined"
          color="secondary"
          startIcon={<UploadOutlined />}
          sx={{ mt: 1, textTransform: 'none' }}
          onClick={handleClick}
        >
          {chooseFile ? chooseFile : image?.url ? `Existing: ...${image.url.slice(-15)}` : 'Click to Upload'}
        </Button>
      </Grid>
    </div>
  );
};

export default UploadImage;
