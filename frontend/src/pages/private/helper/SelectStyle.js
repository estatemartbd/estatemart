const SelectStyles  = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'black' : 'blue',
    backgroundColor: state.isSelected ? '#ffc107' : '#fff',
    padding: 20,
  }),
  container: base => ({
    ...base,
    flex: 1,
    width: '250px',
  }),
  control: base => ({
    ...base,
    minHeight: '50px',
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    // const transition = 'opacity 300ms';

    return { ...provided, opacity };
  },
};

export default SelectStyles;