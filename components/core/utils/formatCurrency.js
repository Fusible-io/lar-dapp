// formatCurrrency function
// @parameter {number} amount
// @parameter {string} currencyAddress

// find out the currency unit and decimal shift from the currency address
// use ethers.js to format the amount
// return the formatted amount

import { ethers } from 'ethers';
import { ERC20_MAP } from '../constant/nftFiConfig'


export function getUnit(currencyAddress) {
    const currency = ERC20_MAP[currencyAddress];
    console.log({
        currency
    })
    if (currency) {
        return currency.unit;
    }
}

export function formatCurrency(amount, currencyAddress) {
    const unit = getUnit(currencyAddress);
    const formattedAmount = ethers.utils.formatUnits(amount, unit);
    return formattedAmount;
}


