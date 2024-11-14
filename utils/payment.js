const axios = require('axios');

const API_BASE_URL = 'https://apirone.com/api/v2/accounts';

exports.initiatePayment = async (currency, amount) => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, {
      currency,
      amount,
    });

    return {
      status: response.data.status,
      payment_link: response.data.paymentLink,
    };
  } catch (error) {
    console.error('Payment initiation failed:', error);
    throw new Error('Payment initiation failed');
  }
};
