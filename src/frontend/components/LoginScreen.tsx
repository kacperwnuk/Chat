import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Copyright from "./Copyright";
import useTranslate from "../hooks/useTranslate";
import {AppErrorType} from "../lib/AppError";
import FatalError from "./FatalError";
import {useDispatch} from "react-redux";
import {makeCredentialsDataRequestAction, useCredentialsError} from "../redux/reducers/credentials_data";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}));

export default function () {
    const classes = useStyles();
    const translate = useTranslate();

    const dispatch = useDispatch();
    const credentials_error = useCredentialsError();

    const [isConnecting, setIsConnection] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");


    function authUser(event: React.MouseEvent) {
        event.preventDefault();

        setIsConnection(true);

        dispatch(
            makeCredentialsDataRequestAction(
                username,
                password
            )
        );
    }

    if (credentials_error?.type === AppErrorType.FATAL) {
        return <FatalError/>
    }

    if (credentials_error && isConnecting) {
        setIsConnection(false);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    {translate("login_screen.sign_invite")}
                </Typography>
                <form className={classes.form} noValidate>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label={translate("login_screen.email_label")}
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={e => setUsername(e.target.value)}
                        disabled={isConnecting}
                        error={credentials_error?.type === AppErrorType.ACCESS_DENIED}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label={translate("login_screen.password_label")}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={e => setPassword(e.target.value)}
                        disabled={isConnecting}
                        error={credentials_error?.type === AppErrorType.ACCESS_DENIED}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label={translate("login_screen.remember_me")}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={authUser}
                        disabled={isConnecting}
                    >
                        {translate("login_screen.submit")}
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                {translate("login_screen.forgot_password")}
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#/register" variant="body2">
                                {translate("login_screen.sign_up")}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright/>
            </Box>
        </Container>
    );
}