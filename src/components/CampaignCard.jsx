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
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl border border-white/20">
          {/* Hook - Main focus, serif font */}
          <div className="mb-10">
            <p className="text-black serif text-3xl md:text-4xl leading-tight text-center font-semibold">
              {campaign.hook}
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-8"></div>

          {/* Type and Objective */}
          <div className="mb-8 text-center">
            <p className="text-xs text-gray-500 uppercase tracking-[0.2em] mb-3 font-medium">
              {campaign.type}
            </p>
            <p className="text-lg text-gray-700 font-light leading-relaxed">
              {campaign.objective}
            </p>
          </div>

          {/* Channels */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2.5 justify-center">
              {campaign.channels.map((channel, i) => (
                <span
                  key={i}
                  className="px-5 py-2 bg-gray-50 rounded-full text-sm text-gray-700 font-medium border border-gray-100"
                >
                  {channel}
                </span>
              ))}
            </div>
          </div>

          {/* KPIs */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2.5 justify-center">
              {campaign.kpis.map((kpi, i) => (
                <span
                  key={i}
                  className="px-5 py-2 bg-black/5 rounded-full text-sm text-gray-800 font-medium border border-black/10"
                >
                  {kpi}
                </span>
              ))}
            </div>
          </div>

          {/* Tap hint */}
          <p className="text-xs text-gray-400 text-center mt-8 tracking-wide">Tap to expand</p>
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

        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl border border-white/20">
          {/* Hook */}
          <div className="mb-8">
            <p className="text-black serif text-3xl md:text-4xl leading-tight font-semibold">
              {campaign.hook}
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-8"></div>

          {/* Type and Objective */}
          <div className="mb-8">
            <p className="text-xs text-gray-500 uppercase tracking-[0.2em] mb-3 font-medium">
              {campaign.type}
            </p>
            <p className="text-lg text-gray-700 font-light leading-relaxed mb-6">
              {campaign.objective}
            </p>
          </div>

          {/* Description */}
          <div className="mb-8">
            <p className="text-gray-600 leading-relaxed text-base font-light">
              {campaign.description}
            </p>
          </div>

          {/* Channels */}
          <div className="mb-8">
            <h3 className="text-xs text-gray-500 uppercase tracking-[0.2em] mb-4 font-medium">Channels</h3>
            <div className="flex flex-wrap gap-2.5">
              {campaign.channels.map((channel, i) => (
                <span
                  key={i}
                  className="px-5 py-2.5 bg-gray-50 rounded-full text-sm text-gray-700 font-medium border border-gray-100"
                >
                  {channel}
                </span>
              ))}
            </div>
          </div>

          {/* KPIs */}
          <div className="mb-8">
            <h3 className="text-xs text-gray-500 uppercase tracking-[0.2em] mb-4 font-medium">Target KPIs</h3>
            <div className="flex flex-wrap gap-2.5">
              {campaign.kpis.map((kpi, i) => (
                <span
                  key={i}
                  className="px-5 py-2.5 bg-black/5 rounded-full text-sm text-gray-800 font-medium border border-black/10"
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
              className="w-full px-6 py-4 bg-black hover:bg-gray-900 text-white rounded-2xl transition-all font-medium shadow-lg hover:shadow-xl"
            >
              {copied ? '✓ Copied!' : 'Copy to Clipboard'}
            </button>
            <a
              href="https://lead-gen-assessment.nytromarketing.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-2xl transition-all font-semibold shadow-lg hover:shadow-xl text-center"
            >
              📊 Show Me How My Lead Gen Stacks Up
            </a>
            <button
              onClick={() => {
                const meetingUrl = import.meta.env.VITE_MEETING_URL || 'https://meetings.hubspot.com/stanislas-berteloot';
                window.open(meetingUrl, '_blank');
              }}
              className="w-full px-6 py-4 bg-white hover:bg-gray-50 text-black border-2 border-black/10 rounded-2xl transition-all font-medium shadow-md hover:shadow-lg"
            >
              📅 Schedule a Meeting to Discuss My Marketing Needs
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

