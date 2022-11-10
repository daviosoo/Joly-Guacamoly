import { check, validationResult } from "express-validator";
import { Customer } from "../models/customerModel.js";

export const createCustomerForm = (req, res) => {
  res.render("customer/customerRegisterForm", {
    nombreVista: "New customer",
  });
};

export const createCustomer = async (req, res) => {
  await check("identification")
    .notEmpty()
    .withMessage("The identification is required")
    .isNumeric()
    .withMessage("The identification only accept numbers")
    .run(req);

  await check("name")
    .notEmpty()
    .withMessage("The name is required")
    .isLength({ min: 5, max: 10 })
    .withMessage("The name nust have at least 5 chars and max 10 chars")
    .run(req);

  await check("sourName")
    .notEmpty()
    .withMessage("The sour name is required")
    .isLength({ min: 5, max: 10 })
    .withMessage("The sour name must have at least 5 chars and max 10 chars")
    .run(req);

  await check("email")
    .notEmpty()
    .withMessage("The email is required")
    .isEmail()
    .withMessage("Should be a valid email")
    .run(req);

  await check("address")
    .notEmpty()
    .withMessage("The address is required")
    .isLength({ min: 5, max: 20 })
    .withMessage("The address must have at least 5 chars and max 20 chars")
    .run(req);

  await check("phone")
    .notEmpty()
    .withMessage("The phone is required")
    .isNumeric()
    .withMessage("The phone only accept numbers")
    .run(req);

  let errorList = validationResult(req);

  if (!errorList.isEmpty()) {
    return res.render("customer/customerRegisterForm", {
      nombreVista: "New customer",
      errors: errorList.array(),
      customer: {
        identification: req.body.identification,
        name: req.body.name,
        sourName: req.body.sourName,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
      },
    });
  }

  const { identification, name, sourName, email, address, phone } = req.body;

  const validateCustomerRegistered = await Customer.findOne({
    where: {identification},
  });

  if (validateCustomerRegistered) {
    return res.render("customer/customerRegisterForm", {
      nombreVista: "New customer",
      alreadyExist: true,
      customer: {
        identification: req.body.identification,
        name: req.body.name,
        sourName: req.body.sourName,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
      },
    });
  }

  const customer = await Customer.create({
    identification,
    name,
    sourName,
    email,
    address,
    phone,
  });

  if ( customer ){
    return res.render("customer/customerRegisterForm", {
      nombreVista: "New customer",
      created: true,
      customer: {
        identification: req.body.identification,
        name: req.body.name,
        sourName: req.body.sourName,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
      },
    });
  }

  
};
