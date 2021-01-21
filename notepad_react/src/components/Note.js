import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { FormControlLabel, Checkbox, IconButton, CardHeader } from '@material-ui/core';

import { Favorite, FavoriteBorder } from '@material-ui/icons';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Grid from '@material-ui/core/Grid'
import { ColorPickerList } from './ColorPickerList';



const useStyles = makeStyles({
    root: {
        minWidth: 275,
        maxWidth: 400,
    },
    title: {

    },
    pos: {
        marginBottom: 12,
    },
    delete: {
        marginLeft: "auto",
    },
});

export default function Note(props) {
    const classes = useStyles();

    const [pinned, setPinned] = useState(props.noteObj.pinned)
    const [color, setColor] = useState(props.noteObj.color)

    const pinHandler = () => {
        const newPinned = !pinned
        setPinned(newPinned)
        props.onPinChange(props.noteObj.id, newPinned)
    }

    const handleColorChange = (colorToChange) => {
        setColor(colorToChange)
        props.onColorChange(props.noteObj.id, colorToChange)
    }

    const deleteHandler = () => {
        props.onDelete(props.noteObj.id)
    }

    return (
        <Grid item >
            <Card className={classes.root}>
                <CardHeader
                    action={
                        <FormControlLabel
                            control={<Checkbox
                                icon={<FavoriteBorder />}
                                checkedIcon={<Favorite />}
                                name="pinned"
                                checked={props.noteObj.pinned}
                                onChange={pinHandler}
                            />}
                        />
                    }
                    title={props.noteObj.title}
                    subheader={new Date(props.noteObj.createdAt).toLocaleDateString()}
                    style={{backgroundColor: color}}
                />
                <CardContent>
                    <Typography variant="body2" component="p">
                        {props.noteObj.content}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton aria-label="delete" className={classes.delete} onClick={deleteHandler}>
                        <DeleteForeverIcon />
                    </IconButton>
                    <ColorPickerList handleColorPick={handleColorChange} />
                </CardActions>
            </Card>
        </Grid>

    );
}