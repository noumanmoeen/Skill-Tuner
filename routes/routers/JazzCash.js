const exjwt = require("express-jwt");
const express = require("express");
const jwt = require("jsonwebtoken");
const process = require("process");
const Course = require("./../../models/Courses");
var path = require("path");
const axios = require("axios");
const { paymentMethods } = require("../../helpers/constant");
const util = require("../../helpers/JazzCashUtil");
const keys = {
  jwtsecret: process.env.jwtsecret,
};

const ejwtauth = exjwt({ secret: keys.jwtsecret, algorithms: ["HS256"] });

const router = express.Router();

router.post("/payment/pay", async (req, res, next) => {
  const method = req.body.method;

  if (method == paymentMethods.C) {
    let body = util.generateJazzCashCardJson(
      req.body.userId,
      req.body.email,
      req.body.mobileNo,
      req.body.amount,
      req.body.description,
      req.body.cardNo,
      req.body.expire,
      req.body.cvv
    );

    await axios
      .post(
        "https://sandbox.jazzcash.com.pk/ApplicationAPI/API/2.0/Purchase/PAY",
        body
      )
      .then((result) => {
        let data = {
          responseCode: result.data.responseCode,
          responseMessage: result.data.responseMessage,
          pp_TxnRefNo: result.data.pp_TxnRefNo,
          userId: result.data.pp_CustomerID,
          courseId: result.data.pp_Description,
        };
        res.send(data);
      })
      .catch((error) => {
        console.log(error);
        res.send("server Error Invalid details are given");
      });
  } else if (method == paymentMethods.M) {
    let body = util.generateJazzCashMobileJson(
      req.body.mobile,
      req.body.cnic,
      req.body.description,
      req.body.amount,
      req.body.courseId
    );
    await axios
      .post(
        "https://sandbox.jazzcash.com.pk/ApplicationAPI/API/2.0/Purchase/DoMWalletTransaction",
        body
      )
      .then((result) => {
        res.send(result.data);
      })
      .catch((error) => {
        res.send("server Error Invalid details are given");
      });
  } else {
    res.send("comming soon");
  }
});

module.exports = router;
