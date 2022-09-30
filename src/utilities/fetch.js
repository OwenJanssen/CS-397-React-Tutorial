import { useQuery } from '@tanstack/react-query';

export const useJsonQuery = (url) => {
    const { data, isLoading, error } = useQuery([url], () => fetch(url).then(response => response.json()));
    return [ data, isLoading, error ];
};