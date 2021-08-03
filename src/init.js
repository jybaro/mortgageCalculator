import {getData, calculateMortgage, displayMortgage} from './businessRules';
import { dragbar } from './dragbar';

/**
 * Initialize the webapp.
 */
export const init = (root) => {
    const inputs = root.getElementsByTagName('input');
    const dds = root.getElementsByTagName('dd');
    const form = root.getElementsByTagName('form')[0];

    [...inputs].forEach((input) => {
        input.addEventListener('invalid', () => {
            form.classList.add('invalid');
        });
        input.addEventListener('input', () => {
            root.getElementById('result').classList.remove('show');
            [...dds].forEach(dd => {
                dd.classList.add('empty');
                dd.getElementsByTagName('span')[0].innerText = '- -';
            });
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;
        [...inputs].forEach((input) => {
            valid = valid && input.validity.valid;
        });
        if (valid) {
            form.classList.remove('invalid');

            const data = getData(root);
            const result = calculateMortgage(data);
            displayMortgage(result, root);
        }
    });
    dragbar(root.getElementById('yearsOfMortgage').parentNode, root);
    dragbar(root.getElementById('interestRate').parentNode, root);
};