import { Fredoka } from "next/font/google";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: "400",
});

const About = () => {
  return (
    <div className="flex justify-center">
      <div
        className={`${fredoka.className} p-4 text-3xl w-[100vw] lg:w-[1000px]`}
      >
        <div className="grid grid-cols-3 border-2 mb-4">
          <img src="/assets/cartoonface3.png" />
          <img src="/assets/cartoonface4.png" />
          <img src="/assets/cartoonface1.png" />
        </div>
        Thank you Ryan Yee for planning out the layout of some pages with me.
        You can find his more creative work{" "}
        <a
          href="https://www.instagram.com/ye.heung/"
          className="text-emerald-500"
        >
          @ye.heung
        </a>{" "}
        on Instagram.
        <br />
        <br />
        Thank you Jamie Gao for your miscellaneous work on this website. You can
        reach him professionally through his email jamieg6551@gmail.com.
        <br />
        <br />
        I hope you are enjoying Facial Memento. I like to think of this as my
        first major public project, one that I have made with the express desire
        to be used and perhaps altered by anyone. Every time you reach that “You
        Lost :(“ screen, the website receives data that it uses to improve
        itself, updating the scorechart and the Face Index. Thank you.
        <br />
        <br />
        My elevator pitch for this project was always “that verbal memory test
        on human benchmark but with faces”, however the idea came from a very
        cool study that I did with the UBC ASAP Lab. I distinctly remember being
        fed a series of images and needing to describe whether or not I had seen
        them before. I’m guessing their gimmick was that they would show me
        incredibly mundane images next to disturbing ones- it wasn’t really
        surprising to me that I would remember an image of a bloody surgery
        better than one of a chair. The study was overall a lot of fun, and
        variations of it bounced around in my brain until “Facial Memento”
        finally became a reality.
        <br />
        <br />
        This project originally started as a vague idea called “Memory One”,
        which after a few iterations pivoted into another project “Facial
        Recognition Test”. I worked on this for a few months while reading the
        book “Clean Code”, which eventually convinced me to scrap my current
        project and rewrite the codebase from scratch, finally creating “Facial
        Memento” with the help of my friends Ryan and Jamie. While working on
        this, I prioritized making the codebase as enjoyable to work with as
        possible, which proved to be an insanely good habit for my motivation.
        <br />
        <br />
        If you would like to point out any errors, leave feedback, or have any
        thoughts at all, please reach out to me at fyang151@gmail.com. I know
        how risky it is leaving personal emails on the internet, I also know
        that anyone who actually takes the time to explore this website as much
        as you have would likely be doing so in good faith.
        <br />
        <br />
        My name is Fred Yang, and I am currently a student at UBC in Vancouver.
        Beavers are my favourite animal.
        <br />
        <br />
      </div>
    </div>
  );
};

export default About;
