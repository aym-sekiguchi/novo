import { z } from 'zod'

export const avatarSchema = z.object({ avatar: z.string().optional() })

export type AvatarSchemaType = z.infer<typeof avatarSchema>
