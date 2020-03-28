/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 21 March 2020
 *
 * Selectors for 'testSuite' slice.
 */

/** External imports */
import { createSelector } from '@reduxjs/toolkit';
import { ParametricSelector } from 'reselect';

/** Application's imports */
import { RootState, IAnswer } from 'store/slices';
import { TestSuite } from 'constants/testSuite';

const selectTaskIndexFromProps: ParametricSelector<RootState, any, number> = (_, props) => props.taskIndex;

export const selectTestSuiteLoading = (state: RootState) =>
    state.testSuite.loading;

export const selectTestSuiteName = (state: RootState) =>
    state.testSuite.name;

export const selectTestSuiteFinished = (state: RootState) =>
    state.testSuite.finished;

export const selectTestSuiteTasksImages = (state: RootState) =>
    state.testSuite.tasksImages;

export const selectTestSuiteExplanationsImages = (state: RootState) =>
    state.testSuite.explanationImages;

export const selectAnswers = (state: RootState) =>
    state.testSuite.answers;

export const selectAnswersAmount = (state: RootState) =>
    state.testSuite.answers.length;

const isAnswerSelectedByTaskIndex = (answers: IAnswer[], taskIndex: number) =>
    answers.length !== 0
        ? answers[taskIndex].selected.some(answer => answer !== '')
        : false;

export const selectIsAnswerSelected = createSelector(
    selectAnswers,
    selectTaskIndexFromProps,
    isAnswerSelectedByTaskIndex,
);

const isAnswerGivedByTaskIndex = (answers: IAnswer[], taskIndex: number) =>
    answers.length !== 0
        ? answers[taskIndex].gived.every(answer => answer !== '')
        : false;

export const selectIsAnswerGived = createSelector(
    selectAnswers,
    selectTaskIndexFromProps,
    isAnswerGivedByTaskIndex,
);

const isAnswerRightByTaskIndex = (answers: IAnswer[], taskIndex: number) =>
    answers.length !== 0
        ? answers[taskIndex].gived.every((answer, index) =>
            answer.replace('.', ',') === answers[taskIndex].right[index].replace('.', ','))
        : false;

export const selectIsAnswerRight = createSelector(
    selectAnswers,
    selectTaskIndexFromProps,
    isAnswerRightByTaskIndex,
);

export const selectAnswerByTaskIndex = createSelector(
    selectAnswers,
    selectTaskIndexFromProps,
    (answers, taskIndex) =>
        answers[taskIndex],
);

export const selectAmountOfSelectedAnswers = createSelector(
    selectAnswers,
    (answers) => answers.reduce((acc, _, index) =>
        isAnswerSelectedByTaskIndex(answers, index)
            ? acc + 1
            : acc, 0),
);

export const selectAmountOfGivedAnswers = createSelector(
    selectAnswers,
    (answers) => answers.reduce((acc, _, index) =>
        isAnswerGivedByTaskIndex(answers, index)
            ? acc + 1
            : acc, 0),
);

export const selectAmountOfRightAnswers = createSelector(
    selectAnswers,
    (answers) => answers.reduce((acc, _, index) =>
        isAnswerRightByTaskIndex(answers, index)
            ? acc + 1
            : acc, 0),
);

export const getAmountOfPointsSingle = (answer: IAnswer, finished: boolean) =>
    (answer.gived[0] === answer.right[0]
    || (finished && answer.selected[0] === answer.right[0]))
        ? TestSuite.PointsPerSingle
        : 0;

export const getAmountOfPointsRelations = (answer: IAnswer, finished: boolean) =>
    answer.right.reduce((acc, curr, index) =>
        (curr === answer.gived[index]
        || (finished && curr === answer.selected[index])
            ? acc + TestSuite.PointsPerEachSingleInRelations
            : acc),
        0);

export const getAmountOfPointsText = (answer: IAnswer, finished: boolean) => {
    const amountOfRight = answer.right.reduce((acc, curr, index) => {
        const currFixed = curr.replace('.', ',');
        const selectedFixed = answer.selected[index].replace('.', ',');
        const givedFixed = answer.gived[index].replace('.', ',');

        return (currFixed === givedFixed
            || (finished && currFixed === selectedFixed)
                ? acc + TestSuite.PointsPerEachSingleInRelations
                : acc);
    }, 0);

    const totalAmount = answer.right.length;

    return (amountOfRight / totalAmount) * TestSuite.PointsPerText;
};

export const selectCurrentAmountOfPoints = createSelector(
    selectAnswers,
    selectTestSuiteFinished,
    (answers, finished) => answers.reduce((points, answer) => {
        if (answer.type === 'SINGLE') {
            return points + getAmountOfPointsSingle(answer, finished);
        }

        if (answer.type === 'RELATIONS') {
            return points + getAmountOfPointsRelations(answer, finished);
        }

        if (answer.type === 'TEXT') {
            return points + getAmountOfPointsText(answer, finished);
        }

        return points;
    }, 0),
);

export const selectMaxAmountOfPoints = createSelector(
    selectAnswers,
    (answers) => answers.reduce((acc, curr) => {
        if (curr.type === 'SINGLE') return acc + TestSuite.PointsPerSingle;
        if (curr.type === 'RELATIONS') return acc + TestSuite.PointsPerRelations;
        if (curr.type === 'TEXT') return acc + TestSuite.PointsPerText;

        return acc;
    }, 0),
);
