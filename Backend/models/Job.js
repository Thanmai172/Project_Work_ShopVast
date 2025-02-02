const mongoose = require('mongoose');  

const jobSchema = new mongoose.Schema({  
  title: { type: String, required: true },  
  description: { type: String, required: true },  
  // Add more fields as needed  
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Associate the job with a user  
});  

const Job = mongoose.model('Job', jobSchema);  
module.exports = Job;