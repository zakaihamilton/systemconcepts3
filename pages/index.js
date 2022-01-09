import Head from 'next/head'
import Window from "components/Window"
import Desktop from "components/Desktop"
import TaskBar from "components/Taskbar"

export default function Home() {
  return (
    <>
      <Head>
        <title>System Concepts 3</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Window.Stack>
        <Desktop>
          <Window.State label="Title">
            <Window>
            </Window>
          </Window.State>
          <Window.State label="Title 2" center>
            <Window>
            </Window>
          </Window.State>
          <Window.State label="Title 3">
            <Window>
            </Window>
          </Window.State>
        </Desktop>
        <TaskBar />
      </Window.Stack>
    </>
  )
}
