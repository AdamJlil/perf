// perf/server/api/users/index.get.ts
import { getMockUsers } from "../../utils/mockData";

export default defineEventHandler(async (event) => {
  const users = getMockUsers();
  return users.map(({ password, ...user }) => user);
});
