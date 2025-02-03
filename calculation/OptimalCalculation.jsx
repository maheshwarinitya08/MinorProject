import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [productData, setProductData] = useState({
    length: "",
    breadth: "",
    height: "",
    weight: "",
    quantity: "",
  });
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  // Static carton data
  const cartons = [
    { length: 12, breadth: 12, height: 12, max_weight: 50, quantity: 87 },
    { length: 24, breadth: 24, height: 24, max_weight: 100, quantity: 72 },
    { length: 36, breadth: 36, height: 36, max_weight: 200, quantity: 84 },
    { length: 48, breadth: 48, height: 48, max_weight: 300, quantity: 92 },
    { length: 60, breadth: 60, height: 60, max_weight: 400, quantity: 107 },
    { length: 120, breadth: 60, height: 60, max_weight: 500, quantity: 120 },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (value < 0 || isNaN(value)) return; // Prevent negative or invalid values
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      setError(null);

      // Validate input (parse quantity as number for validation)
      if (parseInt(productData.quantity) < 1) {
        setError("Quantity must be at least 1.");
        return;
      }

      const data = {
        product: {
          length: parseFloat(productData.length),
          breadth: parseFloat(productData.breadth),
          height: parseFloat(productData.height),
          weight: parseFloat(productData.weight),
          quantity: parseInt(productData.quantity, 10),
        },
        cartons,
      };

      const response = await axios.post("http://127.0.0.1:5500/api/optimal-packing", data);
      setResults(response.data);
    } catch (err) {
      setError(err.response ? err.response.data.msg : "Error occurred");
    }
  };

  // Convert orientation number to string
  const getOrientation = (orientation) => {
    switch (orientation) {
      case 0:
        return "Front Facing";
      case 1:
        return "Side Facing";
      case 2:
        return "Horizontal Lay Down";
      default:
        return "Front Facing";
    }
  };

  const getCartonSize = (index) => {
    const cartonSizes = [
      "12*12*12 in",
      "24*24*24 in",
      "36*36*36 in",
      "48*48*48 in",
      "60*60*60 in",
      "120*60*60 in",
    ];

    return cartonSizes[index] || "Unknown Size"; // Return the appropriate size or "Unknown Size" if index is invalid
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      {/* Main Card */}
      <div className={`transition-all ease-in-out duration-300 max-w-4xl w-full bg-gray-800 p-6 rounded-lg shadow-lg ${results ? "flex flex-row space-x-6" : ""}`}>
        {/* Input Card */}
        <div className={`w-full ${results ? "w-1/3" : "w-full"} bg-gray-800 p-6 rounded-lg shadow-lg transition-all ease-in-out duration-300`}>
          <h1 className="text-2xl font-bold mb-4 text-center text-blue-400">Optimal Packing</h1>

          {/* Product Input Form */}
          <div className="space-y-4">
            {Object.keys(productData).map((field) => (
              <div key={field}>
                <label className="block font-medium text-gray-300 mb-1 capitalize">
                  {field}
                </label>
                <input
                  type="number"
                  name={field}
                  value={productData[field]}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder={`Enter ${field}`}
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="w-full mt-6 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Calculate
          </button>

          {error && (
            <p className="mt-4 text-red-500 font-medium">Error: {error}</p>
          )}
        </div>

        {/* Results Section */}
        {results && (
          <div className="w-2/3 flex flex-wrap gap-4">
            <h2 className="text-xl font-bold text-blue-400 mb-4 w-full">Results:</h2>
            <div className="grid grid-cols-2 gap-2">
              {results.packing_results.map((result, index) => (
                <div
                  key={index}
                  className="w-full bg-gray-700 p-4 rounded-md text-gray-100 shadow-lg hover:shadow-2xl transition duration-300"
                >
                  <h3 className="text-lg font-semibold text-blue-300 mb-2">
                    Carton {result.carton_index} ({getCartonSize(result.carton_index)})
                  </h3>

                  <p>Total Cartons Used: {result.cartons_used}</p>
                  <p>Fit Breadthwise: {result.fit_breadthwise}</p>
                  <p>Fit Heightwise: {result.fit_heightwise}</p>
                  <p>Fit Lengthwise: {result.fit_lengthwise}</p>
                  <p>Orientation: {getOrientation(result.orientation)}</p>
                  <p>Total Items: {result.total_items}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 w-full">
              <p className="font-medium text-green-400">
                Remaining Quantity: {results.remaining_quantity}
              </p>
              <p className="font-medium text-green-400">
                Success: {results.success ? "Yes" : "No"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
