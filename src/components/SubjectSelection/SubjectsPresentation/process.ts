/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 12 March 2020
 */

export interface ICircle {
    x: number;
    y: number;
    radius: number;
    iconsPerCircle: number;
}

export const getCirclesData = (subjectsAmount: number) => {
    let initialRadius = 75;

    const lengthForEachSubjectIcon = 235;

    let subjectIconsAmount = 0;

    const circles = [];

    while (subjectIconsAmount < subjectsAmount) {
        const length = circleLength(initialRadius);

        const amount = Math.floor(length / lengthForEachSubjectIcon);

        circles.push({
            radius: initialRadius,
            iconsPerCircle: amount + subjectIconsAmount > subjectsAmount
                ? subjectsAmount - subjectIconsAmount
                : amount,
            x: 325,
            y: 325,
        });

        subjectIconsAmount += amount;
        initialRadius += 100;
    }

    return circles;
};

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
    const angleInRadians = (angleInDegrees) * Math.PI / 180.0;

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians)),
    };
}

export interface IIconData {
    x: number;
    y: number;
    radius: number;
}

export const getIconsData = (circles: ICircle[]): IIconData[] => {
    return circles.reduce((acc, curr) => {
        let currentDegrees = Math.floor(Math.random() * (360 - 0 + 1)) + 0;
        const degrees = 360 / curr.iconsPerCircle;

        let data: any[] = [];

        for (let i = 0; i < curr.iconsPerCircle; i += 1) {
            data.push({
                ...polarToCartesian(
                    curr.x,
                    curr.y,
                    curr.radius,
                    currentDegrees += degrees,
                ),
                radius: 30,
            });
        }

        return acc.concat(data);
    }, []);
};

const circleLength = (radius: number) => radius * 2 * Math.PI;
