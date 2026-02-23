type ProvisionHeyReachResult = {
  success?: boolean;
  workspace_id?: string;
};

function getBackendBaseUrl(): string {
  const value = (process.env.PUBLIC_BACKEND_URL ?? "").trim().replace(/\/+$/, "");
  if (!value) {
    throw new Error("Missing PUBLIC_BACKEND_URL.");
  }
  return value;
}

function getSyncAdminToken(): string {
  const value = (process.env.SYNC_ADMIN_TOKEN ?? "").trim();
  if (!value) {
    throw new Error("Missing SYNC_ADMIN_TOKEN.");
  }
  return value;
}

export async function provisionHeyReachWebhooks(clientId: string): Promise<ProvisionHeyReachResult> {
  const normalizedClientId = clientId.trim();
  if (!normalizedClientId) {
    throw new Error("client_id is required for provisioning.");
  }

  const backendBaseUrl = getBackendBaseUrl();
  const syncAdminToken = getSyncAdminToken();
  const url = `${backendBaseUrl}/internal/heyreach/provision/${encodeURIComponent(normalizedClientId)}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-sync-admin-token": syncAdminToken
    },
    body: JSON.stringify({
      backend_base_url: backendBaseUrl
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(12000)
  });

  const responseText = await response.text().catch(() => "");
  if (!response.ok) {
    throw new Error(
      `Failed to provision HeyReach webhooks (${response.status}): ${responseText || "no response body"}`
    );
  }

  if (!responseText) {
    return {};
  }

  try {
    return JSON.parse(responseText) as ProvisionHeyReachResult;
  } catch {
    return {};
  }
}
