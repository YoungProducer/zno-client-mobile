/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 26 March 2020
 *
 * Component which display main stats for current test suite
 * and has some actions.
 */

/** External imports */
import React, { useContext, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

/** Application's imports */
import { AdditionalAnswerPropertiesContext } from 'context/TestSuiteContext';
import Wrapper from '../Wrapper';
import { TTestSuiteStatsProps } from './container';
import Progress from 'components/custom/LinearProgress';
import Actions from './Actions';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            color: '#867272',
            lineHeight: '48px',
        },
        dialogHeader: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            height: 48,
            position: 'relative',
        },
        progressBlock: {
            marginTop: theme.spacing(2),
        },
        actions: {
            marginTop: theme.spacing(2),
        },
    }));

const Component = (props: TTestSuiteStatsProps) => {
    const classes = useStyles({});

    const {
        amountOfGived,
        amountOfRight,
        amountOfSelected,
        answersAmount,
        currentAmountOfPoints,
        maxAmountOfPoints,
        finished,
        setTestSuiteFinished,
    } = props;

    const { showRightDuringTest } = useContext(AdditionalAnswerPropertiesContext);

    return (
        <Wrapper>
            <div className={classes.dialogHeader}>
                <Typography
                    variant='h5'
                    align='center'
                    className={classes.title}
                >
                    Статистика тесту
                </Typography>
            </div>
            <div className={classes.progressBlock}>
                <Progress
                    current={amountOfSelected}
                    total={answersAmount}
                    label='Кількість завдань у яких вибрана відповідь'
                />
                <Progress
                    current={amountOfGived}
                    total={answersAmount}
                    label='Кількість завдань на які дана відповідь'
                />
                <Progress
                    current={amountOfRight}
                    total={answersAmount}
                    label='Кількість завдань на які дана правильна відповідь'
                    hide={!showRightDuringTest ? !finished : false}
                />
                <Progress
                    current={currentAmountOfPoints}
                    total={maxAmountOfPoints}
                    label='Кількість набраних балів'
                    hide={!showRightDuringTest ? !finished : false}
                />
            </div>
            <div className={classes.actions}>
                <Actions
                    setTestSuiteFinished={setTestSuiteFinished}
                    finished={finished}
                />
            </div>
        </Wrapper>
    );
};

export default Component;
