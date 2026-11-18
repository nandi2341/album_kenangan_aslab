import 'server-only'
import { createClient, type SanityClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.SANITY_API_VERSION || '2025-01-01'

export const isSanityConfigured = Boolean(projectId)

export const readClient: SanityClient | null = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: 'published',
      token: process.env.SANITY_API_READ_TOKEN,
    })
  : null

export const writeClient: SanityClient | null =
  projectId && process.env.SANITY_API_WRITE_TOKEN
    ? createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: false,
        token: process.env.SANITY_API_WRITE_TOKEN,
      })
    : null

export const SANITY_TAG = 'sanity'

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T | null> {
  if (!readClient) return null
  try {
    return await readClient.fetch<T>(query, params, {
      next: { revalidate: 300, tags: [SANITY_TAG] },
    })
  } catch (error) {
    console.error('[sanity] fetch failed:', (error as Error).message)
    return null
  }
}
