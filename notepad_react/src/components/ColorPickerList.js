import React, { useState } from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'

const colors = [
    '#3EBA9B',
    '#F5E4AC',
    '#FEAD34',
    '#DA3C3D',
    '#ffffff',
]

export const ColorPickerList = ({ handleColorPick }) => {
    const [color, setColor] = useState('#ffffff')


    const handleColorChange = (event) => {
        setColor(event.target.value)
        handleColorPick(event.target.value)
    }

    return (
        <FormControl >
            <InputLabel id="demo-simple-select-label">Color</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={color}
                onChange={handleColorChange}
            >
                {colors.map((col)=>{
                    return <MenuItem key={col} value={col}><FiberManualRecordIcon style={{ color: col }} /> </MenuItem>
                })}
            </Select>
        </FormControl>
    )
}
