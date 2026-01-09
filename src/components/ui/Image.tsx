import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { cn } from '@/lib/utils/cn';

export type ImageProps = NextImageProps & {
  className?: string;
};

export function Image({ className, ...props }: ImageProps) {
  return <NextImage className={cn(className)} {...props} />;
}
