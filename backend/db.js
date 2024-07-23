const mongoose = require('mongoose');

const mongoURL = "mongodb://pawaskarshreyas2:DGFt5cY2owAcDCfk@ac-ooychtc-shard-00-00.bnnc8mc.mongodb.net:27017,ac-ooychtc-shard-00-01.bnnc8mc.mongodb.net:27017,ac-ooychtc-shard-00-02.bnnc8mc.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-u78ou3-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true 
        });
        console.log('MongoDB connected successfully');
        const fetch_data = await mongoose.connection.db.collection("fooditems");
        const data = await fetch_data.find({}).toArray();
        
        
        const foodCategory = await mongoose.connection.db.collection("foodcategory");
        const catdata = await foodCategory.find({}).toArray();
            global.food_items = data;
            global.food_category = catdata;
         }   
    
         catch (err) {
        console.error("Error connecting to MongoDB or fetching data: ", err);
    }
};

module.exports = mongoDB;
