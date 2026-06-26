import React from 'react'
import PropTypes from 'prop-types'
import { Box, Paper, useTheme } from '@mui/material'

const CustomPaper = (props) => {
    const Theme: any = useTheme().palette;
    
    const demostyle = {
        width: "150px",
        height: "150px",
        background: Theme.primary.light,
        borderRadius: "50%",
        position: "absolute",
    }
  return (
    <Paper
    elevation={4}
        sx={{
          padding: "30px",
          borderRadius: "16px",
          marginTop: "30px",
          overflow: "hidden",
          position: "relative"
        }}
    >
        <Box sx={{...demostyle, top: "-107px", right: "117px", opacity: ".6"}}></Box>
        <Box sx={{...demostyle, top: "-72px", right: "29px"}}></Box>
        <Box sx={{...demostyle,  top: "-35px",right: "-93px",opacity: ".6"}}></Box>
        {props.children}
    </Paper>
  )
}

CustomPaper.propTypes = {}

export default CustomPaper