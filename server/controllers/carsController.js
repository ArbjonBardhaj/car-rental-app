const Car = require("../models/carModel");


// get all cars
const getAllCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"});
    }    
}


// get single car by id

const getCarById = async (req, res)=>{
    try {
        const car = await Car.findById(req.params.id);
        res.json(car);
    } catch (error) {
        console.log(error).json({message:"Server Error"});
    }
}


// add a car

const addCar = async (req, res) => {
    const {name, model , year, price , image} = req.body;
    const newCar = new Car({
        name,
        model,
        year,
        price,
        image
    })
    try {
        const car = await newCar.save();
        res.json(car);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"});
    }
}

// update a car

const updateCar = async (req,res) => {
    const {name, model, year, price, image} = req.body;
    const carFields = {};
    if(name) carFields.name = name;
    if(model) carFields.model = model;
    if(year) carFields.year = year;
    if(price) carFields.price = price;
    if(image) carFields.image = image;
    try {
        let car= await Car.findById(req.params.id);
        if(!car) return res.status(404).json({message:"Car not found"});
        car = await Car.findByIdAndUpdate(req.params.id, {$set: carFields}, {new: true});
        res.json(car);
    }catch (error) {
        console.log(error).json({message:"Server Error"})
    }
}

// delete a car

const deleteCar = async (req, res) => {
    try {
        let car = await Car.findById(req.params.id);
        if(!car) return res.status(404).json({message:"Car not found"});
        await Car.findByIdAndRemove(req.params.id);
        res.json({message:"Car removed"});
    } catch (error) {
        console.log(error).json({message:"Server Error"})
    }
}




// export functions

module.exports = {
    getAllCars,
    getCarById,
    addCar,
    updateCar,
    deleteCar,
}