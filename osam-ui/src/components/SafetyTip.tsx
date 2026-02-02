import React from 'react';

export type SafetyTipProps = {
  icon: string;
  title: string;
  description: string;
};

export const SafetyTip: React.FC<SafetyTipProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-gradient-to-br from-emerald-50 to-forest-50 rounded-lg p-6 border-l-4 border-forest-600 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <span className="text-3xl shrink-0">{icon}</span>
        <div>
          <h3 className="text-lg font-bold text-monsoon-900">{title}</h3>
          <p className="mt-2 text-sm text-stone-700">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default SafetyTip;
