import React from "react";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TranslateIcon from '@material-ui/icons/Translate';
import Languages from "../i18n/lang";
import {LanguageContext} from "../i18n/TranslateProvider";
import useTranslate from "../hooks/useTranslate";


export default function LanguageButton({...props}) {

    const translate = useTranslate();
    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    const open = Boolean(anchorEl);

    return <>
        <Button
            color="inherit"
            onClick={handleClick}
            startIcon={<TranslateIcon/>}
            endIcon={<ExpandMoreIcon/>}
            {...props}
        >
            {translate("language_button")}
        </Button>

        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: "top",
                horizontal: "center",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "center",
            }}
        >
            <List>
                {Object.keys(Languages).map(lang => {
                    return <LanguageItem
                        onClick={handleClose}
                        key={lang}
                        language={Languages[lang]}
                    />
                })}
            </List>
        </Popover>
    </>
}

function LanguageItem({language, onClick}) {
    if (!onClick) onClick = noop;


    const {
        language: current_language,
        setLanguage
    } = React.useContext(LanguageContext);


    return <ListItem
        button
        selected={current_language == language}
        onClick={() => {
            setLanguage(language);
            onClick();
        }}
    >
        <ListItemText primary={language.lang_name}/>
    </ListItem>
}