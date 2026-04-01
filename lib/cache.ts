const store = new Map<string, { data: unknown; expires: number }>()

export async function cached<T>(key: string, ttlMs: number, fn: () => Promise<T>): Promise<T> {
  const entry = store.get(key)
  if (entry && entry.expires > Date.now()) {
    return entry.data as T
  }
  const data = await fn()
  store.set(key, { data, expires: Date.now() + ttlMs })
  return data
}
