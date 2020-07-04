/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 23 March 2020
 */

/** External imports */
import React, { useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import ButtonBase from '@material-ui/core/ButtonBase';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { red, yellow } from '@material-ui/core/colors';

/** Application's imports */
import { AdditionalAnswerPropertiesContext } from 'context/TestSuiteContext';
import { RootState, IAnswer } from 'store/slices';
import {
    selectAnswerByTaskIndex,
    selectIsAnswerSelected,
    selectIsAnswerGived,
    selectIsAnswerRight,
    selectTestSuiteFinished,
} from 'store/selectors/testSuite';
import {
    selectAnswerByIndexAction,
    giveAnswerByIndexAction,
    ISetAnswerByIdPreparePayload,
} from 'store/slices/testSuite';

const useStyles = makeStyles((theme: Theme) => createStyles({
    tile: {
        width: 42,
        height: 42,
        fontSize: '1.25rem',
        borderRadius: 6,
        filter: `drop-shadow(0px 3px 3.5px rgba(0,0,0,0.16))`,
        backgroundColor: '#ffffff',
        color: '#867272',
        transition: theme.transitions.create(['background-color', 'color'], {
            duration: 300,
            easing: theme.transitions.easing.easeInOut,
        }),
    },
    activeTile: {
        backgroundColor: '#5b6ee9',
        color: '#f5f5f5',
        transition: theme.transitions.create(['background-color', 'color'], {
            duration: 300,
            easing: theme.transitions.easing.easeInOut,
        }),
    },
    right: {
        background: theme.palette.secondary.main,
        color: theme.palette.getContrastText(theme.palette.secondary.main),
        transition: theme.transitions.create(['height', 'width', 'background', 'color'], {
            duration: 200,
            easing: theme.transitions.easing.easeInOut,
        }),
    },
    wrong: {
        background: red.A200,
        color: theme.palette.getContrastText(red.A200),
        transition: theme.transitions.create(['height', 'width', 'background', 'color'], {
            duration: 200,
            easing: theme.transitions.easing.easeInOut,
        }),
    },
}));

interface IOwnProps {
    title: string;
    value: string;
    taskIndex: number;
    answerIndex: number;
}

interface IStateProps {
    answer: IAnswer;
    gived: boolean;
    finished: boolean;
}

interface IDispatchProps {
    selectAnswer: (payload: ISetAnswerByIdPreparePayload) => void;
    giveAnswer: (id: number) => void;
}

export type TAnswerTileProps =
    IOwnProps
    & IStateProps
    & IDispatchProps;

const AnswerTile = ({
    answer,
    answerIndex,
    giveAnswer,
    selectAnswer,
    taskIndex,
    title,
    value,
    gived,
    finished,
}: TAnswerTileProps) => {
    const classes = useStyles({});

    const [active, toggleActive] = useState<boolean>(false);

    const handleOnClick = useCallback(() => {
        selectAnswer({
            answerIndex,
            id: taskIndex,
            answer: !active ? value : '',
        });
    }, [answerIndex, taskIndex, value, active]);

    useEffect(() => {
        if (answer) {
            toggleActive(answer.selected[answerIndex] === value);
        }
    }, [answer, value]);

    return (
        <AdditionalAnswerPropertiesContext.Consumer>
            {contextValue => {
                const { showRightDuringTest } = contextValue;

                const right =
                    ((showRightDuringTest && gived) || finished) &&
                    value === answer.right[answerIndex];

                const wrong =
                    value !== answer.right[answerIndex] &&
                    (value === answer.gived[answerIndex]
                        || value === answer.selected[answerIndex]) &&
                    ((showRightDuringTest && gived) || finished) &&
                    answer.gived[answerIndex] !== answer.right[answerIndex];

                const currentTileGived = answer.gived[answerIndex] === value;

                return (
                    <ButtonBase
                        className={classNames(classes.tile, {
                            [classes.activeTile]: (active && !gived) || currentTileGived,
                            [classes.wrong]: wrong,
                            [classes.right]: right,
                        })}
                        onClick={handleOnClick}
                    >
                        {title}
                    </ButtonBase>
                );
            }}
        </AdditionalAnswerPropertiesContext.Consumer>
    );
};

const mapStateToProps = (state: RootState, props: IOwnProps): IStateProps => ({
    answer: selectAnswerByTaskIndex(state, props),
    gived: selectIsAnswerGived(state, props),
    finished: selectTestSuiteFinished(state),
});

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
    selectAnswer: (payload: ISetAnswerByIdPreparePayload) =>
        dispatch(selectAnswerByIndexAction(payload)),

    giveAnswer: (id: number) =>
        dispatch(giveAnswerByIndexAction(id)),
});

export default connect<IStateProps, IDispatchProps, IOwnProps>(
    mapStateToProps,
    mapDispatchToProps,
)(AnswerTile);
