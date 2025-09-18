import React from 'react';
import VisitingCard, { VisitingCardProps } from './VisitingCard';

interface VisitingCardGridProps {
  cards: VisitingCardProps[];
  title?: string;
  subTitle?: string;
}

const VisitingCardGrid: React.FC<VisitingCardGridProps> = ({
  cards,
  title = 'Professional Contacts',
  subTitle = 'Welcome our speed up'
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {title && (
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-text-title mb-4">{title}</h1>
          <p className="text-lg text-text-subtitle max-w-2xl mx-auto text-slate-500">{subTitle}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
        {cards.map((card, index) => (
          <div key={index}>
            <VisitingCard {...card} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisitingCardGrid;
