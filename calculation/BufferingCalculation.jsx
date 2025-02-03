import React, { useState } from "react";

const BufferingCalculation = () => {
  const [inputs, setInputs] = useState([{
    category: "",
    unit: "",
    size: "",
    weight: "",
  }]);
  const [bufferSizes, setBufferSizes] = useState([]);

  const handleChange = (index, field, value) => {
    const updatedInputs = [...inputs];
    updatedInputs[index][field] = value;
    setInputs(updatedInputs);
  };

  const addNewInput = () => {
    setInputs([...inputs, { category: "", unit: "", size: "", weight: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const results = inputs.map((input) => calculateBufferSize(input));
    setBufferSizes(results);
  };

  const calculateBufferSize = ({ category, unit, size, weight }) => {
    let weightInGrams = parseFloat(weight);
    if (unit === "Kilogram") {
      weightInGrams *= 1000;
    }

    switch (category) {
      case "Glass":
        if (size === "Small" && weightInGrams <= 10) return "0.1 cm";
        if (size === "Medium") return weightInGrams <= 2000 ? "3 cm" : "5 cm";
        if (size === "Large") {
          if (weightInGrams <= 2000) return "6 cm";
          if (weightInGrams <= 5000) return "8 cm";
          return "10 cm";
        }
        break;

      case "Durable Plastic":
        if (size === "Small") {
          return weightInGrams <= 10 ? "0.1 cm" : weightInGrams <= 100 ? "0.5 cm" : "N/A";
        }
        if (size === "Medium") return weightInGrams <= 200 ? "0.6 cm" : "1 cm";
        break;

      case "Non-Durable Plastic":
        if (size === "Small") {
          return weightInGrams <= 10 ? "0.3 cm" : weightInGrams <= 100 ? "0.8 cm" : "N/A";
        }
        if (size === "Medium") return weightInGrams <= 200 ? "1 cm" : "1.3 cm";
        break;

      case "Electronics":
        if (size === "Small") return weightInGrams <= 100 ? "0.5 cm" : "1 cm";
        if (size === "Medium") return weightInGrams <= 500 ? "1.5 cm" : "2.5 cm";
        if (size === "Large") return weightInGrams <= 5000 ? "3 cm" : "4 cm";
        break;

      case "Metal":
        if (size === "Small") {
          return weightInGrams <= 100 ? "0.5 cm" : weightInGrams <= 200 ? "0.7 cm" : "N/A";
        }
        if (size === "Medium") return weightInGrams <= 500 ? "1 cm" : "2 cm";
        if (size === "Large") return "3 cm";
        break;

      default:
        return "Buffer size not defined for selected inputs";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col justify-center bg-gray-900 text-white p-6 rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-extrabold text-cyan-400 mb-4">Buffer Suggestions for Your Products</h2>
        <p className="text-lg text-gray-300">Fill in the details below and get the buffer size recommendations for each product.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        {inputs.map((input, index) => (
          <div key={index} className="bg-gray-800 p-6 border-2 border-gray-600 rounded-lg shadow-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="col-span-1">
                <label htmlFor={`category-${index}`} className="text-sm font-medium text-gray-300 mb-2">Select Category</label>
                <select
                  id={`category-${index}`}
                  value={input.category}
                  onChange={(e) => handleChange(index, "category", e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 text-gray-300 rounded-md focus:ring-cyan-600 focus:border-cyan-600"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Glass">Glass</option>
                  <option value="Durable Plastic">Durable Plastic</option>
                  <option value="Non-Durable Plastic">Non-Durable Plastic</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Metal">Metal</option>
                </select>
              </div>

              <div className="col-span-1">
                <label htmlFor={`size-${index}`} className="text-sm font-medium text-gray-300 mb-2">Select Size</label>
                <select
                  id={`size-${index}`}
                  value={input.size}
                  onChange={(e) => handleChange(index, "size", e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 text-gray-300 rounded-md focus:ring-cyan-600 focus:border-cyan-600"
                  required
                >
                  <option value="">Select Size</option>
                  <option value="Small">1cm-10cm</option>
                  <option value="Medium">10cm-50cm</option>
                  <option value="Large">50cm+</option>
                </select>
              </div>

              <div className="col-span-1">
                <label htmlFor={`unit-${index}`} className="text-sm font-medium text-gray-300 mb-2">Select Unit</label>
                <select
                  id={`unit-${index}`}
                  value={input.unit}
                  onChange={(e) => handleChange(index, "unit", e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 text-gray-300 rounded-md focus:ring-cyan-600 focus:border-cyan-600"
                  required
                >
                  <option value="">Select Unit</option>
                  <option value="gram">gram</option>
                  <option value="Kilogram">Kilogram</option>
                </select>
              </div>

              <div className="col-span-1">
                <label htmlFor={`weight-${index}`} className="text-sm font-medium text-gray-300 mb-2">Product's Weight</label>
                <input
                  type="number"
                  id={`weight-${index}`}
                  value={input.weight}
                  onChange={(e) => handleChange(index, "weight", e.target.value)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 text-gray-300 rounded-md focus:ring-cyan-600 focus:border-cyan-600"
                  placeholder="Enter weight"
                  required
                />
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-center space-x-6">
          <button
            type="button"
            onClick={addNewInput}
            className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-6 py-3"
          >
            Add Another Product
          </button>

          <button
            type="submit"
            className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-6 py-3"
          >
            Get Suggestions
          </button>
        </div>
      </form>

      {bufferSizes.length > 0 && (
        <div className="mt-8 p-6 bg-gray-800 border-t-4 border-cyan-600 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-center text-cyan-400 mb-4">Buffer Size Suggestions</h3>
          <ul className="list-disc list-inside space-y-2">
            {bufferSizes.map((size, index) => (
              <li key={index} className="text-lg">{`Product ${index + 1}: ${size}`}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BufferingCalculation;
