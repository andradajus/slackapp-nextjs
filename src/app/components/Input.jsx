const Input = ({ label, type, list, id, value, onChange }) => {
  return (
    <>
      <label>{label}</label>

      <input
        title={label}
        type={type}
        list={list}
        id={id}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default Input;
