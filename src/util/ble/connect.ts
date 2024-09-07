// デバイスを要求する関数
export async function requestDevice() {
  const device = await navigator.bluetooth.requestDevice({
    acceptAllDevices: true
  });
  return device;
}

// デバイスに接続する関数
export async function connectToDevice(device: any) {
  const server = await device.gatt.connect();
  return server;
}
