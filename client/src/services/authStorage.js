const authStorageKey = "leadflow-auth";

const readStoredAuth = () => {
  const storedAuth = localStorage.getItem(authStorageKey);

  if (!storedAuth) {
    return { token: "", user: null };
  }

  try {
    return JSON.parse(storedAuth);
  } catch {
    return { token: "", user: null };
  }
};

const persistAuth = ({ token, user }) => {
  localStorage.setItem(authStorageKey, JSON.stringify({ token, user }));
};

export { persistAuth, readStoredAuth };
