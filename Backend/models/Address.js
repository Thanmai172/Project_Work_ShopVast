const mongoose = require('mongoose');  

// Create a schema for the address model  
const addressSchema = new mongoose.Schema({  
    address: { type: String, required: true },  
    city: { type: String, required: true },  
    postalCode: { type: String, required: true },  
    country: { type: String, required: true },  
});  

// Prevent model overwriting  
const Address = mongoose.models.Address || mongoose.model('Address', addressSchema);  

// Export the model  
module.exports = Address;