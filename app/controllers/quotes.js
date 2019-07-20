const Quote = require('../models/Quote');

const controller = {};

controller.getOne = async (req, res) => {
  const { _id } = req.params;

  try {
    const quote = await Quote.findOne({ _id }).select('-__v');

    if(!quote)
      return res.status(404).json({ error: `quote doesn't exist` });
  
    res.json(quote);
  } catch(error) {
    res.status(500).json({ error: 'unknown error' });
    console.log(`Error in Quote Get One: ${error.message}`); 
  }
}

controller.getRandom = async (req, res) => {
  try {
    const quotesLength = await Quote.count();
    const randomQuote = Math.floor(Math.random() * quotesLength);
    const quote = await Quote.findOne().skip(randomQuote).select('-__v');
    res.json(quote);
  } catch(error) {
    res.status(500).json({ error: 'unknown error' });
    console.log(`Error in Quote Get Random: ${error.message}`);    
  }
}

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