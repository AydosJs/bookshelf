import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box, Typography } from '@mui/material';
import theme from '../themes';

export default function BookStatus() {

  const [age, setAge] = React.useState('10');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  return (
    <FormControl sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", flexWrap: "nowrap", flexDirection: "row", alignItems: "center", justifyContent: "start" }}>
        <Typography color={theme.palette.text.primary} variant="body1" sx={{ mr: 2 }}>
          Status:
        </Typography>
        <Select
          value={age}
          size='small'
          onChange={handleChange}
          variant="outlined"
        >
          <MenuItem value={10}>New</MenuItem>
          <MenuItem value={20}>Reading</MenuItem>
          <MenuItem value={30}>Finished</MenuItem>
        </Select>
      </Box>
    </FormControl>
  )
}