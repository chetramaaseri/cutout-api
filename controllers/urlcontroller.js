const Url = require("../models/urlModel");
const asyncHandler = require("express-async-handler");
// @desc generate url 
// @route POST /generate
// @access public
const generateUrl = asyncHandler(async (req,res)=>{
    const {longUrl} = req.body;
    console.log(longUrl);
    if(!longUrl){
        res.status(400);
        throw new Error("Pls Provide Url To Shorten it");
    }
    const route = await generateUniqueRoute();
    const type = "direct";
    const urlRecord = await Url.create({
        longUrl,
        route,
        type
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

// @desc fetch Route Details
// @route POST /fetchRoute
// @access public
const fetchRouteDetails = asyncHandler(async (req,res)=>{
    const {route} = req.body;
    if(!route){
        res.status(400);
        throw new Error("pls provide a route to fetch information");
    }
    const routeDetails = await Url.findOne({route});
    if(!routeDetails){
        res.status(404);
        throw new Error("pls provide a valid route to fetch information");
    }
    res.status(200).json(routeDetails);
});


module.exports = {generateUrl,fetchRouteDetails};