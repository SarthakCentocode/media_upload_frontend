import { ResponseInterface } from "@/shared/interface/api-interface";

interface HeaderInterface {
  token: string;
  contentType: string;
}

export const apiResponse = (
  url: string,
  reqType: string,
  headers: HeaderInterface,
  body?: any
) => {
  if (!body) {
    return {
      url,
      method: reqType,
      headers: {
        Authorization: `Bearer ${headers.token}`,
      },
    };
  }

  const formData = new FormData();
  formData.append("file", body);

  return {
    url,
    method: reqType,
    headers: {
      Authorization: `Bearer ${headers.token}`,
      "Content-Type": headers.contentType || "",
    },
    body: formData,
  };
};

export const responseWrapper = async (response: any, meta: any) => {
  const statusCode = meta?.response?.status;

  if (statusCode !== 401) {
  }

  const result: ResponseInterface = {
    response: response,
    statusCode: statusCode,
  };
  return result;
};
