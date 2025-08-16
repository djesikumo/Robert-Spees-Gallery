const UnderConstruction = () => {
  return (
    <main
      className="relative w-full flex flex-col bg-gray-100"
      style={{ height: "calc(100vh - 160px)" }}
    >
      <div className="absolute w-full h-full flex items-center justify-center text-black/25">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"
          className="portrait:w-[80%] portrait:h-auto landscape:h-[80%] landscape:w-auto"
        >
          <path fill="currentColor" d="M57.5 24.1c2.6 0 4.8-2.2 4.8-4.8v-3.2c0-2.1-1.4-4-3.4-4.6L27.9 2c-.5-.1-.9-.2-1.4-.2H14.2c-2.6 0-4.8 2.2-4.8 4.8v12.7c0 2.6 2.2 4.8 4.8 4.8H17v18.4H8c-3.4 0-6.2 2.8-6.2 6.2V56c0 3.4 2.8 6.2 6.2 6.2h22.5c3.4 0 6.3-2.8 6.3-6.2v-7.3c0-3.4-2.8-6.2-6.3-6.2h-9V24.1h28.6V35c0 2.1 1.5 4 3.6 4.5c2.7.7 4.4 3.4 3.9 6.2c-.4 2.1-2.2 3.9-4.3 4.3c-1.6.3-3.2-.1-4.5-1.2c-1.2-1-1.9-2.5-1.9-4.1q0-.9.3-1.8c.4-1.2-.2-2.5-1.4-2.9s-2.5.2-2.9 1.4a9.6 9.6 0 0 0-.6 3.3c0 2.9 1.3 5.7 3.5 7.6c1.8 1.5 4 2.3 6.4 2.3c.6 0 1.2-.1 1.8-.2c4-.7 7.3-4 8-8c.9-5.2-2.2-10-7.2-11.3c-.2 0-.2-.1-.2-.2V24.1zM32.3 48.7V56c0 1-.8 1.8-1.8 1.8H8c-1 0-1.8-.8-1.8-1.8v-7.3c0-.9.8-1.7 1.8-1.7h22.5c1 0 1.8.8 1.8 1.7m25.5-32.6v3.2q0 .3-.3.3H29.2V7l28.4 8.7c.1.1.2.2.2.4m-43.9 3.2V6.5q0-.3.3-.3h10.5v13.3H14.2c-.2.1-.3-.1-.3-.2" />
        </svg>
      </div>
      <div className="absolute w-full h-full flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 32 32">
          <path fill="#000000" d="M7.5 6A1.5 1.5 0 0 0 6 7.5H4A1.5 1.5 0 0 0 2.5 9v11A1.5 1.5 0 0 0 4 21.5h2V30h2v-8.5h16V30h2v-8.5h2a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 28 7.5h-2a1.5 1.5 0 0 0-3 0H9A1.5 1.5 0 0 0 7.5 6m-4 5.975L6.975 8.5h5.05L3.5 17.025zM4.975 20.5l12-12h5.05l-12 12zm22-12H28a.5.5 0 0 1 .5.5v3.025L20.025 20.5h-5.05zm1.525 8.475V20a.5.5 0 0 1-.5.5h-3.025z" />
        </svg>
        <h1 className="text-6xl text-center motion-safe:animate-bounce">
          Under Construction
        </h1>
        <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 32 32">
          <path fill="#000000" d="M7.5 6A1.5 1.5 0 0 0 6 7.5H4A1.5 1.5 0 0 0 2.5 9v11A1.5 1.5 0 0 0 4 21.5h2V30h2v-8.5h16V30h2v-8.5h2a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 28 7.5h-2a1.5 1.5 0 0 0-3 0H9A1.5 1.5 0 0 0 7.5 6m-4 5.975L6.975 8.5h5.05L3.5 17.025zM4.975 20.5l12-12h5.05l-12 12zm22-12H28a.5.5 0 0 1 .5.5v3.025L20.025 20.5h-5.05zm1.525 8.475V20a.5.5 0 0 1-.5.5h-3.025z" />
        </svg>
      </div>
    </main>
  )
}

export default UnderConstruction