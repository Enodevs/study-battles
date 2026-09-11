import { Text, type TextProps } from 'react-native';

import { ToneText, type Tone } from '@/constants/theme';
import { cn } from '@/utils/cn';

/** Steps of the type scale defined in `tailwind.config.js`. */
export type TextVariant =
  | 'display'
  | 'title'
  | 'heading'
  | 'subheading'
  | 'bodyLarge'
  | 'body'
  | 'label'
  | 'caption'
  | 'captionBold'
  | 'micro';

const VARIANT: Record<TextVariant, string> = {
  display: 'text-display font-extrabold tracking-[-0.5px]',
  title: 'text-title font-extrabold tracking-[-0.5px]',
  heading: 'text-heading font-extrabold tracking-[-0.3px]',
  subheading: 'text-subheading font-bold',
  bodyLarge: 'text-body-lg font-bold',
  body: 'text-body font-medium',
  label: 'text-label font-bold',
  caption: 'text-caption font-medium',
  captionBold: 'text-caption font-bold',
  micro: 'text-micro font-semibold',
};

export type ThemedTextProps = TextProps & {
  variant?: TextVariant;
  tone?: Tone;
};

/** The app's only text primitive: one type scale, one set of colour tones. */
export function ThemedText({
  variant = 'body',
  tone = 'fg',
  className,
  ...rest
}: ThemedTextProps) {
  return <Text className={cn(VARIANT[variant], ToneText[tone], className)} {...rest} />;
}
