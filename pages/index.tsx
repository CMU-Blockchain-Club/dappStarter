import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { useState } from 'react'

const Home: NextPage = () => {
  const [counter, setCounter] = useState(0);

  const handleClickCounter = () =>{
    console.log("clicked!");
    setCounter(counter+1);
  }

  return (
    <div className="h-screen">
      <Head>
        <title>Odyssey</title>
        <meta name="description" content="Spread the crypto love!" />
        <link rel="icon" href="/cbgLogo.ico" />
      </Head>
      
    <main className="container px-4 mx-auto ">
     <Navbar></Navbar>

        <div className="h-[10rem]">
          {/* padding div for space between top and main elements */}
        </div>
      

        <div className="text-center max-w-2xl mx-auto content-center">
          <h1 className="text-5xl font-bold sans ">
              Build Your <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-500 to-green-500">Dream</span>
          </h1>
          <h1 className="text-xl text-slate-500 mt-2">Get started with your first decentralized application.</h1>
          <button onClick={()=>handleClickCounter()} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded my-5">
                            Counter: {counter}
          </button>
        </div>



      </main>

    </div>
 
  )
}

export default Home
