import React from "react";

export interface TimelineDetail {
  title: string;
  description: string;
  icon?: string;
}

export interface TimelineCardProps {
  time: string;
  title: string;
  description: string;
  icon?: string;
  details?: TimelineDetail[];
}

export const TimelineCard: React.FC<TimelineCardProps> = ({
  time,
  title,
  description,
  icon,
  details = [],
}) => {
  return (
    <div className="relative border-l-2 border-gray-300 pl-6">
      <div className="absolute -left-3 top-0 flex size-6 items-center justify-center rounded-full bg-primary text-white">
        {icon || "✅"}
      </div>
      <div>
        <h3 className="text-xl font-bold">
          {title} <span className="text-sm text-gray-500">- {time}</span>
        </h3>
        <p className="mt-1 text-gray-700">{description}</p>
      </div>
      {details.length > 0 && (
        <div className="mt-4 space-y-2">
          {details.map((detail, index) => (
            <div key={index} className="flex items-start">
              {detail.icon && (
                <div className="mr-2 flex size-5 items-center justify-center">
                  <span>{detail.icon}</span>
                </div>
              )}
              <div>
                <h4 className="text-lg font-semibold">{detail.title}</h4>
                <p className="text-gray-600">{detail.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
