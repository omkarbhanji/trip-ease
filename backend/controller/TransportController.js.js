const Transport = require('../model/transportService');
// add a transport which dosent exist !
exports.addTransport = async (req, res) => {
    console.log("I am here")
    console.log(req.body);
    const { transportMode, source, destination, day , time, timeofJourney} = req.body;

    try {
      
        const existing = await Transport.findOne({
            transportMode,
            source,
            destination,
            day,
            time,
            timeofJourney
        });

        if (existing) {
            return res.status(409).json({ message: "Transport already exists" });
        }

        const newTransport = new Transport({
            transportMode,
            source,
            destination,
            day,
            time,
            timeofJourney
        });

        await newTransport.save();

        res.status(201).json({ message: "Transport added", data: newTransport });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
};


exports.addExistingTransports = async(req, res) => {
    console.log("Iam in updating transport function")
    const {id} = req.params;

    const {transportMode, source, destination, day, time,timeofJourney} = req.body;

    try{
        const updated = await Transport.findByIdAndUpdate(id, {transportMode, source, destination, day, time, timeofJourney}, {new: true});
        console.log("Transport updated", updated);

        return res.status(200).json({updated});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({err});
    }

}

// a function which pushes the new dates and times for a already present trqansport mode for journey

// exports.addSlotsTransport = async (req, res) => {
//     console.log("Inside this funcn");
//     // const [date, time] = req.body;
//     const id = req.query.id;
//    const transport = await Transport.findById(id);
//    console.log(id);
// //    console.log(date + " " + time);

//    const slots = req.body.slots;

// //   for (const [day, times] of Object.entries(slots)) {
// //     console.log(`Day: ${day}`);
// //     times.forEach(time => {
// //         console.log(` - Time: ${time}`);
// //     });
// // }



// if (!transport) return res.status(404).json({ message: "Not found" });

// for (const [day, times] of Object.entries(slots)) {
//     const existing = new Set(transport.slots.get(day) || []);
//     times.forEach(t => existing.add(t));
//     transport.slots.set(day, Array.from(existing));
// }

// // transport.transportMode = transportMode;
// // transport.source = source;
// // transport.destination = destination;

// await transport.save();
// res.status(200).json({ message: "Transport updated", data: transport });

// }

// get all the tranports

exports.getAllTranports= async(req, res)=> {

    try{
        const result = await Transport.find();
        res.json({data: result});
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}