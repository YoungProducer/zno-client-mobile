/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 20 March 2020
 *
 * Component which download images for test suite
 * display answers and allow to pass different test suites.
 */

/** External imports */
import React, { useEffect, useState, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

/** Application's imports */
import { AdditionalAnswerPropertiesContext } from 'context/TestSuiteContext';
import { useSearchParams } from 'hooks/useSearchParams';
import { TTestSuiteProps } from './container';
import { ITestSuiteCredentials } from 'api';
import TaskSelection from './TaskSelection';
import TaskActions from './TaskActions';

/** Lazy loaded components */
const Answer = React.lazy(() => import('./Answer'));
const Timer = React.lazy(() => import('components/Timer'));

/** Define Material classes as hook */
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: '100%',
            position: 'relative',
        },
        header: {
            padding: theme.spacing(2),
            background: '#fff',
            borderRadius: 16,
            display: 'flex',
            justifyContent: 'space-between',
        },
        title: {
            fontSize: '1.5375rem',
            color: '#b19898',
        },
        img: {
            maxHeight: '40vh',
            borderRadius: 16,
            background: '#fff',
            marginTop: theme.spacing(1.5),
        },
        explImg: {
            height: '100%',
            maxWidth: '100%',
        },
        answersBlock: {
            padding: theme.spacing(1),
            borderRadius: 16,
            background: '#fff',
            margin: 0,
            width: '100%',
            marginTop: theme.spacing(1),
        },
        tasksSelectionBlock: {
            marginTop: theme.spacing(3),
            position: 'absolute',
            bottom: 0,
            width: '100%',
        },
    }));

export interface IAdditionalTestSettings {
    limitTime: string | boolean;
    showRightDuringTest: string | boolean;
}

export interface IAdditionalTestSettingsReturn {
    limitTime: boolean;
    showRightDuringTest: boolean;
}

const useInitTestSuite = (props: TTestSuiteProps) => {
    /** Extract props */
    const { fetchTestSuite } = props;

    /** Define posible search params array */
    const searchNames = ['subjectId', 'subSubjectId', 'theme', 'session', 'training'];

    const testSettingsNames = ['limitTime', 'showRightDuringTest'];

    /** Get search data */
    const searchData = useSearchParams<ITestSuiteCredentials>({ searchNames });
    const testSettings = useSearchParams<IAdditionalTestSettings>({ searchNames: testSettingsNames });

    testSettings.limitTime = testSettings.limitTime === 'true' && Boolean(searchData.session || searchData.training);
    testSettings.showRightDuringTest = testSettings.showRightDuringTest === 'true' && Boolean(searchData.theme || searchData.training);

    useEffect(() => {
        fetchTestSuite(searchData);
    }, []);

    return testSettings as IAdditionalTestSettingsReturn;
};

const useTestSuiteFileds = (props: TTestSuiteProps) => {
    const [currentTask, setCurrentTask] = useState<number>(0);

    const [showExplanation, setShowExplanation] = useState<boolean>(false);

    const toggleShowExplanation = () => setShowExplanation(!showExplanation);

    const handleSetCurrentTask = (index: number) => {
        setCurrentTask(index);
        setShowExplanation(false);
    };

    return {
        task: {
            current: currentTask,
            set: handleSetCurrentTask,
        },
        explanation: {
            show: showExplanation,
            toggle: toggleShowExplanation,
        },
    };
};

const Component = (props: TTestSuiteProps) => {
    /** Init classes */
    const classes = useStyles({});

    /** Destruct props */
    const {
        answers,
        name,
        tasksImages,
        explanationsImages,
        finished,
        setTestSuiteFinished,
    } = props;

    const { limitTime, showRightDuringTest } = useInitTestSuite(props);

    const { setShowRightDuringTest } = useContext(AdditionalAnswerPropertiesContext);

    useEffect(() => {
        setShowRightDuringTest(showRightDuringTest);
    }, [showRightDuringTest]);

    const { task, explanation } = useTestSuiteFileds(props);

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <Typography className={classes.title}>{name}</Typography>
                { limitTime && (
                    <Timer
                        hours={3}
                        callback={() => setTestSuiteFinished(true)}
                        active={!finished}
                        setActive={setTestSuiteFinished}
                    />
                )}
            </div>
            <img
                className={classes.img}
                src={tasksImages[task.current]}
            />
            <Grid container spacing={2} direction='column' className={classes.answersBlock}>
                { answers.length !== 0 &&
                    <Grid container direction='row'>
                        <Grid container item direction='column' md={4} spacing={2}>
                            <Grid item>
                                <Answer
                                    type={answers[task.current].type}
                                    taskIndex={task.current}
                                />
                            </Grid>
                            <Grid item>
                                <TaskActions
                                    taskIndex={task.current}
                                    explanationExists={Boolean(explanationsImages[task.current])}
                                    showExplanation={explanation.show}
                                    toggleExplanation={explanation.toggle}
                                    setTaskIndex={task.set}
                                />
                            </Grid>
                        </Grid>
                        <Grid item md={8}>
                            <Collapse in={explanation.show}>
                                <img src={explanationsImages[task.current]} className={classes.explImg}/>
                            </Collapse>
                        </Grid>
                    </Grid>
                }
            </Grid>
            <div className={classes.tasksSelectionBlock}>
                <TaskSelection
                    tasksAmount={answers.length}
                    activeTask={task.current}
                    setTaskIndex={task.set}
                />
            </div>
        </div>
    );
};

export default Component;
