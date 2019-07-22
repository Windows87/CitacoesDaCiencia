const Quote = require('../models/Quote');

const controller = {};

controller.get = async (req, res) => {
  let { limit, category, author, language, skip } = req.query;

  limit = limit ? Number(limit) : 10;
  skip = skip ? Number(skip) : 0;

  const search = { category, language, author };

  if(!category)
    delete search.category;

  if(!author)
    delete search.author;

  if(!language)
    delete search.language;

  try {
    const quotes = await Quote.find(search).limit(limit).skip(skip).select('-__v');

    res.json(quotes);
  } catch(error) {
    res.status(500).json({ error: 'unknown error' });
    console.log(`Error in Quote Get: ${error.message}`); 
  }  
}

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
  let { limit, category, language, author } = req.query;

  limit = limit ? Number(limit) : 1;

  const search = { category, language, author };

  if(!category)
    delete search.category;

  if(!author)
    delete search.author;

  if(!language)
    delete search.language;

  try {
    const quotesLength = await Quote.countDocuments(search);
    const randomQuote = Math.floor(Math.random() * quotesLength) - limit;
    const quotes = await Quote.find(search).limit(limit).skip(randomQuote).select('-__v');
    res.json(quotes);
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

controller.put = async (req, res) => {
  const { _id } = req.params;

  try {
    const quote = await Quote.findOne({ _id });

    if(!quote)
      return res.status(404).json({ error: `quote doesn't exist` });

    await Quote.updateOne({ _id }, { $set: req.body });
    res.json({ successfull: true });
  } catch(error) {
    res.status(500).json({ error: 'unknown error' });
    console.log(`Error in Quote Put: ${error.message}`);    
  }
}

controller.delete = async (req, res) => {
  const { _id } = req.params;

  try {
    const quote = await Quote.findOne({ _id });

    if(!quote)
      return res.status(404).json({ error: `quote doesn't exist` });
    
    await Quote.deleteOne({ _id });
    res.json({ successfull: true });
  } catch(error) {
    res.status(500).json({ error: 'unknown error' });
    console.log(`Error in Quote Delete: ${error.message}`);    
  }
}

module.exports = controller;