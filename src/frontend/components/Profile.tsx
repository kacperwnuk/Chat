import React from "react";
import {useUserData} from "../redux/reducers/user_data";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import {TableBody, Typography} from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useTranslate from "../hooks/useTranslate";
import UserAvatar from "./UserAvatar";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
}, {name: "Profile"});

export default function Profile(props: {
    userId: string
}) {
    const classes = useStyles();
    const translate = useTranslate();
    const user_data = useUserData(props.userId);

    if (user_data === null) {
        return <>Ładowanie...</>
    }

    return <div>


        <TableContainer component={Paper}>
            <Table className={classes.table}>
                <TableBody>

                    {/*<TableRow>*/}
                    {/*    <TableCell align="left">*/}
                    {/*        {translate("profile.avatar_label")}*/}
                    {/*    </TableCell>*/}
                    {/*    <TableCell align="right">*/}
                    {/*        <UserAvatar userId={props.userId}/>*/}
                    {/*    </TableCell>*/}
                    {/*</TableRow>*/}

                    <NullableRow label="profile.username_label">{user_data.username}</NullableRow>
                    <NullableRow label="profile.name_family_label">{user_data.name_family}</NullableRow>
                    <NullableRow label="profile.name_given_label">{user_data.name_given}</NullableRow>
                    <NullableRow label="profile.name_middle_label">{user_data.name_middle}</NullableRow>
                    <NullableRow label="profile.name_suffix_label">{user_data.name_suffix}</NullableRow>
                    <NullableRow label="profile.name_prefix_label">{user_data.name_prefix}</NullableRow>
                    <NullableRow label="profile.address_label">{user_data.address}</NullableRow>

                </TableBody>
            </Table>
        </TableContainer>
    </div>
}

function NullableRow(props: {
    label: string
    children: React.ReactNode
}) {
    const translate = useTranslate();

    return <TableRow>
        <TableCell align="left">
            {translate(props.label)}
        </TableCell>
        <TableCell align="right">
            {props.children ?
                <Typography variant="body2">
                    {props.children}
                </Typography> :
                <Typography variant="body2" color="textSecondary">
                    {translate("profile.empty")}
                </Typography>}
        </TableCell>
    </TableRow>
}