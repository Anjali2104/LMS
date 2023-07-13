import app from './app.js';  
import { config } from 'dotenv';
config();
const PORT =  process.env.PORT || 5005;
app.listen(PORT , async() => {
    await connectToDB();
    console.log(`App is listening on http://localhost:${PORT}`);
})