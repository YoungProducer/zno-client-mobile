/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 23 March 2020
 *
 * Component which allows to select 4 answers right answer from 20 posible.
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
            {[...Array(4)].map((_, hIndex) => (
                <Grid container item spacing={2} key={hIndex}>
                    { markUp.map((mark, vIndex) => (
                        <Grid item key={vIndex}>
                            <AnswerTile
                                title={mark}
                                value={vIndex.toString()}
                                answerIndex={hIndex}
                                taskIndex={taskIndex}
                            />
                        </Grid>
                    ))}
                </Grid>
            ))}
        </Grid>
    );
};

export default Component;
