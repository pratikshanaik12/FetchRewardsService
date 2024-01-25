const pointsCalculator = require('../../services/pointsCalculator');
const { validateReceipt } = require('../../services/receiptValidator');
const { v4: uuidv4, validate: uuidValidate } = require('uuid');

// This is the in-memory database
const receipts = {};

const processReceipt = (req, res) => {

    // Validate input receipt
    const validationErrors = validateReceipt(req.body);
    if (validationErrors.length> 0){
        return res.status(400).json({errors: validationErrors})
    }



    // Generate a unique ID for the new receipt
    const id = uuidv4();
    
    // Calculate points for the receipt
    const points = pointsCalculator(req.body);

    // Store the receipt along with its calculated points
    receipts[id] = {
        receipt: req.body,
        points
    };

    // Respond with the generated ID
    res.status(201).json({ id });
};

const getPoints = (req, res) => {
    const { id } = req.params;

    // Validate that 'id' is a properly formatted UUID
    if (!uuidValidate(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
    }

    // Check if the receipt exists
    if (!receipts[id]) {
        return res.status(404).send('Receipt not found');
    }

    // Respond with the points for the receipt
    res.json({ points: receipts[id].points });
};

module.exports = {
    processReceipt,
    getPoints
};
