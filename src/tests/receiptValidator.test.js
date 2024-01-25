const { validateReceipt } = require('../services/receiptValidator');

describe('Receipt Validation', () => {
    test('should fail when the receipt is missing', () => {
        const errors = validateReceipt(undefined);
        expect(errors).toContain('Receipt is required.');
      });

    test('should fail when the retailer name is empty', () => {
        const receipt = {
        retailer: '',
        purchaseDate: '2022-01-01',
        purchaseTime: '13:01',
        total: '10.00',
        items: [{ shortDescription: "Item 1", price: "10.00" }]
        };
        const errors = validateReceipt(receipt);
        expect(errors).toContain('Retailer name is required and must be a string.');
    });

    test('should fail when the retailer name is not a string', () => {
        const receipt = {
        retailer: 123,
        purchaseDate: '2022-01-01',
        purchaseTime: '13:01',
        total: '10.00',
        items: [{ shortDescription: "Item 1", price: "10.00" }]
        };
        const errors = validateReceipt(receipt);
        expect(errors).toContain('Retailer name is required and must be a string.');
    });


    test('should fail when the date is empty', () => {
        const receipt = {
        retailer: 'Target',
        purchaseDate: '',
        purchaseTime: '13:01',
        total: '5.00',
        items: [{ shortDescription: "Item 1", price: "5.00" }]
        };
        const errors = validateReceipt(receipt);
        expect(errors).toContain('Invalid purchase date. Expected format is yyyy-mm-dd and a real date.');
    });

    test('should fail when the date is not in expected format', () => {
        const receipt = {
        retailer: 'Target',
        purchaseDate: '01/01/1020',
        purchaseTime: '13:01',
        total: '5.00',
        items: [{ shortDescription: "Item 1", price: "5.00" }]
        };
        const errors = validateReceipt(receipt);
        expect(errors).toContain('Invalid purchase date. Expected format is yyyy-mm-dd and a real date.');
    });

    test('should fail when the date is not valid', () => {
        const receipt = {
        retailer: 'Target',
        purchaseDate: '2021-02-30',
        purchaseTime: '13:01',
        total: '5.00',
        items: [{ shortDescription: "Item 1", price: "5.00" }]
        };
        const errors = validateReceipt(receipt);
        expect(errors).toContain('Invalid purchase date. Expected format is yyyy-mm-dd and a real date.');
    });

    test('should fail when the time is missing', () => {
        const receipt = {
        retailer: 'Target',
        purchaseDate: '2022-01-01',
        purchaseTime: '',
        total: '5.00',
        items: [{ shortDescription: "Item 1", price: "5.00" }]
        };
        const errors = validateReceipt(receipt);
        expect(errors).toContain('Invalid purchase time format. Expected format is hh:mm.');
    });

    test('should fail when the time is not in correct format', () => {
        const receipt = {
        retailer: 'Target',
        purchaseDate: '2022-01-01',
        purchaseTime: '90:90',
        total: '5.00',
        items: [{ shortDescription: "Item 1", price: "5.00" }]
        };
        const errors = validateReceipt(receipt);
        expect(errors).toContain('Invalid purchase time format. Expected format is hh:mm.');
    });

    

    test('should fail when the total is missing', () => {
        const receipt = {
        retailer: 'Target',
        purchaseDate: '2022-01-01',
        purchaseTime: '10:20',
        total: '',
        items: [{ shortDescription: "Item 1", price: "5.00" }]
        };
        const errors = validateReceipt(receipt);
        expect(errors).toContain('Total must be a numeric value but a string.');
    });

    test('should fail when the total is not in string format', () => {
        const receipt = {
        retailer: 'Target',
        purchaseDate: '2022-01-01',
        purchaseTime: '10:20',
        total: 70,
        items: [{ shortDescription: "Item 1", price: "5.00" }]
        };
        const errors = validateReceipt(receipt);
        expect(errors).toContain('Total must be a numeric value but a string.');
    });

    

    test('should fail when items are missing', () => {
        const receipt = {
        retailer: 'Target',
        purchaseDate: '2022-01-01',
        purchaseTime: '10:20',
        total: '5.00',
        items: []
        };
        const errors = validateReceipt(receipt);
        expect(errors).toContain('Items array is required and cannot be empty.');
    });

    test('should fail when an item short description is empty', () => {
        const receipt = {
            retailer: 'Target',
            purchaseDate: '2022-01-01',
            purchaseTime: '10:20',
            total: '1.00',
          items: [
            { shortDescription: '', price: '1.00' }
          ]
        };
        const errors = validateReceipt(receipt);
        expect(errors).toContain('Item 1 short description is required and must be a string.');
      });
    
      test('should fail when an item price is not numeric', () => {
        const receipt = {
            retailer: 'Target',
            purchaseDate: '2022-01-01',
            purchaseTime: '10:20',
            total: '1.00',
          items: [
            { shortDescription: 'Apple', price: 'not-a-number' }
          ]
        };
        const errors = validateReceipt(receipt);
        expect(errors).toContain('Item 1 price must be a numeric value.');
      });

      test('should fail when the sum of item prices does not match the total', () => {
        const receipt = {
            retailer: 'Target',
            purchaseDate: '2022-01-01',
            purchaseTime: '10:20',
            total: '1.00',
            items: [
                { shortDescription: 'Apple', price: '1.50' },
                { shortDescription: 'Banana', price: '1.50' }
            ],
        };
        const errors = validateReceipt(receipt);
        expect(errors).toContain(`The total from items (3.00) does not match the provided total (1.00).`);
      });


      test('should pass validation with no errors for a valid receipt', () => {
        const receipt = {
          retailer: "M&M Corner Market",
          purchaseDate: "2022-03-20",
          purchaseTime: "14:33",
          items: [
            {
              shortDescription: "Gatorade",
              price: "2.25"
            },
            {
              shortDescription: "Gatorade",
              price: "2.25"
            },
            {
              shortDescription: "Gatorade",
              price: "2.25"
            },
            {
              shortDescription: "Gatorade",
              price: "2.25"
            }
          ],
          total: "9.00"
        };
    
        const errors = validateReceipt(receipt);
        expect(errors).toEqual([]);
      });

});

