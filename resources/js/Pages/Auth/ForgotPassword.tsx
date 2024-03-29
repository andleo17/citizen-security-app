import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/Common/Forms/ErrorMessage";
import PrimaryButton from "@/Components/Common/PrimaryButton";
import TextInput from "@/Components/Common/Forms/TextInput";
import { Head, useForm } from "@inertiajs/react";

interface ForgotPasswordProps {
  status: string;
}

export default function ForgotPassword({ status }: ForgotPasswordProps) {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
  });

  const onHandleChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setData("email", event.target.value);
  };

  const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    post(route("password.email"));
  };

  return (
    <GuestLayout>
      <Head title="Forgot Password" />

      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Forgot your password? No problem. Just let us know your email address
        and we will email you a password reset link that will allow you to
        choose a new one.
      </div>

      {status && (
        <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
          {status}
        </div>
      )}

      <form onSubmit={submit}>
        <TextInput
          id="password"
          type="email"
          name="email"
          value={data.email}
          className="mt-1 block w-full"
          onChange={onHandleChange}
        />

        <div className="flex items-center justify-end mt-4">
          <PrimaryButton className="ml-4" processing={processing}>
            Email Password Reset Link
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
}
