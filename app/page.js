import SnowChart from '../components/SnowChart';
import { getSnowDashboardData } from '../lib/snowData';

export default async function HomePage() {
  const { chartData, cities, range } = await getSnowDashboardData();

  return (
    <main className="container">
      <h1>Lithuania Snow Depth Dashboard</h1>
      <p className="subtitle">
        5 biggest cities • last 50 days ({range.start} to {range.end})
      </p>

      <SnowChart data={chartData} cities={cities} />

      <p className="note">
        Source: Open-Meteo Archive API (daily <code>snow_depth_max</code>, converted from meters to
        centimeters).
      </p>
    </main>
  );
}
