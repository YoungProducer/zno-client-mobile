/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 23 March 2020
 */

/** External imports */
import React from 'react';

/** Application's imports */
import { TAnswerType } from 'api';
import Single from './Single';
import Relations from './Relations';
import Text from './Text';

export const markUp = ['A', 'Б', 'В', 'Г', 'Д'];

interface IAnswerProps {
    type: TAnswerType;
    taskIndex: number;
}

const Component = ({ type, taskIndex }: IAnswerProps) => {
    return (
        <>
            { type === 'SINGLE' && <Single taskIndex={taskIndex}/>}
            { type === 'RELATIONS' && <Relations taskIndex={taskIndex}/>}
            { type === 'TEXT' && <Text taskIndex={taskIndex}/>}
        </>
    );
};

export default Component;
