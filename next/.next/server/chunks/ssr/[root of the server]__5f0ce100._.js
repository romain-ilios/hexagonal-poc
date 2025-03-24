module.exports = {

"[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/src/app/page.module.css [app-ssr] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "ctas": "page-module___8aEwW__ctas",
  "footer": "page-module___8aEwW__footer",
  "logo": "page-module___8aEwW__logo",
  "main": "page-module___8aEwW__main",
  "page": "page-module___8aEwW__page",
  "primary": "page-module___8aEwW__primary",
  "secondary": "page-module___8aEwW__secondary",
});
}}),
"[project]/src/model/todo/application/todoService.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "TodoService": (()=>TodoService)
});
class TodoService {
    todoRepository;
    todoStore;
    constructor(todoRepository, todoStore){
        this.todoRepository = todoRepository;
        this.todoStore = todoStore;
    }
    async getInitialTodos() {
        this.todoStore.setIsLoading(true);
        try {
            const todos = await this.todoRepository.getTodos();
            this.todoStore.setTodos(todos);
        } catch (error) {
            this.todoStore.setError(error);
        } finally{
            this.todoStore.setIsLoading(false);
        }
    }
    async addTodo(params) {
        const oldTodos = this.todoStore.getTodosSnapshot();
        try {
            this.todoStore.addTodo(params);
            this.saveTodos();
        } catch (error) {
            this.todoStore.setError(error);
            this.todoStore.setTodos(oldTodos);
        }
    }
    async updateTodo(id, params) {
        const oldTodos = this.todoStore.getTodosSnapshot();
        try {
            this.todoStore.updateTodo(id, params);
            this.saveTodos();
        } catch (error) {
            this.todoStore.setError(error);
            this.todoStore.setTodos(oldTodos);
        }
    }
    async deleteTodo(id) {
        const oldTodos = this.todoStore.getTodosSnapshot();
        try {
            this.todoStore.deleteTodo(id);
            this.saveTodos();
        } catch (error) {
            this.todoStore.setError(error);
            this.todoStore.setTodos(oldTodos);
        }
    }
    async saveTodos() {
        try {
            const todos = this.todoStore.getTodosSnapshot();
            await this.todoRepository.saveTodos(todos);
        } catch (error) {
            this.todoStore.setError(error);
        }
    }
}
}}),
"[externals]/crypto [external] (crypto, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}}),
"[project]/src/model/todo/application/todoStore.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "TodoStore": (()=>TodoStore)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$rxjs$40$7$2e$8$2e$2$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/cjs/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$uuid$40$11$2e$1$2e$0$2f$node_modules$2f$uuid$2f$dist$2f$esm$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/uuid@11.1.0/node_modules/uuid/dist/esm/v4.js [app-ssr] (ecmascript) <export default as v4>");
;
;
class TodoStore {
    /**
   * The todos observable
   */ todos$ = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$rxjs$40$7$2e$8$2e$2$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BehaviorSubject"]([]);
    /**
   * The isLoading observable
   */ isLoading$ = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$rxjs$40$7$2e$8$2e$2$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BehaviorSubject"](false);
    /**
   * The error observable
   */ error$ = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$rxjs$40$7$2e$8$2e$2$2f$node_modules$2f$rxjs$2f$dist$2f$cjs$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BehaviorSubject"](null);
    /**
   * Get the todos observable
   * @returns the todos observable
   */ getTodosObservable() {
        return this.todos$.asObservable();
    }
    /**
   * Get the todos snapshot
   * @returns the todos snapshot
   */ getTodosSnapshot() {
        return this.todos$.getValue();
    }
    /**
   * Get the isLoading observable
   * @returns the isLoading observable
   */ getIsLoadingObservable() {
        return this.isLoading$.asObservable();
    }
    /**
   * Get the error observable
   * @returns the error observable
   */ getErrorObservable() {
        return this.error$.asObservable();
    }
    /**
   * Get the isLoading snapshot
   * @returns the isLoading snapshot
   */ getIsLoadingSnapshot() {
        return this.isLoading$.getValue();
    }
    /**
   * Get the error snapshot
   * @returns the error snapshot
   */ getErrorSnapshot() {
        return this.error$.getValue();
    }
    /**
   * Set the todos
   * @param todos the todos
   */ setTodos(todos) {
        this.todos$.next(todos);
    }
    /**
   * Add a todo
   * @param params the todo params
   * @returns void
   */ addTodo(params) {
        const newTodo = {
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$uuid$40$11$2e$1$2e$0$2f$node_modules$2f$uuid$2f$dist$2f$esm$2f$v4$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
            description: params.description,
            completed: false
        };
        this.todos$.next([
            ...this.todos$.getValue(),
            newTodo
        ]);
    }
    /**
   * Update a todo
   * @param id the todo id
   * @param params the todo params
   * @returns void
   */ updateTodo(id, params) {
        const todos = this.todos$.getValue();
        const updatedTodos = todos.map((todo)=>todo.id === id ? {
                ...todo,
                ...params
            } : todo);
        this.todos$.next(updatedTodos);
    }
    /**
   * Delete a todo
   * @param id the todo id
   * @returns void
   */ deleteTodo(id) {
        const todos = this.todos$.getValue();
        const updatedTodos = todos.filter((todo)=>todo.id !== id);
        this.todos$.next(updatedTodos);
    }
    /**
   * Set the error
   * @param error the error
   */ setError(error) {
        this.error$.next(error);
    }
    /**
   * Set the isLoading
   * @param isLoading the isLoading
   */ setIsLoading(isLoading) {
        this.isLoading$.next(isLoading);
    }
}
}}),
"[project]/src/model/todo/infrastructure/local/todoRepository.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "LocalTodoRepository": (()=>LocalTodoRepository)
});
class LocalTodoRepository {
    STORAGE_KEY = "todo:items";
    getTodos() {
        return new Promise((resolve)=>{
            setTimeout(()=>{
                const todos = localStorage.getItem(this.STORAGE_KEY);
                resolve(todos ? JSON.parse(todos) : []);
            }, 1000);
        });
    }
    saveTodos(todos) {
        return new Promise((resolve)=>{
            setTimeout(()=>{
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
                resolve();
            }, 500);
        });
    }
}
}}),
"[project]/src/model/serviceLocator.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "todoRepository": (()=>todoRepository),
    "todoService": (()=>todoService),
    "todoStore": (()=>todoStore)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$model$2f$todo$2f$application$2f$todoService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/model/todo/application/todoService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$model$2f$todo$2f$application$2f$todoStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/model/todo/application/todoStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$model$2f$todo$2f$infrastructure$2f$local$2f$todoRepository$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/model/todo/infrastructure/local/todoRepository.ts [app-ssr] (ecmascript)");
;
;
;
const todoStore = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$model$2f$todo$2f$application$2f$todoStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TodoStore"]();
const todoRepository = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$model$2f$todo$2f$infrastructure$2f$local$2f$todoRepository$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LocalTodoRepository"]();
const todoService = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$model$2f$todo$2f$application$2f$todoService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TodoService"](todoRepository, todoStore);
}}),
"[project]/src/model/todo/application/react/useTodos.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "useTodos": (()=>useTodos)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$model$2f$serviceLocator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/model/serviceLocator.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$3_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.2.3_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
function useTodos() {
    const [todos, setTodos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$3_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$model$2f$serviceLocator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["todoStore"].getTodosSnapshot());
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$3_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$model$2f$serviceLocator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["todoStore"].getIsLoadingSnapshot());
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$3_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$model$2f$serviceLocator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["todoStore"].getErrorSnapshot());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$3_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const subscription = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$model$2f$serviceLocator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["todoStore"].getTodosObservable().subscribe(setTodos);
        const isLoadingSubscription = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$model$2f$serviceLocator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["todoStore"].getIsLoadingObservable().subscribe(setIsLoading);
        const errorSubscription = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$model$2f$serviceLocator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["todoStore"].getErrorObservable().subscribe(setError);
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$model$2f$serviceLocator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["todoService"].getInitialTodos();
        return ()=>{
            subscription.unsubscribe();
            isLoadingSubscription.unsubscribe();
            errorSubscription.unsubscribe();
        };
    }, []);
    function addTodo(description) {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$model$2f$serviceLocator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["todoService"].addTodo({
            description
        });
    }
    function updateTodo(id, params) {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$model$2f$serviceLocator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["todoService"].updateTodo(id, params);
    }
    function deleteTodo(id) {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$model$2f$serviceLocator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["todoService"].deleteTodo(id);
    }
    return {
        todos,
        isLoading,
        error,
        addTodo,
        updateTodo,
        deleteTodo
    };
}
}}),
"[project]/src/app/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Home)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$3_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.2.3_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/page.module.css [app-ssr] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$3_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@15.2.3_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$model$2f$todo$2f$application$2f$react$2f$useTodos$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/model/todo/application/react/useTodos.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function Home() {
    const [description, setDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$3_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const { todos, isLoading, addTodo, updateTodo, deleteTodo } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$model$2f$todo$2f$application$2f$react$2f$useTodos$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTodos"])();
    function handleAddTodo(e) {
        e.preventDefault();
        addTodo(description);
        setDescription("");
    }
    function handleDeleteTodo(id) {
        deleteTodo(id);
    }
    function handleToggleTodo(id, completed) {
        updateTodo(id, {
            completed
        });
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$3_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].page,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$3_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].main,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$3_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    children: "Todo List"
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$3_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleAddTodo,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$3_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        value: description,
                        onChange: (e)=>setDescription(e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 30,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 29,
                    columnNumber: 9
                }, this),
                isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$3_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "Loading..."
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 36,
                    columnNumber: 23
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$3_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    children: todos.map((todo)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$3_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            style: {
                                width: "100%",
                                display: "flex",
                                justifyContent: "space-between"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$3_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$3_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "checkbox",
                                            checked: todo.completed,
                                            onChange: ()=>handleToggleTodo(todo.id, !todo.completed)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 50,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$3_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: todo.description
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 55,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 47,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$15$2e$2$2e$3_react$2d$dom$40$19$2e$0$2e$0_react$40$19$2e$0$2e$0_$5f$react$40$19$2e$0$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleDeleteTodo(todo.id),
                                    style: {
                                        width: "20px",
                                        height: "20px",
                                        backgroundColor: "red",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "2px",
                                        cursor: "pointer"
                                    },
                                    children: "x"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 57,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, todo.id, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 39,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 37,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 27,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__5f0ce100._.js.map