const registerModel = require('../models/registerModel');
const bcrypt = require("bcryptjs");
const crypto = require('crypto');


const secret = "hello";
const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const unamefile = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, unamefile)
  }
});

let upload = multer({
  storage
}).single('image');



//.........................INSERT DATA..........................//
exports.insertdata = (req, res) => {
  let data = '';

  let response = '';


  // try{

  upload(req, res, async (err) => {

    if (!req.file) {
      return res.json({ msg2: 'All Fields Are Required' });
    }
    if (err) {
      return res.status(500).send({ msg2: err.message });
    }
    const registerr = new registerModel({
      fname: req.body.fname,
      number: req.body.number,
      email: req.body.email,
      password: req.body.password,
      image: req.file.path
    })



    // =======>PASSWORD HASH :middleware working for password encrypt


    let response = await registerr.save();



    if (response != null) {
      data = { 'msg': 'Data successfully inserted!' };
    }
    else {
      data = { 'msg': 'Data Not successfully inserted!' };
    }
    // }
    // catch (error) {
    // console.error(error);
    // data = {'msg':error};
    // return res.send(data)
    // expected output: ReferenceError: nonExistentFunction is not defined
    // Note - error messages will vary depending on browser
    //}

    return res.send(data);

  });
}

//............................................................//

//...........................display data....................//
exports.getdata = (req, res) => {
  registerModel.find().exec((err, abc) => {
    if (err) {
      return res.status(400).json({
        err: 'No user found'
      })
    }

    res.json(abc);
  })
}

//...........................................................//


//...................login cheack data..................//
exports.cheackdata = async (req, res) => {

  try {
    const lemail = req.body.lemail;
    const lpwd = req.body.lpwd;

    const useremail = await registerModel.findOne({ email: lemail });

    //................convert crypto password...........//
    const cryptoPassword = await crypto.createHmac('sha256', secret)
      .update(lpwd)
      .digest('hex');
    console.log(`this is a login crypto-password ${cryptoPassword}`);
    console.log(`this is a salt ${secret}`);

    //...............convert bcrypt password and check..........//
    const isPasswordauth = await bcrypt.compare(cryptoPassword, useremail.password);


    if (isPasswordauth) {
      //  res.json({
      //   lmsg: "login succesfully..."
      //    })

      return res.status(201).json({ lmsg: null })
      //res.redirect(301,'http://google.com');



    }


    else {
      return res.json({
        lmsg: "Invalid Login Details.."
      })
    }
  }

  catch (err) {
    return res.status(400).json(err);

  }


}

//.....................................................//



//......................update data....................//

exports.updatedata = (req, res) => {

  upload(req, res, async (err) => {


    const _idd = req.body._id;
    const u_password = req.body.password;
    console.log(req.body._id);
    const userupp = await registerModel.findOne({ _id: _idd });

    // ========> convert crypto password.........
    const cryptoPassword = await crypto.createHmac('sha256', secret)
      .update(u_password)
      .digest('hex');

    // =========> convert bcrypt password...........
    const uu_password = await bcrypt.hash(cryptoPassword, 10);
    


    if (userupp._id == _idd) {
      var ds = await registerModel.updateOne({ _id: userupp._id }, { $set: { "fname": req.body.fname, "number": req.body.number, "email": req.body.email, "password": uu_password, "image": req.file.path } });

      if (ds != null) {
        data = { 'msg': 'Data successfully updated!' };
      }
      else {
        data = { 'msg': 'Data Not successfully updated!' };
      }

    }

    return res.send(data);

  });



}
//.....................................................//



//.......................delete data......................//

exports.deletedata = (req, res) => {

  upload(req, res, async (err) => {


    const _idd = req.body._id;
    console.log(req.body._id);
    const deleteupp = await registerModel.findOne({ _id: _idd });

    if (deleteupp._id == _idd) {
      var dd = await registerModel.deleteOne({ _id: _idd });

      if (dd != null) {
        data = { 'msg': 'Data successfully deleted!' };
      }
      else {
        data = { 'msg': 'Data Not successfully deleted!' };
      }

    }

    return res.send(data);

  });



}


 //..........................................................//