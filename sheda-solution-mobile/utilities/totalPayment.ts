import { formatPrice } from "./formatPrice";

// const totalPaymemt = ({pay,  additionPay} : TOTALPRICE): number => {
// const totalPaymemt = (pay: string = '0', additionPay: string | null = null): number => {

//     if (additionPay !== null)
//         return (
//             parseInt(pay, 10) + parseInt(additionPay, 10)
//         )

//     return parseInt(pay);
//     }
//     export default totalPaymemt;

const totalPayment = (pay: string = "0", additionPay: string | null = null): string => {
  // Clean the strings by removing non-numeric characters (e.g., ₦, commas)
  const cleanPay = pay.replace(/[^0-9.-]+/g, "");
  const cleanAdditionPay = additionPay ? additionPay.replace(/[^0-9.-]+/g, "") : "0";

  // Convert to numbers using parseFloat to handle decimals
  const payNumber = parseFloat(cleanPay) || 0; // Fallback to 0 if NaN
  const additionPayNumber = parseFloat(cleanAdditionPay) || 0; // Fallback to 0 if NaN

  // Calculate total
  const totalPay = additionPay !== null ? payNumber + additionPayNumber : payNumber;

  // Format the result in shorthand notation
  return formatPrice(totalPay);
};

export default totalPayment;