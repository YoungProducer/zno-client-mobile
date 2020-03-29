/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 25 February 2020
 *
 * Component which allows create user's account.
 */

// External imports
import React, { useState, useCallback, useEffect, memo, useMemo } from 'react';
import classNames from 'classnames';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// Application's imports
import { TSignUpProps } from './container';
import NavigationLink from 'components/NavigationLink';
import Input from 'components/custom/Input';
import Logo from 'img/logo';

// Define classes as hook
const useStyles = makeStyles((theme: Theme) => createStyles({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        boxSizing: 'border-box',
        padding: theme.spacing(1),
    },
    root: {
        borderRadius: 4,
        width: '100%',
        filter: `drop-shadow(2.828px 2.828px 3.5px rgba(227,207,207,0.9))`,
        backgroundColor: '#ffffff',
        textAlign: 'center',
    },
    innerContainer: {
        borderRadius: 4,
        backgroundColor: '#f4f5f7',
        // padding: theme.spacing(4),
    },
    logoContainer: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    textField: {
        width: 230,
    },
    fields: {
        paddingBottom: theme.spacing(3),
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    block: {
        width: '100%',
        margin: 0,
        '& .MuiGrid-item': {
            width: '100%',
        },
    },
    button: {
        filter: `drop-shadow(0px 3px 2.5px rgba(0,0,0,0.16))`,
    },
    link: {
        color: theme.palette.primary.main,
    },
    icon: {
        color: '#555',
    },
    inputRoot: {
        width: '100%',
        height: 60,
        background: `#fff`,
        filter: `drop-shadow(0px 3px 2.5px rgba(0,0,0,0.16))`,
        borderRadius: 4,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    checkBox: {
        width: '100%',
    },
}));

/**
 * Create hook to make component stateless.
 * Compute all values from text fields.
 * Returns fields data and button onClick property.
 */
const useSignUpElements = (props: TSignUpProps) => {
    const {
        errorFields,
        fieldsMessages,
        fetchSignUp,
        setSignUpErrorFieldsToDefault,
        setSignUpFieldsMessagesToDefault,
    } = props;

    const clearFields = () => {
        setSignUpErrorFieldsToDefault();
        setSignUpFieldsMessagesToDefault();
    };

    /** User email */
    const [email, setEmail] = useState<string>('');
    const handleChangeEmail =
        useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value);
            if (errorFields.email) {
                clearFields();
            }
        }, [errorFields.email]);

    /** User password */
    const [password, setPassword] = useState<string>('');
    const handleChangePassword =
        useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
            if (errorFields.password) {
                clearFields();
            }
        }, [errorFields.password]);

    /** Confirmation password, should be the same to the password */
    const [confPassword, setConfPassword] = useState<string>('');
    const handleChangeConfPassword =
        useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
            setConfPassword(event.target.value);
            if (errorFields.confPassword) {
                clearFields();
            }
        }, [errorFields.confPassword]);

    /** SignUp button handle */
    const handleFetchSignUp = useCallback(() => fetchSignUp({
        email,
        password,
        confPassword,
    }), [email, password, confPassword]);

    return {
        emailField: {
            onChange: handleChangeEmail,
            value: email,
            error: errorFields.email,
            helperText: fieldsMessages.email,
        },
        passwordField: {
            onChange: handleChangePassword,
            value: password,
            error: errorFields.password,
            helperText: fieldsMessages.password,
        },
        confPasswordField: {
            onChange: handleChangeConfPassword,
            value: confPassword,
            error: errorFields.confPassword,
            helperText: fieldsMessages.confPassword,
        },
        signUpButton: {
            onClick: handleFetchSignUp,
        },
    };
};

const Component = (props: TSignUpProps) => {
    /** Create object with classes to use them */
    const classes = useStyles({});

    /** Get fields data from hook */
    const {
        emailField,
        passwordField,
        confPasswordField,
        signUpButton,
    } = useSignUpElements(props);

    const { loading } = props;

    return (
        <div className={classNames('auth-background', classes.container)}>
            <Paper
                className={classes.root}
                elevation={0}
                square
            >
                <div className={classes.logoContainer}>
                    <Logo />
                </div>
                <div className={classes.innerContainer}>
                    <Grid
                        container
                        direction='column'
                        alignItems='center'
                        justify='flex-start'
                        item
                        spacing={3}
                        className={classes.block}
                    >
                        <Grid item>
                            <Input
                                color='primary'
                                type='email'
                                placeholder='Емеїл'
                                data-testid='signup-email-input'
                                startAdornment={<EmailIcon className={classes.icon}/>}
                                rootClassName={classes.inputRoot}
                                { ...emailField }
                            />
                        </Grid>
                        <Grid item>
                            <Input
                                color='primary'
                                type='password'
                                placeholder='Пароль'
                                data-testid='signup-password-input'
                                startAdornment={<LockIcon className={classes.icon}/>}
                                rootClassName={classes.inputRoot}
                                { ...passwordField }
                            />
                        </Grid>
                        <Grid item>
                            <Input
                                color='primary'
                                type='password'
                                placeholder='Пароль підтвердження'
                                data-testid='signup-conf-password-input'
                                startAdornment={<LockIcon className={classes.icon}/>}
                                rootClassName={classes.inputRoot}
                                { ...confPasswordField }
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                color='primary'
                                variant='contained'
                                disableElevation
                                className={classes.button}
                                data-testid='signup-button'
                                { ...signUpButton }
                            >
                                { loading
                                    ? <CircularProgress color='primary'/>
                                    : 'Зареєструватися'
                                }
                            </Button>
                        </Grid>
                        <Grid>
                            <Typography align='center'>
                                Вже зареєстровані?
                                <NavigationLink
                                    navLink={{
                                        to: '/auth/signin',
                                    }}
                                    className={classes.link}
                                >
                                    Увійти
                                </NavigationLink>
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            </Paper>
        </div>
    );
};

export default Component;
