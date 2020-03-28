/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 2 March 2020
 *
 * Declare main types and interfaces for AppBar component.
 * Create function which connect actions
 * and/or variables from the redux-store to the component.
 */

/** External imports */
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

/** Application's imports */

/** Define Material ui styles */
const styles = (theme: Theme) =>
    createStyles({
        root: {
            background: green[700],
            width: '100%',
            height: 50,
        },
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'inherit',
        },
        navLink: {
            color: '#fff',
            fontSize: '1.2rem',
            marginRight: theme.spacing(3),
            '&:last-child': {
                marginRight: 0,
            },
        },
    });

/** Props which component get from the parent */
interface IOwnProps extends WithStyles<typeof styles>{}

/** Declare type which describe all props pushed to the component */
export type TAppBarProps =
    IOwnProps;

/** Export function to configure component via HOC */
export default compose(
    withStyles(styles, { withTheme: true }),
);
