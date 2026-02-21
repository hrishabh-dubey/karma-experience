import { db } from "./server/db";
import { feedback } from "./shared/schema";
import { count } from "drizzle-orm";

async function main() {
  const result = await db.select({ count: count() }).from(feedback);
  if (result[0].count === 0) {
    await db.insert(feedback).values([
      { name: "Alice Smith", email: "alice@example.com", message: "This site is really clean and easy to use. Great job!" },
      { name: "Bob Jones", email: "bob@example.com", message: "I love the modern design. Could use a dark mode though!" }
    ]);
    console.log("Database seeded");
  } else {
    console.log("Database already seeded");
  }
  process.exit(0);
}
main();
