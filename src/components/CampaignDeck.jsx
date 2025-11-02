import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CampaignCard from './CampaignCard';
import { generateAICampaign } from '../utils/aiService';
import { generateCampaignIdeas } from '../utils/campaignGenerator';

export default function CampaignDeck({ answers }) {
  const [campaigns, setCampaigns] = useState(() => generateCampaignIdeas(answers));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedCampaigns, setSavedCampaigns] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const handleSwipe = (direction) => {
    if (direction === 'right') {
      // Save campaign
      setSavedCampaigns([...savedCampaigns, campaigns[currentIndex]]);
    }
    
    if (currentIndex < campaigns.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowEnd(true);
    }
  };

  const handleTap = () => {
    // Card expansion handled in CampaignCard component
  };

  const handleGenerateNew = async () => {
    setIsGenerating(true);
    try {
      const newCampaign = await generateAICampaign(answers, campaigns, false);
      setCampaigns([...campaigns, newCampaign]);
      setCurrentIndex(campaigns.length);
      setShowEnd(false);
    } catch (error) {
      console.error('Failed to generate campaign:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRandomize = () => {
    const randomCampaigns = generateCampaignIdeas(answers);
    setCampaigns(randomCampaigns);
    setCurrentIndex(0);
    setShowEnd(false);
    setSavedCampaigns([]);
  };

  const handleWildCard = async () => {
    setIsGenerating(true);
    try {
      // Generate a completely random wild-card campaign
      const wildCardAnswers = {
        goal: ['drive_sqls', 'reengage_leads', 'launch_product', 'warm_abm'][Math.floor(Math.random() * 4)],
        audience: ['linkedin', 'email', 'webinars', 'search'][Math.floor(Math.random() * 4)],
        content: ['no_lead_magnet', 'have_webinars', 'low_linkedin', 'lots_case_studies'][Math.floor(Math.random() * 4)],
        urgency: ['now', 'this_quarter', 'exploring'][Math.floor(Math.random() * 3)],
        crm_need: ['mqls', 'product_signups', 'sqls', 'referrals'][Math.floor(Math.random() * 4)],
      };
      const wildCard = await generateAICampaign(wildCardAnswers, campaigns, true);
      wildCard.type = `Wild Card: ${wildCard.type}`;
      setCampaigns([...campaigns, wildCard]);
      setCurrentIndex(campaigns.length);
      setShowEnd(false);
    } catch (error) {
      console.error('Failed to generate wild card:', error);
      // Fallback to a varied wild card
      const fallbackHooks = [
        'The Campaign No One Sees Coming (But Everyone Remembers)',
        'Why We\'re Breaking Every B2B Marketing Rule',
        'The Strategy That Makes Your CMO Nervous (But Works)',
        'What Happens When You Ignore Best Practices',
        'The Counterintuitive Approach That Actually Works',
      ];
      const fallbackChannels = [
        ['LinkedIn', 'Email', 'TikTok'],
        ['Reddit', 'Discord', 'Newsletters'],
        ['YouTube Shorts', 'Twitter/X', 'SMS'],
        ['Podcasts', 'TikTok', 'SMS'],
      ];
      const randomHook = fallbackHooks[Math.floor(Math.random() * fallbackHooks.length)];
      const randomChannels = fallbackChannels[Math.floor(Math.random() * fallbackChannels.length)];
      
      const fallbackWildCard = {
        id: Date.now() + Math.random(),
        type: 'Wild Card: Unexpected Campaign',
        objective: 'Break the mold',
        channels: randomChannels,
        hook: randomHook,
        kpis: ['Viral potential', 'Brand recall > 80%'],
        description: 'A completely out-of-the-box campaign idea that challenges conventional B2B marketing. Sometimes the best campaigns are the ones you never expected.',
        emoji: ['🎲', '⚡', '🚀', '💡'][Math.floor(Math.random() * 4)],
      };
      setCampaigns([...campaigns, fallbackWildCard]);
      setCurrentIndex(campaigns.length);
      setShowEnd(false);
    } finally {
      setIsGenerating(false);
    }
  };

  if (showEnd && campaigns.length > 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-black flex flex-col items-center justify-center px-4"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-medium mb-4 text-white serif">That's all!</h2>
          <p className="text-white/70 mb-2">
            You've saved {savedCampaigns.length} campaign{savedCampaigns.length !== 1 ? 's' : ''}
          </p>
          <p className="text-white/60 text-sm">Want more ideas?</p>
        </div>

        <div className="flex flex-col gap-3 w-full max-w-md">
          <button
            onClick={handleGenerateNew}
            disabled={isGenerating}
            className="px-6 py-4 bg-white hover:bg-white/90 text-black rounded-lg font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
          >
            {isGenerating ? 'Generating...' : '✨ Generate New Card with AI'}
          </button>
          <button
            onClick={handleWildCard}
            disabled={isGenerating}
            className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isGenerating ? 'Generating...' : '🎲 Feeling Stuck? Get a Wild Card'}
          </button>
          <button
            onClick={handleRandomize}
            className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg font-medium transition-colors"
          >
            🔄 Randomize Deck
          </button>
          <button
            onClick={() => {
              const meetingUrl = import.meta.env.VITE_MEETING_URL || 'https://meetings.hubspot.com/stanislas-berteloot';
              window.open(meetingUrl, '_blank');
            }}
            className="px-6 py-4 bg-white/15 hover:bg-white/25 text-white border-2 border-white/40 rounded-lg font-medium transition-colors"
          >
            📅 Schedule a Meeting to Discuss My Marketing Needs
          </button>
        </div>
      </motion.div>
    );
  }

  const currentCampaign = campaigns[currentIndex];
  const remaining = campaigns.length - currentIndex;

  return (
    <div className="min-h-screen bg-black px-4 py-4 flex flex-col items-center justify-between relative">
      {/* Header */}
      <div className="text-center pt-4">
        <h1 className="text-2xl font-medium mb-2 text-white">Campaign Spark</h1>
        <p className="text-sm text-white/70">
          {remaining} card{remaining !== 1 ? 's' : ''} remaining
        </p>
      </div>

      {/* Card Stack */}
      <div className="relative w-full max-w-md flex-1 flex items-center justify-center my-4">
        <AnimatePresence mode="wait">
          {currentCampaign && (
            <CampaignCard
              key={currentCampaign.id}
              campaign={currentCampaign}
              onSwipe={handleSwipe}
              onTap={handleTap}
              index={currentIndex}
              total={campaigns.length}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Bottom section - always visible */}
      <div className="w-full max-w-md pb-4 space-y-3">
        {/* Feeling stuck button - prominent at top */}
        <button
          onClick={handleWildCard}
          disabled={isGenerating}
          className="w-full px-6 py-3 bg-white/15 hover:bg-white/25 text-white border-2 border-white/40 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? 'Generating...' : '🎲 Feeling Stuck? Get a Wild Card'}
        </button>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={() => handleSwipe('left')}
            className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/20"
          >
            Skip
          </button>
          <button
            onClick={() => handleSwipe('right')}
            className="flex-1 px-6 py-3 bg-white hover:bg-white/90 text-black rounded-lg transition-colors font-medium"
          >
            Save ✓
          </button>
        </div>

        {/* Help text */}
        <p className="text-xs text-white/60 text-center">
          Swipe right to save, left to skip, or tap to expand
        </p>
      </div>
    </div>
  );
}

