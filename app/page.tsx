import Feed from "@components/Feed"


const Home = () => {
  return (
   <section className="w-full flex-center flex-col">
    <h1 className="head_text text-center">Discover and Share
        <br className="max-md:hidden"/>
        <span className="teal_gradient text-center">Intelligent prompts</span>
        <p className="desc text-center">"Luxepromt is an open-source platform for sharing creative prompts, fostering collaboration across themes like writing, art, and brainstorming."</p>
    </h1>
    <Feed/>
   </section>
  )
}

export default Home