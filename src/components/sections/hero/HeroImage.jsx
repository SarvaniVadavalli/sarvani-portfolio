import portraitAsset from '../../../assets/1.jpeg';
import Lanyard from '../../animations/Lanyard';

export default function HeroImage({ className = '' }) {
  return (
    <div
      className={`relative w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[500px] xl:max-w-[540px] h-[580px] sm:h-[620px] lg:h-[680px] xl:h-[720px] flex items-center justify-center select-none ${className}`}
      aria-label="Sarvani Vadavalli — Interactive Physics Lanyard Portrait"
    >
      <Lanyard
        position={[0, -0.65, 12.8]}
        gravity={[0, -40, 0]}
        fov={20}
        frontImage={portraitAsset}
      />
    </div>
  );
}
