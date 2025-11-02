// Campaign idea generator based on quiz responses
export const generateCampaignIdeas = (answers) => {
  const campaigns = [];

  // Map answers to campaign ideas
  const goal = answers.goal;
  const audienceChannel = answers.audience;
  const contentStatus = answers.content;
  const urgency = answers.urgency;
  const crmNeed = answers.crm_need;

  // Campaign 1: Based on goal + channel combination
  if (goal === 'drive_sqls' && audienceChannel === 'linkedin') {
    campaigns.push({
      id: 1,
      type: 'LinkedIn Live Series',
      objective: 'Drive SQLs from engaged prospects',
      channels: ['LinkedIn Ads', 'LinkedIn Live', 'Email'],
      hook: 'Reclaim Stalled Deals with a 7-Min ROI Checkup',
      kpis: ['CPL < $130', 'CTR > 0.5%', 'SQL conversion > 15%'],
      description: 'Weekly LinkedIn Live sessions targeting decision-makers with urgent problem-solving sessions. Follow up with retargeting ads.',
      emoji: '🎯',
    });
  } else if (goal === 'drive_sqls' && audienceChannel === 'email') {
    campaigns.push({
      id: 1,
      type: 'Email Nurture to SQL',
      objective: 'Convert leads to SQLs via email',
      channels: ['Email', 'LinkedIn Ads'],
      hook: 'From MQL to SQL in 14 Days: The Email Sequence',
      kpis: ['Email CTR > 12%', 'SQL conversion > 18%', 'Time to SQL < 14 days'],
      description: 'Multi-email nurture sequence with personalized content based on lead behavior. Retarget non-openers on LinkedIn.',
      emoji: '📧',
    });
  } else if (goal === 'reengage_leads' && audienceChannel === 'email') {
    campaigns.push({
      id: 1,
      type: 'Cold Lead Reactivation',
      objective: 'Re-engage stale contacts',
      channels: ['Email', 'LinkedIn Ads'],
      hook: 'Your Last Deal Just Closed. Here\'s What Changed.',
      kpis: ['Open rate > 35%', 'CTR > 8%', 'Reactivation rate > 12%'],
      description: 'Multi-touch email sequence with personalized subject lines and LinkedIn ad retargeting for non-responders.',
      emoji: '🔥',
    });
  } else if (goal === 'reengage_leads' && audienceChannel === 'linkedin') {
    campaigns.push({
      id: 1,
      type: 'LinkedIn Retargeting Revival',
      objective: 'Re-engage cold leads on LinkedIn',
      channels: ['LinkedIn Ads', 'LinkedIn Messages'],
      hook: 'We Haven\'t Talked in a While. Here\'s What\'s New.',
      kpis: ['Engagement rate > 3%', 'Message response > 15%', 'Reactivation > 10%'],
      description: 'LinkedIn ad campaign targeting inactive leads with fresh case studies. Personalized connection requests for high-value accounts.',
      emoji: '🔄',
    });
  } else if (goal === 'launch_product' && contentStatus === 'lots_case_studies') {
    campaigns.push({
      id: 1,
      type: 'Case Study Launch Campaign',
      objective: 'Product launch with social proof',
      channels: ['LinkedIn', 'Email', 'Webinars'],
      hook: 'See How 50 B2B Teams Cut Their Sales Cycle in Half',
      kpis: ['Signups > 500', 'Demo requests > 40', 'MQL conversion > 20%'],
      description: 'Lead with your best case studies in LinkedIn carousel ads, email to existing list, and host a launch webinar.',
      emoji: '🚀',
    });
  } else if (goal === 'launch_product') {
    campaigns.push({
      id: 1,
      type: 'Product Launch Campaign',
      objective: 'Launch product to market',
      channels: audienceChannel === 'linkedin' ? ['LinkedIn Ads', 'Email'] : ['Email', 'Webinars'],
      hook: 'Introducing: The Fastest Way to [Your Value Prop]',
      kpis: ['Signups > 300', 'Demo requests > 25', 'Activation rate > 50%'],
      description: 'Multi-channel launch campaign with early access offers and referral incentives.',
      emoji: '🚀',
    });
  } else if (goal === 'warm_abm' && audienceChannel === 'linkedin') {
    campaigns.push({
      id: 1,
      type: 'ABM LinkedIn Campaign',
      objective: 'Warm target accounts',
      channels: ['LinkedIn Ads', 'LinkedIn Sales Navigator', 'Email'],
      hook: 'Personalized Campaigns for [Company Name]: Your ICP Strategy',
      kpis: ['Account engagement > 40%', 'Meeting booked > 15%', 'Pipeline created > $200K'],
      description: 'Hyper-personalized LinkedIn ads and outreach targeting specific accounts. Custom content for each account segment.',
      emoji: '🎯',
    });
  } else {
    campaigns.push({
      id: 1,
      type: 'Multi-Channel Campaign',
      objective: goal === 'drive_sqls' ? 'Drive SQLs' : goal === 'reengage_leads' ? 'Re-engage leads' : goal === 'launch_product' ? 'Launch product' : 'Warm ABM accounts',
      channels: audienceChannel === 'linkedin' ? ['LinkedIn Ads', 'Email'] : audienceChannel === 'email' ? ['Email', 'LinkedIn Ads'] : ['Webinars', 'Email'],
      hook: 'The Fastest Path to Your Next Win',
      kpis: ['CPL < $150', 'CTR > 0.4%', 'Conversion > 12%'],
      description: 'Targeted campaign across your primary channel with retargeting and cross-channel support.',
      emoji: '⚡',
    });
  }

  // Campaign 2: Content-based
  if (contentStatus === 'no_lead_magnet') {
    campaigns.push({
      id: 2,
      type: 'Lead Magnet Launch',
      objective: crmNeed === 'mqls' ? 'Generate MQLs' : 'Build email list',
      channels: audienceChannel === 'linkedin' ? ['LinkedIn Ads', 'Email'] : ['Email', 'Search'],
      hook: 'The 5-Minute Framework That Generated $2M in Pipeline',
      kpis: ['Cost per lead < $45', 'Conversion rate > 25%', 'Email capture > 500'],
      description: 'Create a high-value, quick-consumption lead magnet (checklist or framework). Promote via paid ads and email.',
      emoji: '📥',
    });
  } else if (contentStatus === 'have_webinars') {
    campaigns.push({
      id: 2,
      type: 'Webinar Repurpose Campaign',
      objective: 'Extend webinar content reach',
      channels: ['LinkedIn', 'Email', 'Search'],
      hook: '3 Insights from Our Most Popular Webinar (Watch in 2 Min)',
      kpis: ['Video views > 10K', 'Leads from repurposed content > 150'],
      description: 'Chop up your best webinars into snackable LinkedIn posts, email snippets, and YouTube shorts. Repackage for SEO.',
      emoji: '🎬',
    });
  } else if (contentStatus === 'low_linkedin') {
    campaigns.push({
      id: 2,
      type: 'LinkedIn Engagement Boost',
      objective: 'Increase LinkedIn engagement',
      channels: ['LinkedIn', 'LinkedIn Ads'],
      hook: 'Why Your LinkedIn Posts Get 10x Engagement (Proven Formula)',
      kpis: ['Engagement rate > 5%', 'Shares > 50', 'Comments > 100'],
      description: 'Strategic content calendar with engagement-focused posts. Boost top performers with LinkedIn ads.',
      emoji: '📈',
    });
  } else {
    campaigns.push({
      id: 2,
      type: 'Content Amplification',
      objective: 'Increase content engagement',
      channels: ['LinkedIn Ads', 'Email'],
      hook: 'Why 80% of B2B Marketers Miss This Simple Tactic',
      kpis: ['Engagement rate > 5%', 'Shares > 50'],
      description: 'Boost your best-performing content with targeted ads and email newsletters.',
      emoji: '📢',
    });
  }

  // Campaign 3: Based on urgency
  if (urgency === 'now') {
    campaigns.push({
      id: 3,
      type: 'Quick Win Campaign',
      objective: 'Fast results',
      channels: ['LinkedIn Ads', 'Email'],
      hook: 'See Results in 7 Days: The Quick-Win Campaign Template',
      kpis: ['CPL < $100', 'Time to first lead < 48h'],
      description: 'High-intent LinkedIn ad campaigns targeting job titles + retargeting website visitors. Email to warm list.',
      emoji: '⚡',
    });
  } else if (urgency === 'this_quarter') {
    campaigns.push({
      id: 3,
      type: 'Quarterly Campaign Series',
      objective: 'Sustained growth this quarter',
      channels: ['LinkedIn', 'Email', 'Webinars'],
      hook: 'Your Q1 Pipeline Starts Here',
      kpis: ['Pipeline generated > $500K', 'MQLs > 200'],
      description: 'Multi-touch campaign combining LinkedIn ads, email nurture, and quarterly webinar. Measure weekly.',
      emoji: '📅',
    });
  } else {
    campaigns.push({
      id: 3,
      type: 'Long-Term Nurture',
      objective: 'Build sustainable pipeline',
      channels: ['Email', 'LinkedIn', 'Webinars'],
      hook: 'The 90-Day Campaign That Builds Unstoppable Pipeline',
      kpis: ['Pipeline velocity +25%', 'MQL quality score > 75%'],
      description: 'Multi-touch nurture campaign with educational content, webinars, and progressive profiling.',
      emoji: '🌱',
    });
  }

  // Campaign 4: Based on CRM need
  if (crmNeed === 'referrals') {
    campaigns.push({
      id: 4,
      type: 'Referral Activation',
      objective: 'Generate referrals',
      channels: ['Email', 'LinkedIn'],
      hook: 'Get $500 Credit When You Refer a Colleague',
      kpis: ['Referral rate > 8%', 'Referral quality score > 80%'],
      description: 'Automated referral program via email and LinkedIn. Incentivize existing customers to refer peers.',
      emoji: '🤝',
    });
  } else if (crmNeed === 'product_signups') {
    campaigns.push({
      id: 4,
      type: 'Product-Led Growth Campaign',
      objective: 'Drive product signups',
      channels: ['Search', 'LinkedIn Ads', 'Email'],
      hook: 'Try It Free: No Credit Card Required',
      kpis: ['Signup rate > 12%', 'Activation rate > 60%'],
      description: 'Free trial offer with retargeting ads for abandoners. Email onboarding sequence.',
      emoji: '🔄',
    });
  } else if (crmNeed === 'mqls') {
    campaigns.push({
      id: 4,
      type: 'MQL Generation Campaign',
      objective: 'Generate marketing-qualified leads',
      channels: ['LinkedIn Ads', 'Search', 'Email'],
      hook: 'Download: The Complete Guide to [Pain Point]',
      kpis: ['MQLs > 200/month', 'MQL to SQL rate > 30%'],
      description: 'Gated content campaigns with lead magnets. Nurture with automated email sequences.',
      emoji: '📊',
    });
  } else {
    campaigns.push({
      id: 4,
      type: 'SQL Acceleration',
      objective: 'Convert leads to SQLs faster',
      channels: ['Email', 'LinkedIn Ads'],
      hook: 'From Lead to SQL in 10 Days (Here\'s How)',
      kpis: ['SQL conversion > 20%', 'Time to SQL < 10 days'],
      description: 'Sales-qualified lead acceleration program with targeted content and sales outreach triggers.',
      emoji: '🎯',
    });
  }

  // Campaign 5: Wild card / Channel-specific
  if (audienceChannel === 'search') {
    campaigns.push({
      id: 5,
      type: 'Search Engine Campaign',
      objective: 'Capture search intent',
      channels: ['Google Ads', 'SEO', 'Email'],
      hook: 'Rank #1 for "[Your Keyword]": The Complete Strategy',
      kpis: ['CTR > 2%', 'Cost per click < $5', 'Conversion rate > 5%'],
      description: 'Targeted search ads for high-intent keywords. SEO optimization for long-tail terms.',
      emoji: '🔍',
    });
  } else if (audienceChannel === 'webinars') {
    campaigns.push({
      id: 5,
      type: 'Webinar Series',
      objective: 'Build authority and pipeline',
      channels: ['Webinars', 'Email', 'LinkedIn'],
      hook: 'Join 1,000+ Marketers: Monthly Webinar Series',
      kpis: ['Registration > 500', 'Attendee rate > 40%', 'MQLs > 100'],
      description: 'Monthly webinar series with industry experts. Promote via email and LinkedIn. Repurpose recordings.',
      emoji: '🎙️',
    });
  } else {
    campaigns.push({
      id: 5,
      type: 'Community Building',
      objective: 'Build engaged community',
      channels: ['LinkedIn', 'Email'],
      hook: 'Join 5,000+ B2B Marketers Sharing Tactics Weekly',
      kpis: ['Community growth > 200/month', 'Engagement rate > 10%'],
      description: 'Create a private LinkedIn group or newsletter community. Engage daily with value-first content.',
      emoji: '💬',
    });
  }

  // Ensure we have at least 3 campaigns
  while (campaigns.length < 3) {
    campaigns.push({
      id: campaigns.length + 1,
      type: 'Hybrid Campaign',
      objective: 'Maximize reach and conversion',
      channels: ['LinkedIn', 'Email'],
      hook: 'The Multi-Touch Campaign That Actually Works',
      kpis: ['Conversion > 15%', 'ROAS > 3x'],
      description: 'Integrated campaign combining multiple channels for maximum impact.',
      emoji: '🎯',
    });
  }

  return campaigns.slice(0, 5); // Return max 5 campaigns
};

