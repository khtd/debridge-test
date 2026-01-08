export interface DailyVolume {
  day: string;
  createdVolumeUsd: number;
  fulfilledVolumeUsd: number;
}

export async function fetchDailyVolume(from?: string, to?: string) {
  const params = new URLSearchParams()
  if (from) params.set('from', from)
  if (to) params.set('to', to)

  const res = await fetch(`/api/daily-volume?${params.toString()}`)
  if (!res.ok) throw new Error('Failed to load data')
  return res.json() as Promise<DailyVolume[]>
}
