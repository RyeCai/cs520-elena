import React, { useState, useContext } from "react";
import { Snackbar, CircularProgress, Typography, Stack, Paper } from '@mui/material';
import { InputContext } from "../App.jsx";

function LoadingSnackbar() {
    const { isCalculating } = useContext(InputContext)
    
    return (

    <Snackbar open={isCalculating} autoHideDuration={1000} anchorOrigin={{vertical:'bottom', horizontal:'right'}}>
        <Paper style={{padding: 4}}>
            <Stack direction="row" alignItems="center">
                <CircularProgress style={{marginRight: 8}}/>
                <Typography>Calculating Route...</Typography>
            </Stack>
        </Paper>
    </Snackbar>
    );
}

export default LoadingSnackbar;