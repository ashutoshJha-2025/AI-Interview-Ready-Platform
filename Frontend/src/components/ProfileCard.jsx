import userIconAnimation from '../assets/wired-lineal-21-avatar-hover-looking-around.json'
import { useRef, useEffect } from 'react';
import { Lottie } from "lottie-react";
import { Mail, MapPin, Star, Pencil, ShieldCheck } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const ProfileCard = ({ data = {} }) => {
    console.log(data)
    const lottieRef = useRef();
    const navigate = useNavigate()

    useEffect(() => {
        lottieRef.current?.play();
    }, []);

    const handleClick = () => {
        lottieRef.current?.stop();
        lottieRef.current?.play();
    };

    return (
        <>
            <div className="w-full bg-linear-to-br from-[#0B4D3B] to-[#073C2E] rounded-3xl flex flex-col items-center py-6 px-6 shadow-lg shadow-[#0B4D3B]/15 transition-shadow hover:shadow-xl hover:shadow-[#0B4D3B]/20">

                <div className="w-full flex justify-end -mb-2">
                    <span className="text-[#073C2E] bg-[#C9A24B] font-semibold text-[11px] tracking-wide px-3 py-1 rounded-full">
                        {data?.profileDetails?.fieldOfExpertise}
                    </span>
                </div>

                <div className="w-22 h-22 my-4 rounded-full border-2 border-[#C9A24B] bg-[#F8E7C9]/10 flex items-center justify-center">
                    <Lottie
                        lottieRef={lottieRef}
                        onClick={handleClick}
                        src={userIconAnimation}
                        loop={false}
                        autoplay={true}
                        style={{ width: "80%", height: "80%", cursor: "pointer" }}
                    />
                </div>

                <span className="text-[#F8E7C9] text-lg font-semibold">{data?.profileDetails?.profileName || null}</span>
                <span className="text-[#F8E7C9]/65 text-sm mb-4">{data?.userInfo?.username || null}</span>

                <div className="w-full border-t border-dashed border-[#F8E7C9]/25 mb-4" />

                <div className="w-full flex flex-col gap-3 mb-5 text-[#F8E7C9] text-sm">
                    <div className="flex items-center gap-2">
                        <ShieldCheck size={16} className="text-[#C9A24B]" />

                        {data?.userInfo?.isVerified === true ? (
                            <span className='text-green-400'>Verified</span>
                        ) : (
                            <span className='text-red-400'>Unverified</span>
                        )}
                    </div>
                    <div className="flex items-center gap-2.5">
                        <MapPin size={16} className="text-[#C9A24B]" />
                        <span>{data?.profileDetails?.location || null}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <Mail size={16} className="text-[#C9A24B]" />
                        <span className="truncate">{data?.userInfo?.email || null}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <Star size={16} className="text-[#C9A24B]" />
                        <span>Avg. Score: {data?.profileDetails?.averageScore || 0}</span>
                    </div>
                </div>

                <button
                    onClick={() => navigate('/profile/edit-details')}
                    type="button"
                    className="w-full flex items-center justify-center gap-2 text-[#073C2E] bg-[#C9A24B] text-sm font-semibold rounded-xl px-6 py-2.5 cursor-pointer transition-all hover:bg-[#E0BB63] hover:-translate-y-0.5"
                >
                    <Pencil size={16} />
                    Edit Details
                </button>
            </div>
        </>
    )
}

export default ProfileCard
