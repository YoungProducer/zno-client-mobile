/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 7 March 2020
 *
 * Custom input field for auth pages(/auth/signin & /auth/signup).
 */

/** External imports */
import React from 'react';
import classNames from 'classnames';
import InputBase, { InputBaseProps } from '@material-ui/core/InputBase';
import Tooltip from '@material-ui/core/Tooltip';
import ErrorIcon from '@material-ui/icons/Error';
import { createStyles, makeStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

/** Define Material UI styles */
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 400,
            height: 60,
            background: `#fff`,
            filter: `drop-shadow(0px 3px 2.5px rgba(0,0,0,0.16))`,
            borderRadius: 4,
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
        },
        icon: {
            color: '#555',
        },
        input: {
            paddingLeft: theme.spacing(1),
            fontSize: '1.3rem',
        },
        helperIcon: {
            cursor: 'pointer',
            color: '#555',
            transition: theme.transitions.create('color', {
                easing: theme.transitions.easing.sharp,
                duration: 100,
            }),
        },
        helperIconError: {
            color: red[600],
            transition: theme.transitions.create('color', {
                easing: theme.transitions.easing.sharp,
                duration: 100,
            }),
        },
        tooltip: {
            fontSize: '1.0rem',
            background: '#343434',
        },
    }));

export type TInputBaseProps =
    & InputBaseProps
    & {
        helperText?: string;
        /**
         * Class name for InputBase.
         */
        rootClassName?: string;
    };

const Component = (props: TInputBaseProps) => {
    const classes = useStyles({});

    /** Destruct props */
    const {
        helperText,
        error,
        rootClassName,
        ...other
    } = props;

    return (
        <InputBase
            endAdornment={ helperText &&
                <Tooltip
                    title={helperText}
                    placement='top-end'
                    classes={{
                        tooltip: classes.tooltip,
                    }}
                    aria-label='helper-text'
                    data-testid='input-tooltip'
                >
                    <ErrorIcon
                        data-testid='error-icon'
                        className={classNames(classes.helperIcon, {
                            [classes.helperIconError]: error,
                        })}
                    />
                </Tooltip>
            }
            className={rootClassName || classes.root}
            inputProps={{
                className: classes.input,
            }}
            {...other}
        />
    );
};

export default Component;
