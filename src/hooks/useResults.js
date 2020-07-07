import { useState, useEffect, useCallback } from 'react';
import nytimes from '../api/nytimes';

const useResults = () => {
    const [results, setResults] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState(null);

    const selectFilter = (e) => {
        setSelectedFilter(e.target.value);
    };

    const getNews = useCallback(async () => {
        try {
            if (selectedFilter === null || undefined) return;
            const response = await nytimes(selectedFilter);
            setResults(response);
        } catch (error) {
            throw Error(error.message);
        }
    }, [selectedFilter]);

    useEffect(() => {
        getNews();
    }, [getNews]);

    return { results, selectedFilter, selectFilter };
};

export default useResults;
