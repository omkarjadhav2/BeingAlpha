import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      brand,
      prevprice,
      newprice,
      material,
      color,
      stock,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const images = ["image1", "image2", "image3", "image4"]
      .map((key) => req.files?.[key]?.[0])
      .filter(Boolean);

    const imageUrl = await Promise.all(
      images.map(async (image) => {
        try {
          const result = await cloudinary.uploader.upload(image.path, {
            resource_type: "image",
          });
          return result.secure_url;
        } catch (error) {
          console.error("Image upload failed:", error);
          throw new Error("Image upload failed");
        }
      })
    );

    const productData = {
      name,
      description,
      brand,
      prevprice: Number(prevprice),
      newprice: Number(newprice),
      material,
      color,
      stock: Number(stock),
      image: imageUrl,
      category,
      subCategory,
      sizes: Array.isArray(sizes) ? sizes : JSON.parse(sizes),
      bestseller: bestseller === "true" ? true : false,
    };

    const product = new productModel(productData);
    await product.save();

    res
      .status(201)
      .json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.error("Error in addProduct:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const listProducts = async (req, res) => {

  try {
    const products = await productModel.find({});
    res.json({success:true , products})
  } catch (error) {
    console.error("Error to list all products:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({success : true , message : "product removed successfully"});
  } catch (error) {
    console.error("Error while removing product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
const singleProduct = async (req, res) => {
  try {
    const {productId} = req.body;
    const product = await productModel.findById(productId);
    res.json({success : true , product});
  } catch (error) {
    console.error("Error while getting single product information:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };
