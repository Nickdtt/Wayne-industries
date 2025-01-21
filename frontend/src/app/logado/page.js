export default function AccessGranted() {
    return (
      <div className="relative flex items-center justify-center min-h-screen bg-black text-white">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 bg-[url('https://wallpapercave.com/wp/wp2822007.jpg')] bg-cover bg-center opacity-20" />
  
        {/* Content */}
        <div className="relative z-10 text-center p-8 bg-zinc-900/80 backdrop-blur-sm rounded-lg shadow-2xl border border-zinc-800 max-w-lg">
          <h1 className="text-4xl font-bold mb-6">Acesso Liberado</h1>
          <p className="text-xl mb-8">
            Bem-vindo às Indústrias Wayne. Seu acesso foi verificado e autorizado.
          </p>
          <div className="mt-6 p-4 bg-zinc-800 rounded-md border border-zinc-700">
            <p className="text-sm text-zinc-400">
              Lembre-se: A segurança é nossa prioridade. Mantenha suas credenciais em sigilo.
            </p>
          </div>
        </div>
      </div>
    );
  }