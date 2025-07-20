// components/SearchInput/SearchInput.jsx
const SearchInput = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || "Search..."}
      className="input input-bordered w-full max-w-xs mb-4"
    />
  );
};

export default SearchInput;
