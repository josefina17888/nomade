const axios = require("axios");

class PaymentService{
    async createPayment (){
        const url = "https://api.mercadopago.com/checkout/preferences"
        const body = {
            payer_email: "test_user_40225513@testuser.com",
            items: [{
                title: "Casa en Carrasco",
                description: "alojamiento",
                picture_url: "http://res.cloudinary.com/dbq85fwfz/image/upload/v1661183800/rsa9yxkermkod7jj04v5.jpg",
                category_id: "cat123",
                quantity: 5,
                unit_price: 50
            }],
            back_urls: {
                success: "/success",
                failure: "/failure",
                pending: "/pending"
            },
            notification_url: "https://www.your-site.com/ipn"
        }
        const payment = await axios.post(url, body, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            }
        })
        return payment.data;
    }
}

module.exports = PaymentService