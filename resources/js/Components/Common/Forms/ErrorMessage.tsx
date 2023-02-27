interface ErrorMessageProps {
  message?: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return <p className="text-sm text-red-600 dark:text-red-400">{message}</p>;
}

export default ErrorMessage;
