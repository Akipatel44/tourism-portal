import React from 'react';

type HighlightCardProps = {
  title: string;
  description: string;
  href?: string;
  emoji?: string;
};

export const HighlightCard: React.FC<HighlightCardProps> = ({ title, description, href = '#', emoji }) => {
  return (
    <a href={href} className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-12 h-12 rounded-md bg-forest-600 text-white flex items-center justify-center text-xl font-bold">{emoji || '✦'}</div>
        <div>
          <h3 className="text-lg font-semibold text-monsoon-900">{title}</h3>
          <p className="mt-2 text-sm text-stone-600">{description}</p>
        </div>
      </div>
    </a>
  );
};

export default HighlightCard;
