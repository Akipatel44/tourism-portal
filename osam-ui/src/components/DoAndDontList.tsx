import React from 'react';

export type DoAndDontItem = {
  text: string;
  category: 'do' | 'dont';
};

type DoAndDontListProps = {
  title: string;
  items: DoAndDontItem[];
};

export const DoAndDontList: React.FC<DoAndDontListProps> = ({ title, items }) => {
  const dos = items.filter((item) => item.category === 'do');
  const donts = items.filter((item) => item.category === 'dont');

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-monsoon-900">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Do's */}
        <div className="bg-emerald-50 rounded-lg p-6 border-l-4 border-emerald-600">
          <h3 className="text-2xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
            <span className="text-2xl">✅</span> Do's
          </h3>
          <ul className="space-y-3">
            {dos.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-emerald-600 font-bold text-lg mt-0.5">✓</span>
                <span className="text-stone-700">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Don'ts */}
        <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-600">
          <h3 className="text-2xl font-bold text-red-900 mb-6 flex items-center gap-2">
            <span className="text-2xl">⛔</span> Don'ts
          </h3>
          <ul className="space-y-3">
            {donts.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-red-600 font-bold text-lg mt-0.5">✕</span>
                <span className="text-stone-700">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DoAndDontList;
