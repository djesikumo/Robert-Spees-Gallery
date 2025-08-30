import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/hooks";

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loadingLogin, setLoadingLogin] = useState<boolean>(false);
  const navigate = useNavigate();
  const { setAuthUser } = useAuth()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loadingLogin) return;
    setLoadingLogin(true);

    //Falsa llamada a la API
    setTimeout(() => {
      if (username !== "Rbt.Sps." || password !== "rbt.sps.") {
        alert("User invalid");
        setLoadingLogin(false);
        return;
      }
      const user = {
        username: "Rbt.Sps.",
        token: "token12345"
      }
      setAuthUser(user);
      localStorage.setItem("authUser", JSON.stringify(user));
      navigate("/admin")
      setLoadingLogin(false);
    }, 3000)
  }

  return (
    <main className="w-full flex items-center px-8 py-12 bg-gray-100"
      style={{ height: "calc(100vh - 160px)" }}
    >
      <div className="relative flex flex-col gap-2 w-2/5 p-8 rounded-lg bg-white text-gray-800 shadow-md mx-auto">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-2 justify-center p-8">
          <div className="flex flex-col min-w-[200px]">
            <input
              type="text"
              id="userInput"
              className="p-2 border border-gray-600 rounded-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </div>
          <div className="flex flex-col min-w-[200px]">
            <input
              type="password"
              id="passwordInput"
              className="p-2 border border-gray-600 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loadingLogin}
            className={`flex justify-center py-2 px-4 bg-blue-500 text-white text-base rounded-lg ${loadingLogin
              ? "cursor-not-allowed"
              : "transition-all duration-300 ease-in-out hover:scale-110 active:scale-105 cursor-pointer"
              }`}
          >
            {loadingLogin ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-loader-2 animate-spin">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 3a9 9 0 1 0 9 9" />
              </svg>
            ) : (
              <span>Login</span>
            )}
          </button>
        </form>
      </div>
    </main>
  )
}

export default LoginPage