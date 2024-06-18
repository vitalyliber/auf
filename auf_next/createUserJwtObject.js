export default function createUserJwtObject({
  id,
  email,
  deviceId,
  appId,
  roles,
}) {
  return {
    id,
    email,
    deviceId,
    appId,
    roles,
  };
}
