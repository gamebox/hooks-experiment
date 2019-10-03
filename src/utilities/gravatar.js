import MD5 from './md5';

export default function gravatarUrl(email) {
  return `https://www.gravatar.com/avatar/${MD5(email.trim().toLowerCase())}`;
}
