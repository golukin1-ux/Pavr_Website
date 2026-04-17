const colorMap = {
  'battery-components':     'bg-amber-50 text-amber-700 ring-amber-200',
  'injection-molded-parts': 'bg-blue-50 text-blue-700 ring-blue-200',
  'molds-and-tooling':      'bg-orange-50 text-orange-700 ring-orange-200',
  'precision-components':   'bg-violet-50 text-violet-700 ring-violet-200',
  'injection-molding':      'bg-blue-50 text-blue-700 ring-blue-200',
  'battery-tech':           'bg-amber-50 text-amber-700 ring-amber-200',
  'manufacturing':          'bg-emerald-50 text-emerald-700 ring-emerald-200',
  'industry-news':          'bg-stone-100 text-stone-600 ring-stone-200',
  'company-news':           'bg-copper-50 text-copper-700 ring-copper-200',
  default:                  'bg-stone-100 text-stone-600 ring-stone-200',
};

const labelMap = {
  'battery-components':     'Battery Components',
  'injection-molded-parts': 'Injection Molded Parts',
  'molds-and-tooling':      'Molds & Tooling',
  'precision-components':   'Precision Components',
  'injection-molding':      'Injection Molding',
  'battery-tech':           'Battery Tech',
  'manufacturing':          'Manufacturing',
  'industry-news':          'Industry News',
  'company-news':           'Company News',
};

export default function Badge({ category }) {
  const color = colorMap[category] || colorMap.default;
  const label = labelMap[category] || category;
  return (
    <span className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-mono font-medium uppercase tracking-wider ring-1 ${color}`}>
      {label}
    </span>
  );
}
