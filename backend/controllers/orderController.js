import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import Product from '../models/productModel.js'

// @desc Create new order
// @route POST /api/orders
// @access Private

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body

  if(orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})
export const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;
  if (orderItems.length === 0) {
    res.status(400);
    throw new Error("You don't have any products");
  }
  const order = await Order.create({
    orderItems,
    shippingAddress,
    paymentMethod,
    user: req.user._id,
  });
  for (let item of order.orderItems) {
    const product = await Product.findById(item.id);
    item.image = product.image;
    item.price = product.price;
    item.name = product.name;
  }
  order.itemsPrice = Number(
    order.orderItems
      .reduce((acc, cur) => acc + cur.price * cur.qty, 0)
      .toFixed(2)
  );
  order.shippingPrice = order.itemsPrice > 100 ? 0 : 10;
  order.taxPrice = Number((order.itemsPrice * 0.15).toFixed(2));
  order.totalPrice = order.itemsPrice + order.shippingPrice + order.taxPrice;
  await order.save();
  res.json(order._id);
});

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if(order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }

})

// @Update order to paid
// @route GET /api/orders/:id/pay
// @access Private

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if(order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save()

    for (let item of createdOrder.orderItems) {
      const product = await Product.findById(item.product)
      product.countInStock -= item.qty
      await product.save()
    }

  } else {
    res.status(404)
    throw new Error('Order not found')
  }

})

// @Get logged in user orders
// @route GET /api/orders/myorders
// @access Private

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({user: req.user._id})
  
  res.json(orders)

})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.json(orders)
})

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
}