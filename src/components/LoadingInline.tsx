type LoadingInlineProps = {
  label: string;
};

export function LoadingInline({ label }: LoadingInlineProps) {
  return (
    <p className="status-text" role="status" aria-live="polite">
      {label}
    </p>
  );
}
