export type ApiResponse<T> = {
  data: T;
  meta: {
    total: number;
    count: number;
  };
  links: any;
  message: string;
  statusCode: number;
};
