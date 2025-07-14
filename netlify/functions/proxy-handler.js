// netlify/functions/proxy-handler.js
exports.handler = async function(event, context) {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const openAIKey = process.env.OPENAI_API_KEY;
    const openAIUrl = 'https://api.openai.com/v1/chat/completions';

    try {
        const response = await fetch(openAIUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openAIKey}`
            },
            body: event.body // Forward the body from the original request
        });

        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch from OpenAI' })
        };
    }
};
