import React from 'react';

export type LocalProductCardProps = {
  name: string;
  emoji: string;
  image: string;
  description: string;
  season?: string;
  uses?: string[];
};

export const LocalProductCard: React.FC<LocalProductCardProps> = ({
  name,
  emoji,
  image,
  description,
  season,
  uses,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      {/* Image */}
      <div className="h-48 sm:h-56 bg-gray-100 overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center hover:scale-110 transition-transform duration-300"
          style={{ backgroundImage: `url('${image}')` }}
          role="img"
          aria-label={`${name}`}
        />
      </div>

      {/* Content */}
      <div className="p-5 md:p-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{emoji}</span>
          <h3 className="text-xl font-bold text-monsoon-900">{name}</h3>
        </div>

        {season && <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-3">🍂 {season}</p>}

        <p className="text-sm leading-relaxed text-stone-700 mb-4">{description}</p>

        {uses && uses.length > 0 && (
          <div className="pt-4 border-t border-sage-200">
            <p className="text-xs font-semibold text-stone-600 mb-2">Traditional uses:</p>
            <ul className="space-y-1">
              {uses.map((use, idx) => (
                <li key={idx} className="text-xs text-stone-600">
                  • {use}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocalProductCard;
