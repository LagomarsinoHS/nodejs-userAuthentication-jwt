import app from './app.js';
import connectDb from './db/config.js'
const PORT = process.env.PORT || 3000;

connectDb()
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`.cyan.underline));
