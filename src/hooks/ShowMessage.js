import { message } from "antd";

export function ShowMessageLoading(url) {
  const key = url?.toLowerCase();
  return message.loading({
    key,
    type: "loading",
    content: "Loading...",
    duration: 30,
  });
}

export function ShowMessageSuccess(text, url) {
  const key = url?.toLowerCase();
  return message.success({
    key,
    type: "success",
    content: text,
    duration: 2,
  });
}

export function ShowMessageError(text, url) {
  const key = url?.toLowerCase();
  return message.error({
    key,
    type: "error",
    content: text,
    duration: 2,
  });
}

export function ShowMessageInfo(text, url) {
  const key = url?.toLowerCase();
  return message.info({
    key,
    type: "info",
    content: text,
    duration: 2,
  });
}

export function ShowMessageDelete(text, url) {
  const key = url?.toLowerCase();
  return message.warning({
    key,
    type: "warning",
    content: text,
    duration: 2,
  });
}
