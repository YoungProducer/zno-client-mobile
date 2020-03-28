/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 23 March 2020
 */

/** External imports */
import React from 'react';

/** Application's imports */
import { TAnswerType } from 'api';

/** Lazy loaded components */
const Single = React.lazy(() => import('./Single'));
const Relations = React.lazy(() => import('./Relations'));
const Text = React.lazy(() => import('./Text'));

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
