import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Search from '@material-ui/icons/Search';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

import Main from '../hoc/Main';
import history from '../helpers/history';
import { getVehicles, setFilteredVehicles, selectVehicle } from '../actions';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    absolute: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(3),
    },
    icon: {
        margin: theme.spacing(),
    },
    textField: {
        marginLeft: theme.spacing(),
        marginRight: theme.spacing(),
        width: 200,
    },
    formControl: {
       display: 'flex',
       alignItems: 'flex-end',
       justifyContent: 'flex-end'
    },
    searchButton: {
        cursor: 'pointer',
    },
    card: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    }
});

class Vehicles extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.renderVehicles = this.renderVehicles.bind(this);
        this.selectVehicle = this.selectVehicle.bind(this);
        this.createNewVehicle = this.createNewVehicle.bind(this);
    
        this.state = {
            search: '',
            wait: null
        };
    }

    componentDidMount() {
        const { getVehicles } = this.props;
        getVehicles();
    }

    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value,
        });
    }

    handleSearch = () => {
        const self = this;
        const { vehiclesList } = this.props;
        const { search } = this.state;
        let { wait } = this.state;
        if (wait !== null) {
            clearTimeout(wait);
        }
        wait = setTimeout(() => {
            const searchWordsArray = search.trim()
                                            .split(' ')
                                            .filter(word => word.length > 0)
                                            .map(word => word.toLowerCase());
            const filteredVehicles = vehiclesList.filter(
                vehicle => {
                    const { name, license, model, color, motorPark } = vehicle;
                    const matchesArray = searchWordsArray.filter(
                        word => (
                            name.toLowerCase().indexOf(word) >= 0 || 
                            license.toLowerCase().indexOf(word) >= 0 ||
                            model.toLowerCase().indexOf(word) >= 0 ||
                            color.toLowerCase().indexOf(word) >= 0 ||
                            motorPark.toString(10).toLowerCase().indexOf(word) >= 0
                        )
                    );
                    return matchesArray.length > 0;
                }
            );
            self.props.setFilteredVehicles(filteredVehicles);
        }, 300);
        this.setState({ search, wait });
    }

    selectVehicle(vehicle) {
        this.props.selectVehicle(vehicle);
        history.push(`/vehicles/${vehicle._id}`);
    }

    renderVehicles(vehiclesList) {
        const { classes } = this.props;
        return (
            vehiclesList.length > 0 &&
            vehiclesList.map((vehicle, index) => {
                const { name, license, color, model, photo, motorPark  } = vehicle;
                return (
                    <Grid 
                        item 
                        xs={12} 
                        md={6} 
                        lg={4}
                        key={index}
                    >
                        <Card
                            className={classes.card} 
                            onClick={() => this.selectVehicle(vehicle)}
                        >
                            <CardHeader
                                avatar= {
                                    <Avatar 
                                        className={classes.avatar}
                                        alt={'Vehicle Image'}
                                        src={photo}
                                    >
                                    </Avatar>
                                }
                                title={`Name: ${name}`}
                                subheader={`Model: ${model}`}
                            />
                            <CardMedia
                                className={classes.media}
                                image={photo}
                                title={'Vehicle Image'}
                                style={{ backgroundSize: 'contain' }}
                            />
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="h2">
                                    {`Motor Park: ${motorPark}`}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="h3">
                                    {`License: ${license}`}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="h3">
                                    {`Color: ${color}`}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button 
                                    size="small" 
                                    color="primary"
                                    onClick={() => this.selectVehicle(vehicle)}
                                >
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                );
            })
        );
    }

    createNewVehicle() {
        this.props.selectVehicle({});
        history.push('/vehicles/new')
    }

    render() {
        const { classes, vehiclesList, vehiclesFilteredList } = this.props;
        return (
            <Main>
                <FormControl className={classes.formControl}>
                    <TextField
                        id="search"
                        name="search"
                        label="Search"
                        type="search"
                        className={classes.textField}
                        margin="normal"
                        onChange={this.handleChange}
                        onBlur={this.handleSearch}
                        value={this.state.search}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                <Search
                                    className={classes.searchButton} 
                                    onClick={this.handleSearch} 
                                />
                                </InputAdornment>
                            ),
                        }}
                    />
                </FormControl>
                <div 
                    className={classes.root}
                >
                    <Grid container spacing={3}>
                        {
                            vehiclesFilteredList.length > 0 ?
                                this.renderVehicles(vehiclesFilteredList)
                            :
                                this.renderVehicles(vehiclesList)
                        }
                    </Grid>
                </div>
                <Tooltip title="Create New Vehicle" aria-label="Add">
                    <Fab 
                        color="secondary" className={classes.absolute}
                        onClick={() => this.createNewVehicle()}
                    >
                    <AddIcon />
                    </Fab>
                </Tooltip>
            </Main>
        );
    }
}

const mapStateToProps = ({ vehicle }) => {
    const { error, loading, vehiclesList, vehiclesFilteredList } = vehicle;

    return { error, loading, vehiclesList, vehiclesFilteredList };
};

const mapDispatchToProps = { 
    getVehicles,
    setFilteredVehicles,
    selectVehicle
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Vehicles));