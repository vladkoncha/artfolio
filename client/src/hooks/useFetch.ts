import {useState} from "react";

export const useFetch = (callback: Function, initialLoading = false): [Function, boolean, string] => {
    const [isLoading, setIsLoading] = useState(initialLoading);
    const [error, setError] = useState('');

    const fetching = async (...args: any[]) => {
        try {
            setIsLoading(true);
            await callback(...args);
        } catch (e: any) {
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    return [fetching, isLoading, error];
};