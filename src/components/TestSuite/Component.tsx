// /**
//  * Created by: Oleksandr Bezrukov
//  * Creation date: 20 March 2020
//  *
//  * Component which download images for test suite
//  * display answers and allow to pass different test suites.
//  */

// /** External imports */
// import React, { useEffect, useState, useContext } from 'react';
// import Grid from '@material-ui/core/Grid';
// import Collapse from '@material-ui/core/Collapse';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// /** Application's imports */
// import { AdditionalAnswerPropertiesContext } from 'context/TestSuiteContext';
// import { useSearchParams } from 'hooks/useSearchParams';
// import { TTestSuiteProps } from './container';
// import { ITestSuiteCredentials } from 'api';
// import TaskSelection from './TaskSelection';
// import TaskActions from './TaskActions';
// import AppBar from 'components/AppBar';
// import TestSuiteStats from 'components/TestSuiteSide/TestSuiteStats';

// /** Lazy loaded components */
// const Answer = React.lazy(() => import('./Answer'));
// const Timer = React.lazy(() => import('components/Timer'));

// /** Define Material classes as hook */
// const useStyles = makeStyles((theme: Theme) =>
//     createStyles({
//         root: {
//             // height: '100%',
//             // position: 'relative',
//             // padding: theme.spacing(1),
//             paddingTop: 70,
//         },
//         innerContainer: {
//             height: '100%',
//             paddingLeft: theme.spacing(1),
//             paddingRight: theme.spacing(1),
//         },
//         header: {
//             padding: theme.spacing(2),
//             background: '#fff',
//             borderRadius: 16,
//             display: 'flex',
//             justifyContent: 'space-between',
//         },
//         title: {
//             fontSize: '1.5375rem',
//             color: '#b19898',
//         },
//         img: {
//             maxHeight: '40vh',
//             borderRadius: 16,
//             background: '#fff',
//             marginTop: theme.spacing(1.5),
//         },
//         explImg: {
//             height: '100%',
//             maxWidth: '100%',
//         },
//         answersBlock: {
//             padding: theme.spacing(1),
//             borderRadius: 16,
//             background: '#fff',
//             margin: 0,
//             // width: '100%',
//             marginTop: theme.spacing(1),
//         },
//         tasksSelectionBlock: {
//             marginTop: theme.spacing(3),
//             position: 'absolute',
//             bottom: 0,
//             width: '100%',
//         },
//     }));

// export interface IAdditionalTestSettings {
//     limitTime: string | boolean;
//     showRightDuringTest: string | boolean;
// }

// export interface IAdditionalTestSettingsReturn {
//     limitTime: boolean;
//     showRightDuringTest: boolean;
// }

// const useInitTestSuite = (props: TTestSuiteProps) => {
//     /** Extract props */
//     const { fetchTestSuite } = props;

//     /** Define posible search params array */
//     const searchNames = ['subjectId', 'subSubjectId', 'theme', 'session', 'training'];

//     const testSettingsNames = ['limitTime', 'showRightDuringTest'];

//     /** Get search data */
//     const searchData = useSearchParams<ITestSuiteCredentials>({ searchNames });
//     const testSettings = useSearchParams<IAdditionalTestSettings>({ searchNames: testSettingsNames });

//     testSettings.limitTime = testSettings.limitTime === 'true' && Boolean(searchData.session || searchData.training);
//     testSettings.showRightDuringTest = testSettings.showRightDuringTest === 'true' && Boolean(searchData.theme || searchData.training);

//     useEffect(() => {
//         fetchTestSuite(searchData);
//     }, []);

//     return testSettings as IAdditionalTestSettingsReturn;
// };

// const useTestSuiteFileds = (props: TTestSuiteProps) => {
//     const [currentTask, setCurrentTask] = useState<number>(0);

//     const [showExplanation, setShowExplanation] = useState<boolean>(false);

//     const toggleShowExplanation = () => setShowExplanation(!showExplanation);

//     const handleSetCurrentTask = (index: number) => {
//         setCurrentTask(index);
//         setShowExplanation(false);
//     };

//     return {
//         task: {
//             current: currentTask,
//             set: handleSetCurrentTask,
//         },
//         explanation: {
//             show: showExplanation,
//             toggle: toggleShowExplanation,
//         },
//     };
// };

// const Component = (props: TTestSuiteProps) => {
//     /** Init classes */
//     const classes = useStyles({});

//     /** Destruct props */
//     const {
//         answers,
//         name,
//         tasksImages,
//         explanationsImages,
//         finished,
//         setTestSuiteFinished,
//     } = props;

//     const { limitTime, showRightDuringTest } = useInitTestSuite(props);

//     const { setShowRightDuringTest } = useContext(AdditionalAnswerPropertiesContext);

//     useEffect(() => {
//         setShowRightDuringTest(showRightDuringTest);
//     }, [showRightDuringTest]);

//     const { task, explanation } = useTestSuiteFileds(props);

//     return (
//         <div className={classes.root}>
//             <AppBar />
//             {/* <div className={classes.innerContainer}> */}
//                 {/* <div className={classes.header}>
//                     <Typography className={classes.title}>{name}</Typography>
//                     { limitTime && (
//                         <Timer
//                             hours={3}
//                             callback={() => setTestSuiteFinished(true)}
//                             active={!finished}
//                             setActive={setTestSuiteFinished}
//                         />
//                     )}
//                 </div> */}
//                 <img
//                     className={classes.img}
//                     src={tasksImages[task.current]}
//                 />
//                 {/* <Grid container spacing={2} direction='column' className={classes.answersBlock}>
//                     { answers.length !== 0 &&
//                         <Grid container direction='row'>
//                             <Grid container item direction='column' md={4} spacing={2}>
//                                 <Grid item>
//                                     <Answer
//                                         type={answers[task.current].type}
//                                         taskIndex={task.current}
//                                     />
//                                 </Grid>
//                                 <Grid item>
//                                     <TaskActions
//                                         taskIndex={task.current}
//                                         explanationExists={Boolean(explanationsImages[task.current])}
//                                         showExplanation={explanation.show}
//                                         toggleExplanation={explanation.toggle}
//                                         setTaskIndex={task.set}
//                                     />
//                                 </Grid>
//                             </Grid>
//                             <Grid item md={8}>
//                                 <Collapse in={explanation.show}>
//                                     <img src={explanationsImages[task.current]} className={classes.explImg}/>
//                                 </Collapse>
//                             </Grid>
//                         </Grid>
//                     }
//                 </Grid> */}
//                 {/* <div className={classes.tasksSelectionBlock}>
//                     <TaskSelection
//                         tasksAmount={answers.length}
//                         activeTask={task.current}
//                         setTaskIndex={task.set}
//                     />
//                 </div> */}
//             {/* </div> */}
//         </div>
//     );
// };

// export default Component;

/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 4 March 2020
 *
 * Component which allows to configure test options
 * and allows to select which test you want to complete.
 */

/** External imports */
import React, { useState, useCallback, useMemo, useEffect, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

/** Application's imports */
import AppBar from 'components/AppBar';
import TestSuiteStats from 'components/TestSuiteSide/TestSuiteStats';
import { TTestSuiteProps } from './container';
import { useSearchParams } from 'hooks/useSearchParams';
import { ITestSuiteCredentials } from 'api';
import { AdditionalAnswerPropertiesContext } from 'context/TestSuiteContext';
import TaskActions from './TaskActions';
import Answer from './Answer';
import TaskSelection from './TaskSelection';
import Timer from 'components/Timer';

/** Define Material UI styles as hook */
const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        paddingTop: 70,
        paddingBottom: 70,
        height: '100%',
    },
    header: {
        // padding: theme.spacing(2),
        // background: '#fff',
        // borderRadius: 16,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    title: {
        fontSize: '1.5375rem',
        color: '#b19898',
    },
    innerContainer: {
        position: 'relative',
        padding: theme.spacing(0, 1),
        height: '100%',
    },
    taskSelection: {
        height: 116,
        width: '100%',
        padding: theme.spacing(0, 1),
    },
    img: {
        width: '100%',
    },
    gridItem: {
        height: '100%',
    },
    gridContainer: {
        marginTop: 0,
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

/** Create component */
const Component = (props: any) => {
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

    const [showStats, setShowStats] = useState<boolean>(false);
    const toggleShowStats = () => setShowStats(!showStats);

    return (
        <div
            className={classes.root}
        >
            <AppBar
                extendable={<TestSuiteStats />}
                extend={showStats}
                toggleExtend={toggleShowStats}
            />
            <div className={classes.innerContainer}>
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
                    // className={classes.img}
                    src={tasksImages[task.current]}
                />
                <Grow in={explanation.show} unmountOnExit>
                    <img src={explanationsImages[task.current]} className={classes.img}/>
                </Grow>
                <Grid container direction='column' spacing={2} className={classes.gridContainer}>
                    {/* <Grid item className={classes.gridItem}> */}
                    {/* </Grid> */}
                    <Grid item container>
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
                    <Grid item>
                        <div className={classes.taskSelection}>
                            <TaskSelection
                                tasksAmount={answers.length}
                                activeTask={task.current}
                                setTaskIndex={task.set}
                            />
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

/** Export component */
export default Component;
