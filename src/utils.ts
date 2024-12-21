import { CloudinaryImage } from '@cloudinary/url-gen/assets/CloudinaryImage';
import { format, getYear } from 'date-fns';

export const getDate = (time: number) => `${format(new Date(time), 'LLLL')}, ${getYear(time)}`;

export const getCloudinaryBuilder = (path: string) => new CloudinaryImage(path, { cloudName: process.env.CLOUDINARY_CLOUD_NAME || 'dst8gfvqc' })
