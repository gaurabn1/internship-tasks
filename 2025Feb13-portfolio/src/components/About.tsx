import FooterSection from './Footer.tsx'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import socialMedia from './SocialMedia.ts'

const About = () => {
  return (
    <>
      <main className="lg:w-[1200px] h-full bg-red m-auto flex flex-col gap-10 items-center h-[100vh] bg-[#18181B]">
        <div className="w-[90%] flex mt-20 flex-col gap-10">
          <div>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <article className="flex gap-25 w-[90%]">
          <div className="w-[50%] flex flex-col gap-5">
            <h2 className="text-4xl leading-13 font-extrabold">I’m Gaurab Neupane. I live in Kathmandu, Nepal, where I design the future.</h2>
            <p className="leading-7">I’ve loved making things, I wrote my first program when I was 15 years old, just two weeks after my dad brought home the brand ASUS V6J that I taught myself to type on. </p>
            <p className="leading-7">This was my introduction to the world of computer programming, and it sparked a passion in me that has only grown stronger over the years.</p>
            <p className="leading-7">As I delved deeper into the world of programming, I began to explore different languages and technologies. I spent countless hours online, reading tutorials and watching videos to learn new skills and expand my knowledge.</p>
            <p className="leading-7">My journey as a programmer has not been without its challenges, however, and I've encountered many obstacles along the way. I've had to push through difficult times and use online resources to find solutions to the problems I've faced.</p>
          </div>
          <div className="w-[50%] flex flex-col gap-5">
            <img src="https://avatars.githubusercontent.com/u/104084880?v=4" className="aspect-square scale-x-[-1] rounded-full border-1" height="400" width="400"   alt="" />
            <div className="mt-5 flex flex-col gap-5">
              {
                socialMedia.map((item) => {
                  return (
                  <a href={ item.href} className="flex gap-5 items-center">
                    <span>
                      <svg viewBox="0 0 24 24" aria-hidden="true" class={ item.icon.className }><path d={ item.icon.path }></path> <path d={item.icon.path2}></path> </svg>
                    </span>
                    <p className="">{ item.label }</p>
                  </a>
                  )
                })
              }
            </div>
          </div>
        </article>
        <FooterSection />
      </main>
    </>
  )
};

export default About;
