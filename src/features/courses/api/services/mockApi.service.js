function wait(durationMs) {
  return new Promise((resolve) => {
    globalThis.setTimeout(resolve, durationMs)
  })
}

export async function simulateMockRequest(factory, durationMs = 240) {
  await wait(durationMs)
  return factory()
}
