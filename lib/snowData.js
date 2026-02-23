const CITIES = [
  { name: 'Vilnius', latitude: 54.6872, longitude: 25.2797 },
  { name: 'Kaunas', latitude: 54.8985, longitude: 23.9036 },
  { name: 'Klaipėda', latitude: 55.7033, longitude: 21.1443 },
  { name: 'Šiauliai', latitude: 55.9349, longitude: 23.3137 },
  { name: 'Panevėžys', latitude: 55.7333, longitude: 24.35 },
];

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

function getDateRange(daysBack = 50) {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - (daysBack - 1));
  return { start: formatDate(start), end: formatDate(end) };
}

async function fetchCitySnowDepth(city, startDate, endDate) {
  const url = new URL('https://archive-api.open-meteo.com/v1/archive');
  url.searchParams.set('latitude', city.latitude);
  url.searchParams.set('longitude', city.longitude);
  url.searchParams.set('start_date', startDate);
  url.searchParams.set('end_date', endDate);
  url.searchParams.set('daily', 'snow_depth_max');
  url.searchParams.set('timezone', 'Europe/Vilnius');

  const response = await fetch(url.toString(), { next: { revalidate: 43200 } });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${city.name}: ${response.status}`);
  }

  const json = await response.json();
  const times = json?.daily?.time || [];
  const values = json?.daily?.snow_depth_max || [];

  return times.map((date, i) => ({
    date,
    snowDepthCm: values[i] == null ? 0 : Number((values[i] * 100).toFixed(2)),
  }));
}

export async function getSnowDashboardData() {
  const { start, end } = getDateRange(50);

  const citySeries = await Promise.all(
    CITIES.map(async (city) => ({
      city: city.name,
      points: await fetchCitySnowDepth(city, start, end),
    }))
  );

  const byDate = new Map();

  for (const series of citySeries) {
    for (const point of series.points) {
      if (!byDate.has(point.date)) {
        byDate.set(point.date, { date: point.date });
      }
      byDate.get(point.date)[series.city] = point.snowDepthCm;
    }
  }

  const chartData = Array.from(byDate.values()).sort((a, b) => a.date.localeCompare(b.date));

  return {
    chartData,
    cities: CITIES.map((c) => c.name),
    range: { start, end },
  };
}
