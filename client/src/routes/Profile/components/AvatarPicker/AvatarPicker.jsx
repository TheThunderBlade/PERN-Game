import { Box, Container, ImageList, ImageListItem, Menu } from '@mui/material';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { selectAvatar } from '../../../../store/User/User.model';
import { ImgList } from './ImageList';

const AvatarPicker = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const PaperProps = {
    elevation: 0,
    sx: {
      overflow: 'visible',
      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
      mt: 1.5,
      '& .MuiAvatar-root': {
        width: 32,
        height: 32,
        ml: -0.5,
        mr: 1,
      },
      '&:before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        top: 0,
        right: 14,
        width: 10,
        height: 10,
        bgcolor: 'background.paper',
        transform: 'translateY(-50%) rotate(45deg)',
        zIndex: 0,
      },
    },
  };

  return (
    <Container>
      <Box
        onClick={(e) => handleClick(e)}
        sx={{ cursor: 'pointer' }}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        height={'225px'}
        width={'100%'}
        border="2px solid whitesmoke"
        borderRadius="25px"
      >
        <AddIcon sx={{ width: '100px', height: 'auto' }}/>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={PaperProps}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <ImageList sx={{ width: 400, height: 'auto' }} cols={2}>
          {
            ImgList.map((image, index) => (
              <ImageListItem
                onClick={() => selectAvatar(`${index + 1}`)}
                sx={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                key={index}
              >
                <img
                  style={{ width: '150px', height: 'auto' }}
                  src={image}
                  srcSet={image}
                  loading={'lazy'}
                  alt={`avatar${index}`}
                />
              </ImageListItem>
            ))
          }
        </ImageList>
      </Menu>
    </Container>
  );
};

export default AvatarPicker;