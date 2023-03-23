interface TextMessageProps {
  message: string;
}

function TextMessage({ message }: TextMessageProps) {
  return (
    <div className="bg-teal-200 dark:bg-teal-700 rounded-lg px-3 py-1 font-medium">
      <span>{message}</span>
    </div>
  );
}

export default TextMessage;
