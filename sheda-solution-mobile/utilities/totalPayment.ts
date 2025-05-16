// const totalPaymemt = ({pay,  additionPay} : TOTALPRICE): number => {
const totalPaymemt = (pay: string = '0', additionPay: string | null = null): number => {

    if (additionPay !== null)
        return (
            parseInt(pay, 10) + parseInt(additionPay, 10)
        )

    return parseInt(pay);
    }
    export default totalPaymemt;
