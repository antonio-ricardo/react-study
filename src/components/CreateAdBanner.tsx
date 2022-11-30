import magnifyingGlass from '../assets/magnifyingGlassPlus.png'

interface Props {
    onOpenModal: () => void
}

export function CreateAdBanner({onOpenModal}: Props) {

    return (<section className='w-[88.5%] mx-[7rem] mb-[8.25rem] bg-nlw pt-1 rounded-md'>

        <div className='bg-[#2A2634] flex justify-between'>

            <div className='py-6 pl-8'>
                <h2 className='text-white text-smallTitle font-black'>Não encontrou seu duo?</h2>
                <p className='text-[#A1A1AA]'>Publique um anúncio para encontrar novos players!</p>
            </div>

            <div className=''>
                <button onClick={() => onOpenModal()} className='bg-[#8B5CF6] m-8 w-48 h-12 rounded-md flex px-4 gap-3 items-center'> <img src={magnifyingGlass} alt="" /> Publicar anúncio</button>
            </div>

        </div>

    </section>)
}

function open() {
    const modal = document.getElementById("modal-background");
  
    if (modal) {
        modal.style.display = 'flex'
    }
  }
  