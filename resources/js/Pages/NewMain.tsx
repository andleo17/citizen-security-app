import FileInput from "@/Components/Common/Forms/FileInput";
import TextInput from "@/Components/Common/Forms/TextInput";
import TextMessage from "@/Components/Main/Message/TextMessage";
import AppLayout from "@/Layouts/AppLayout";
import { Head, useForm } from "@inertiajs/react";
import { FormEvent, useState } from "react";
import type { User } from "vendor";

interface MainProps {
  auth: { user: User };
}

function Main({ auth }: MainProps) {
  const { data, setData, post, processing, errors, transform } = useForm({
    description: "",
    emergency: false,
    location: null,
    photos: null,
    audio: null,
  });

  const [messages, setMessages] = useState<
    { message: string; timestamp: number }[]
  >([]);

  function handleCommitMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const message = data.description.trim();
    if (message.length > 0) {
      setMessages((prev) => [
        ...prev,
        { message: message, timestamp: Date.now() },
      ]);
      setData("description", "");
    }
  }

  return (
    <AppLayout auth={auth}>
      <Head title="Enviar reporte" />
      <div className="flex-grow flex flex-col items-end justify-end gap-2">
        {messages.map((m) => (
          <TextMessage key={m.timestamp} message={m.message} />
        ))}
      </div>
      <form className="flex gap-4 mt-5" onSubmit={handleCommitMessage}>
        <FileInput
          id="photos"
          multiple
          accept="image/*"
          onChange={(e) => setData("photos", e.target.files)}
          errors={errors.photos}
          inline={false}
        />
        <TextInput
          id="description"
          value={data.description}
          onChange={(e) => setData("description", e.target.value)}
          placeholder="Escribe tu denuncia"
          className="flex-grow"
          inline
        />
        <button type="submit" disabled={processing}>
          <span>Enviar</span>
        </button>
      </form>
    </AppLayout>
  );
}

export default Main;
