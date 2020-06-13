import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
import LanguageSwitch from "./LanguageSwitch";

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

    const [email, setEmail] = React.useState("");
    const [username, setUsername] = React.useState("");

    const [name_family, setNameFamily] = React.useState("");
    const [name_given, setNameGiven] = React.useState("");
    const [name_middle, setNameMiddle] = React.useState("");
    const [name_prefix, setNamePrefix] = React.useState("");
    const [name_suffix, setNameSuffix] = React.useState("");

    const [password, setPassword] = React.useState("");
    const [password2, setPassword2] = React.useState("");

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

    function Field(props: {
        name: string
        value: string
        setter: (new_val: string) => void
    }) {
        return <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={translate(`register_screen.${props.name}_label`)}
            name={props.name}
            onChange={e => props.setter(e.target.value)}
            disabled={isConnecting}
            error={credentials_error?.type === AppErrorType.ACCESS_DENIED}
        />
    }

    return (
        <Container component="main" maxWidth="xs">

            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    {translate("register_screen.sign_invite")}
                </Typography>
                <form className={classes.form} noValidate>

                    <Field name="email" value={email} setter={setEmail}/>
                    <Field name="username" value={username} setter={setUsername}/>
                    <Field name="name_family" value={name_family} setter={setNameFamily}/>
                    <Field name="name_given" value={name_given} setter={setNameGiven}/>
                    <Field name="name_middle" value={name_middle} setter={setNameMiddle}/>
                    <Field name="name_prefix" value={name_prefix} setter={setNamePrefix}/>
                    <Field name="name_suffix" value={name_suffix} setter={setNameSuffix}/>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label={translate("register_screen.password_label")}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={e => setPassword(e.target.value)}
                        disabled={isConnecting}
                        error={credentials_error?.type === AppErrorType.ACCESS_DENIED}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password2"
                        label={translate("register_screen.password2_label")}
                        type="password2"
                        id="password2"
                        autoComplete="current-password"
                        onChange={e => setPassword2(e.target.value)}
                        disabled={isConnecting}
                        error={credentials_error?.type === AppErrorType.ACCESS_DENIED}
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
                            <Link href="#" variant="body2">
                                {translate("login_screen.sign_up")}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>

            <Box mt={4}>
                <Typography variant="body2" color="textSecondary" align="center">
                    <LanguageSwitch type="text"/>
                </Typography>
            </Box>

            <Box mt={4} mb={8}>
                <Copyright/>
            </Box>

        </Container>
    );
}