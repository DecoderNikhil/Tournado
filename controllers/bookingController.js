const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
const User = require('../models/userModel');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // Get currently booked tour
  const tour = await Tour.findById(req.params.tourId);

  // Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    // success_url: `${req.protocol}://${req.get('host')}/?tour=${req.params.tourId}&user=${req.user.id}&price=${tour.price}`,
    success_url: `${req.protocol}://${req.get('host')}/my-bookings?alert=booking`,
    cancel_url: `${req.protocol}://${req.get('host')}/tours/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: 'inr',
          unit_amount: tour.price * 100,
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [
              `${req.protocol}://${req.get('host')}/img/tours/${tour.imageCover}`,
            ],
          },
        },
        quantity: 1,
      },
    ],
  });

  // Create session as response
  res.status(200).json({
    status: 'success',
    session,
  });
});

// exports.createBookingCheckout = catchAsync(async (req, res, next) => {
//   const { tour, user, price } = req.query;

//   if (!tour && !user && !price) return next();

//   await Booking.create({ tour, user, price });

//   res.redirect(req.originalUrl.split('?')[0]);
// });

const createBookingCheckout = catchAsync(async (session) => {
  const tour = session.client_reference_id;
  const user = (await User.findOne({ email: session.customer_email })).id;
  const price = session.amount_total / 100;
  // console.log(price);
  await Booking.create({ tour, user, price });
});

exports.webhookCheckout = (req, res, next) => {
  const signature = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  // console.log(event);
  if (event.type === 'checkout.session.completed') {
    createBookingCheckout(event.data.object);
  }

  res.status(200).json({ received: true });
};

exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
