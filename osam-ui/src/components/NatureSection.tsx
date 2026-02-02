import React from 'react';

export type NatureSectionProps = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  layout?: 'image-left' | 'image-right';
  highlights?: string[];
};

export const NatureSection: React.FC<NatureSectionProps> = ({
  title,
  description,
  image,
  imageAlt,
  layout = 'image-left',
  highlights,
}) => {
  const imageOnLeft = layout === 'image-left';

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center ${!imageOnLeft ? 'md:[direction:rtl]' : ''}`}>
      {/* Image */}
      <div className="relative">
        <div className="overflow-hidden rounded-xl shadow-lg h-72 sm:h-80 md:h-96">
          <div
            className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-500"
            style={{ backgroundImage: `url('${image}')` }}
            role="img"
            aria-label={imageAlt}
          />
        </div>
        {/* Soft accent */}
        <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-sage-200 rounded-full opacity-40 blur-xl" />
      </div>

      {/* Text content */}
      <div className={!imageOnLeft ? 'md:[direction:ltr]' : ''}>
        <h2 className="text-3xl md:text-4xl font-bold text-monsoon-900">{title}</h2>
        <p className="mt-4 text-base leading-relaxed text-stone-700">{description}</p>

        {highlights && highlights.length > 0 && (
          <ul className="mt-6 space-y-2">
            {highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-emerald-600 font-bold text-lg mt-0.5">🌿</span>
                <span className="text-stone-700">{highlight}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NatureSection;
