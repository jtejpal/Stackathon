const router = require("express").Router();
const stripe = require("stripe")(
  "sk_test_51JN77KBleqgWsErVQOT8hkqSedztVw2SEby7Bi3NgveawqLDisWnLVixEdtghaoaGQt0X0bGnVMgV1OJ6Ut3k5ta00zQuRlNoR"
);

router.get("/customer", async (req, res, next) => {
  try {
    const customer = await stripe.customers.create({
      description: req.headers.username,
    });
    res.send(customer);
  } catch (error) {
    next(error);
  }
});

router.get("/customer/:id", async (req, res, next) => {
  try {
    const customer = await stripe.customers.retrieve(req.params.id, {
      expand: ["subscriptions"],
    });
    res.json(customer);
  } catch (error) {
    next(error);
  }
});

router.post("/subscription", async (req, res, next) => {
  try {
    // const subscription = await stripe.subscriptions.create({
    //   customer: req.body.customerId,
    //   items: [{
    //     price: req.body.priceId,
    //   }],
    //   payment_behavior: 'default_incomplete',
    //   expand: ['latest_invoice.payment_intent'],
    // });
    // res.send({
    //   subscriptionId: subscription.id,
    //   clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    // });
    const priceId = req.query.priceId;
    const stripeId = req.query.stripeId;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          // For metered billing, do not pass quantity
          quantity: 1,
        },
      ],
      customer: stripeId,
      // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
      // the actual Session ID is returned in the query parameter when your customer
      // is redirected to the success page.
      success_url: "http://localhost:8080/api/spotify/login",
      cancel_url: "http://localhost:8080/signup/memberships",
    });
    res.redirect(303, session.url);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
