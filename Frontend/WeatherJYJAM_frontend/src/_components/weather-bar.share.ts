export type BarVariant = 'temperature' | 'wind' | 'humidity' | 'custom'

export const BAR_GRADIENTS: Record<
  'temperature' | 'wind' | 'humidity',
  string
> = {
  temperature: 'linear-gradient(90deg, #9BE880 0%, #FFE47A 40%, #FF7A59 100%)',
  wind: 'linear-gradient(90deg, #9BB7E8 0%, #5D63E8 50%, #E85D76 100%)',
  humidity: 'linear-gradient(90deg, #E39BE8 0%, #8EA7FF 100%)',
}
