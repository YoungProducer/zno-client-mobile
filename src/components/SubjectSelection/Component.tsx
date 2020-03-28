/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 1 March 2020
 *
 * Component to select subjects.
 */

/** External imports */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

/** Application's imports */
import { TSubjectSelectionProps } from './container';
import SubjectTile from './SubjectTile';
import SubjectPresentation from './SubjectsPresentation';
import Logo from 'img/logo';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        width: '100%',
        height: '100vh',
    },
    container: {
        display: 'flex',
        marginTop: theme.spacing(10),
    },
    searchBlock: {
        width: '50%',
    },
    popularBlock: {
        background: '#5c498c',
        height: 85,
        width: 'max-content',
        position: 'absolute',
        // bottom: '1%',
        bottom: '1%',
        right: 0,
        left: 0,
        margin: 'auto',
        borderRadius: 7,
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
    },
    popularBlockInner: {
        height: 'inherit',
        width: '100%',
    },
    searchInput: {
        width: '100%',
        height: 67,
        background: '#4d8fcb',
        borderRadius: 34,
        paddingLeft: theme.spacing(2),
        paddingRight: 6,
        color: '#fff',
        fontSize: '1.3rem',
        marginTop: theme.spacing(8),
    },
    iconButton: {
        width: 55,
        height: 55,
        background: '#fff',
        borderRadius: '50%',
        '&:hover': {
            background: '#f1f1f1',
        },
    },
    icon: {
        color: '#5955cf',
        width: 30,
        height: 30,
    },
    typography: {
        color: '#fff',
    },
    actionsBlock: {
        display: 'flex',
        alignItems: 'center',
    },
    appBar: {
        background: 'none',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    appBarContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    appBarActions: {

    },
    signUpButton: {
        borderRadius: 25,
        background: '#fff',
        color: theme.palette.primary.main,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        '&:hover': {
            background: '#f1f1f1',
        },
        minWidth: 100,
    },
    signInButton: {
        minWidth: 100,
        color: '#fff',
        '&:hover': {
            background: 'none',
        },
    },
}));

/** Create component */
const Component = (props: TSubjectSelectionProps) => {
    const classes = useStyles({});

    const history = useHistory();

    const {
        subjectsList,
        loggedIn,
        fetchSubjectsNames,
        fetchLogout,
    } = props;

    const [seachValue, setSearchValue] = useState<string>('');
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setSearchValue(event.target.value);

    useEffect(() => {
        fetchSubjectsNames();
    }, []);

    return (
        <>
            <div className={classNames(classes.root, 'subject-selection-background')}>
                <AppBar elevation={0} className={classes.appBar} position='relative'>
                    <Container maxWidth='lg' className={classes.appBarContainer}>
                        <Logo />
                        <div className={classes.appBarContainer}>
                            { !loggedIn && (
                                <>
                                    <Button
                                        className={classes.signInButton}
                                        onClick={() => history.push('/auth/signin')}
                                    >
                                        Увійти
                                    </Button>
                                    <Button
                                        variant='text'
                                        className={classes.signUpButton}
                                        onClick={() => history.push('/auth/signup')}
                                    >
                                        Зареєструватися
                                    </Button>
                                </>
                            )}
                            { loggedIn && (
                                <Button
                                    variant='text'
                                    className={classes.signUpButton}
                                    onClick={fetchLogout}
                                >
                                    Вийти
                                </Button>
                            )}
                        </div>
                    </Container>
                </AppBar>
                <Container maxWidth='lg' className={classes.container}>
                    <div className={classes.actionsBlock}>
                        <div className={classes.searchBlock}>
                            <Typography
                                variant='h6'
                                className={classes.typography}
                            >
                                Для того щоб розпочати тест почніть вводити назву предемету у пошуку, після цього ви одразу побачите цей предмет
                                у правому блоці, просто натисніть на нього і ви будете направлені на сторінку тесту.
                            </Typography>
                            <InputBase
                                className={classes.searchInput}
                                placeholder='Знайти предмет'
                                value={seachValue}
                                onChange={handleSearchChange}
                                endAdornment={
                                    <IconButton
                                        size='small'
                                        className={classes.iconButton}
                                    >
                                        <SearchIcon
                                            className={classes.icon}
                                        />
                                    </IconButton>
                                }
                            />
                        </div>
                        <SubjectPresentation
                            subjectsList={subjectsList}
                            searchValue={seachValue}
                        />
                    </div>
                </Container>
            </div>
            {/* <div className={classes.popularBlock}>
                <SubjectTile
                    subject={subjectsList[0]}
                />
                <SubjectTile
                    subject={subjectsList[1]}
                />
            </div> */}
        </>
    );
};

export default Component;
