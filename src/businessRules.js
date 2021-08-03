/**
 * @typedef {Object} Data
 * @property  {number} yearsOfMortgage - The years of mortgage. 
 * @property  {number} interestRate - The interest rate. 
 * @property  {number} loanAmount - The loan amount. 
 * @property  {number} annualTax - The annual tax. 
 * @property  {number} annualInsurance - The annual insurance. 
 */

/**
 * @typedef {Object} Result
 * @property  {number} principleAndInterests - The principal and interests.
 * @property  {number} tax - Tax. 
 * @property  {number} insurance - Insurance. 
 * @property  {number} monthlyPayment - Monthly payment. 
 */

/**
 * @function getData
 * @description Extract the data from the interface that will be used in mortgage logic.
 * @returns {Data} Data
 */
export const getData = (root) => {
    const yearsOfMortgage = root.getElementById('yearsOfMortgage').value;
    const interestRate = root.getElementById('interestRate').value;
    const loanAmount = root.getElementById('loanAmount').value;
    const annualTax = root.getElementById('annualTax').value;
    const annualInsurance = root.getElementById('annualInsurance').value;

    return {
        yearsOfMortgage,
        interestRate,
        loanAmount,
        annualTax,
        annualInsurance
    };
};

/**
 * @function calculateMortgage
 * @description Execute the mortgage calculations
 * @param {Data} data - The mortgage data. 
 * @returns {Result} result - The calculations result.
 */
export const calculateMortgage = ({
    yearsOfMortgage,
    interestRate,
    loanAmount,
    annualTax,
    annualInsurance
}) => {

    const principleAndInterests = ((interestRate / 100) / 12) * loanAmount / (1 - Math.pow((1 + ((interestRate / 100) / 12)), -yearsOfMortgage * 12));
    const tax = annualTax / 12;
    const insurance = annualInsurance / 12;
    const monthlyPayment = principleAndInterests + tax + insurance;

    return {
        principleAndInterests,
        tax,
        insurance,
        monthlyPayment
    };
};

/**
 * @function displayMortgage
 * @description  Display the calculated data into the interface. 
 * @param {Result} result 
 */
export const displayMortgage = ({
    principleAndInterests,
    tax,
    insurance,
    monthlyPayment
}, root) => {

    const setResultValue = (id, value) => {
        const node = root.getElementById(id);
        node.innerText = value.toFixed(2);
        node.parentNode.classList.remove('empty');
    };

    setResultValue('principleAndInterests', principleAndInterests);
    setResultValue('tax', tax);
    setResultValue('insurance', insurance);
    setResultValue('monthlyPayment', monthlyPayment);

    root.getElementById('result').classList.add('show');
};