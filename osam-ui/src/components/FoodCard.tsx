import React from 'react';

export type FoodCardProps = {
  name: string;
  emoji: string;
  description: string;
  ingredients?: string;
};

export const FoodCard: React.FC<FoodCardProps> = ({ name, emoji, description, ingredients }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-b-4 border-amber-400 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4 mb-3">
        <span className="text-4xl">{emoji}</span>
        <h3 className="text-xl font-bold text-monsoon-900">{name}</h3>
      </div>
      <p className="text-stone-700 mb-3">{description}</p>
      {ingredients && <p className="text-sm text-stone-600 italic">Ingredients: {ingredients}</p>}
    </div>
  );
};

export default FoodCard;
