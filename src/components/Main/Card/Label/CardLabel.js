import React from 'react';
import { Chip } from '@mui/material';

const CardLabel = ({ labelItem }) => {
  return (
    <>
      <Chip
        className='card-label'
        color='success'
        sx={{ backgroundColor: `${labelItem.color}`, p: 0, color: '#fff', borderRadius: '4px' }}
        size='small'
        label={labelItem.text}
      />
    </>
  );
};

export default CardLabel;
