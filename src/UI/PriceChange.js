const PriceChange = ({ price }) => {
  let priceChange = price
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, '.');
  return priceChange;
};

export default PriceChange;
