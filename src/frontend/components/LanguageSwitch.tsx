import React, {useContext, useState} from "react";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TranslateIcon from '@material-ui/icons/Translate';
import Languages from "../i18n/lang/index";
import {LanguageContext} from "../i18n/TranslateProvider";
import useTranslate from "../hooks/useTranslate";
import noop from "../../share/noop";
import Lang from "../i18n/Lang";

export default function LanguageSwitch(props: {
    type?: "button" | "text"
}) {
    const translate = useTranslate();
    const [anchorEl, setAnchorEl] = useState<any>(null);

    function handleClick(event: MouseEvent) {
        if (event.currentTarget) {
            setAnchorEl(event.currentTarget);
        }
    }

    function handleClose() {
        setAnchorEl(null);
    }

    const open = Boolean(anchorEl);
    let react_switch: React.ReactNode;

    switch (props.type) {
        case "text":

            react_switch = <span
                style={{
                    cursor: "pointer"
                }}
                onClick={event => setAnchorEl(event.currentTarget)}
            >
                {translate("language_button")}
            </span>

            break;

        case "button":
        default:

            react_switch = <Button
                color="inherit"
                onClick={event => setAnchorEl(event.currentTarget)}
                startIcon={<TranslateIcon/>}
                endIcon={<ExpandMoreIcon/>}
            >
                {translate("language_button")}
            </Button>

            break;
    }

    return <>

        {react_switch}

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

function LanguageItem(props: {
    language: Lang,
    onClick: () => void
}) {
    if (!props.onClick) {
        props.onClick = noop;
    }

    const {
        language: current_language,
        setLanguage
    } = useContext(LanguageContext);

    return <ListItem
        button
        selected={current_language == props.language}
        onClick={() => {
            setLanguage(props.language);
            props.onClick();
        }}
    >
        <ListItemText primary={props.language.lang_name}/>
    </ListItem>
}