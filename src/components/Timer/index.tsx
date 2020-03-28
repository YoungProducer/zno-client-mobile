/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 26 March 2020
 *
 * Component which displays hours, minutes and seconds if use select limitTime mode.
 */

/** External imports */
import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

/** Application's imports */

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 370,
            '& span': {
                marginRight: theme.spacing(0.5),
                color: '#b19898',
                fontSize: '1.5375rem',
                '&:last-child': {
                    marginRight: 0,
                },
            },
        },
    }));

interface ITimerProps {
    hours: number;
    /**
     * Funtction which launches when
     * the time for the test suite is up.
     */
    callback: () => void;
    active: boolean;
    setActive: (value: boolean) => void;
}

const Component = ({ hours, callback, active, setActive }: ITimerProps) => {
    const classes = useStyles({});

    const [currSeconds, setSeconds] = useState<number>(60);
    const [currMinutes, setMinutes] = useState<number>(60 - 1);
    const [currHours, setHours] = useState<number>(hours - 1);

    useEffect(() => {
        if (!active) {
            setSeconds(0);
            setMinutes(0);
            setHours(0);
        }
    }, [active]);

    useEffect(() => {
        let interval: NodeJS.Timeout = undefined;

        if (active) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds - 1);
            }, 1000);
        }

        if (currSeconds === 0 && active) {
            setSeconds(60);
            setMinutes(minutes => minutes - 1);
        } else if (currMinutes === 0 && active) {
            setMinutes(60);
            setHours(hours => hours - 1);
        } else if (currHours === 0) {
            callback();
        }

        return () => clearInterval(interval);
    }, [active, currSeconds, currMinutes, currHours]);

    return (
        <div className={classes.root}>
            <span>Час до закінчення тесту:</span>
            <span>{currHours}</span>
            <span>:</span>
            <span>{currMinutes}</span>
            <span>:</span>
            <span>{currSeconds}</span>
        </div>
    );
};

export default Component;
