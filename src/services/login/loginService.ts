export interface IUser {
  status: number;
  displayName: string | null;
  email: string | null;
  uid: string;
  photoURL: string | null;
}

type callbackAuthGG = () => Promise<IUser>;

export const loginService = async (signInWithGoogle: callbackAuthGG) => {
  const res = await signInWithGoogle();
  if (!res) return;
  localStorage.setItem("user", JSON.stringify(res));
  return res;
};
