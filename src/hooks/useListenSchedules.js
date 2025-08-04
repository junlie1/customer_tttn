import { useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useDispatch } from 'react-redux';
import { setSchedules } from '../redux/slides/scheduleSlide';
import { sanitizeSchedule } from '../utils/sanitizeSchedule';

export const useListenSchedules = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, 'schedules'),
            (snapshot) => {
                const sanitized = snapshot.docs.map(doc =>
                    sanitizeSchedule({ id: doc.id, ...doc.data() })
                );
                dispatch(setSchedules(sanitized));
            },
        );

        return () => unsubscribe();
    }, [dispatch]);
};
