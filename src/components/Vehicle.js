import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import validator from 'validator';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { ToastContainer, toast } from 'react-toastify';
import Button from '@material-ui/core/Button';

import {
    getVehicle,
    storeVehicle,
    updateVehicle,
    deleteVehicle,
} from '../actions';
import Main from '../hoc/Main';
import history from '../helpers/history';

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

        this.state = {
            name: {
                value: props.selectedVehicle.name,
                required: true,
                error: false,
            },
            photo: {
                value: props.selectedVehicle.photo,
                required: false,
                error: false,
            },
            license: {
                value: props.selectedVehicle.license,
                required: true,
                error: false,
            },
            color: {
                value: props.selectedVehicle.color,
                required: true,
                error: false,
            },
            model: {
                value: props.selectedVehicle.model,
                required: true,
                error: false,
            },
            motorPark: {
                value: props.selectedVehicle.motorPark,
                required: true,
                error: false,
            },
        };
    }

    componentDidMount() {
        const { selectedVehicle, getVehicle, match: { params } } = this.props;
        const { id } = params;
        if (id !== 'new' && Object.keys(selectedVehicle).length === 0) {
            getVehicle(id);
        } else {
            let imgUrl = (id === 'new') ? '/images/no-image-icon.png' : selectedVehicle.photo;
            this.setState({ 
                photo: {
                    ...this.state.photo,
                    value: imgUrl
                }
            });
        }
    }

    handleChange = event => {
        const property = event.target.name;
        const value = event.target.value;
        this.setState({
          [property]: { ...this.state[property], value },
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        const { id } = this.props.match.params;
        const { name, license, color, model, motorPark } = this.state;
        const errorMessages = this.validateFields();
        if(errorMessages.length <= 0) {
            const payload = {
                name: name.value,
                license: license.value,
                color: color.value,
                model: model.value,
                motorPark: motorPark.value,
            }
            if (id === 'new') {
                this.props.storeVehicle(payload);
            } else {
                this.props.updateVehicle(id, payload);
            }
        } else {
            toast.warn(errorMessages.join('\n'), {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }
        
    }

    validateFields() {
        const errorMessages = [];
        for (let key in this.state) {
            if(this.state[key].required && validator.isEmpty(this.state[key].value)) {
                errorMessages.push(`The ${key} is required`);
            }
        }
        return errorMessages;
    }

    renderVehicleDetail() {
        const { classes, deleteVehicle, match: { params } } = this.props;
        const { name, photo, license, color, model, motorPark } = this.state;
        const { id } = params;
        return (
            <Card className={classes.card}>
                <form onSubmit={this.handleSubmit}>
                <CardMedia
                    className={classes.media}
                    image={photo.value}
                    title={'Vehicle Image'}
                    style={{ backgroundSize: 'contain' }}
                />
                <CardContent>
                    <TextField
                        id="name"
                        name="name"
                        label="Name"
                        value={name.value}
                        placeholder="Name"
                        margin="normal"
                        fullWidth
                        onChange={this.handleChange}
                    />
                    <TextField
                        id="license"
                        name="license"
                        label="License"
                        value={license.value}
                        placeholder="License"
                        margin="normal"
                        fullWidth
                        onChange={this.handleChange}
                    />
                    <TextField
                        id="color"
                        name="color"
                        label="Color"
                        value={color.value}
                        placeholder="Color"
                        margin="normal"
                        fullWidth
                        onChange={this.handleChange}
                    />
                    <TextField
                        id="model"
                        name="model"
                        label="Model"
                        value={model.value}
                        placeholder="Model"
                        margin="normal"
                        fullWidth
                        onChange={this.handleChange}
                    />
                    <TextField
                        id="motorPark"
                        name="motorPark"
                        label="Motor Park"
                        value={motorPark.value}
                        placeholder="Motor Park"
                        margin="normal"
                        fullWidth
                        onChange={this.handleChange}
                    />
                </CardContent>
                <CardActions>
                    <div className="row around-xs" style={{ width: '100%' }}>
                        <Button
                            size="medium"
                            color="primary"
                            type="submit"
                        >
                        {id !== 'new' ? 'Update' : 'Save'}
                        </Button>
                        <Button
                            size="medium"
                            onClick={() => history.push('/vehicles')}
                        >
                            Cancel
                        </Button>
                        {
                            id !== 'new' && 
                            <Button
                                size="medium"
                                color="secondary"
                                onClick={() => {
                                    // eslint-disable-next-line no-restricted-globals
                                    if (confirm('Confirm required to delete this sticker')) {
                                        deleteVehicle(id);
                                    }
                                }}
                            >
                                Delete
                            </Button>
                        }
                    </div>
                </CardActions>
                </form>
            </Card>
        );
    }

    render() {
        return (
            <Main>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover
                />
                <div className="row around-xs">
                    <Grid container spacing={3}>
                        <Grid 
                            item 
                            xs={12} 
                            md={6} 
                            lg={6}
                        >
                            {this.renderVehicleDetail()}
                        </Grid>
                    </Grid>
                </div>
            </Main>
        );
    }
}

const mapStateToProps = ({ vehicle }) => {
    const { selectedVehicle } = vehicle;

    return { selectedVehicle };
};

const mapDispatchToProps = { 
    getVehicle,
    storeVehicle,
    updateVehicle,
    deleteVehicle,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Vehicle));
