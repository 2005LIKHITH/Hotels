const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age:{
        type: Number
    },
    work:{
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String
    },
    salary:{
        type: Number,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required: true
    }
});
personSchema.pre('save', async function(next) { 
    const person = this;

    if(!person.isModified('password'))next();

    try{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(person.password, salt);
        person.password = hash;

        next();
    }catch(err){
        return next(err);
    }
});
personSchema.methods.comparePassword = async function(password) {
    try{
        return await bcrypt.compare(password, this.password);
    }catch(err){
        throw err;
    }
}

module.exports = mongoose.model('Person', personSchema);
