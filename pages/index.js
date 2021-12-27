import Head from 'next/head'
import Window from "components/Window"

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Window>
          <Window.Title>
            <Window.Title.Label>
              Title
            </Window.Title.Label>
          </Window.Title>
        </Window>
      </main>
    </>
  )
}
