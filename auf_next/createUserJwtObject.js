export default function createUserJwtObject({
  id,
  email,
  deviceId,
  appId,
  roles,
}) {
  if (!id || !email || !deviceId || !appId) {
    throw("You should have included some parameters when creating the JWT object");
  }

  return {
    id,
    email,
    deviceId,
    appId,
    roles,
  };
}
