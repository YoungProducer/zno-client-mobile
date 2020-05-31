/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 23 March 2020
 *
 * Component which allows to select which task user want to complete.
 */

/** External imports */
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import Box from '@material-ui/core/Box';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

/** Application's imports */
import Tile, {
    tileWidth,
    activeTileWidth,
    tilesSpacing,
} from './Tile';
import math from 'images/math.jpg';

const useComponentStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            overflow: 'hidden',
            position: 'relative',
            height: 300,
            width: '100%',
            cursor: 'pointer',
            marginLeft: theme.spacing(-1),
        },
        innerContainer: {
            display: 'flex',
            alignItems: 'flex-start',
            position: 'absolute',
            height: '100%',
            width: '100%',
            paddingLeft: theme.spacing(1),
        },
        animateContainer: {
            transition: theme.transitions.create('left', {
                duration: 500,
                easing: theme.transitions.easing.easeInOut,
            }),
        },
    }));

const useCarouselFields = (props: ITaskSelectionProps) => {
    /** Destruct props */
    const {
        tasksAmount,
        activeTask,
        setTaskIndex,
    } = props;

    const history = useHistory();

    const handleTileClick = (id: string) => history.push(`/subject-configuration/${id}`);

    /** Offset of the inner container */
    const [offsetX, setOffestX] = useState<number>(0);
    const [prevStartX, setPrevStartX] = useState<number>(0);
    /** Toggles when mouse down or up */
    const [mouseDown, toggleMouseDown] = useState<boolean>(false);
    /** Related to animate class in inner container */
    const [animate, toggleAnimate] = useState<boolean>(false);

    const rootContainerRef = React.createRef<HTMLDivElement>();

    const [buttonsAmount, setButtonsAmount] = useState<number>(0);

    const minOffset = 0;
    const maxOffset = tasksAmount * (tileWidth + tilesSpacing) - tilesSpacing + (activeTileWidth - tileWidth);

    /**
     * If offset is out of range then
     * set offset in extreme positions.
     */
    const handleSetOffset = (offset: number) => {
        if (offset > minOffset) {
            setOffestX(minOffset);
        } else if (offset < -maxOffset + rootContainerRef.current.clientWidth) {
            setOffestX(-maxOffset + rootContainerRef.current.clientWidth);
        } else {
            setOffestX(offset);
        }
    };

    /**
     * Calculate diapason in which tiles must be displayed
     * to optimize carousel if tile index is out of range
     * to this tile will be added class with 'visibility: hidden'.
     */
    const getFirstTileIndex = useCallback(() => {
        const index = Math.floor(offsetX / (tileWidth + tilesSpacing)) * -1;
        return 0 > index ? 0 : index - 2;
    }, [offsetX]);

    const getLastTileIndex = useCallback(() => {
        const index = buttonsAmount + Math.floor(offsetX / (tileWidth + tilesSpacing)) * -1;
        return buttonsAmount > index ? buttonsAmount : index + 2;
    }, [buttonsAmount, offsetX]);

    /**
     * Handle mouse move to drag the carousel
     * offset divided by 2 to make carousel slower.
     */
    const handleOnTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
        setPrevStartX(event.touches[0].clientX);
    };

    const handleOnTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
        event.persist();
        const currentTouchX = event.touches[0].clientX;

        const mouseOffsetX = (prevStartX - currentTouchX) / -1;
        const newOffsetX = offsetX + mouseOffsetX;

        setPrevStartX(currentTouchX);

        handleSetOffset(newOffsetX);
    };

    /**
     * Toggle animate to 'false' to remove
     * animation class in innerContainer
     * to prevent bugs.
     */
    const handleOnMouseDown = () => {
        toggleMouseDown(true);
        toggleAnimate(false);
    };

    const handleOnMouseUp = () => toggleMouseDown(false);

    /**
     * If new active tile has border index
     * then toggle animate to 'true' to add
     * class in innerContainer which allows
     * to animate 'left' property and then
     * calculate and add offset to move
     * tiles to left or to right.
     */
    useEffect(() => {
        if (!mouseDown && activeTask !== 0) {
            /**
             * Difference between last tile and new active el.
             * 2 - lastTileIndex offset.
             */
            const lastDiff = getLastTileIndex() - 2 - activeTask;
            /**
             * Difference between first tile and new active el.
             * 2 - firstTileIndex offset.
             */
            const firstDiff = getFirstTileIndex() + 2 - activeTask;

            if (lastDiff < 3 && lastDiff >= 0) {
                toggleAnimate(true);
                handleSetOffset(Math.floor(offsetX - (buttonsAmount - 2) * (tileWidth + tilesSpacing)));
            }

            if (firstDiff < 3 && firstDiff >= 0) {
                toggleAnimate(true);
                handleSetOffset(Math.floor(offsetX + (buttonsAmount - 2) * (tileWidth + tilesSpacing)));
            }
        }
        if (activeTask <= getFirstTileIndex()) {
            const firstDiff = getFirstTileIndex() + 2;

            if (firstDiff !== 0) {
                toggleAnimate(true);
                handleSetOffset(Math.floor(offsetX + (getLastTileIndex() - 2) * (tileWidth + tilesSpacing)));
            }
        }
    }, [activeTask]);

    /**
     * Calculate buttons amount per innerContainer width.
     */
    useEffect(() => {
        const containerWidth = rootContainerRef.current.clientWidth;

        const amount = ((containerWidth + tilesSpacing) / (tileWidth + tilesSpacing));

        setButtonsAmount(Math.floor(amount));
    }, [rootContainerRef]);

    const tiles = useMemo(() =>
        [{ image: math, id: '5e69049424aa9a00072762eb' }].map((_, index) => (
            <Tile
                key={index}
                image={_.image}
                taskIndex={index}
                active={index === activeTask}
                hide={!(index >= getFirstTileIndex() && index <= getLastTileIndex())}
                callback={() => {
                    handleTileClick(_.id);
                }}
            />
        )), [
            activeTask,
            tasksAmount,
            getFirstTileIndex,
            getLastTileIndex,
        ]);

    return {
        handleOnTouchMove,
        handleOnMouseDown,
        handleOnMouseUp,
        handleOnTouchStart,
        tiles,
        animate,
        offsetX,
        rootContainerRef,
        buttonsAmount,
    };
};

export interface ITaskSelectionProps {
    tasksAmount: number;
    setTaskIndex: (index: number) => void;
    activeTask: number;
}

const Component = (props: ITaskSelectionProps) => {
    const classes = useComponentStyles({});

    const {
        offsetX,
        animate,
        tiles,
        rootContainerRef,
        handleOnTouchMove,
        handleOnTouchStart,
    } = useCarouselFields(props);

    return (
        <div
            className={classes.root}
            // onTouchStart={handleOnTouchStart}
            // onTouchMove={handleOnTouchMove}
            ref={rootContainerRef}
        >
            <Box
                className={classNames(classes.innerContainer, {
                    [classes.animateContainer]: animate,
                })}
                left={offsetX}
            >
                {tiles}
            </Box>
        </div>
    );
};

export default Component;
