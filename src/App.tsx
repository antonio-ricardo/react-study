import './styles/main.css'

import { useState, useEffect } from 'react'

import logoImg from './assets/logo.svg'
import rightArrow from './assets/rightArrow.png'
import leftArrow from './assets/leftArrow.png'
import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import { AdModal } from './components/AdModal'

interface Game {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  useEffect(() => {
    fetch('http://localhost:3000/games')
      .then(response => response.json())
      .then(data => {
        setGames(data)
      })
  }, [])

  return (
    <div className='flex flex-col max-w-[1344px] max-h-40 mx-auto items-center my-20 '>
      <img src={logoImg} alt='' className='max-w-[1344px] max-h-40' />

      <h1 className='text-white text-bigTitle font-black mt-20 w-[560px]'>Seu <span className='text-transparent bg-nlw bg-clip-text'>duo</span> está aqui.</h1>

      <div className='flex gap-6 mt-16 mx-6 mb-8'>

        <button>
          <img src={leftArrow} alt='' />
        </button>

        {games.map((game) =>
          <GameBanner
            key={game.id}
            gameName={game.title}
            adsQuantity={game._count.ads}
            bannerUrl={game.bannerUrl} />
        )}

        <button>
          <img src={rightArrow} alt='' />
        </button>

      </div>

      <CreateAdBanner
        onOpenModal={() => setIsModalOpen(true)}
      />

      <AdModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />


    </div>
  )
}

export default App
