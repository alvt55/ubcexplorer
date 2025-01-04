
export default function CardSkeleton() {

    const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';


    return (
        
        <div className={`${shimmer}`}>

        </div>
    )
}