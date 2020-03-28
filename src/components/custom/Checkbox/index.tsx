/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 25 March 2020
 *
 * Custom checkbox component.
 */

/** External imports */
import React from 'react';
import classNames from 'classnames';
import FormControl, { FormControlProps } from '@material-ui/core/FormControl';
import FormControlLabel, { FormControlLabelProps } from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

/** Application's imports */
import Check from 'public/images/check.svg';

/** Define MaterialUI classes */
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        checkBoxIcon: {
            marginLeft: 2,
            borderRadius: 3,
            width: 20,
            height: 20,
            filter: `drop-shadow(2.828px 2.828px 3.5px rgba(227,207,207,0.9))`,
            backgroundColor: '#fff',
            backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
            '$root.Mui-focusVisible &': {
                outline: '2px auto rgba(19,124,189,.6)',
                outlineOffset: 2,
            },
            'input:hover ~ &': {
                backgroundColor: '#ebf1f5',
            },
            'input:disabled ~ &': {
                boxShadow: 'none',
                background: 'rgba(206,217,224,.5)',
            },
        },
        checkBoxСheckedIcon: {
            backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
            position: 'relative',
            '&:before': {
                position: 'absolute',
                top: 2,
                left: 2,
                backgroundImage: `url(${Check})`,
                width: 20,
                height: 20,
                backgroundSize: '16px, 16px',
                display: 'block',
                content: '""',
                backgroundRepeat: 'no-repeat',
            },
            'input:hover ~ &': {
                // backgroundColor: '#106ba3',
            },
        },
        checkBox: {
            width: 400,
        },
    }));

export interface ICheckboxProps extends CheckboxProps {
    formControl?: FormControlProps;
    formControlLabel?: Omit<FormControlLabelProps, 'control'>;
    label?: string;
}

const Component = ({
    formControl,
    formControlLabel,
    label,
    ...other
}: ICheckboxProps) => {
    const classes = useStyles({});

    return (
        <FormControl
            className={classNames({
                [classes.checkBox]: !formControl,
            })}
            {...formControl}
        >
            <FormControlLabel
                control={
                    <Checkbox
                        disableRipple
                        disableTouchRipple
                        disableFocusRipple
                        color='primary'
                        checkedIcon={<span className={classNames(classes.checkBoxIcon, classes.checkBoxСheckedIcon)} />}
                        icon={<span className={classes.checkBoxIcon}/>}
                        {...other}
                    />
                }
                label={label || ''}
                {...formControlLabel}
            />
        </FormControl>
    );
};

export default Component;
