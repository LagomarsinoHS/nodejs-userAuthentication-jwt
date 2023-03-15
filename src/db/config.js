import mongoose from 'mongoose';

//Creo una funcion para conectar a la BD
const connectDb = async () => {
    //userAuth será el nombre de la BD!
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Db Connected!".green);
    } catch (error) {
        console.log("Something went Wrong!".red.underline, error);
    }
}
export default connectDb;
