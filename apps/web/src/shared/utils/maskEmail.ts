const SLICE_EMAIL = 5;

export const maskEmail = (email: string): string => {
  const [local, domain] = email.split('@');
  const visible = local!.slice(0, SLICE_EMAIL);
  return `${visible}***@${domain}`;
};
