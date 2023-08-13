const Url = require("../models/urlModel");

// @desc generate url 
// @route POST /generate
// @access public
const generateUrl = (async (req,res)=>{
    const {longUrl} = req.body;
    if(!longUrl){
        res.status(400);
        throw new Error("Pls Provide Url To Shorten it");
    }
    const route = await generateUniqueRoute();
    const urlRecord = await Url.create({
        longUrl,
        route
    });
    res.status(200).json(urlRecord);
});


const generateUniqueRoute = async(length = process.env.GUEST_ROUTE_LENGTH)=>{
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    while (true) {
        let route = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            route += characters.charAt(randomIndex);
        }
        const alreadyExists = await Url.findOne({route});
        if(!alreadyExists){
            return route;
        }
    }
}



module.exports = {generateUrl};