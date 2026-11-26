import React from 'react';
import { User, Heart, ThumbsUp, Smile } from 'lucide-react';
import { backgroundTextures } from '../../data/imageConfig';

export const StatsCounterSection = () => {
  const stats = [
    {
      icon: User,
      number: "10,000+",
      label: "Happy Clients"
    },
    {
      icon: Heart,
      number: "1,500+",
      label: "Joint Replacements"
    },
    {
      icon: ThumbsUp,
      number: "12+",
      label: "Years Of Experience"
    },
    {
      icon: Smile,
      number: "98%",
      label: "Well Smiley Faces"
    }
  ];

  return (
    <section className="bg-[#8c79b2] text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Hospital Facility Overlay with soft purple blend */}
      <img
        src={backgroundTextures.statsCounter}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay pointer-events-none select-none"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#8c79b2]/95 via-[#8c79b2]/85 to-[#8c79b2]/95 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="flex flex-col items-center justify-center space-y-2">
                <div className="w-10 h-10 flex items-center justify-center text-white/90 mb-1">
                  <Icon className="w-8 h-8" />
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm font-light text-white/90">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
