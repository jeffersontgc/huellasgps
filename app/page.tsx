'use client';

export default function Home() {
  return (
    <div style={{ width: '100vw', height: '100dvh', margin: 0, padding: 0, overflow: 'hidden' }}>
      <iframe
        src="/index.html?v=10"
        style={{ width: '100%', height: '100%', border: 'none' }}
        allow="geolocation; camera; accelerometer; gyroscope"
        title="HuellaGPS - Granada, Nicaragua"
      />
    </div>
  );
}
