import axios from 'axios'
import { FormEvent, useEffect, useState } from 'react'
import gameController from '../assets/GameController.png'

interface Game {
    id: string
    title: string
}

interface Props {
    isOpen: boolean
    onClose: () => void
}

export function AdModal({ onClose, isOpen }: Props) {
    const [games, setGames] = useState<Game[]>([])


    const [selectedWeekDays, setSelectedWeekDays] = useState<number[]>([])

    const handleCheckButton = (weekDay: number) => {
        if (selectedWeekDays.includes(weekDay)) {
            setSelectedWeekDays(selectedWeekDays.filter(checkedButton => checkedButton != weekDay))
        } else {
            setSelectedWeekDays([...selectedWeekDays, weekDay])
        }
    }

    async function createAd(event: FormEvent) {
        event.preventDefault()

        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)

        try {
            await axios.post(`http://localhost:3000/games/${data.game}/ads`, {
                discord: data.discord,
                hoursEnd: data.hoursEnd,
                hourStart: data.hourStart,
                name: data.name,
                useVoiceChannel: data.useVoiceChannel ? true : false,
                weekDays: selectedWeekDays,
                yearsPlaying: Number(data.yearsPlaying),
                createdAt: new Date(),
            })

        } catch (err) {
            console.log(err)
        }

        document.location.reload();
    }


    useEffect(() => {
        fetch('http://localhost:3000/games')
            .then(response => response.json())
            .then(data => {
                setGames(data)
            })
    }, [])

    return (
        <section style={{ display: isOpen ? 'flex' : 'none' }} className='bg-[#2A2634]/80 hidden absolute items-center justify-center top-0 bottom-0 left-0 right-0'>
            <form onSubmit={createAd} id='modal' className='bg-[#2A2634] gap-4 text-white flex flex-col w-[30.5rem] h-[45.5rem] px-10 py-8'>

                <div className='font-black h-[51px] mb-8 text-mediumTitle'>
                    <p>Publique um anúncio</p>
                </div>

                <div className='flex font-semibold text-base gap-2 flex-col'>
                    <label htmlFor='game'>Qual o game?</label>
                    <select
                        id='game'
                        name='game'
                        className='rounded-[4px] w-[25.5rem] bg-zinc-900 py-3 px-4'>
                        <option value="">Selecione o que você quer jogar</option>

                        {games.map(game => <option key={game.id} value={game.id}>{game.title}</option>)}

                    </select>

                </div>

                <div className='flex font-semibold text-base gap-2 flex-col'>
                    <label htmlFor='name'>Seu nome (ou nickname)</label>
                    <input id='name' name='name' placeholder='Como te chama dentro do game?' className='rounded-[4px] w-[25.5rem] bg-zinc-900 py-3 px-4' />
                </div>

                <div className='flex font-semibold text-base gap-6'>

                    <div className='gap-2'>
                        <label htmlFor='yearsPlaying'>Joga há quantos anos?</label>
                        <input id='yearsPlaying' name='yearsPlaying' placeholder='Tudo bem ser ZERO' className='rounded-[4px] w-[12rem] bg-zinc-900 py-3 px-4' />
                    </div>

                    <div className='gap-2'>
                        <label htmlFor='discord'>Qual seu Discord?</label>
                        <input id='discord' name='discord' placeholder='Usuario#0000' className='rounded-[4px] w-[12rem] bg-zinc-900 py-3 px-4' />
                    </div>

                </div>

                <div className='flex font-semibold text-base gap-6'>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor='weekDays'>Quando costuma jogar?</label>

                        <div className='flex flex-wrap gap-1'>
                            <button type='button' onClick={() => handleCheckButton(0)} title='Domingo' className={`${selectedWeekDays.includes(0) ? 'bg-violet-500' : 'bg-zinc-900'} w-10 h-10  py-2 px-3`}>D</button>
                            <button type='button' onClick={() => handleCheckButton(1)} title='Segunda' className={`${selectedWeekDays.includes(1) ? 'bg-violet-500' : 'bg-zinc-900'} w-10 h-10  py-2 px-3`} >S</button>
                            <button type='button' onClick={() => handleCheckButton(2)} title='Terça' className={`${selectedWeekDays.includes(2) ? 'bg-violet-500' : 'bg-zinc-900'} w-10 h-10  py-2 px-3`} >T</button>
                            <button type='button' onClick={() => handleCheckButton(3)} title='Quarta' className={`${selectedWeekDays.includes(3) ? 'bg-violet-500' : 'bg-zinc-900'} w-10 h-10  py-2 px-3`}>Q</button>
                            <button type='button' onClick={() => handleCheckButton(4)} title='Quinta' className={`${selectedWeekDays.includes(4) ? 'bg-violet-500' : 'bg-zinc-900'} w-10 h-10  py-2 px-3`}>Q</button>
                            <button type='button' onClick={() => handleCheckButton(5)} title='Sexta' className={`${selectedWeekDays.includes(5) ? 'bg-violet-500' : 'bg-zinc-900'} w-10 h-10  py-2 px-3`}>S</button>
                            <button type='button' onClick={() => handleCheckButton(6)} title='Sabado' className={`${selectedWeekDays.includes(6) ? 'bg-violet-500' : 'bg-zinc-900'} w-10 h-10  py-2 px-3`}>S</button>
                        </div>

                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor='hourStart'>Qual horario do dia costuma jogar?</label>

                        <div className='flex gap-2'>
                            <input id='hourStart' type='time' name='hourStart' placeholder='De' className='w-22 h-10 py-2 px-3 rounded-[4px] bg-zinc-900' />
                            <input id='hoursEnd' type='time' name='hoursEnd' placeholder='Até' className='w-22 h-10 py-2 px-3 rounded-[4px] bg-zinc-900' />
                        </div>

                    </div>

                </div>

                <div className='flex gap-2 mt-3 mb-8'>
                    <input type="checkbox" name="useVoiceChannel" id="" className='w-6 h-6 accent-zinc-900' />
                    <label htmlFor="" className='font-normal'>Costumo me conectar ao chat de voz</label>
                </div>

                <div className='mb-8 flex gap-4 justify-end'>
                    <button type='button' onClick={() => onClose()} className='bg-zinc-500 w-24 h-12 py-3 px-5 rounded-[4px]'>Cancelar</button>

                    <button type='submit' className='bg-violet-500 py-3 px-5 flex gap-3 rounded-[4px]'><img src={gameController} alt="" />Encontrar duo</button>
                </div>

            </form>
        </section>)
}