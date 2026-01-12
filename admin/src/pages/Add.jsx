import React, { useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size)
        : [...prev, size]
    );
  };

  const onsubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name.trim());
      formData.append("description", description.trim());
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller ? "true" : "false");
      formData.append("sizes", JSON.stringify(sizes.length ? sizes : []));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: {
            token,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        console.log(response);

        // reset form
        setName("");
        setDescription("");
        setPrice("");
        setSizes([]);
        setBestseller(false);
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onsubmitHandler}
      className="flex flex-col w-full items-start gap-4"
    >
      {/* Images */}
      <div>
        <p className="mb-2 font-medium">Upload Images</p>
        <div className="flex gap-2">
          {[image1, image2, image3, image4].map((img, i) => (
            <label key={i}>
              <img
                className="w-20 cursor-pointer"
                src={img ? URL.createObjectURL(img) : assets.upload_area}
                alt=""
              />
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={(e) =>
                  [setImage1, setImage2, setImage3, setImage4][i](
                    e.target.files[0]
                  )
                }
              />
            </label>
          ))}
        </div>
      </div>

      {/* Name */}
      <div className="w-full">
        <p>Product Name</p>
        <input
          required
          className="w-full max-w-[500px] px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product name"
        />
      </div>

      {/* Description */}
      <div className="w-full">
        <p>Product Description</p>
        <textarea
          required
          className="w-full max-w-[500px] px-3 py-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Product description"
        />
      </div>

      {/* Category */}
      <div className="flex gap-4">
        <select
          className="px-3 py-2"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Men</option>
          <option>Women</option>
          <option>Kids</option>
        </select>

        <select
          className="px-3 py-2"
          onChange={(e) => setSubCategory(e.target.value)}
        >
          <option>Topwear</option>
          <option>Bottomwear</option>
          <option>Winterwear</option>
        </select>

        <input
          type="number"
          required
          className="px-3 py-2 w-[120px]"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />
      </div>

      {/* Sizes */}
      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-2">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <p
              key={size}
              onClick={() => toggleSize(size)}
              className={`px-3 py-1 cursor-pointer ${
                sizes.includes(size) ? "bg-pink-200" : "bg-gray-200"
              }`}
            >
              {size}
            </p>
          ))}
        </div>
      </div>

      {/* Bestseller */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={bestseller}
          onChange={() => setBestseller((prev) => !prev)}
        />
        <label>Add to bestseller</label>
      </div>

      <button type="submit" className="bg-black text-white px-6 py-3 mt-3">
        ADD PRODUCT
      </button>
    </form>
  );
};

export default Add;
