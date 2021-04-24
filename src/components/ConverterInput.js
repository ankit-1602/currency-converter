function ConverterInput(props) {
    const {
      curreniesOptions,
      currencyChange,
      selectedCurrency,
      amountChange,
      amount
    } = props;
    return (
      <>
        <input
          className="input"
          type="text"
          value={amount}
          onChange={amountChange}
        />
        <select value={selectedCurrency} onChange={currencyChange}>
          {curreniesOptions.map((curr) => {
            const { id, currency } = curr;
            return (
              <option key={id} value={currency}>
                {currency}
              </option>
            );
          })}
        </select>
      </>
    );
  }
  
  export default ConverterInput;
  