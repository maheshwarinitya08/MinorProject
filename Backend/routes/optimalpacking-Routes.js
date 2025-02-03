const express = require('express');
const router = express.Router();

// Product and Carton classes
class Product {
    constructor(length, breadth, height, weight, quantity) {
        this.length = length;
        this.breadth = breadth;
        this.height = height;
        this.weight = weight;
        this.quantity = quantity;
    }
}

class Carton {
    constructor(length, breadth, height, maxWeight) {
        this.length = length;
        this.breadth = breadth;
        this.height = height;
        this.maxWeight = maxWeight;
    }
}

// Function to calculate optimal packing
function calculateOptimalPacking(product, cartons) {
    const cartonUsed = new Array(cartons.length).fill(false);
    let remainingQuantity = product.quantity;
    const packingResults = [];

    while (remainingQuantity > 0) {
        let bestFit = null;

        cartons.forEach((carton, i) => {
            if (cartonUsed[i]) return;

            // Define all 3 orientations for fitting the product
            const orientations = [
                [
                    Math.floor(carton.length / product.length),
                    Math.floor(carton.breadth / product.breadth),
                    Math.floor(carton.height / product.height),
                ],
                [
                    Math.floor(carton.length / product.breadth),
                    Math.floor(carton.breadth / product.height),
                    Math.floor(carton.height / product.length),
                ],
                [
                    Math.floor(carton.length / product.height),
                    Math.floor(carton.breadth / product.length),
                    Math.floor(carton.height / product.breadth),
                ],
            ];

            // Iterate over each orientation and check if the product fits
            orientations.forEach((orientation, orientationIndex) => {
                const [fitL, fitB, fitH] = orientation;
                const itemsFit = fitL * fitB * fitH;

                // Ensure the items fit within the weight limit of the carton
                if (itemsFit > 0 && product.weight * itemsFit <= carton.maxWeight) {
                    const totalItemsFit = Math.min(itemsFit, remainingQuantity);
                    if (!bestFit || totalItemsFit > bestFit.totalItems) {
                        bestFit = {
                            cartonIndex: i,
                            orientation: orientationIndex,
                            fitLengthwise: fitL,
                            fitBreadthwise: fitB,
                            fitHeightwise: fitH,
                            totalItems: totalItemsFit,
                        };
                    }
                }
            });
        });

        // If no suitable carton was found, break out of the loop
        if (!bestFit) {
            console.error("No suitable carton found for the remaining items.");
            break;
        }

        // Mark the carton as used and reduce the remaining quantity
        cartonUsed[bestFit.cartonIndex] = true;
        remainingQuantity -= bestFit.totalItems;
        packingResults.push(bestFit);
    }

    return { packingResults, remainingQuantity };
}

// API endpoint for optimal packing
router.post('/optimal-packing2', (req, res) => {
    try {
        // Extract product and cartons data from request body
        const { product: productData, cartons: cartonsData } = req.body;

        // Validate the presence of required data
        if (!productData || !cartonsData) {
            return res.status(400).json({ success: false, message: "Product or cartons data is missing" });
        }

        // Validate product fields
        const { length, breadth, height, weight, quantity } = productData;
        if (!length || !breadth || !height || !weight || !quantity) {
            return res.status(400).json({ success: false, message: "Invalid product data. Please provide all required fields." });
        }

        // Validate cartons data
        if (!Array.isArray(cartonsData) || cartonsData.length === 0) {
            return res.status(400).json({ success: false, message: "Invalid cartons data. Provide an array of carton details." });
        }

        // Call the function to calculate optimal packing
        const { packingResults, remainingQuantity } = calculateOptimalPacking(productData, cartonsData);

        // Check if packing was successful
        if (remainingQuantity > 0) {
            return res.status(400).json({
                success: false,
                message: `Unable to pack all items. Remaining quantity: ${remainingQuantity}`,
                packingResults,
            });
        }

        // Send successful response
        res.status(200).json({
            success: true,
            message: "Packing calculation successful",
            packingResults,
        });
    } catch (error) {
        console.error("Error in /api/optimal-packing2:", error.message);
        res.status(500).json({
            success: false,
            message: "An error occurred while calculating optimal packing",
        });
    }
});

module.exports = router;
