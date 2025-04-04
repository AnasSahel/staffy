import RegisterForm from "./_private/register-form";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto w-96 p-8">
        <h2 className="mb-8 text-center text-2xl font-bold">
          Create an Account
        </h2>
        <RegisterForm />
      </div>
    </div>
  );
}
