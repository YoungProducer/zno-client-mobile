/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 12 March 2020
 *
 * Create component which display subjects.
 */

/** External imports */
import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Stage,
    Layer,
    Circle,
    Image,
} from 'react-konva';
import useImage from 'use-image';

import 'konva/lib/shapes/Circle';
import 'konva/lib/shapes/Image';
import 'konva/lib/shapes/Label';
import 'konva/lib/shapes/Rect';

/** Application's imports */
import { getCirclesData, getIconsData, IIconData, ICircle } from './process';
import { TSubjectList } from 'store/slices';

const CustomCircle = ({
    x,
    y,
    radius,
    hidden,
    imageUrl,
    name,
    id,
    history,
}: {
    x: number;
    y: number;
    radius: number;
    hidden: boolean;
    imageUrl: string;
    name: string;
    id: string;
    history: any;
}) => {
    const imageHeight = 40;
    const imageWidth = 40;

    let [imageSource] = useImage(imageUrl);
    let circle: any;
    let image: any;

    useEffect(() => {
        const duration = (Math.random() * (0.4 - 0.2) + 0.2).toFixed(1);

        circle.to({
            duration,
            scaleX: hidden ? 0 : 1,
            scaleY: hidden ? 0 : 1,
        });
        image.to({
            duration,
            scaleX: hidden ? 0 : 1,
            scaleY: hidden ? 0 : 1,
        });
    }, [hidden]);

    const clickHandle = () => {
        history.push(`/subject-configuration/${id}`);
    };

    return (
        <>
            <Circle
                x={x}
                y={y}
                radius={radius}
                fill={'#fff'}
                ref={node => circle = node}
            />
            <Image
                image={imageSource}
                x={x}
                y={y}
                offsetX={imageWidth / 2}
                offsetY={imageHeight / 2}
                width={imageWidth}
                height={imageHeight}
                ref={node => image = node}
                onClick={clickHandle}
            />
        </>
    );
};

export type TSubjectPresentationProps = {
    subjectsList: TSubjectList;
    searchValue: string;
};

export interface ISmartIcon extends IIconData {
    id: string;
    name: string;
    image: string;
    hidden: boolean;
}

const Component = ({
    subjectsList,
    searchValue,
}: TSubjectPresentationProps) => {
    const history = useHistory();
    const [circles, setCircle] = useState<ICircle[]>([]);
    const [icons, setIcons] = useState<ISmartIcon[]>(() => {
        const circlesData = getCirclesData(subjectsList.length);
        setCircle(circlesData);

        const iconsData = getIconsData(circlesData);

        return iconsData.map((icon, index) => ({
            ...icon,
            ...subjectsList[index],
            hidden: false,
        }));
    });

    const change = useCallback(() => {
        setIcons(icons.map((icon) => {
            const match =
                searchValue === ''
                    ? false
                    : icon.name
                        .toLowerCase()
                        .indexOf(searchValue.toLowerCase()) === -1;

            return {
                ...icon,
                hidden: match,
            };
        }));
    }, [icons, searchValue]);

    useEffect(() => {
        setIcons(() => {
            const circlesData = getCirclesData(subjectsList.length);
            setCircle(circlesData);

            const iconsData = getIconsData(circlesData);

            return iconsData.map((icon, index) => ({
                ...icon,
                ...subjectsList[index],
                hidden: false,
            }));
        });
    }, [subjectsList]);

    useEffect(() => {
        change();
    }, [searchValue]);

    return (
        <Stage width={650} height={650}>
            <Layer>
                { circles.map(({ x, y, radius }, index) => (
                    <Circle
                        key={index}
                        x={x}
                        y={y}
                        radius={radius}
                        stroke={'#7857cf'}
                        strokeWidth={3}
                    />
                ))}
            </Layer>
            <Layer>
                { icons.map(({ x, y, radius, hidden, name, image, id }) => (
                    <CustomCircle
                        key={id}
                        x={x}
                        y={y}
                        radius={radius}
                        hidden={hidden}
                        name={name}
                        imageUrl={image}
                        id={id}
                        history={history}
                    />
                ))}
            </Layer>
        </Stage>
    );
};

export default Component;
