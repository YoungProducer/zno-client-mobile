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
        background: '#f5f7fa',
        padding: theme.spacing(1),
    },
    container: {
        display: 'flex',
        marginTop: theme.spacing(10),
    },
    searchBlock: {
        width: '100%',
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
        background: '#fff',
        borderRadius: 17,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        color: '#707070',
        fontSize: '1.3rem',
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
        color: '#707070',
    },
    actionsBlock: {
        display: 'flex',
        alignItems: 'center',
    },
    appBar: {
        borderRadius: 9,
        background: '#fff',
        height: 58,
        filter: `drop-shadow(0px 3px 3.5px rgba(0,0,0,0.16))`,
    },
    appBarContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        padding: 4,
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
        // fetchSubjectsNames();
    }, []);

    return (
        <>
            <div className={classNames(classes.root)}>
                <AppBar elevation={0} className={classes.appBar} position='sticky'>
                    <div className={classes.appBarContainer}>
                        <Logo />
                    </div>
                    {/* <div className={classes.appBarContainer}>
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
                    </div> */}
                </AppBar>
                {/* <Container maxWidth='lg' className={classes.container}> */}
                    <div className={classes.actionsBlock}>
                        <div className={classes.searchBlock}>
                            <Typography
                                variant='h6'
                                className={classes.typography}
                                align='center'
                            >
                                Привіт, Олександре!
                            </Typography>
                            <Typography
                                variant='h6'
                                className={classes.typography}
                                align='center'
                            >
                                Що б ви хотіли вивчати сьогодні?
                            </Typography>
                            <InputBase
                                className={classes.searchInput}
                                placeholder='Знайти предмет'
                                value={seachValue}
                                onChange={handleSearchChange}
                                endAdornment={
                                    // <IconButton
                                    //     size='small'
                                    //     className={classes.iconButton}
                                    // >
                                        <SearchIcon
                                            className={classes.icon}
                                        />
                                    // </IconButton>
                                }
                            />
                        </div>
                        {/* <SubjectPresentation
                            subjectsList={subjectsList}
                            searchValue={seachValue}
                        /> */}
                    </div>
                {/* </Container> */}
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
