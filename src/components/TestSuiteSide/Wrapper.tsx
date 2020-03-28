/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 20 March 2020
 *
 * Wrapper for test suite side components.
 */

/** External imports */
import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        width: '100%',
        height: '100%',
        borderRadius: 40,
        background: '#fff',
        padding: theme.spacing(2),
    },
}));

interface IWrapperProps {
    children: React.ReactNode;
}

const Component = ({ children }: IWrapperProps) => {
    const classes = useStyles({});

    return (<div className={classes.root}>{children}</div>);
};

export default Component;
