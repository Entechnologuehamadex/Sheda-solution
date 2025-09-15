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

const totalPayment = (
  pay: string | number = "0",
  additionPay: string | number | null = null
): string => {
  // Convert to string and clean by removing non-numeric characters (e.g., ₦, commas)
  const payString = String(pay || "0");
  const additionPayString = additionPay ? String(additionPay) : "0";

  const cleanPay = payString.replace(/[^0-9.-]+/g, "");
  const cleanAdditionPay = additionPayString.replace(/[^0-9.-]+/g, "");

  // Convert to numbers using parseFloat to handle decimals
  const payNumber = parseFloat(cleanPay) || 0; // Fallback to 0 if NaN
  const additionPayNumber = parseFloat(cleanAdditionPay) || 0; // Fallback to 0 if NaN

  // Calculate total
  const totalPay =
    additionPay !== null ? payNumber + additionPayNumber : payNumber;

  // Format the result in shorthand notation
  return formatPrice(totalPay);
};

export default totalPayment;
