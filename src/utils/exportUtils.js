// Export utilities for clipboard

export const copyToClipboard = async (campaign) => {
  const text = `
Campaign: ${campaign.type}
Objective: ${campaign.objective}
Hook: ${campaign.hook}
Channels: ${campaign.channels.join(', ')}
KPIs: ${campaign.kpis.join(', ')}
Description: ${campaign.description}
  `.trim();
  
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  }
};

