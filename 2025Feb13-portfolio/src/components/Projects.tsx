import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ProjectsList from "./ProjectsList"
import FooterSection from "./Footer"

const Projects = () => {
  return (
    <>
      <main className="lg:w-[1200px] h-full bg-red m-auto flex flex-col items-center h-[100vh] bg-[#18181B]">
        <div className="w-[90%] flex mt-20 flex-col gap-10">
          <div>
            <Avatar>
              <AvatarImage src="https://avatars.githubusercontent.com/u/104084880?v=4" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <article>
            <div className="w-[70%] mb-5">
            <h2 className="text-white text-5xl font-bold  leading-15 mb-3">Things I’ve made trying to put my dent in the universe.</h2>
            <p className="leading-7">I've worked on a few projects over the years but these are the ones that I'm most proud of.</p>
            </div>
            <div>
              < ProjectsList />
            </div>
            </article>
          </div>
        <FooterSection/>
      </main>
    </>
  )


};

export default Projects;
