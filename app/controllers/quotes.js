const Quote = require('../models/Quote');

const controller = {};

controller.post = async (req, res) => {
  const { text, author, keywords, language, category } = req.body;

  if(!text)
  	return res.status(400).json({ error: 'missing text param' });

  if(!author)
  	return res.status(400).json({ error: 'missing author param' });

  if(!keywords)
  	return res.status(400).json({ error: 'missing keywords param' });

  if(!language)
  	return res.status(400).json({ error: 'missing language param' });

  try {
  	const quoteAlreadyExists = await Quote.findOne({ text: new RegExp(`^${text.toLowerCase()}`, "i") });
    
  	if(quoteAlreadyExists)
  	  return res.status(400).json({ error: 'quote already exists' });

    const quote = await Quote.create({ text, author, keywords, language, category });
  	res.json(quote);
  } catch(error) {
  	res.status(500).json({ error: 'unknown error' });
    console.log(`Error in Quote Post: ${error.message}`);
  }
}

module.exports = controller;