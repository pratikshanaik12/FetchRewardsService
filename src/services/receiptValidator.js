// Helper function to check numeric value
function isNumeric(value) {
    return /^-?\d+(\.\d+)?$/.test(value);
}

// Helper function to validate the date
function isValidDate(dateString) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        return false; // Does not match format yyyy-mm-dd
    }

    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day); // month is 0-indexed in JavaScript Date
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

// Main validation function
const validateReceipt = (receipt) => {

    console.log('Validating receipt:', receipt);

    // Array to push in errors
    const errors = [];
    let itemsTotal = 0.0;

    if (!receipt) {
        errors.push('Receipt is required.');
        return errors;
    }


    if (typeof receipt.retailer !== 'string' || receipt.retailer.trim() === '') {
        errors.push('Retailer name is required and must be a string.');
    }

    if (typeof receipt.purchaseDate !== 'string' || !isValidDate(receipt.purchaseDate)) {
        errors.push('Invalid purchase date. Expected format is yyyy-mm-dd and a real date.');
    }

    if (typeof receipt.purchaseTime !== 'string' || !receipt.purchaseTime.match(/^([01]\d|2[0-3]):([0-5]\d)$/)) {
        errors.push('Invalid purchase time format. Expected format is hh:mm.');
    }

    if (typeof receipt.total!== 'string' || !isNumeric(receipt.total)) {
        errors.push('Total must be a numeric value but a string.');
    }

    if (!Array.isArray(receipt.items) || receipt.items.length === 0) {
        errors.push('Items array is required and cannot be empty.');
    } else {
        receipt.items.forEach((item, index) => {
            if (typeof item.shortDescription !== 'string' || item.shortDescription.trim() === '') {
                errors.push(`Item ${index + 1} short description is required and must be a string.`);
            }
            if (!isNumeric(item.price)) {
                errors.push(`Item ${index + 1} price must be a numeric value.`);
            } else {
                itemsTotal += parseFloat(item.price); 
            }
        });

        // After calculating the items total, compare it to the provided total
        const totalFromReceipt = parseFloat(receipt.total);
        if (!isNumeric(receipt.total) || isNaN(totalFromReceipt)) {
            errors.push('Total must be a numeric value.');
        } else if (Math.abs(totalFromReceipt - itemsTotal) >= 0.01) { 
            errors.push(`The total from items (${itemsTotal.toFixed(2)}) does not match the provided total (${receipt.total}).`);
        }
    }
    
    console.log(errors)
    return errors;

   
};

module.exports = {
    validateReceipt,
};
