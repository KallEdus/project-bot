import { Message, Platform } from '../types';

const productInfo = {
  response: `We offer a variety of products:
  
1. Premium Subscription - $49.99/month
2. Basic Subscription - $19.99/month
3. Pay-as-you-go Plan - $0.10 per use

Would you like more information about any specific product?`,
  quickReplies: [
    { id: '1', text: 'Premium Details' },
    { id: '2', text: 'Basic Details' },
    { id: '3', text: 'Pay-as-you-go Details' }
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
    { id: '2', text: 'Refund status' }
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

  if (input.includes('product') || input.includes('pricing') || input.includes('premium') || 
      input.includes('basic') || input.includes('pay') || input.includes('subscription')) {
    responseData = productInfo;
  } else if (input.includes('order') || input.includes('status') || input.includes('tracking')) {
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