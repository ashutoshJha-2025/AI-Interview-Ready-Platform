import { useEffect, useRef } from "react";
import { Lottie } from "lottie-react";

const LottieIcon = ({ animationData, size = 80, cursor = 'default', className = '' }) => {
    const lottieRef = useRef();

    useEffect(() => {
        lottieRef.current?.play();
    }, []);

    const handleClick = () => {
        lottieRef.current?.stop();
        lottieRef.current?.play();
    };

    return (
        <div
            onClick={handleClick}
            style={{
                width: size,
                height: size,
            }}
            className={` cursor-${cursor} ${className}`}
        >
            <Lottie
                lottieRef={lottieRef}
                animationData={animationData}
                autoplay={false}
                loop={false}
            />
        </div >
    );
};

export default LottieIcon;