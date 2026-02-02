import React from 'react';

export type InfoCardProps = {
  icon: string;
  title: string;
  items: string[];
};

export const InfoCard: React.FC<InfoCardProps> = ({ icon, title, items }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-forest-600">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{icon}</span>
        <h3 className="text-xl font-bold text-monsoon-900">{title}</h3>
      </div>
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3 text-stone-700">
            <span className="text-forest-600 font-bold mt-0.5">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfoCard;
