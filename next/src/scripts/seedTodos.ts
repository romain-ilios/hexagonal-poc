/**
 * This script can be imported and executed in development to seed the
 * todo repository with fake data. It can be used in:
 *
 * 1. A button click handler in a development UI
 * 2. A page's useEffect to automatically seed on load
 * 3. Directly in a browser console
 *
 * Example usage in a component:
 * ```
 * import { seedTodos } from '@/scripts/seedTodos';
 *
 * function DevToolsComponent() {
 *   return (
 *     <button onClick={seedTodos}>
 *       Seed Todo Data
 *     </button>
 *   );
 * }
 * ```
 */
export function seedTodos(count?: number): void {
  if (process.env.NODE_ENV !== "production") {
    if (typeof window !== "undefined") {
      // We need to dynamically import in browser environment
      // to avoid localStorage errors during SSR
      import("../model/todo/infrastructure/local/utils")
        .then((module) => {
          if (count !== undefined) {
            module.resetAndSeedTodoRepository(count);
          } else {
            module.seedDevelopmentData();
          }
        })
        .catch((err) => {
          console.error("Failed to seed todos:", err);
        });
    } else {
      console.warn("Seeding is only available in browser environment");
    }
  } else {
    console.warn("Seeding is only available in development mode");
  }
}

// Auto-execute if this file is directly run
if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
  if (window.location.hash === "#seed-todos") {
    console.log("Auto-seeding todos from URL hash...");
    seedTodos();
  }
}
