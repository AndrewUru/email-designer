interface BuildGmailComposeUrlArgs {
  to?: string;
  subject: string;
  body: string;
}

const GMAIL_COMPOSE_BASE_URL = "https://mail.google.com/mail/";

export function buildGmailComposeUrl(args: BuildGmailComposeUrlArgs): string {
  const queryParts: string[] = ["view=cm", "fs=1"];

  const to = args.to?.trim();
  if (to) {
    queryParts.push(`to=${encodeURIComponent(to)}`);
  }

  queryParts.push(`su=${encodeURIComponent(args.subject)}`);
  queryParts.push(`body=${encodeURIComponent(args.body)}`);

  return `${GMAIL_COMPOSE_BASE_URL}?${queryParts.join("&")}`;
}
