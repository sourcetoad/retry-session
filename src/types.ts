export type RetryCallback<R = any> = () => (R) | (Promise<R>);
export type TimeoutId = NodeJS.Timeout | string | number | undefined;
