import type { AuthRequestBody, AuthUser } from "../types/application";
import type { Education, Exhibition, Press, CV } from "../types/cv";

type HttpMethod = 'GET' | 'get' | 'POST' | 'post' | 'PUT' | 'put' | 'PATCH' | 'patch' | 'DELETE' | 'delete';
type RequestBody = AuthRequestBody | Omit<Education, "id"> | Omit<Exhibition, "id"> | Omit<Press, "id">;
type ResponseBody = AuthUser | { message: string } | CV;

interface RequestOptions<T = RequestBody, R = ResponseBody> {
  method: HttpMethod;
  body?: T;
  headers?: Record<string, string>;
  onSuccess?: (data: R) => Promise<void> | void;
  onError?: (error: Error | unknown) => void;
  onFinally?: () => void;
}

export async function request<T = RequestBody, R = ResponseBody>(
  endpoint: string, options: RequestOptions<T, R>
) {
  const {
    method,
    body,
    headers = {},
    onSuccess,
    onError,
    onFinally
  } = options;

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  };

  if (body !== undefined && body !== null) {
    config.body = body instanceof FormData ? body : JSON.stringify(body);

    // Si es FormData, eliminar Content-Type para que el navegador lo establezca con el boundary
    if (body instanceof FormData) {
      delete (config.headers as Record<string, string>)['Content-Type'];
    }
  }

  try {
    const response = await fetch(endpoint, config);
    if (!response.ok) {
      const errorDetail: { error: string } = await response.json();
      throw new Error(`Error in server response: ${errorDetail.error}`);
    }
    const result = await response.json();
    if (onSuccess) {
      const successResult = onSuccess(result);
      // Verificar si es una Promise
      if (successResult && typeof successResult.then === 'function') {
        await successResult; // Esperar si es async
      }
    };
  } catch (error: Error | unknown) {
    //if (error instanceof Error) notifications.error(error.message);
    //console.error(error);
    if (onError) onError(error);
  } finally {
    if (onFinally) onFinally();
  }
}