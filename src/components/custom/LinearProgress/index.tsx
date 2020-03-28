/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 27 March 2020
 *
 * Custom component which displays linear progress.
 */

/** External imports */
import React, { useMemo } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useProgressStyles = makeStyles((theme: Theme) =>
    createStyles({
        label: {
            fontSize: '1rem',
            color: '#867272',
        },
        linearProgress: {
            background: '#eceeef',
            height: 7,
            borderRadius: 4,
            '& .MuiLinearProgress-bar': {
                background: '#5d72e5',
                height: 7,
                borderRadius: 4,
            },
        },
        linearProgressBar: {
            background: '#eceeef',
            height: 7,
            borderRadius: 4,
        },
        progressNumbers: {
            display: 'flex',
            justifyContent: 'space-between',
        },
    }));

interface IProgressProps {
    /** Current value */
    current: number;
    /** Total value */
    total: number;
    label?: string;
    /** Hide progress. Not hide component. */
    hide?: boolean;
}

const Component = ({ current, total, label, hide = false }: IProgressProps) => {
    const classes = useProgressStyles({});

    const currentInPercents = useMemo(() =>
        hide ? 0 : 100 / total * current,
    [current, total, hide]);

    return (
        <>
            { label && <Typography variant='h6' className={classes.label}>
                { label }
            </Typography>}
            <div className={classes.progressNumbers}>
                <span className={classes.label}>{hide ? 0 : current}</span>
                <span className={classes.label}>{total}</span>
            </div>
            <LinearProgress
                value={currentInPercents}
                variant={"determinate"}
                className={classes.linearProgress}
            />
        </>
    );
};

export default Component;
