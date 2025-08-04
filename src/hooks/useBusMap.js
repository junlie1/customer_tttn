import { useEffect, useState } from 'react';
import { busService } from '../services/busService';

export const useBusMap = (schedules) => {
    const [busesMap, setBusesMap] = useState({});

    useEffect(() => {
        const uniqueBusIds = [...new Set(schedules.map(s => s.busId).filter(Boolean))];

        const fetchBuses = async () => {
            const newMap = {};
            await Promise.all(uniqueBusIds.map(async (id) => {
                try {
                    const res = await busService.getBusById(id);
                    newMap[id] = { id, ...res.data };
                } catch (err) {
                    console.error('Failed to fetch route:', err);
                }
            }));
            setBusesMap(newMap);
        };

        if (uniqueBusIds.length > 0) fetchBuses();
    }, [JSON.stringify(schedules.map(s => s.busId))]);

    return busesMap;
};
