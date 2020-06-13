import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from "./Copyright";
import useTranslate from "../hooks/useTranslate";
import LanguageSwitch from "./LanguageSwitch";
import useAppDispatch from "../hooks/useAppDispatch";
import {HumanGender} from "../../share/types";
import AppLink from "./AppLink";

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

    const dispatch = useAppDispatch();

    const [email, setEmail] = React.useState("");
    const [username, setUsername] = React.useState("");

    const [name_family, setNameFamily] = React.useState("");
    const [name_given, setNameGiven] = React.useState("");
    const [name_middle, setNameMiddle] = React.useState("");
    const [name_prefix, setNamePrefix] = React.useState("");
    const [name_suffix, setNameSuffix] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [gender, setGender] = React.useState<HumanGender>("other");

    const [password, setPassword] = React.useState("");

    function registerUser(event: React.MouseEvent) {
        event.preventDefault();

        dispatch("REGISTRATION_REQUEST", {
            username,
            password,
            email,
            name_family,
            name_given,
            name_middle,
            name_prefix,
            name_suffix,
            gender,
            address
        });
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

                    <Field name="email" value={email} setter={setEmail} required/>
                    <Field name="username" value={username} setter={setUsername} required/>

                    <Grid container spacing={3}>
                        <Grid item xs>
                            <Field name="name_given" value={name_given} setter={setNameGiven} required/>
                        </Grid>
                        <Grid item xs>
                            <Field name="name_middle" value={name_middle} setter={setNameMiddle}/>
                        </Grid>
                    </Grid>

                    <Field name="name_family" value={name_family} setter={setNameFamily}/>

                    <Grid container spacing={3}>
                        <Grid item xs>
                            <Field name="name_prefix" value={name_prefix} setter={setNamePrefix}/>
                        </Grid>
                        <Grid item xs>
                            <Field name="name_suffix" value={name_suffix} setter={setNameSuffix}/>
                        </Grid>
                    </Grid>

                    <Field name="address" value={address} setter={setAddress} required/>

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
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={registerUser}
                    >
                        {translate("register_screen.submit")}
                    </Button>


                    <Grid container>
                        <Grid item xs>
                            <AppLink to="/forgot_password">
                                {translate("register_screen.forgot_password")}
                            </AppLink>
                        </Grid>
                        <Grid item>
                            <AppLink to="/login">
                                {translate("register_screen.sign_in")}
                            </AppLink>
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


const Field = React.forwardRef((props: {
    name: string
    value: string
    setter: (new_val: string) => void
    required?: boolean
}, ref: React.Ref<HTMLDivElement>) => {

    const translate = useTranslate();

    return <TextField
        ref={ref}
        variant="outlined" margin="normal"
        required={props.required ?? false}
        fullWidth
        label={translate(`register_screen.${props.name}_label`)}
        name={props.name}
        onChange={e => props.setter(e.target.value)}
        value={props.value}
    />
});