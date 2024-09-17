// デバイスを要求
export async function requestDevice(options?: Object) {
  const device = await navigator.bluetooth.requestDevice(options);
  return device;
}
