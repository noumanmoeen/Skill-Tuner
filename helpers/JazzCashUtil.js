var moment = require("moment");
var cryptoJS = require("crypto-js");
const crypto = require("crypto");
const util = {
  generateJazzCashCardJson: function (
    userId,
    userEmail,
    userMobileNo,
    amount,
    description,
    cardNo,
    expire,
    cvv
  ) {
    var date = new Date();

    let data = {
      pp_IsRegisteredCustomer: "Yes",
      pp_ShouldTokenizeCardNumber: "No",
      pp_CustomerID: userId,
      pp_CustomerEmail: userEmail,
      pp_CustomerMobile: userMobileNo,
      pp_TxnType: "MPAY",
      pp_TxnRefNo: "T" + moment().format("YYYYMMDDHHmmss").toString(),
      pp_MerchantID: process.env.pp_MerchantID,
      pp_Password: process.env.pp_Password,
      pp_Amount: String(amount) + "00",
      pp_TxnCurrency: "PKR",
      pp_TxnDateTime: moment().format("YYYYMMDDHHmmss").toString(),
      pp_C3DSecureID: "",
      pp_TxnExpiryDateTime: moment()
        .add(1, "days")
        .format("YYYYMMDDHHmmss")
        .toString(),
      pp_BillReference: "billRef",
      pp_Description: description,
      pp_CustomerCardNumber: cardNo,
      pp_CustomerCardExpiry: expire,
      pp_CustomerCardCvv: cvv,
      pp_SecureHash: "",
    };

    let secureHash = makeSecureHash(data, process.env.IntegritySalt);
    data["pp_SecureHash"] = secureHash;

    return data;
  },
  generateJazzCashMobileJson: function (
    mobile,
    lastSixCnicDigit,
    description,
    amount,
    courseId
  ) {
    let data = {
      pp_Language: "EN",
      pp_MerchantID: process.env.pp_MerchantID,
      pp_SubMerchantID: "",
      pp_Password: process.env.pp_Password,
      pp_BankID: "",
      pp_ProductID: courseId,
      pp_TxnRefNo: "T" + moment().format("YYYYMMDDHHmmss").toString(),
      pp_Amount: String(amount) + "00",
      pp_TxnCurrency: "PKR",
      pp_TxnDateTime: moment().format("YYYYMMDDHHmmss").toString(),
      pp_BillReference: "billRef",
      pp_Description: description,
      pp_TxnExpiryDateTime: moment()
        .add(1, "days")
        .format("YYYYMMDDHHmmss")
        .toString(),
      pp_SecureHash: "",
      ppmpf_1: "",
      ppmpf_2: "",
      ppmpf_3: "",
      ppmpf_4: "",
      ppmpf_5: "",
      pp_MobileNumber: mobile,
      pp_CNIC: lastSixCnicDigit,
    };
    let secureHash = makeSecureHash(data, process.env.IntegritySalt);
    data["pp_SecureHash"] = secureHash;

    return data;
  },
};

const makeSecureHash = (data, integritySalt) => {
  // first sort the list
  let sorted = {};
  Object.keys(data)
    .sort()
    .forEach(function (key) {
      if (key != "pp_SecureHash") {
        sorted[key] = data[key];
      }
    });

  let salt = integritySalt;

  Object.keys(sorted).forEach(function (key) {
    if (sorted[key] != "" && sorted[key] != null) {
      salt += "&";
      salt += String(sorted[key]);
    }
  });

  let hash = crypto
    .createHmac("sha256", integritySalt)
    .update(salt)
    .digest("hex")
    .toUpperCase();

  return hash;
};
module.exports = util;
