/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 20 March 2020
 *
 * Component which create wrapper around child components
 * and have max width = 100 vh.
 */

/** External imports */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

/** Application's imports */
import Logo from 'img/logo';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        width: '100%',
        maxHeight: '100vh',
        height: '100vh',
        background: '#f4f6f9',
        padding: theme.spacing(6),
    },
    container: {
        height: '100%',
    },
    logo: {
        paddingBottom: theme.spacing(1),
    },
}));

interface IFullPageProps {
    content?: React.ReactNode;
    side?: React.ReactNode;
}

const Component = ({ content, side }: IFullPageProps) => {
    const clasess = useStyles({});

    return (
        <div className={clasess.root}>
            <div className={clasess.logo}><Logo /></div>
            <Grid
                spacing={8}
                container
                className={clasess.container}
            >
                { side &&
                    <Grid
                        item
                        xs={5}
                        md={4}
                        lg={3}
                    >
                        {side}
                    </Grid>
                }
                { content &&
                    <Grid
                        item
                        xs={7}
                        md={8}
                        lg={9}
                    >
                        {content}
                    </Grid> }
            </Grid>
        </div>);
};

export default Component;
