
export default function FooterSection() {
  return (
    <>
      <footer className="w-full flex justify-center items-center font-bold bg-background mt-5 border-t-amber-950 px-4">
        <div className="mx-auto max-w-container">
          <div className="pt-0">
            <div className="mt-0 flex flex-col items-center gap-4 sm:flex-col md:flex-row">
              <p>© 2025 Gaurab Neupane. All rights reserved</p>
              <div className="flex items-center gap-4">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <div />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
