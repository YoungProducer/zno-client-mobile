/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 24 March 2020
 *
 * The entry point of Tile component
 * Configure component via HOC to connect actions
 * and/or variables from the redux-store to the component.
 */

/** Application's imports */
import Component from './Component';
import container from './container';

export * from './Component';

/** Export configured component via HOC */
export default container(Component);
