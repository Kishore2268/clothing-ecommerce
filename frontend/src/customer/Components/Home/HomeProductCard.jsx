import React from "react";

import { useNavigate } from "react-router-dom";

const HomeProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3"
    >
      <div className="h-[13rem] w-[10rem]">
        <img
          className="object-cover object-top w-full h-full"
          src={product?.image || product?.imageUrl}
          alt={product?.title}
        />
      </div>

      <div className="p-4 w-full">
        <h3 className="text-lg font-medium text-gray-900 truncate">
          {product?.brand || product?.title}
        </h3>
        <p className="mt-1 text-sm text-gray-500 truncate">{product?.title}</p>
        
        <div className="mt-3 flex items-center space-x-2">
          <span className="text-lg font-semibold text-gray-900">₹{product?.discountedPrice}</span>
          <span className="text-sm text-gray-500 line-through">₹{product?.price}</span>
          <span className="text-sm font-semibold text-green-600">{product?.discountPercent}% off</span>
        </div>
      </div>
    </div>
  );
};

export default HomeProductCard;
