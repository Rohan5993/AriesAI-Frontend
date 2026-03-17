import React from 'react';
import { motion } from 'motion/react';

const FinalCTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[4rem] overflow-hidden h-[500px] md:h-[700px] w-full"
        >
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/5 blur-[120px] -z-10 pointer-events-none" />
          
          {/* Spline 3D Integration */}
          <div className="w-full h-full relative z-10 overflow-hidden">
            <iframe 
              src="https://my.spline.design/boxeshover-1S9fbn10HLJkYTmxyOt88Ycb/" 
              frameBorder="0" 
              width="100%" 
              height="100%" 
              className="absolute -top-[50px] left-0 w-full md:w-[calc(100%+100px)] lg:w-[calc(100%+200px)] h-[calc(100%+100px)] max-w-none"
              title="Interactive 3D Boxes"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
