import './styles.css';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { fadeInDirection } from './utils/motion';

function App() {
  const contentRef = useRef(null);
    const content = [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."

      ];

      const { scrollYProgress:scrollYContent } = useScroll({
        target: contentRef,
        offset: [ "end end" ,"start 50%" ]
    })
  
    const yContent = useTransform(scrollYContent, [0, 1], [ content.length*2+3, 0]);
    const [contentLineProgress, setContentLineProgress ]  = useState(-1);

    useEffect(() =>
    yContent.onChange((v) => {
        setContentLineProgress(yContent.get())
    }),[yContent]);
    
 
    return (
        <section className="container">
            <div className=' heading '>
              Scroll Below to Highlight text
            </div>
            
            <motion.div
                variants={fadeInDirection('up', 'tween', 0.2, 1)}
                className="containerSection"
            >
            <div
                ref={contentRef}
                >
                {content.map((item, index) => (
                    <motion.span 
                    key={index}
                    className={`leading-loose ease-in duration-150  ${ ((index*2+2) >= (contentLineProgress-0.5) &&   (index*2+2) < (contentLineProgress+1.5)) || (index+1)=== content.length && (index*2+2) < (contentLineProgress+1) ? "highlight": "base" }`}
                    >
                    {item}
                    </motion.span>
                ))}
            </div>           
            </motion.div>

           

        </section>
    );
}

export default App;
