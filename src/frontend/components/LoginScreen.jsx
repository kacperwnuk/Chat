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
import fetchCredentials from "../dataprovider/advances/fetchCredentials";
import AppError from "../../share/AppError";
import FatalError from "./FatalError";
import App from "../App";

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
    },
}));

export default function LoginScreen() {
    const classes = useStyles();
    const translate = useTranslate();

    const [isConnecting, setIsConnection] = React.useState(false);
    const [error, setError] = React.useState(AppError.Type.NONE);
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");


    function authUser(/**UIEvent*/event) {
        event.preventDefault();

        setIsConnection(true);

        setTimeout(async () => {
            try {
                let uc = await fetchCredentials(username, password);

            } catch (e) {
                if (e instanceof AppError) {

                    if (e.type === AppError.Type.CREDENTIALS) {
                        setError(AppError.Type.CREDENTIALS);
                        return;
                    }

                    if (e.type === AppError.Type.CONNECTION) {
                        setError(AppError.Type.CONNECTION);
                        return;
                    }
                }

                setError(AppError.Type.FATAL);
            }

            setIsConnection(false);
        }, 1000);
    }

    if (error === AppError.Type.FATAL) {
        return <FatalError/>
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
                        error={error === AppError.Type.CREDENTIALS}
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
                        error={error === AppError.Type.CREDENTIALS}
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
                            <Link href="#" variant="body2">
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