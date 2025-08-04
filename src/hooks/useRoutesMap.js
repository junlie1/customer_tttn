import { useEffect, useState } from 'react';
import { routeService } from '../services/routeService';

export const useRoutesMap = (schedules) => {
    const [routesMap, setRoutesMap] = useState({});

    useEffect(() => {
        const uniqueRouteIds = [...new Set(schedules.map(s => s.routeId).filter(Boolean))];

        const fetchRoutes = async () => {
            const newMap = {};
            await Promise.all(uniqueRouteIds.map(async (id) => {
                try {
                    const res = await routeService.getRouteById(id);
                    newMap[id] = { id, ...res.data };
                } catch (err) {
                    console.error('Failed to fetch route:', err);
                }
            }));
            setRoutesMap(newMap);
        };

        if (uniqueRouteIds.length > 0) fetchRoutes();
    }, [JSON.stringify(schedules.map(s => s.routeId))]);

    return routesMap;
};
