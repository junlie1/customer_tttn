export const sanitizeSchedule = (raw) => ({
    id: raw.id,
    departureTime: raw.departureTime,
    arrivalTime: raw.arrivalTime,
    status: raw.status,
    price: raw.price,
    busId: raw.busId,
    routeId: raw.routeId,
    seatLayoutId: raw.seatLayoutId,
    vendorId: raw.vendorId,
});