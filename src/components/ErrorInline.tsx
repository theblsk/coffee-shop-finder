type ErrorInlineProps = {
  message: string;
};

export function ErrorInline({ message }: ErrorInlineProps) {
  return (
    <p className="error-text" role="alert">
      {message}
    </p>
  );
}
