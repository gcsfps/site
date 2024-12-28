import React from 'react';

type PlanIconProps = {
  plan: 'Ultimate' | 'Premium' | 'Basic';
  size?: 'sm' | 'md' | 'lg';
};

export default function PlanIcon({ plan, size = 'md' }: PlanIconProps) {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
  };

  const planColors = {
    Ultimate: 'from-purple-600 to-pink-600',
    Premium: 'from-blue-600 to-cyan-600',
    Basic: 'from-gray-600 to-gray-400',
  };

  return (
    <div
      className={`
        ${sizeClasses[size]}
        rounded-full
        bg-gradient-to-r ${planColors[plan]}
        flex items-center justify-center
        text-white font-bold
        shadow-lg
      `}
    >
      {plan[0]}
    </div>
  );
}
