import { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { fetchDailyVolume } from './api'
import type { DailyVolume} from "./api"

export default function App() {
  const [data, setData] = useState<DailyVolume[]>([])
  const [error, setError] = useState<string | null>(null)

  const [from, setFrom] = useState<string>('')
  const [to, setTo] = useState<string>('')

  const load = () => {
    fetchDailyVolume(from, to)
      .then(setData)
      .catch((e) => setError(e.message))
  }

  useEffect(() => {
    load()
  }, [])

  if (error) return <div>Error: {error}</div>

  return (
    <div style={{ padding: 24 }}>
      <h2>DLN Daily USD Volume</h2>

      {/* Date picker */}
      <div style={{ marginBottom: 16, display: 'flex', gap: 12 }}>
        <label>
          From:{' '}
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </label>

        <label>
          To:{' '}
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </label>

        <button onClick={load}>Apply</button>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            stroke="#8884d8"
            dataKey="createdVolumeUsd"
            name="Created"
          />
          <Line
            type="monotone"
            stroke="#82ca9d"
            dataKey="fulfilledVolumeUsd"
            name="Fulfilled"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
