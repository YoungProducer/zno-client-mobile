/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 27 March 2020
 *
 * Component which display actions related to test suite.
 */

/** External imports */
import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

/** Application's imports */

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        button: {
            filter: `drop-shadow(0px 3px 2.5px rgba(0,0,0,0.16))`,
            width: '45%',
            color: '#fff',
            background: '#5b6ee9',
            '&:hover': {
                background: '#5b6ee9',
            },
        },
    }));

interface ITestSuiteStatsActionProps {
    finishTest: () => void;
}

const Component = ({ finishTest }: ITestSuiteStatsActionProps) => {
    const classes = useStyles({});

    return (
        <div className={classes.root}>
            <Button
                className={classes.button}
                variant='contained'
                onClick={finishTest}
                disableElevation
            >
                Закінчити тест
            </Button>
        </div>
    );
};

export default Component;
