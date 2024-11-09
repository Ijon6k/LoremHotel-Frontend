const FormInput = ({
  label,
  type,
  name,
  value,
  onChange,
  required,
  min,
  customInput,
}) => (
  <div className="mb-3">
    <label className="block text-sm font-semibold text-[#003161]">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      min={min}
      className={`${customInput} rounded-2xl border border-[#4A647E] bg-[#F0F4F7] px-3 py-2 text-sm text-[#003161] shadow-sm transition duration-150 ease-in-out focus:border-[#003161] focus:outline-none focus:ring-2 focus:ring-[#003161]`}
    />
  </div>
);

export default FormInput;
