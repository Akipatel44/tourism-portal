import React from 'react';

export type TrekStat = {
  icon: string;
  label: string;
  value: string;
  color: 'forest' | 'emerald' | 'amber' | 'sky';
};

type TrekStatsCardProps = {
  title: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Extreme';
  stats: TrekStat[];
  description: string;
};

const difficultyColors = {
  Easy: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  Moderate: 'bg-amber-100 text-amber-800 border-amber-300',
  Hard: 'bg-orange-100 text-orange-800 border-orange-300',
  Extreme: 'bg-red-100 text-red-800 border-red-300',
};

const difficultyEmoji = {
  Easy: '🟢',
  Moderate: '🟡',
  Hard: '🟠',
  Extreme: '🔴',
};

export const TrekStatsCard: React.FC<TrekStatsCardProps> = ({ title, difficulty, stats, description }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-stone-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl md:text-4xl font-bold text-monsoon-900">{title}</h2>
        <span className={`px-4 py-2 rounded-full font-bold border-2 ${difficultyColors[difficulty]}`}>
          {difficultyEmoji[difficulty]} {difficulty}
        </span>
      </div>

      <p className="text-lg text-stone-700 mb-8">{description}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="text-center">
            <p className="text-4xl mb-2">{stat.icon}</p>
            <p className="text-sm font-semibold text-stone-600">{stat.label}</p>
            <p className="text-2xl font-bold text-monsoon-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrekStatsCard;
