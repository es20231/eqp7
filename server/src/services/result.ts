type ServiceResult<T> = {
  ok: boolean;
  message: string;
  payload: T | undefined;
};

export { ServiceResult };
