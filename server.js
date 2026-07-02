const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10mb' }));

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined");
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Qzone DB Connected"))
  .catch((err) => console.error(err));

app.use('/api/products', require('./routes/products'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/wishlist', require('./routes/wishlist'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/payment', require('./routes/payment'));
app.use('/api/pincode', require('./routes/pincode'));

app.get('/api', (req, res) => {
  res.json({
    app: 'Qzone',
    tagline: 'ab furniture kyu khojna jab Q hai',
    categories: 20
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Qzone backend: ${PORT}`);
});
