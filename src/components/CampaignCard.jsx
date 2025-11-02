import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { copyToClipboard } from '../utils/exportUtils';

const SWIPE_THRESHOLD = 100;

export default function CampaignCard({ campaign, onSwipe, onTap, index, total }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (event, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (Math.abs(offset) > SWIPE_THRESHOLD || Math.abs(velocity) > 500) {
      onSwipe(offset > 0 ? 'right' : 'left');
    } else {
      // Reset position if not swiped far enough
      x.set(0);
    }
  };

  const handleCopy = async () => {
    const success = await copyToClipboard(campaign);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isExpanded) {
    return (
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        style={{ x, rotate, opacity }}
        onClick={() => {
          setIsExpanded(true);
          onTap();
        }}
        className="absolute w-full max-w-md mx-auto cursor-pointer"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        whileDrag={{ cursor: 'grabbing' }}
      >
        <div className="bg-white rounded-lg p-8 md:p-10 shadow-2xl">
          {/* Hook - Main focus, serif font */}
          <div className="mb-8">
            <p className="text-black serif text-2xl md:text-3xl leading-tight text-center">
              {campaign.hook}
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200 mb-6"></div>

          {/* Type and Objective */}
          <div className="mb-6 text-center">
            <p className="text-sm text-gray-600 uppercase tracking-wider mb-2">
              {campaign.type}
            </p>
            <p className="text-base text-gray-800 serif">
              {campaign.objective}
            </p>
          </div>

          {/* Channels */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {campaign.channels.map((channel, i) => (
                <span
                  key={i}
                  className="px-4 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700"
                >
                  {channel}
                </span>
              ))}
            </div>
          </div>

          {/* KPIs */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {campaign.kpis.map((kpi, i) => (
                <span
                  key={i}
                  className="px-4 py-1.5 bg-white/10 rounded-full text-sm text-white border border-white/20"
                >
                  {kpi}
                </span>
              ))}
            </div>
          </div>

          {/* Tap hint */}
          <p className="text-xs text-gray-500 text-center mt-6">Tap to expand</p>
        </div>
      </motion.div>
    );
  }

  // Expanded view
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="fixed inset-0 bg-black z-50 overflow-y-auto p-4"
    >
      <div className="max-w-2xl mx-auto mt-8">
        <button
          onClick={() => setIsExpanded(false)}
          className="mb-6 text-white/70 hover:text-white transition-colors"
        >
          ← Back
        </button>

        <div className="bg-white rounded-lg p-6 md:p-8 shadow-2xl">
          {/* Hook */}
          <div className="mb-6">
            <p className="text-black serif text-2xl md:text-3xl leading-tight">
              {campaign.hook}
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200 mb-6"></div>

          {/* Type and Objective */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 uppercase tracking-wider mb-2">
              {campaign.type}
            </p>
            <p className="text-base text-gray-800 serif mb-4">
              {campaign.objective}
            </p>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed serif text-lg">
              {campaign.description}
            </p>
          </div>

          {/* Channels */}
          <div className="mb-6">
            <h3 className="text-sm text-gray-600 uppercase tracking-wide mb-3">Channels</h3>
            <div className="flex flex-wrap gap-2">
              {campaign.channels.map((channel, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700"
                >
                  {channel}
                </span>
              ))}
            </div>
          </div>

          {/* KPIs */}
          <div className="mb-8">
            <h3 className="text-sm text-gray-600 uppercase tracking-wide mb-3">Target KPIs</h3>
            <div className="flex flex-wrap gap-2">
              {campaign.kpis.map((kpi, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-white/10 rounded-lg text-white border border-white/20"
                >
                  {kpi}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleCopy}
              className="w-full px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors"
            >
              {copied ? '✓ Copied!' : 'Copy to Clipboard'}
            </button>
            <button
              onClick={() => {
                const meetingUrl = import.meta.env.VITE_MEETING_URL || 'https://meetings.hubspot.com/stanislas-berteloot';
                window.open(meetingUrl, '_blank');
              }}
              className="w-full px-6 py-3 bg-white hover:bg-white/90 text-black rounded-lg transition-colors font-medium"
            >
              📅 Schedule a Meeting to Discuss My Marketing Needs
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

