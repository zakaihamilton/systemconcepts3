import Head from 'next/head'
import Window from "components/Core/UI/Window"
import Desktop from "components/Core/Shell/Desktop"
import TaskBar from "components/Core/Shell/Taskbar"
import AppLocalStorage from "components/App/Util/LocalStorage"
import Storage from "components/Core/Storage"
import Node from "components/Core/Util/Node"
import Disable from "components/Core/Util/Disable"

export default function Home() {
  return (
    <>
      <Head>
        <title>System Concepts 3</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Window.Stack />
      <Desktop>
        <Storage />
        <Node>
          <Window.State label="Title" />
          <Window />
        </Node>
        <Node>
          <Window.State label="Title 2" center modal alwaysontop resizable={false} />
          <Window />
        </Node>
        <Disable>
          <Node>
            <AppLocalStorage />
          </Node>
        </Disable>
      </Desktop>
      <TaskBar />
    </>
  );
}
