export * from './types';
export * from './plugin-hook';
export * from './plugin-context';
export * from './plugin-manager';

// Re-export Public decorator for convenience
export const Public = () => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
  return descriptor;
};
