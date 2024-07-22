import { IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import React from 'react';
import InfoIcon from '@mui/icons-material/Info';

const MainContent = () => {
    const itemData = [
        {
          img: 'https://img.icons8.com/?size=100&id=WjkDFlQpfkPb&format=png&color=000000',
          title: 'Human_Resource',
          rows: 2,
          cols: 2,
          featured: true,
        },
        {
          img: 'https://img.icons8.com/?size=100&id=cfGtoFQFGV9e&format=png&color=000000',
          title: 'Business_Partner',
        },
        {
          img: 'https://img.icons8.com/?size=100&id=zqvfe-Z_yMuk&format=png&color=000000',
          title: 'Item_Management',
        },
        {
          img: 'https://img.icons8.com/?size=100&id=HOaunZsdV3cV&format=png&color=000000',
          title: 'Purchase_Management',
          cols: 2,
        },
        {
          img: 'https://img.icons8.com/?size=100&id=PXSINc-3V5kV&format=png&color=000000',
          title: 'Sales_Management',
          cols: 2,
        },
        {
          img: 'https://img.icons8.com/?size=100&id=113862&format=png&color=000000',
          title: 'Announcement',
          rows: 2,
          cols: 2,
          featured: true,
        },
      ];
    return (
        <div>
            <ImageList sx={{ width: 400, height: 450, marginLeft: '20px' }}>
                <ImageListItem key="Subheader" cols={2}>
                </ImageListItem>
                {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                    <img
                        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        src={`${item.img}?w=248&fit=crop&auto=format`}
                        alt={item.title}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        title={item.title}
                        subtitle={item.author}
                        actionIcon={
                        <IconButton
                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                            aria-label={`info about ${item.title}`}
                        >
                            <InfoIcon />
                        </IconButton>
                        }
                    />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    );
};

export default MainContent;