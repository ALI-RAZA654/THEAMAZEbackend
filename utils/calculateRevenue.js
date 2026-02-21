const calculateRevenue = (orders) => {
    return orders.reduce((acc, order) => {
        if (order.status === 'Delivered') {
            return acc + order.totalAmount;
        }
        return acc;
    }, 0);
};

module.exports = calculateRevenue;
