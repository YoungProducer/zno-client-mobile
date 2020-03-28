/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 23 March 2020
 *
 * Component which allows to select one right answer from 5 posible.
 */

/** External imports */
import React from 'react';
import Grid from '@material-ui/core/Grid';

/** Application's imports */
import AnswerTile from './AnswerTile';
import { markUp } from './Component';

export interface ISingleAnswerProps {
    taskIndex: number;
}

const Component = ({ taskIndex }: ISingleAnswerProps) => {
    return (
        <Grid container spacing={2}>
            { markUp.map((mark, index) => (
                <Grid item key={index}>
                    <AnswerTile
                        title={mark}
                        value={index.toString()}
                        answerIndex={0}
                        taskIndex={taskIndex}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default Component;
