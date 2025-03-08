import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Title,
  OrderList,
  OrderCard,
  ProductImage,
  OrderInfo,
} from './style';

const PurchaseHistory = () => {
  const user = useSelector((state) => state.user.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       const fetchedOrders = await OrderService.getOrder(user.id);
  //       setOrders(fetchedOrders);
  //     } catch (error) {
  //       console.error('Lỗi khi lấy danh sách đơn hàng:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchOrders();
  // }, [user.id]);

  return (
    <Container>
      <Title>Danh sách đơn hàng đã đặt</Title>
      {loading ? (
        <p>Đang tải danh sách đơn hàng...</p>
      ) : orders.length === 0 ? (
        <p>Chưa có đơn hàng nào.</p>
      ) : (
        <OrderList>
          {orders.map((order) => (
            <OrderCard key={order._id}>
              <ProductImage src={order.image} alt={order.productName} />
              <OrderInfo>
                <h2>{order.productName}</h2>
                <p>
                  <strong>Giá: </strong>
                  {order?.paymentMethod === 'card'
                    ? `${order.productPrice} $`
                    : order?.paymentMethod === 'vnpay' || order?.paymentMethod === 'cod-web'
                    ? `${order.productPrice} VND`
                    : 'ABC'}
                </p>
                <p>
                  <strong>Số lượng:</strong> {order.quantity}
                </p>
                <p>
                  <strong>Thành tiền: </strong>
                  {order?.paymentMethod === 'card' 
                    ? `${order.productPrice * order.quantity} $`
                    : order?.paymentMethod === 'vnpay' || order?.paymentMethod === 'cod-web'
                    ? `${(order.productPrice * order.quantity).toLocaleString(
                        'vi-VN'
                      )} VND`
                    : 'ABC'}
                </p>
                <p>
                  <strong>Phương thức thanh toán:</strong> {order.paymentMethod}
                </p>
                <p>
                  <strong>Trạng thái:</strong>{' '}
                  {order.delivered
                    ? 'Đã giao'
                    : order.shipping
                    ? 'Đang vận chuyển'
                    : order.processing
                    ? 'Đang chuẩn bị hàng'
                    : 'Đơn đã bị hủy'}
                </p>
                <p>
                  <strong>Địa chỉ:</strong> {`${order.locality}, ${order.city}`}
                </p>
              </OrderInfo>
            </OrderCard>
          ))}
        </OrderList>
      )}
    </Container>
  );
};

export default PurchaseHistory;