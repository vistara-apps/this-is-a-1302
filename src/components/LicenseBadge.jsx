import React from 'react';
import { Shield, DollarSign, Mail } from 'lucide-react';

const LicenseBadge = ({ licenseType, cleared }) => {
  const getBadgeConfig = () => {
    switch (licenseType) {
      case 'royalty-free':
        return {
          icon: Shield,
          text: 'Royalty Free',
          bgColor: 'bg-green-500/20',
          textColor: 'text-green-400',
          borderColor: 'border-green-500/30'
        };
      case 'paid':
        return {
          icon: DollarSign,
          text: 'Paid License',
          bgColor: 'bg-blue-500/20',
          textColor: 'text-blue-400',
          borderColor: 'border-blue-500/30'
        };
      case 'contact-required':
        return {
          icon: Mail,
          text: 'Contact Required',
          bgColor: 'bg-orange-500/20',
          textColor: 'text-orange-400',
          borderColor: 'border-orange-500/30'
        };
      default:
        return {
          icon: Shield,
          text: 'Unknown',
          bgColor: 'bg-gray-500/20',
          textColor: 'text-gray-400',
          borderColor: 'border-gray-500/30'
        };
    }
  };

  const { icon: Icon, text, bgColor, textColor, borderColor } = getBadgeConfig();

  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-sm border ${bgColor} ${borderColor}`}>
      <Icon className={`w-3 h-3 ${textColor}`} />
      <span className={`text-xs font-medium ${textColor}`}>{text}</span>
      {!cleared && (
        <span className="w-1.5 h-1.5 bg-red-500 rounded-full ml-1" title="Clearance needed" />
      )}
    </div>
  );
};

export default LicenseBadge;