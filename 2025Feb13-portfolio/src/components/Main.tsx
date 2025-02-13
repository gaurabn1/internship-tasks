import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import FooterSection from './Footer.tsx'
import './App.css'
import socialMedia from './SocialMedia.ts'
import images from './Images.ts'

export default function Main() {
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
          <div className="flex flex-col gap-5">
            <h2 className="text-white text-5xl font-bold">Full Stack Web Developer</h2>
            <p>I am <span>Gaurab Neupane</span>. I am a Full Stack Web Developer. </p>
            <p>Python | Django | React | Next.js</p>
            <div className="flex gap-4">
              {
                socialMedia.map((item) => {
                  return (
                    <a class="group -m-1 p-1" aria-label={ item.label } href={ item.href }>
                      <svg viewBox="0 0 24 24" aria-hidden="true" className={ item.icon.className }><path d={ item.icon.path }></path><path d={item.icon.path2}></path></svg>
                    </a>
                  )
                })
              }
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-20 w-[90%] mt-10">
          <div className="flex gap-10 -ml-[25%]">
            {
              images.map((image) => 
                    image.id % 2 == 0 ?
                    <img src={ image.image } className=" aspect-square rotate-5" width="300" height="300" alt="" />
                    :
                    <img src={ image.image } width="300" className="aspect-square" height="300" alt="" />
              )
            }
          </div>
          <div className="w-sm flex ">
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="flex gap-3">
                    <span>
                      <svg viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="h-6 w-6 flex-none"><path d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z" class="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"></path><path d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6" class="stroke-zinc-400 dark:stroke-zinc-500"></path></svg>
                    </span>
                    <span className="font-bold mb-3">Stay up to date</span>
                  </div>

                </CardTitle>
                <CardDescription>
                  <p className="w-sm leading-6">Get notified when I publish something new, and unsubscribe at any time.</p>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-5">
                  <Input type="email" placeholder="Email address" />
                  <Button variant="outline">Subscribe</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="w-[90%]">
          <FooterSection />
        </div>
      </main>

    </>
  )
}
