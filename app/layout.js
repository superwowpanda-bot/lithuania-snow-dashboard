import './globals.css';

export const metadata = {
  title: 'Lithuania Snow Depth Dashboard',
  description: 'Snow depth in 5 biggest cities of Lithuania for the last 50 days',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
