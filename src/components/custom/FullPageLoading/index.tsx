/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 27 March 2020
 *
 * Component which display loading progress
 * until all component will be loaded.
 * Using in React Suspense fallback.
 */

/** External imports */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            height: '100vh',
            position: 'fixed',
            background: `linear-gradient(112deg, #20aed0 0%, #811ec8 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        circularProgress: {
            color: '#fff',
        },
    }));

const Component = () => {
    const classes = useStyles({});

    useEffect(() => {
        return () => setLoading(false);
    });

    const [loading, setLoading] = useState<boolean>(true);

    return (
        <Fade in={loading}>
            <div className={classNames(classes.root)}>
                <CircularProgress className={classes.circularProgress} thickness={7} size={60}/>
            </div>
        </Fade>
    );
};

export default Component;
