/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 2 March 2020
 *
 * Header component which contain main routes and another information or actions.
 */

/** External imports */
import React from 'react';
import classNames from 'classnames';
import CssBaseLine from '@material-ui/core/CssBaseline';
import Collapse from '@material-ui/core/Collapse';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

/** Application's imports */
import NavigationLink from 'components/NavigationLink';
import Logo from 'img/logo';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            borderRadius: 9,
            background: '#fff',
            width: 'auto',
            filter: `drop-shadow(0px 3px 3.5px rgba(0,0,0,0.16))`,
            top: theme.spacing(1),
            left: theme.spacing(1),
            right: theme.spacing(1),
        },
        headerContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '100%',
            padding: 4,
        },
        menuIcon: {
            color: `linear-gradient(90deg, #80d8ff 0%, #ec82fa 100%)`,
        },
        burger: {
            position: 'relative',
            height: 50,
            width: 50,
            '& span': {
                borderRadius: 2,
                background: `linear-gradient(90deg, #80d8ff 0%, #ec82fa 100%)`,
                position: 'absolute',
                width: 30,
                height: 4,
                transition: theme.transitions.create([
                    'opacity',
                    'transform',
                ], {
                    duration: 200,
                    easing: theme.transitions.easing.easeInOut,
                }),
            },
        },
        burgerStickTop: {
            left: '50%',
            top: 'calc(50% - 7px)',
            transform: `translate(-50%, -50%)`,
        },
        burgerStickMiddle: {
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%)`,
            opacity: 1,
        },
        burgerStickBottom: {
            left: '50%',
            top: 'calc(50% + 7px)',
            transform: `translate(-50%, -50%)`,
        },
        burgerStickTopCross: {
            top: '50%',
            transform: `
                translate(-50%, -50%)
                rotateZ(135deg)
            `,
        },
        burgerStickMiddleCross: {
            top: '50%',
            transform: `translate(-50%, -50%)`,
            opacity: 0,
        },
        burgerStickBottomCross: {
            top: '50%',
            transform: `
                translate(-50%, -50%)
                rotate(-135deg)
            `,
        },
    }));

interface IAppBarProps {
    extendable?: React.ReactNode;
    extend?: boolean;
    toggleExtend?: () => void;
}

/** Create component */
const Component = ({ extendable, extend, toggleExtend }: IAppBarProps) => {
    const classes = useStyles({});

    return (
        <React.Fragment>
            <CssBaseLine />
            <AppBar elevation={0} className={classes.root} position='fixed'>
            { extendable && (
                    <Collapse in={extend}>
                        { extendable }
                    </Collapse>
                )}
                <div className={classes.headerContainer}>
                    <Logo />
                    { extendable && (
                        <div className={classes.burger} onClick={toggleExtend}>
                            <span className={classNames(classes.burgerStickTop, {
                                [classes.burgerStickTopCross]: extend,
                            })}/>
                            <span className={classNames(classes.burgerStickMiddle, {
                                [classes.burgerStickMiddleCross]: extend,
                            })}/>
                            <span className={classNames(classes.burgerStickBottom, {
                                [classes.burgerStickBottomCross]: extend,
                            })}/>
                        </div>
                    )}
                </div>
            </AppBar>
        </React.Fragment>
    );
};

export default Component;
