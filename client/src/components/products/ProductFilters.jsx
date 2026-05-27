const categories = [
  { value: '',                        label: 'All Products' },
  { value: 'battery-components',      label: 'Battery Components' },
  { value: 'injection-molded-parts',  label: 'Injection Moulded Parts' },
  { value: 'molds-and-tooling',       label: 'Moulds & Tooling' },
  { value: 'precision-components',    label: 'Precision Components' },
];

export default function ProductFilters({ active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`px-4 min-h-[44px] inline-flex items-center rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
            active === value
              ? 'bg-copper-500 text-white'
              : 'bg-white text-stone-500 hover:text-stone-700 hover:bg-stone-50 border border-stone-200'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
