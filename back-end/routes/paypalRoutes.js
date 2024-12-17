const express = require('express');
const router = express.Router();
const { client } = require('./paypal');

router.post('/create-order', async (req, res) => {
    const { price } = req.body;

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [
            {
                amount: {
                    currency_code: 'USD', // Puedes ajustar a la moneda que prefieras
                    value: price,
                },
            },
        ],
    });

    try {
        const order = await client.execute(request);
        res.json({ id: order.result.id });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
