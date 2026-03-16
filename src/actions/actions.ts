export function addTimestamp(payload: any) {
  return {
    ...payload,
    processed_at: new Date().toISOString()
  };
}

export function uppercase(payload: any) {
  if (payload.event) {
    return {
      ...payload,
      event: payload.event.toUpperCase()
    };
  }

  return payload;
}

export function filterEvent(payload: any) {
  if (payload.event === "ignore") {
    return null;
  }

  return payload;
}
