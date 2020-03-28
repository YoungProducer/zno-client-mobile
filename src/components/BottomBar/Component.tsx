/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 28 March 2020
 *
 * Component which display main navigation of app.
 */

/** External imports */
import React, { useState, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import HomeIcon from '@material-ui/icons/Home';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PersonIcon from '@material-ui/icons/Person';
import { makeStyles, createStyles, Theme } from '@material-ui/core';

/** Application's imports */
import { TBottomBarProps } from './container';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'absolute',
            minHeight: 70,
            borderRadius: 9,
            background: '#fff',
            filter: 'drop-shadow(0px 3px 3.5px rgba(0,0,0,0.16))',
            bottom: theme.spacing(1),
            left: theme.spacing(1),
            right: theme.spacing(1),
            transform: `translateY(0)`,
            transition: theme.transitions.create(['transform'], {
                duration: 200,
                easing: theme.transitions.easing.easeInOut,
            }),
        },
        rootHidden: {
            transform: `translateY(60%)`,
            transition: theme.transitions.create(['transform'], {
                duration: 200,
                easing: theme.transitions.easing.easeInOut,
            }),
        },
        innerContainer: {
            width: '100%',
            height: '100%',
        },
        actionsContainer: {
            width: '100%',
            height: '100%',
            minHeight: 70,
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
        },
        expandIconButton: {
            zIndex: 10,
            position: 'absolute',
            left: '50%',
            transform: `translate(-50%, -60%)`,
            borderRadius: '50%',
            background: '#fff',
            filter: 'drop-shadow(0px 3px 3.5px rgba(0,0,0,0.05))',
            transition: theme.transitions.create(['transform'], {
                duration: 200,
                easing: theme.transitions.easing.easeInOut,
            }),
            '&:hover': {
                background: '#fff',
            },
        },
        expandIconButtonHidden: {
            transform: `translate(-50%, -35%)`,
            transition: theme.transitions.create(['transform'], {
                duration: 200,
                easing: theme.transitions.easing.easeInOut,
            }),
        },
        expandIcon: {
            transform: `rotateX(180deg)`,
            transition: theme.transitions.create(['transform'], {
                duration: 200,
                easing: theme.transitions.easing.easeInOut,
            }),
        },
        expandIconHidden: {
            transform: `rotateX(0deg)`,
            transition: theme.transitions.create(['transform'], {
                duration: 200,
                easing: theme.transitions.easing.easeInOut,
            }),
        },
        actionIconButton: {
            background: '#fff',
            boxShadow: `0px 3px 3.5px rgba(0,0,0,0)`,
            transition: theme.transitions.create(['box-shadow'], {
                duration: 300,
                easing: theme.transitions.easing.easeInOut,
            }),
        },
        actionIconButtonActive: {
            boxShadow: `0px 3px 3.5px rgba(0,0,0,0.16)`,
            transition: theme.transitions.create(['box-shadow'], {
                duration: 500,
                easing: theme.transitions.easing.easeInOut,
            }),
        },
        actionIcon: {
            color: '#69deac',
            width: 35,
            height: 35,
        },
        expandActions: {
            padding: theme.spacing(1),
            display: 'flex',
            justifyContent: 'space-between',
        },
        button: {
            color: '#fff',
            background: '#656cff',
            borderRadius: 4,
            width: '45%',
        },
    }));

const Component = ({ loggedIn, logout }: TBottomBarProps) => {
    const classes = useStyles({});

    const history = useHistory();
    const location = useLocation();

    const [hidden, setHidden] = useState<boolean>(false);
    const [expand, setExpand] = useState<boolean>(false);

    const toggleHidden = () => {
        if (expand) {
            setExpand(false);
            window.setTimeout(() => {
                setHidden(!hidden);
            }, 300);
        } else {
            setHidden(!hidden);
        }
    };
    const toggleExpand = () => setExpand(!expand);

    const handleSignIn = () => history.push('/auth/signin');
    const handleSignUp = () => history.push('/auth/signup');
    const handleHome = () => history.push('/');
    const handleProfile = () => history.push('/user/profile');

    const activeIcons = useMemo(() => {
        const { pathname } = location;

        return {
            home: pathname === '/' || pathname === '/subject-selection',
            profile: pathname === '/user/profile',
        };
    }, [location]);

    return (
        <div
            className={classNames(classes.root, {
                [classes.rootHidden]: hidden,
            })}
        >
            <IconButton
                className={classNames(classes.expandIconButton, {
                    [classes.expandIconButtonHidden]: hidden,
                })}
                onClick={toggleHidden}
            >
                <ExpandLessIcon className={classNames(classes.expandIcon, {
                    [classes.expandIconHidden]: hidden,
                })}/>
            </IconButton>
            <div className={classes.innerContainer}>
                <div className={classes.actionsContainer}>
                    <IconButton
                        disabled={hidden}
                        className={classNames(classes.actionIconButton, {
                            [classes.actionIconButtonActive]: activeIcons.profile,
                        })}
                        onClick={handleProfile}
                    >
                        <PersonIcon className={classes.actionIcon}/>
                    </IconButton>
                    <IconButton
                        disabled={hidden}
                        className={classNames(classes.actionIconButton, {
                            [classes.actionIconButtonActive]: activeIcons.home,
                        })}
                        onClick={handleHome}
                    >
                        <HomeIcon className={classes.actionIcon}/>
                    </IconButton>
                    <IconButton
                        disabled={hidden}
                        className={classNames(classes.actionIconButton, {
                            [classes.actionIconButtonActive]: expand,
                        })}
                        onClick={toggleExpand}
                    >
                        <MoreHorizIcon className={classes.actionIcon}/>
                    </IconButton>
                </div>
                <Collapse in={expand} unmountOnExit>
                    <div className={classes.expandActions}>
                        { loggedIn && (
                            <Button
                                className={classes.button}
                                variant='contained'
                                disableElevation
                                onClick={logout}
                            >
                                Вийти
                            </Button>
                        )}
                        { !loggedIn && (
                            <>
                                <Button
                                    className={classes.button}
                                    variant='contained'
                                    disableElevation
                                    onClick={handleSignIn}
                                >
                                    Увійти
                                </Button>
                                <Button
                                    className={classes.button}
                                    variant='contained'
                                    disableElevation
                                    onClick={handleSignUp}
                                >
                                    Зареєструватися
                                </Button>
                            </>
                        )}
                    </div>
                </Collapse>
            </div>
        </div>
    );
};

export default Component;
