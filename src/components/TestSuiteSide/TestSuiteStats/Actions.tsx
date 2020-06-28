/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 27 March 2020
 *
 * Component which display actions related to test suite.
 */

/** External imports */
import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

/** Application's imports */
import { useSearchParams } from 'hooks/useSearchParams';

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
    setTestSuiteFinished: (finished: boolean) => void;
    finished: boolean;
}

const Component = ({ setTestSuiteFinished, finished }: ITestSuiteStatsActionProps) => {
    const classes = useStyles({});

    const history = useHistory();

    const { subjectId } = useSearchParams<{ subjectId: string }>({ searchNames: ['subjectId'] });

    const goBack = () => {
        if (subjectId) {
            history.push(`/subject-configuration/${subjectId}`);
            setTestSuiteFinished(false);
        }
    };

    const finish = () => setTestSuiteFinished(true);

    return (
        <div className={classes.root}>
            { finished
                ? (
                    <Button
                        className={classes.button}
                        variant='contained'
                        onClick={goBack}
                        disableElevation
                    >
                        Конфігурація тесту
                    </Button>
                )
                : (
                    <Button
                        className={classes.button}
                        variant='contained'
                        onClick={finish}
                        disableElevation
                    >
                        Закінчити тест
                    </Button>
                )
            }
        </div>
    );
};

export default Component;
