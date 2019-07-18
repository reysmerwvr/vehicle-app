import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import Main from '../hoc/Main';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(),
        width: '100%'
    },
    card: {
        maxWidth: '100%',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    }
});

class Vehicle extends Component {

    constructor(props) {
        super(props);
        this.renderVehicleDetail = this.renderVehicleDetail.bind(this);
    }

    renderVehicleDetail() {
        const { classes, selectedVehicle } = this.props;
        return (_.size(selectedVehicle) > 0) ? (
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={selectedVehicle.photo}
                    title={'Vehicle Image'}
                    style={{ backgroundSize: 'contain' }}
                />
                <CardContent>
                    <TextField
                        id="id"
                        name="id"
                        label="Id"
                        value={selectedVehicle.id}
                        placeholder="Id"
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        id="name"
                        name="name"
                        label="Name"
                        value={selectedVehicle.name}
                        placeholder="Name"
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        id="license"
                        name="license"
                        label="License"
                        value={selectedVehicle.license}
                        placeholder="License"
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        id="color"
                        name="color"
                        label="Color"
                        value={selectedVehicle.color}
                        placeholder="Color"
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        id="license"
                        name="license"
                        label="License"
                        value={selectedVehicle.license}
                        placeholder="License"
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        id="model"
                        name="model"
                        label="Model"
                        value={selectedVehicle.model}
                        placeholder="Model"
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        id="motorPark"
                        name="motorPark"
                        label="Motor Park"
                        value={selectedVehicle.motorPark}
                        placeholder="Motor Park"
                        margin="normal"
                        fullWidth
                    />
                </CardContent>
            </Card>
        ) : null;
    }

    render() {
        const { selectedVehicle } = this.props;
        return (
            <Main>
                <div className="row around-xs">
                    <Grid container spacing={3}>
                        <Grid 
                            item 
                            xs={12} 
                            md={6} 
                            lg={6}
                        >
                            {
                                selectedVehicle && 
                                this.renderVehicleDetail()
                            }
                        </Grid>
                    </Grid>
                </div>
            </Main>
        );
    }
}

const mapStateToProps = ({ vehicles }) => {
    const { selectedVehicle } = vehicles;

    return { selectedVehicle };
};

export default connect(mapStateToProps, {})(withStyles(styles)(Vehicle));
