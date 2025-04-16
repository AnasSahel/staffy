import LoginForm from "./_private/login-form";

export default async function Page() {
  return (
    <div className="mx-auto w-96 p-8">
      <h2 className="mb-8 text-center text-2xl font-bold">
        Welcome back! Please log in to your account.
      </h2>
      <LoginForm />
    </div>
  );
}
