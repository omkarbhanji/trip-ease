const transportSchema = require('../model/transportService');

exports.getAvailableTransports = async (req, res) => {
    
    try{
        // const Data = req.body;
        console.log(req.body);
        // const date = Date.now();
        // const today = new Date();
        // const array = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        // console.log(array[today.getDay()]);
        const availableTransport = await transportSchema.find({
            source: req.body.source,
         destination: req.body.destination,
         day: req.body.day
        //  departureDate: req.body
        });
        
        console.log(availableTransport);

        if(!availableTransport){
            return res.status(400).json({message: "didnt find any ! ", error: err.message});
        }

        return res.status(200).json({message: "found", transports: availableTransport});
    }
    catch(err){
        return res.status(400).json({message: "Not found ", error: err.message});
    }
}