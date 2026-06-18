export async function postToTelegram(job: any, settings: any) {
  if (!settings.isTelegramEnabled || !settings.telegramBotToken || !settings.telegramChannelId) {
    return { success: false, error: "Telegram is not configured or enabled." };
  }

  const message = `
🚀 <b>New Job Alert!</b>

💼 <b>Role:</b> ${job.title}
🏢 <b>Company:</b> ${job.company?.name || 'Confidential'}
📍 <b>Location:</b> ${job.location}
💰 <b>Salary:</b> ${job.salaryRange || 'Not specified'}

👉 <a href="https://careerhub.com/jobs/${job.slug}">Apply Now</a>
  `.trim();

  try {
    const res = await fetch(`https://api.telegram.org/bot${settings.telegramBotToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: settings.telegramChannelId,
        text: message,
        parse_mode: "HTML",
      }),
    });

    const data = await res.json();
    if (!data.ok) throw new Error(data.description);
    return { success: true };
  } catch (error: any) {
    console.error("Telegram API Error:", error.message);
    return { success: false, error: error.message };
  }
}

export async function postToWhatsApp(job: any, settings: any) {
  if (!settings.isWhatsappEnabled || !settings.whatsappPhoneNumberId || !settings.whatsappAccessToken || !settings.whatsappGroupId) {
    return { success: false, error: "WhatsApp is not configured or enabled." };
  }

  // Assuming WhatsApp Cloud API standard text message format
  const message = `
🚀 *New Job Alert!*

💼 *Role:* ${job.title}
🏢 *Company:* ${job.company?.name || 'Confidential'}
📍 *Location:* ${job.location}
💰 *Salary:* ${job.salaryRange || 'Not specified'}

👉 Apply Now: https://careerhub.com/jobs/${job.slug}
  `.trim();

  try {
    const res = await fetch(`https://graph.facebook.com/v17.0/${settings.whatsappPhoneNumberId}/messages`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${settings.whatsappAccessToken}`
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual", // Or group if supported by the specific endpoint
        to: settings.whatsappGroupId, // In WhatsApp Cloud API, 'to' is the recipient ID
        type: "text",
        text: { body: message },
      }),
    });

    const data = await res.json();
    if (data.error) throw new Error(data.error.message);
    return { success: true };
  } catch (error: any) {
    console.error("WhatsApp API Error:", error.message);
    return { success: false, error: error.message };
  }
}
