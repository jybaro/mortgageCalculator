import { calculateMortgage } from './../businessRules';

describe('Business rules tests', () => {
    test('Must calculate the correct mortgage', () => {
        const result = calculateMortgage({
            yearsOfMortgage: 20,
            interestRate: 5,
            loanAmount: 100000,
            annualTax: 12000,
            annualInsurance: 6000
        });
        expect(result).toEqual({
            principleAndInterests: 659.9557392166587,
            tax: 1000,
            insurance: 500,
            monthlyPayment: 2159.955739216659
        });
    });
});