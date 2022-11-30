interface GameBannerProps {
    gameName: string
    adsQuantity: number
    bannerUrl: string
}


export function GameBanner(props: GameBannerProps) {
    
    
    return (
        <a href="" className='relative rounded-lg overflow-hidden'>
            <img src={props.bannerUrl} alt="" className="max-h-60" />

            <div className='bg-game-text w-full pt-16 pb-4 px-4 absolute left-0 bottom-0 right-0'>
                <strong className='text-white font-bold block'>{props.gameName}</strong>
                <span className='font-normal text-sm text-zinc-300 block'>{props.adsQuantity} anúncios</span>
            </div>

        </a>
    )
}