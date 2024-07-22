import { IconButton, ImageList, ImageListItem, ImageListItemBar, Box } from '@mui/material';
import React from 'react';
import InfoIcon from '@mui/icons-material/Info';
import CalendarComponent from './Calendar';

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
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }} style={{marginLeft: '20px'}}>
            {/* 이미지 리스트 */}
            <Box sx={{ flex: 1, mr: 2 }}>
                <ImageList sx={{ width: 400, height: 450 }}>
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
            </Box>

            {/* 날짜 선택기 */}
            <Box sx={{ flex: 1 }}>
                <CalendarComponent/>
            </Box>
        </Box>
    );
};

export default MainContent;
