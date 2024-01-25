function calculatePoints(receipt) {
    let points = 0;

    // 1 point for every alphanumeric character in the retailer name.
    points += (receipt.retailer.match(/[a-z0-9]/gi) || []).length;

    // 50 points if the total is a round dollar amount with no cents.
    if (Number.isInteger(parseFloat(receipt.total))) {
        points += 50;
    }

    // 25 points if the total is a multiple of 0.25.
    if (parseFloat(receipt.total) % 0.25 === 0) {
        points += 25;
    }


    // 5 points for every two items on the receipt.
    points += Math.floor(receipt.items.length / 2) * 5;

    // Points for item description lengths and prices.
    receipt.items.forEach(item => {
        if (item.shortDescription.trim().length % 3 === 0) {
            points += Math.ceil(parseFloat(item.price) * 0.2);
        }
    });


    // 6 points if the day in the purchase date is odd.
    const purchaseDate = new Date(receipt.purchaseDate);
    if (purchaseDate.getUTCDate() % 2 !== 0) {
        points += 6;
    }


    // 10 points if the time of purchase is after 2:00pm and before 4:00pm.
    const purchaseTime = receipt.purchaseTime.split(':');
    const purchaseHour = parseInt(purchaseTime[0], 10);
    if (purchaseHour >= 14 && purchaseHour < 16) {
        points += 10;
    }

    // return the points
    return points;
}



  

module.exports = calculatePoints;


