import React from 'react';

export type MythologyCardProps = {
  title: string;
  image: string;
  story: string;
  spiritualElement?: string;
  layout?: 'text-right' | 'text-left'; // image on left or right
};

export const MythologyCard: React.FC<MythologyCardProps> = ({
  title,
  image,
  story,
  spiritualElement,
  layout = 'text-right',
}) => {
  const isTextRight = layout === 'text-right';

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${isTextRight ? '' : 'md:[direction:rtl]'}`}>
      {/* Image */}
      <div className="relative">
        <div className="overflow-hidden rounded-lg shadow-lg h-80 md:h-96">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${image}')` }}
            role="img"
            aria-label={title}
          />
        </div>
        {/* Spiritual accent corner */}
        <div className="absolute -bottom-2 -right-2 w-20 h-20 border-2 border-amber-400 rounded-tl-3xl opacity-50" />
      </div>

      {/* Text content */}
      <div className={isTextRight ? '' : 'md:[direction:ltr]'}>
        <div className="space-y-4">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-monsoon-900">{title}</h3>
            {spiritualElement && (
              <p className="mt-2 text-sm font-semibold text-amber-600 uppercase tracking-wide">✦ {spiritualElement}</p>
            )}
          </div>

          <p className="text-base leading-relaxed text-stone-700">{story}</p>

          <div className="pt-4 border-t border-amber-200">
            <p className="text-xs text-stone-500 italic">A tale from the Mahabharata traditions of the Western Ghats.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MythologyCard;
