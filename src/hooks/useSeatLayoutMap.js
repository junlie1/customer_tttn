import { useEffect, useState } from 'react';
import { seatLayoutService } from '../services/seatLayoutService';

export const useSeatLayoutMap = (schedules) => {
    const [seatLayoutMap, setSeatLayoutMap] = useState({});

    useEffect(() => {
        const uniqueIds = [...new Set(schedules.map(s => s.seatLayoutId).filter(Boolean))];

        const fetchSeatLayouts = async () => {
            const newMap = {};
            await Promise.all(uniqueIds.map(async (id) => {
                try {
                    const res = await seatLayoutService.getSeatLayoutById(id);
                    newMap[id] = { id, ...res.data };
                } catch (err) {
                    console.error('Failed to fetch seatLayout:', err);
                }
            }));
            setSeatLayoutMap(newMap);
        };

        if (uniqueIds.length > 0) fetchSeatLayouts();
    }, [JSON.stringify(schedules.map(s => s.seatLayoutId))]);

    return seatLayoutMap;
};
