export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      style={{
        maxWidth: '480px',
        margin: '60px auto',
        padding: '0 16px',
      }}
    >
      {children}
    </main>
  );
}