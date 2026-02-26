import type { H3Event } from "h3";
import { getMockUsers } from "./mockData";

export async function getUserFromSession(event: H3Event) {
  const config = useRuntimeConfig(event);

  const cookie = getCookie(event, config.cookieName);
  if (!cookie) return null;

  try {
    const unsignedSession = unsign(cookie, config.cookieSecret);
    if (!unsignedSession) return null;

    const session = deserialize(unsignedSession);

    const users = getMockUsers();
    return users.find(u => u.id === session.userId) || null;
  } catch (e) {
    return null;
  }
}
