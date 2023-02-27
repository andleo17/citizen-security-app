import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import PrimaryButton from "@/Components/Common/PrimaryButton";
import TextInput from "@/Components/Common/Forms/TextInput";
import { Head, useForm } from "@inertiajs/react";

export default function ResetPassword({ token, email }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token: token,
    email: email,
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
    };
  }, []);

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route("password.store"));
  };

  return (
    <GuestLayout>
      <Head title="Reset Password" />

      <form onSubmit={submit}>
        <TextInput
          id="email"
          type="email"
          name="email"
          labelText="Email"
          value={data.email}
          className="mt-1 block w-full"
          autoComplete="username"
          onChange={onHandleChange}
          errors={errors.email}
        />

        <TextInput
          id="password"
          type="password"
          name="password"
          value={data.password}
          className="mt-1 block w-full"
          autoComplete="new-password"
          onChange={onHandleChange}
          errors={errors.password}
        />

        <TextInput
          type="password"
          name="password_confirmation"
          value={data.password_confirmation}
          className="mt-1 block w-full"
          autoComplete="new-password"
          onChange={onHandleChange}
          errors={errors.password_confirmation}
        />

        <div className="flex items-center justify-end mt-4">
          <PrimaryButton className="ml-4" processing={processing}>
            Reset Password
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
}
