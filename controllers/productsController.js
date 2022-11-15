import { check, validationResult } from "express-validator";
import { Products } from "../models/productsModel.js";

export const createProductsForm = (req, res) => {
  res.render("products/productsRegisterForm", {
    nombreVista: "New products",
  });
};

export const createProducts = async (req, res) => {
  await check("name")
    .notEmpty()
    .withMessage("The name is required")
    .isLength({ min: 5, max: 10 })
    .withMessage("The name nust have at least 5 chars and max 10 chars")
    .run(req);

  await check("price")
    .notEmpty()
    .withMessage("The price is required")
    .isLength({ min: 1, max: 7 })
    .withMessage("The price must be greater than 0 and less than 1 million")
    .run(req);

  await check("reference")
    .notEmpty()
    .withMessage("The reference is required")
    .isLength({ min: 3, max: 7 })
    .withMessage("The reference nust have at least 3 chars and max 7 chars")
    .run(req);

  await check("quantity")
    .notEmpty()
    .withMessage("The quantity is required")
    .isLength({ min: 1, max: 3 })
    .withMessage("The quantity must be greater than 0 and less than 100")
    .run(req);

  await check("description")
    .notEmpty()
    .withMessage("The description is required")
    .isLength({ min: 1, max: 200 })
    .withMessage("The description must be less than 100")
    .run(req);

  let errorList = validationResult(req);

  if (!errorList.isEmpty()) {
    return res.render("products/productsRegisterForm", {
      nombreVista: "New products",
      errors: errorList.array(),
      products: {
        name: req.body.name,
        price: req.body.price,
        reference: req.body.reference,
        quantity: req.body.quantity,
        description: req.body.phone,
      },
    });
  }

  const { name, price, reference, quantity, description } = req.body;

  const validateProductsRegistered = await Products.findOne({
    where: {reference},
  });

  if (validateProductsRegistered) {
    return res.render("products/productsRegisterForm", {
      nombreVista: "New products",
      alreadyExist: true,
      products: {
        name: req.body.name,
        price: req.body.price,
        reference: req.body.reference,
        quantity: req.body.quantity,
        description: req.body.description,
      },
    });
  }

  const product = await Products.create({
    name,
    price,
    reference,
    quantity,
    description,
  });

  if ( product ){
    return res.render("products/productsRegisterForm", {
      nombreVista: "New products",
      created: true,
      products: {
        name: req.body.name,
        price: req.body.price,
        reference: req.body.reference,
        quantity: req.body.quantity,
        description: req.body.description,
      },
    });
  }

  
};
