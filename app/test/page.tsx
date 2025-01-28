"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";

export default function Create() {
  const [open, setOpen] = useState(false);
  const container = useRef(null);
  const ref = useRef(null);
  // const isInView = useInView({ root: container });
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    videoRef.current.play();
  };

  const handleMouseLeave = () => {
    videoRef.current.pause();
  };

  return (
    <div className="relative">
      <motion.div
        className={`${
          open ? "overflow-y-hidden" : "overflow-y-scroll"
        } h-screen w-full flex items-end justify-end flex-wrap`}
      >
        <motion.div className="h-screen w-full" initial={{ opacity: 1 }}>
          <div className="overflow-hidden">
            <motion.h1
              className="text-9xl relative backface-hidden will-change-transform"
              initial={{
                opacity: 1,

                y: "100%",
              }}
              whileInView={{
                opacity: 1,
                y: "0%", // Slide in to its original position
                transition: {
                  duration: 1, // Animation duration
                },
              }}
              viewport={{ once: true }}
            >
              Mihir Rane
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              className="text-5xl relative backface-hidden will-change-transform"
              initial={{
                opacity: 1,

                y: "100%",
              }}
              whileInView={{
                opacity: 1,
                y: "0%", // Slide in to its original position
                transition: {
                  duration: 1, // Animation duration
                },
              }}
              viewport={{ once: true }}
            >
              Mihir Rane
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              className="text-xl relative backface-hidden will-change-transform"
              initial={{
                opacity: 1,

                y: "100%",
              }}
              whileInView={{
                opacity: 1,
                y: "0%", // Slide in to its original position
                transition: {
                  duration: 1, // Animation duration
                },
              }}
              viewport={{ once: true }}
            >
              Mihir Rane
            </motion.h1>
          </div>
          <button className="p-4 border" onClick={() => setOpen(true)}>
            Click me
          </button>
        </motion.div>
        <motion.div
          className="h-screen w-full bg-red"
          initial={{
            opacity: 0,
            // if odd index card,slide from right instead of left
            y: 200,
          }}
          whileInView={{
            opacity: 1,
            y: 0, // Slide in to its original position
            transition: {
              duration: 1, // Animation duration
            },
          }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center">
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              className="rounded-lg shadow-lg w-full max-w-2xl"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <source src="/test.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>
        <motion.div
          className="h-screen w-full bg-green"
          initial={{
            opacity: 0,
            // if odd index card,slide from right instead of left
            y: 200,
          }}
          whileInView={{
            opacity: 1,
            y: 0, // Slide in to its original position
            transition: {
              duration: 1, // Animation duration
            },
          }}
          viewport={{ once: true }}
        ></motion.div>
        <motion.div
          className="h-screen w-full bg-gray"
          initial={{
            opacity: 0,
            // if odd index card,slide from right instead of left
            y: 200,
          }}
          whileInView={{
            opacity: 1,
            y: 0, // Slide in to its original position
            transition: {
              duration: 1, // Animation duration
            },
          }}
          viewport={{ once: true }}
        ></motion.div>
      </motion.div>
      <motion.div
        className={`${
          open && "overflow-y-scroll"
        } fixed bg-red min-h-screen max-h-screen w-screen`}
        initial={{ left: 0, top: "100%" }}
        animate={{ top: open ? "0%" : "100%" }}
        transition={{ duration: 0.5 }}
      >
        <button className="p-4 border" onClick={() => setOpen(false)}>
          GoBack
        </button>
        <div className="border h-[350px]"></div>
        <div className="border h-[350px]"></div>
        <div className="border h-[350px]"></div>
        <div className="border h-[350px]"></div>
      </motion.div>
    </div>
  );
}
