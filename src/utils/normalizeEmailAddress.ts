export const normalizeEmailAddress = (email: string): string => {
  email = email.trim().toLowerCase();

  const atIndex = email.lastIndexOf('@');

  // We don't need to check that there is an @ or if it's the last index
  // because validation rejects those cases.

  let localPart = email.substring(0, atIndex);
  let domain = email.substring(atIndex + 1);

  const separator = domain === 'yahoo.com' ? '-' : '+';
  const separatorIndex = localPart.indexOf(separator);
  if (separatorIndex > 0) {
    localPart = localPart.substring(0, separatorIndex);
  }

  return localPart + '@' + domain;
};
