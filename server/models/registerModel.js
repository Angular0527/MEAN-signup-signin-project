const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");
const crypto = require('crypto');
const uuidv1 = require('uuid');
const jwt = require("jsonwebtoken");

const secret = "hello";


const registerSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      trim: true,
      required: true,
      maxlength: 10,
      unique:true
    },
    number: {
      type: String,
      trim: true,
      required: true,
      maxlength: 10
    },
    email: {
      type: String,
      trim: true,
      required: true,
      maxlength: 20,
      unique:true
    },

    password: {
        type: String,
        trim: true,
        required: true,
        maxlength: 150,
        unique:true
      },

      image: {
        type: String, // ahiya to path j store karvano etle string j lavani
        trim: true,
        required: true,
        maxlength: 70
    }
  },
  { timestamps: true }
);




//...................CREATE ENCRYPTED PASSWORD.................//
registerSchema.pre("save",async function(next){

   //  ========> plain password.............
    console.log(`this is a plain-password ${this.password}`);

    // ========> convert crypto password.........
    this.cryptoPassword =await crypto.createHmac('sha256',secret)
                   .update(this.password)
                   .digest('hex');
    console.log(`this is a register crypto-password ${this.cryptoPassword}`);
    console.log(`this is a salt ${secret}`);

    // =========> convert bcrypt password...........
    this.password =await bcrypt.hash(this.cryptoPassword,10);
    console.log(`this is a  register encrypt-password ${this.password}`);

    next();

});

module.exports = mongoose.model("registerDB", registerSchema);
