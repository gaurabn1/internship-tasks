import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import FooterSection from "./Footer"

const Uses = () => {
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
            <div className="w-[70%]">
            <h2 className="text-white text-5xl font-bold  leading-15 mb-3">Software I use, gadgets I love, and things I recommend.</h2>
            <p className="leading-7">I get asked a lot about the things I use to build software, stay productive, or buy to fool myself into thinking I’m being productive when I’m really just procrastinating. Here’s a big list of all of my favorite stuff.</p>
            </div>
            <div className="flex gap-10 mt-10">
              <section className="border-l-1"></section>
              <div className="flex gap-10 flex-col">
              <div className="flex flex-row gap-30">
                <h2 className="font-bold w-[30%]">Workstation</h2>
                <div className="flex flex-col gap-10">
                  <div className="w-[80%]">
                    <h2 className="font-bold mb-3">15.6'' Full HD Dell Inspiron 15 3511</h2>
                    <p className="leading-7">I was using an Intel-based 16” MacBook Pro prior to this and the difference is night and day. I’ve never heard the fans turn on a single time, even under the incredibly heavy loads I put it through with our various launch simulations.</p>
                  </div>
                  <div className="w-[80%]">
                    <h2 className="font-bold mb-3">Lenovo Mouse</h2>
                    <p className="leading-7">I started using this mouse for a while. I love it.</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-20">
                <h2 className="font-bold w-[30%]">Development tools</h2>
                <div className="flex flex-col gap-10">
                  <div className="w-[80%]">
                    <h2 className="font-bold mb-3">Neovim</h2>
                    <p className="leading-7">I don't care if it's not as flashy as some other editors, Neovim's simplicity, customizability, and raw editing power make it the perfect tool for me - it's the editor I always come back to.</p>
                  </div>
                  <div className="w-[80%]">
                    <h2 className="font-bold mb-3">Alacritty</h2>
                    <p className="leading-7">I'm not sure what features it adds, but I love this terminal for it's speed and customization options even though it is not a default terminal for Ubuntu - they've won me over.</p>
                  </div>
                  <div className="w-[80%]">
                    <h2 className="font-bold mb-3">TablePlus</h2>
                    <p className="leading-7">Great software for working with databases. Has saved me from building about a thousand admin interfaces for my various projects over the years.</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-15">
                <h2 className="font-bold w-[30%]">Design</h2>
                <div className="flex flex-col gap-10">
                  <div className="w-[80%]">
                    <h2 className="font-bold mb-3">Figma</h2>
                    <p className="leading-7">I started using Figma as just a design tool but now it’s become my virtual whiteboard. Never would have expected the collaboration features to be the real hook.</p>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </article>
        </div>
        <FooterSection />
      </main>
    </>
  );
};

export default Uses;
