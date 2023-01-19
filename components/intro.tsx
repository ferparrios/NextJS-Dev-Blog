import { CMS_NAME } from "../lib/constants";

const Intro = () => {
  return (
    <section className="flex-col flex items-start md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight md:pr-8">
        Dev-Bugged Blog
      </h1>
      <div style={{backgroundColor: "red", height: "3px", width: "47%", marginBottom: "10px"}}></div>
      <div style={{backgroundColor: "yellow", height: "3px", width: "37%", marginBottom: "10px"}}></div>
      <div style={{backgroundColor: "green", height: "3px", width: "27%", marginBottom: "10px"}}></div>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        Programming step by step
      </h4>
    </section>
  );
};

export default Intro;
