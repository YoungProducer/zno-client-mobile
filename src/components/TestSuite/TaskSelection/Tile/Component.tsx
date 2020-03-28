/**
 * Created by: Oleksandr Bezrukov
 * Creation datel: 24 March 2020
 *
 * Component which render task tiles with correct colors.
 */

/** External imports */
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import classNames from 'classnames';
import ButtonBase from '@material-ui/core/ButtonBase';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { yellow, red } from '@material-ui/core/colors';

/** Application's imports */
import { AdditionalAnswerPropertiesContext } from 'context/TestSuiteContext';
import { TTileProps } from './container';

export const tileWidth = 65;
export const activeTileWidth = 93;
/** Distance between tiles */
export const tilesSpacing = 16;

const useTileStyles = makeStyles((theme: Theme) =>
    createStyles({
        tile: {
            minWidth: tileWidth,
            width: tileWidth,
            height: 92,
            borderRadius: 16,
            background: '#edeff3',
            fontSize: '1.25rem',
            color: '#b19898',
            lineHeight: '40px',
            display: 'block',
            transition: theme.transitions.create(['height', 'width', 'background', 'color'], {
                duration: 200,
                easing: theme.transitions.easing.easeInOut,
            }),
            marginRight: tilesSpacing,
            '&:last-child': {
                marginRight: 0,
            },
        },
        tileActive: {
            height: 116,
            width: activeTileWidth,
            minWidth: activeTileWidth,
            background: '#fff',
            transition: theme.transitions.create(['height', 'width', 'background', 'color'], {
                duration: 200,
                easing: theme.transitions.easing.easeInOut,
            }),
        },
        tileHide: {
            visibility: 'hidden',
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
        selected: {
            background: yellow[600],
            color: theme.palette.getContrastText(yellow[600]),
            transition: theme.transitions.create(['height', 'width', 'background', 'color'], {
                duration: 200,
                easing: theme.transitions.easing.easeInOut,
            }),
        },
    }));

const Tile = ({
    taskIndex,
    active,
    callback,
    hide,
    selected,
    gived,
    right,
    finished,
}: TTileProps) => {
    const classes = useTileStyles({});

    return (
        <AdditionalAnswerPropertiesContext.Consumer>
            { contextValue => {
                const { showRightDuringTest } = contextValue;

                /** Variables which related for additional classes  for ButtonBase*/
                const applySelected =
                    selected
                    && !gived
                    && !finished;

                const applyRight =
                    showRightDuringTest
                    && gived
                    && right;

                const applyWrong =
                    (showRightDuringTest
                    && gived || finished)
                    && !right;

                const applyGived =
                    !showRightDuringTest
                    && gived;

                return (
                    <ButtonBase
                        className={classNames(classes.tile, {
                            [classes.tileActive]: active,
                            [classes.tileHide]: hide,
                            [classes.selected]: applySelected,
                            [classes.right]: applyRight || applyGived,
                            [classes.wrong]: applyWrong,
                        })}
                        onClick={callback}
                    >
                        <p>Зав</p>
                        <p>{taskIndex + 1}</p>
                    </ButtonBase>
                );
            }}
        </AdditionalAnswerPropertiesContext.Consumer>
    );
};

export default Tile;
