/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// رابط الـ webhook الإنتاجي لفلو n8n (Main Agent - Tool Workflow architecture)
const AGENT_WEBHOOK_URL = 'https://qqwaaeee.app.n8n.cloud/webhook/company-agent-v2';

export interface AgentReply {
  reply: string;
}

/**
 * يرسل رسالة العميل للـ Main Agent على n8n ويرجع رد الوكيل.
 * sessionId بيحدد الذاكرة الخاصة بكل محادثة (بنستخدم id جهة الاتصال).
 */
export async function sendMessageToAgent(
  message: string,
  sessionId: string,
): Promise<string> {
  const response = await fetch(AGENT_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, sessionId }),
  });

  if (!response.ok) {
    throw new Error(`Agent request failed with status ${response.status}`);
  }

  const data: AgentReply = await response.json();
  return data.reply ?? 'عذراً، ما قدرت أوصل لرد حالياً. حاول مرة ثانية.';
}
