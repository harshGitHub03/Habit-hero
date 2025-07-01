import image1 from "../assets/aboutPageImages/image1.jpg"
import image2 from "../assets/aboutPageImages/image2.jpg"
import image3 from "../assets/aboutPageImages/image3.jpg"
import image4 from "../assets/aboutPageImages/image4.jpg"
import image5 from "../assets/aboutPageImages/image5.jpg"
import image6 from "../assets/aboutPageImages/image6.jpg"
import image7 from "../assets/aboutPageImages/image7.jpg"
import image8 from "../assets/aboutPageImages/image8.jpg"
import BuiltFor from "../Components/About page components/BuiltFor"
import CallToActionEnd from "../Components/About page components/CallToActionEnd"
import HowItWorks from "../Components/About page components/HowItWorks"
import WhyHabitHero from "../Components/About page components/WhyHabitHero"

const AboutPage = () => {
    return <>
        <div className="relative overflow-hidden bg-[#f1f1f1] h-[100vh] w-full flex items-center justify-center">
            {/* written content */}
            <div className="flex items-center z-20 flex-col h-fit">
                <span className="text-[40px] font-[400]">What is Habit Hero?</span>
                <span className="text-xl">Level Up Your Life, One Habit at a Time.</span>
            </div>

            <img src={image1} className="h-[60vh] shadow-2xl rotate-[12deg] absolute top-[15vh] left-[-2vw] border-white border-[4px]" />
            <img src={image2} className="h-[26vh] shadow-2xl absolute top-[10vh] left-[-4vw] z-10 rotate-[-8deg] border-white border-[4px]" />
            <img src={image3} className="h-[26vh] shadow-2xl absolute top-[-4vh] right-[-2vw] h-[60vh] z-10 rotate-[9deg] border-white border-[4px]" />
            <img src={image4} className="h-[26vh] shadow-2xl absolute top-[6vh] right-[4vw] h-[30vh] z-10 rotate-[-5deg] border-white border-[4px]" />
            <img src={image5} className="h-[26vh] shadow-2xl absolute bottom-[-7vh] rotate-[8deg] left-[7vw] z-10 rotate-[-5deg] border-white border-[4px]" />
            <img src={image6} className="h-[30vh] shadow-2xl absolute right-[55vh] bottom-[-2vw] z-10 rotate-[-6deg] border-white border-[4px]" />
            <img src={image7} className="h-[26vh] shadow-2xl absolute right-[20vh] bottom-[-2vw] z-10 rotate-[14deg] border-white border-[4px]" />
            <img src={image8} className="h-[26vh] shadow-2xl absolute right-[35vh] bottom-[-8vw] z-10 h-[55vh] rotate-[8deg] border-white border-[4px]" />
        </div>

        <WhyHabitHero />
        <BuiltFor/>
        <HowItWorks/>
        <CallToActionEnd/>
    </>
}

export default AboutPage;