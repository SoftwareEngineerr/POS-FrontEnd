import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const CustomBtn = memo((props) => {
  return (
    <Button
      color="primary"
      variant="contained"
      size="large"
      fullWidth
      type={props.type ? props.type : 'submit'}
      component={props.link ? Link : 'button'}
      to={props.link}
      // sx={props.style || {}}
      sx={{
      fontFamily: "Poppins, sans-serif",
      textTransform: "none",
      fontSize: "1rem",
      padding: "10px 24px",
      borderRadius: "12px",
      width: '100%',
      background:
          "linear-gradient(135deg,#667eea,#764ba2)",
          boxShadow: "0px 5px 20px rgb(115 85 176 / 48%)",
          ...props.style
      }
    }

      title={props.title}
      onClick={props.click}
      disabled= {props.disable}
    >
      {props.data}
    </Button>
  );
});

CustomBtn.propTypes = {
  type: PropTypes.string,
  link: PropTypes.string,
  style: PropTypes.object,  // Ensure that style is expected to be an object
  title: PropTypes.string,
  click: PropTypes.func,
  data: PropTypes.string
};

// Example usage:
// <CustomBtn data="Click me" />
