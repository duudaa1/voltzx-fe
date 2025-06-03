"use client"
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import logo from './public/voltz-x-logo-dark.png';

export default function Home() {
  const router = useRouter();

  return (
    <div className="font-sans">
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
        <div className="text-2xl font-bold text-yellow-500">
          <Link href="/">
            <Image
              src="/voltz-x-logo-dark.png"
              alt="Logo VoltzX"
              className="h-10 w-auto"
              width={160}
              height={40}
            />

          </Link>
        </div>

        <nav className="space-x-6 text-sm font-medium text-gray-700">
          <a href="#sobre">Sobre</a>
          <a href="#servicos">Serviços</a>
          <a href="#contato">Contato</a>
          <button
            onClick={() => router.push('/register')}
            className="bg-yellow-400 px-4 py-2 rounded font-semibold text-white hover:bg-yellow-500"
          >
            Comece já!
          </button>
        </nav>
      </header>

      <main className="px-6 py-10 text-center">
        <section id="sobre" className="flex flex-col md:flex-row items-start justify-center gap-8 px-6 py-10">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4 text-black text-left">
              Transformamos terra em energia, conexão em oportunidade e sol em progresso.
            </h1>
            <p className="text-gray-700 text-left">
              A VoltzX é a conexão inteligente que transforma o potencial do sol em oportunidades reais de negócio. Com tecnologia de ponta e foco em sustentabilidade, fazemos da inovação o combustível para gerar impacto positivo e resultados concretos.
            </p>
          </div>

          <div className="w-48 md:w-64">
            <img
              src="/energia.png" // substitua pelo caminho correto da sua imagem
              alt="Energia e sustentabilidade"
              className="w-full"
            />
          </div>
        </section>

        <section id="servicos" className="bg-yellow-100 py-10 px-6 md:px-16 lg:px-24">
          <h2 className="font-bold text-lg mb-6 text-black">
            Somos a <span className="underline text-orange-400">ponte</span> entre proprietários de terrenos, empresas inovadoras e investidores estratégicos, unindo forças para acelerar a <span className="underline text-orange-400">revolução da energia solar</span> no Brasil.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-orange-400 text-white p-6 rounded">
              <h3 className="font-bold text-lg mb-2">Para Proprietários de Terrenos</h3>
              <p className="text-sm">
                Cadastram terrenos e os disponibilizam no marketplace, recebem propostas de empresas para desenvolvimento de projetos solares, aprovam ou rejeitam essas propostas e acompanham o andamento dos projetos e ofertas de investimento no painel de monitoramento.
              </p>
              <button onClick={() => window.location.href = 'https://voltzx.com/'}
                      className="mt-4 bg-yellow-400 text-black px-4 py-2 rounded">Saiba mais</button>
            </div>

            <div className="bg-orange-400 text-white p-6 rounded">
              <h3 className="font-bold text-lg mb-2">Para Empresas de Energia Solar</h3>
              <p className="text-sm">
                Buscam terrenos no marketplace, criam e vinculam projetos solares, enviam propostas aos proprietários e gerenciam as ofertas de investimento feitas por investidores, tudo com relatórios dedicados e transparência para garantir decisões ágeis e transparentes nos projetos.
              </p>
              <button onClick={() => window.location.href = 'https://voltzx.com/'}
                      className="mt-4 bg-yellow-400 text-black px-4 py-2 rounded">Saiba mais</button>
            </div>

            <div className="bg-orange-400 text-white p-6 rounded">
              <h3 className="font-bold text-lg mb-2">Para Investidores</h3>
              <p className="text-sm">
                Visualizam projetos disponíveis para investimento, enviam ofertas financeiras, participam da aprovação conjunta com empresas e proprietários, e monitoram o desempenho dos projetos investidos por meio de um painel dedicado com comunicação centralizada.
              </p>
              <button onClick={() => window.location.href = 'https://voltzx.com/'}
                      className="mt-4 bg-yellow-400 text-black px-4 py-2 rounded">Saiba mais</button>
            </div>
          </div>
        </section>
      </main>

    <footer id="contato" className="text-white py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center space-y-6">
            <Image
              src="/voltz-x-logo-dark.png"
              alt="Logo VoltzX"
              className="h-10 w-auto"
              width={160}
              height={40}
            />
        <div className="flex space-x-6">
          <Link href="#" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="orange" viewBox="0 0 24 24">
              <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8.5H4.5V24H.5V8.5zm7.5 0H12v2.1h.1c.5-1 1.7-2.1 3.5-2.1 3.7 0 4.4 2.4 4.4 5.6V24h-4v-7.5c0-1.8 0-4-2.5-4s-2.9 2-2.9 3.9V24h-4V8.5z" />
            </svg>
          </Link>
          <Link href="#" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="orange" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35C.597 0 0 .6 0 1.333v21.334C0 23.4.597 24 1.325 24H12.82V14.708h-3.29v-3.62h3.29V8.413c0-3.258 1.994-5.034 4.906-5.034 1.396 0 2.595.104 2.946.15v3.414l-2.022.001c-1.586 0-1.892.753-1.892 1.857v2.436h3.784l-.493 3.62h-3.29V24h6.456c.728 0 1.324-.6 1.324-1.333V1.333C24 .6 23.403 0 22.675 0z" />
            </svg>
          </Link>
          <Link href="#" aria-label="YouTube">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="orange" viewBox="0 0 24 24">
              <path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.12C19.388 3.5 12 3.5 12 3.5s-7.388 0-9.386.566A2.994 2.994 0 0 0 .502 6.186C0 8.192 0 12 0 12s0 3.808.502 5.814a2.994 2.994 0 0 0 2.112 2.12C4.612 20.5 12 20.5 12 20.5s7.388 0 9.386-.566a2.994 2.994 0 0 0 2.112-2.12C24 15.808 24 12 24 12s0-3.808-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </Link>
          <Link href="#" aria-label="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="orange" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.33 3.608 1.305.975.975 1.243 2.242 1.305 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.33 2.633-1.305 3.608-.975.975-2.242 1.243-3.608 1.305-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.33-3.608-1.305-.975-.975-1.243-2.242-1.305-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.849c.062-1.366.33-2.633 1.305-3.608C4.513 2.663 5.78 2.395 7.146 2.333 8.411 2.275 8.791 2.163 12 2.163zM12 0C8.741 0 8.332.014 7.052.072 5.771.13 4.638.35 3.675 1.313c-.963.963-1.183 2.096-1.241 3.377C2.014 5.669 2 6.078 2 9.337v5.326c0 3.259.014 3.668.072 4.948.058 1.281.278 2.414 1.241 3.377.963.963 2.096 1.183 3.377 1.241 1.281.058 1.69.072 4.948.072s3.668-.014 4.948-.072c1.281-.058 2.414-.278 3.377-1.241.963-.963 1.183-2.096 1.241-3.377.058-1.281.072-1.69.072-4.948V9.337c0-3.259-.014-3.668-.072-4.948-.058-1.281-.278-2.414-1.241-3.377-.963-.963-2.096-1.183-3.377-1.241C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
            </svg>
          </Link>
        </div>

        <p className="text-sm text-gray-400 cursor-pointer hover:underline">
          Preferências de cookies
        </p>

        <p className="text-sm text-gray-500">
          © 2025 VoltzX • Todos os direitos reservados
        </p>
      </div>
    </footer>

    </div>
  );
}