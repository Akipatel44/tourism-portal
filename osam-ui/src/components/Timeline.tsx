import React from 'react';

export type TimelineEvent = {
  year: string;
  title: string;
  description: string;
};

type TimelineProps = {
  events: TimelineEvent[];
};

export const Timeline: React.FC<TimelineProps> = ({ events }) => {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-forest-600 to-emerald-500" />

      {/* Events */}
      <div className="space-y-12">
        {events.map((event, index) => (
          <div key={index} className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
            {/* Left / Right content */}
            <div className="w-1/2 px-8 flex items-center">
              <div className={`${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                <p className="text-sm font-semibold text-forest-600 uppercase tracking-wide">{event.year}</p>
                <h3 className="mt-2 text-lg md:text-xl font-bold text-monsoon-900">{event.title}</h3>
                <p className="mt-2 text-sm md:text-base text-stone-600 leading-relaxed">{event.description}</p>
              </div>
            </div>

            {/* Center dot */}
            <div className="w-0 flex justify-center">
              <div className="w-4 h-4 rounded-full bg-forest-600 border-4 border-white shadow-md" />
            </div>

            {/* Empty space for alternation */}
            <div className="w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
