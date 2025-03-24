import { ITodoCreateParams } from "../../../domain/todo";
import { LocalTodoRepository } from "../todoRepository";
import { TodoDTO } from "../mappers";

/**
 * Sample todo titles for seeding
 */
const SAMPLE_TITLES = [
  "Complete project proposal",
  "Schedule team meeting",
  "Prepare presentation slides",
  "Review code changes",
  "Update documentation",
  "Fix UI bugs",
  "Create user stories",
  "Test new features",
  "Deploy to production",
  "Learn new framework",
  "Refactor legacy code",
  "Write unit tests",
  "Implement authentication",
  "Optimize database queries",
  "Design landing page",
];

/**
 * Sample todo descriptions for seeding
 */
const SAMPLE_DESCRIPTIONS = [
  "Need to outline project goals, timeline, and resource requirements",
  "Coordinate with team members to find a suitable time and prepare agenda",
  "Create slides covering key points for the client meeting",
  "Review pull requests and provide feedback to team members",
  "Update API documentation with latest changes",
  "Address reported UI issues in the dashboard component",
  "Break down requirements into manageable user stories",
  "Verify that new features meet requirements and work correctly",
  "Prepare and execute production deployment plan",
  "Complete tutorial and build sample application",
  "Improve code quality and reduce technical debt",
  "Increase test coverage for critical business logic",
  "Add secure login and registration functionality",
  "Identify and fix performance bottlenecks in database operations",
  "Create modern, responsive design for the main landing page",
];

/**
 * Generate a random integer between min and max (inclusive)
 */
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate a random date within the last 30 days
 */
function getRandomDate(): Date {
  const now = new Date();
  const daysAgo = getRandomInt(0, 30);
  const millisecondsAgo = daysAgo * 24 * 60 * 60 * 1000;
  return new Date(now.getTime() - millisecondsAgo);
}

/**
 * Generate a random todo create params
 */
function generateRandomTodo(): ITodoCreateParams {
  const titleIndex = getRandomInt(0, SAMPLE_TITLES.length - 1);
  const descIndex = getRandomInt(0, SAMPLE_DESCRIPTIONS.length - 1);

  return {
    title: SAMPLE_TITLES[titleIndex],
    description: SAMPLE_DESCRIPTIONS[descIndex],
  };
}

/**
 * Generate an array of todos directly in the TodoDTO format
 * (for direct insertion into storage)
 */
export function generateTodoDTOs(count: number): TodoDTO[] {
  const todos: TodoDTO[] = [];

  for (let i = 0; i < count; i++) {
    const createdAt = getRandomDate();
    const updatedAt = new Date(
      createdAt.getTime() + getRandomInt(0, 5) * 24 * 60 * 60 * 1000
    );

    const randomTodo = generateRandomTodo();
    const completed = Math.random() > 0.7; // 30% chance of being completed

    todos.push({
      id: `seed-${i}-${Date.now()}`,
      title: randomTodo.title,
      description: randomTodo.description,
      completed,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
    });
  }

  return todos;
}

/**
 * Seed the local storage with fake todo data
 */
export async function seedTodoRepository(count: number = 10): Promise<void> {
  const repository = new LocalTodoRepository();

  // Generate random todos
  for (let i = 0; i < count; i++) {
    const todoParams = generateRandomTodo();
    await repository.create(todoParams);
  }

  console.log(`✅ Seeded repository with ${count} todos`);
}

/**
 * Clear all todos from local storage and optionally reseed
 */
export async function resetAndSeedTodoRepository(
  count: number = 10
): Promise<void> {
  // Clear localStorage for todos
  if (typeof window !== "undefined") {
    localStorage.removeItem("todo:items");
    console.log("🗑️ Cleared existing todos from storage");
  }

  // Seed with new data if requested
  if (count > 0) {
    await seedTodoRepository(count);
  }
}

/**
 * Function to be called directly for testing purposes
 */
export function seedDevelopmentData(): void {
  resetAndSeedTodoRepository(15)
    .then(() => console.log("Development data seeded successfully"))
    .catch((error) => console.error("Failed to seed development data:", error));
}
