/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 24 March 2020
 *
 * Custom hook which allow to extract pairs from search params.
 */

/** External imports */
import { useLocation } from 'react-router-dom';

export interface IUseSearchParams {
    /**
     * Array of names which should be extracted
     * from querystring.
     */
    searchNames: string[];
}

export const useSearchParams = <R = any>({ searchNames }: IUseSearchParams): R => {
    /** Get location */
    const location = useLocation();

    /** Get search */
    const search = location.search;

    /** Create search params instance */
    const searchParams = new URLSearchParams(search);

    /** Extract data from search */
    const searchData = searchNames.reduce((acc, curr) => {
        const param = searchParams.get(curr);

        if (param !== null) {
            return {
                ...acc,
                [curr]: param,
            };
        }

        return acc;
    }, {});

    return searchData as R;
};
