// AI service for generating campaign ideas using OpenAI
export const generateAICampaign = async (answers, existingCampaigns = [], isWildCard = false) => {
  // Note: You'll need to set VITE_OPENAI_API_KEY in your .env file
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    // Generate varied fallback campaigns
    const wildCardHooks = [
      'The Campaign That Breaks All the Rules',
      'Why Everyone\'s Doing It Wrong (And What to Do Instead)',
      'The Counterintuitive Strategy That Actually Works',
      'What Your Competitors Don\'t Want You to Know',
      'The 30-Day Experiment That Changes Everything',
      'Breaking Free from Traditional B2B Marketing',
      'The Unconventional Approach That Drives Results',
    ];
    const wildCardTypes = [
      'Viral Content Campaign',
      'Contrarian Marketing Strategy',
      'Unexpected Channel Mix',
      'Behavioral Psychology Campaign',
      'Community-Driven Growth',
      'FOMO Activation Campaign',
      'Reverse Psychology Campaign',
    ];
    const wildCardChannels = [
      ['TikTok', 'LinkedIn', 'Email'],
      ['Reddit', 'LinkedIn Ads', 'Podcasts'],
      ['Twitter/X', 'Webinars', 'SMS'],
      ['YouTube Shorts', 'Newsletters', 'Discord'],
    ];
    
    const randomIndex = Math.floor(Math.random() * wildCardHooks.length);
    const channelIndex = Math.floor(Math.random() * wildCardChannels.length);
    
    return {
      id: Date.now() + Math.random(),
      type: wildCardTypes[randomIndex],
      objective: isWildCard ? 'Break the mold with unexpected strategies' : 'Maximize ROI',
      channels: wildCardChannels[channelIndex],
      hook: wildCardHooks[randomIndex],
      kpis: [`CPL < $${Math.floor(Math.random() * 50) + 100}`, `CTR > ${(Math.random() * 0.5 + 0.4).toFixed(1)}%`],
      description: isWildCard 
        ? 'A completely unexpected campaign approach that challenges conventional B2B marketing wisdom. This strategy uses unconventional channels and psychology to achieve breakthrough results.'
        : 'AI-generated campaign idea based on your responses.',
      emoji: ['🎲', '⚡', '🚀', '💡', '🔥', '🎯', '✨'][Math.floor(Math.random() * 7)],
      isAI: true,
    };
  }

  try {
    const prompt = isWildCard 
      ? `Generate a WILD and UNEXPECTED B2B marketing campaign idea. Be creative, unconventional, and break the mold. Think outside traditional B2B channels and strategies.
- Goal: ${answers.goal}
- Audience Channel: ${answers.audience}
- Content Status: ${answers.content}
- Urgency: ${answers.urgency}
- CRM Need: ${answers.crm_need}

Return a JSON object with: type, objective, channels (array), hook (one-liner that's surprising), kpis (array), description (2 sentences explaining why this is unexpected), emoji (single emoji).

IMPORTANT: Make this campaign IDEA UNIQUE and DIFFERENT from typical B2B campaigns. Be creative!

Format: {"type": "...", "objective": "...", "channels": [...], "hook": "...", "kpis": [...], "description": "...", "emoji": "..."}`
      : `Generate a B2B marketing campaign idea for a marketer with these answers:
- Goal: ${answers.goal}
- Audience Channel: ${answers.audience}
- Content Status: ${answers.content}
- Urgency: ${answers.urgency}
- CRM Need: ${answers.crm_need}

Return a JSON object with: type, objective, channels (array), hook (one-liner), kpis (array), description (2 sentences), emoji (single emoji).

Format: {"type": "...", "objective": "...", "channels": [...], "hook": "...", "kpis": [...], "description": "...", "emoji": "..."}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a B2B marketing campaign strategist. Generate concise, actionable campaign ideas. Return only valid JSON.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: isWildCard ? 1.2 : 0.8,
        max_tokens: 300,
      }),
    });

    const data = await response.json();
    const content = data.choices[0].message.content.trim();
    
    // Try to parse JSON (might be wrapped in markdown code blocks)
    let jsonContent = content;
    if (content.startsWith('```')) {
      jsonContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    }
    
    const campaign = JSON.parse(jsonContent);
    return {
      ...campaign,
      id: Date.now(),
      isAI: true,
    };
  } catch (error) {
    console.error('AI generation error:', error);
    // Return fallback
    return {
      id: Date.now(),
      type: 'AI-Generated Campaign',
      objective: 'Maximize ROI',
      channels: ['LinkedIn', 'Email'],
      hook: 'The Campaign That Changes Everything',
      kpis: ['CPL < $120', 'CTR > 0.6%'],
      description: 'AI-generated campaign idea based on your responses.',
      emoji: '🤖',
      isAI: true,
    };
  }
};

