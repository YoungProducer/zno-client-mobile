/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 24 March 2020
 *
 * Component which allows user to give answers in text fields.
 */

/** Extrnal imports */
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

/** Application's imports */
import { AdditionalAnswerPropertiesContext } from 'context/TestSuiteContext';
import Input from 'components/custom/Input';

import { IAnswer, ISetAnswerByIdPreparePayload, RootState } from 'store/slices';
import { selectAnswerByIndexAction } from 'store/slices/testSuite';
import {
    selectAnswerByTaskIndex,
    selectIsAnswerGived,
    selectTestSuiteFinished,
} from 'store/selectors/testSuite';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            height: 60,
            borderRadius: 4,
            background: `#fff`,
            filter: `drop-shadow(0px 3px 2.5px rgba(0,0,0,0.16))`,
            transtion: theme.transitions.create('filter', {
                duration: 200,
                easing: theme.transitions.easing.easeInOut,
            }),
        },
        inputWrapper: {
            marginBottom: theme.spacing(1),
            '&:last-child': {
                marginBottom: 0,
            },
            '& p': {
                color: '#867272',
                fontSize: '1.1rem',
            },
        },
        right: {
            background: `#fff`,
            filter: `drop-shadow(0px 3px 2.5px rgba(105, 222, 172, 0.8))`,
            transtion: theme.transitions.create('filter', {
                duration: 200,
                easing: theme.transitions.easing.easeInOut,
            }),
        },
        wrong: {
            background: `#fff`,
            filter: `drop-shadow(0px 3px 2.5px rgba(255, 82, 82, 0.8))`,
            transtion: theme.transitions.create('filter', {
                duration: 200,
                easing: theme.transitions.easing.easeInOut,
            }),
        },
    }));

/** Props which component get from the parent */
interface IOwnProps {
    taskIndex: number;
}

/** Props which component select from the redux-store */
interface IStateProps {
    answer: IAnswer;
    gived: boolean;
    finished: boolean;
}

/** Props which component can dispatch to redux-store */
interface IDispatchProps {
    selectAnswer: (payload: ISetAnswerByIdPreparePayload) => void;
}

/** Type which describe all props which will be pushed to the component */
export type TTextAnswerProps =
    IOwnProps
    & IStateProps
    & IDispatchProps;

const Component = ({
    answer,
    gived,
    taskIndex,
    finished,
    selectAnswer,
}: TTextAnswerProps) => {
    const classes = useStyles({});

    return (
        <AdditionalAnswerPropertiesContext.Consumer>
            { contextValue => {
                const { showRightDuringTest } = contextValue;

                return answer.selected.map((el, index) => {
                    const right =
                        ((showRightDuringTest && gived)
                        || finished)
                        && gived
                        && el === answer.right[index];

                    const wrong =
                        ((showRightDuringTest && gived)
                        || finished)
                        && (el !== answer.right[index]
                        && el === answer.gived[index]
                        || (finished && el === ''));

                    return (
                        <div className={classes.inputWrapper}>
                            <p>Відповідь {index + 1}</p>
                            <Input
                                rootClassName={classNames(classes.root, {
                                    [classes.right]: right,
                                    [classes.wrong]: wrong,
                                })}
                                key={index}
                                value={el}
                                onChange={(event) => selectAnswer({
                                    id: taskIndex,
                                    answerIndex: index,
                                    answer: event.target.value,
                                })}
                            />
                        </div>
                    );
                });
            }}
        </AdditionalAnswerPropertiesContext.Consumer>
    );
};

/** Select variables from the redux-store */
const mapStateToProps = (state: RootState, props: IOwnProps): IStateProps => ({
    answer: selectAnswerByTaskIndex(state, props),
    gived: selectIsAnswerGived(state, props),
    finished: selectTestSuiteFinished(state),
});

/** Wrap function into dispatch */
const mapDipsatchToProps = (dispatch: any): IDispatchProps => ({
    selectAnswer: (payload: ISetAnswerByIdPreparePayload) =>
        dispatch(selectAnswerByIndexAction(payload)),
});

/** Export configured component via HOC */
export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDipsatchToProps,
)(Component);
