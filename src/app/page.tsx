import { Effect } from "effect";

const divide = (a: number, b: number): Effect.Effect<number, Error> =>
  b === 0
    ? Effect.fail(new Error("Cannot divide by zero"))
    : Effect.succeed(a / b);

const log = (message: string) => Effect.sync(() => console.log(message));
const parse = (input: string) =>
  Effect.try({
    try: () => JSON.parse(input),
    catch: (unknown) => new Error(`Something went wrong: ${unknown}`),
  });
const delay = (message: string) =>
  Effect.promise<string>(
    () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(message);
        }, 2000);
      }),
  );
const getTodo = (id: number) =>
  Effect.tryPromise({
    try: () => fetch(`https://jsonplaceholder.typicode.com/todos/${id}`),
    catch: (unknown) => new Error(`something went wrong ${unknown}`),
  });
const program = Effect.async<number>((resume) => {
  resume(Effect.succeed(1));
  resume(Effect.succeed(2)); // This line will be ignored
});

export default function Home() {
  const program1 = log("Hello, world!");
  const program2 = parse("");
  const program3 = delay("Async operation completed successfully!");
  const program4 = getTodo(1);

  Effect.runPromise(program).then(console.log);

  return <div>Home page </div>;
}
