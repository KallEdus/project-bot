import { Message, Platform } from '../types';

// Product Categories
const products = {
  premium: {
    name: 'Premium Subscription',
    price: '$49.99/month',
    features: [
      'Unlimited access',
      '24/7 priority support',
      'Advanced analytics',
      'Custom integrations'
    ]
  },
  basic: {
    name: 'Basic Subscription',
    price: '$19.99/month',
    features: [
      'Standard access',
      'Email support',
      'Basic analytics',
      'Core features'
    ]
  },
  payAsYouGo: {
    name: 'Pay-as-you-go Plan',
    price: '$0.10 per use',
    features: [
      'No monthly commitment',
      'Basic support',
      'Usage-based billing',
      'Core features'
    ]
  }
};

// Response Templates
const productInfo = {
  response: `We offer a variety of products:
  
1. Premium Subscription - ${products.premium.price}
2. Basic Subscription - ${products.basic.price}
3. Pay-as-you-go Plan - ${products.payAsYouGo.price}

Would you like more information about any specific product?`,
  quickReplies: [
    { id: '1', text: 'Premium Details' },
    { id: '2', text: 'Basic Details' },
    { id: '3', text: 'Pay-as-you-go Details' }
  ]
};

const premiumDetails = {
  response: `Premium Subscription (${products.premium.price})

Features:
${products.premium.features.map(feature => `• ${feature}`).join('\n')}

Would you like to subscribe or learn about other plans?`,
  quickReplies: [
    { id: '1', text: 'Subscribe Now' },
    { id: '2', text: 'Compare Plans' },
    { id: '3', text: 'Basic Details' },
    { id: '4', text: 'Pay-as-you-go Details' }
  ]
};

const basicDetails = {
  response: `Basic Subscription (${products.basic.price})

Features:
${products.basic.features.map(feature => `• ${feature}`).join('\n')}

Would you like to subscribe or learn about other plans?`,
  quickReplies: [
    { id: '1', text: 'Subscribe Now' },
    { id: '2', text: 'Compare Plans' },
    { id: '3', text: 'Premium Details' },
    { id: '4', text: 'Pay-as-you-go Details' }
  ]
};

const payAsYouGoDetails = {
  response: `Pay-as-you-go Plan (${products.payAsYouGo.price})

Features:
${products.payAsYouGo.features.map(feature => `• ${feature}`).join('\n')}

Would you like to subscribe or learn about other plans?`,
  quickReplies: [
    { id: '1', text: 'Subscribe Now' },
    { id: '2', text: 'Compare Plans' },
    { id: '3', text: 'Premium Details' },
    { id: '4', text: 'Basic Details' }
  ]
};

const orderStatus = {
  response: `I'd be happy to help you check your order status. Could you please provide your order number? It should be in the confirmation email you received.`,
  quickReplies: [
    { id: '1', text: 'I don\'t have my order number' },
    { id: '2', text: 'Check last order' }
  ]
};

const returnsRefunds = {
  response: `Our return policy allows returns within 30 days of purchase. To initiate a return:

1. Go to your order history
2. Select the item you wish to return
3. Follow the prompts to generate a return label

For refunds, please allow 5-7 business days after we receive your return.`,
  quickReplies: [
    { id: '1', text: 'Start a return' },
    { id: '2', text: 'Refund status' },
    { id: '3', text: 'Contact support' }
  ]
};

const speakToAgent = {
  response: `I'll connect you with a customer service agent shortly. Our current wait time is approximately 5-10 minutes. While you wait, is there anything specific you need help with that I might be able to assist with?`,
  quickReplies: [
    { id: '1', text: 'Continue waiting' },
    { id: '2', text: 'Try self-service instead' }
  ]
};

const generalHelp = {
  response: `I'm here to help! What can I assist you with today?`,
  quickReplies: [
    { id: '1', text: 'Product Information' },
    { id: '2', text: 'Order Status' },
    { id: '3', text: 'Returns & Refunds' },
    { id: '4', text: 'Speak to an Agent' }
  ]
};

const fallback = {
  response: `I'm not sure I understand. Could you please rephrase or select one of the options below?`,
  quickReplies: [
    { id: '1', text: 'Product Information' },
    { id: '2', text: 'Order Status' },
    { id: '3', text: 'Returns & Refunds' },
    { id: '4', text: 'Speak to an Agent' }
  ]
};

export const generateBotResponse = (userInput: string, platform: Platform): Message => {
  const input = userInput.toLowerCase();
  let responseData;

  // Product-related responses
  if (input.includes('premium details')) {
    responseData = premiumDetails;
  } else if (input.includes('basic details')) {
    responseData = basicDetails;
  } else if (input.includes('pay-as-you-go details')) {
    responseData = payAsYouGoDetails;
  } else if (input.includes('product') || input.includes('pricing') || 
             input.includes('subscription') || input.includes('plan')) {
    responseData = productInfo;
  }
  // Order and support responses
  else if (input.includes('order') || input.includes('status') || input.includes('tracking')) {
    responseData = orderStatus;
  } else if (input.includes('return') || input.includes('refund')) {
    responseData = returnsRefunds;
  } else if (input.includes('agent') || input.includes('human') || input.includes('person') || 
             input.includes('representative') || input.includes('speak')) {
    responseData = speakToAgent;
  } else if (input.includes('hello') || input.includes('hi') || input.includes('hey') || 
             input.includes('help')) {
    responseData = generalHelp;
  } else {
    responseData = fallback;
  }

  return {
    id: Date.now().toString(),
    text: responseData.response,
    sender: 'bot',
    timestamp: new Date(),
    quickReplies: responseData.quickReplies
  };
};