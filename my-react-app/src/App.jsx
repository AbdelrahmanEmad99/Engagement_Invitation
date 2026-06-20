import { useState, useEffect, useRef } from "react";

/* ═══════════════ TOKENS ═══════════════ */
const GOLD       = "#D4AF37";
const GOLD_LIGHT = "#F0D980";
const GOLD_PALE  = "#FBF0BB";
const PLUM       = "#5C2052";
const PLUM_DARK  = "#3A1035";
const PLUM_MID   = "#7B3070";
const NAVY       = "#1B3A6B";
const ROSE       = "#C8667A";
const ROSE_LIGHT = "#E8A0AC";
const BLUSH      = "#F2D0D8";
const LEAF       = "#4A6741";
const LEAF_LIGHT = "#7A9E70";
const CREAM      = "#FAF7F2";
const ENV_BG     = "#F5EDD8";
const ENV_DARK   = "#E8D9B8";
const ENV_SHADOW = "#D9C89A";

/* ═══════════════ HOOKS ═══════════════ */
const useCountdown = (targetDate) => {
  const [t, setT] = useState({});
  useEffect(() => {
    const calc = () => {
      const d = new Date(targetDate) - new Date();
      if (d <= 0) return setT({ days:0,hours:0,minutes:0,seconds:0 });
      setT({ days:Math.floor(d/86400000), hours:Math.floor((d%86400000)/3600000),
             minutes:Math.floor((d%3600000)/60000), seconds:Math.floor((d%60000)/1000) });
    };
    calc(); const id = setInterval(calc,1000); return ()=>clearInterval(id);
  }, [targetDate]);
  return t;
};
const useInView = (threshold=0.1) => {
  const ref = useRef(null); const [v,setV]=useState(false);
  useEffect(()=>{
    const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setV(true)},{threshold});
    if(ref.current)o.observe(ref.current); return()=>o.disconnect();
  },[]);
  return [ref,v];
};
const FadeUp = ({children,delay=0,distance=30})=>{
  const [ref,v]=useInView();
  return <div ref={ref} style={{opacity:v?1:0,transform:v?`translateY(0)`:`translateY(${distance}px)`,transition:`opacity 1s ease ${delay}s,transform 1s ease ${delay}s`}}>{children}</div>;
};

/* ═══════════════ SVG FLOWER COMPONENTS ═══════════════ */

// Full bloom rose — 5 layered petals
const Rose = ({x=0,y=0,r=1,rotate=0,opacity=1}) => (
  <g transform={`translate(${x},${y}) rotate(${rotate}) scale(${r})`} opacity={opacity}>
    {/* Outer petals */}
    {[0,72,144,216,288].map((a,i)=>(
      <ellipse key={i} cx={Math.cos(a*Math.PI/180)*14} cy={Math.sin(a*Math.PI/180)*14}
        rx="10" ry="15"
        transform={`rotate(${a+90},${Math.cos(a*Math.PI/180)*14},${Math.sin(a*Math.PI/180)*14})`}
        fill={ROSE} opacity="0.85"/>
    ))}
    {/* Mid petals */}
    {[36,108,180,252,324].map((a,i)=>(
      <ellipse key={i} cx={Math.cos(a*Math.PI/180)*10} cy={Math.sin(a*Math.PI/180)*10}
        rx="8" ry="12"
        transform={`rotate(${a+90},${Math.cos(a*Math.PI/180)*10},${Math.sin(a*Math.PI/180)*10})`}
        fill={ROSE_LIGHT} opacity="0.9"/>
    ))}
    {/* Centre */}
    <circle cx="0" cy="0" r="7" fill="#D4607A"/>
    <circle cx="0" cy="0" r="4" fill="#C0506A"/>
    <circle cx="-1" cy="-1" r="1.5" fill={ROSE_LIGHT} opacity="0.6"/>
  </g>
);

// Peony-style bloom — many ruffly petals
const Peony = ({x=0,y=0,r=1,rotate=0,opacity=1,color=BLUSH}) => (
  <g transform={`translate(${x},${y}) rotate(${rotate}) scale(${r})`} opacity={opacity}>
    {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i)=>(
      <ellipse key={i}
        cx={Math.cos(a*Math.PI/180)*16} cy={Math.sin(a*Math.PI/180)*16}
        rx="9" ry="18"
        transform={`rotate(${a+90},${Math.cos(a*Math.PI/180)*16},${Math.sin(a*Math.PI/180)*16})`}
        fill={color} opacity="0.7"/>
    ))}
    {[0,45,90,135,180,225,270,315].map((a,i)=>(
      <ellipse key={i}
        cx={Math.cos(a*Math.PI/180)*9} cy={Math.sin(a*Math.PI/180)*9}
        rx="6" ry="12"
        transform={`rotate(${a+90},${Math.cos(a*Math.PI/180)*9},${Math.sin(a*Math.PI/180)*9})`}
        fill={ROSE_LIGHT} opacity="0.85"/>
    ))}
    <circle cx="0" cy="0" r="8" fill={ROSE_LIGHT}/>
    <circle cx="0" cy="0" r="4" fill={ROSE}/>
  </g>
);

// Leaf sprig
const LeafSprig = ({x=0,y=0,r=1,rotate=0,opacity=0.7}) => (
  <g transform={`translate(${x},${y}) rotate(${rotate}) scale(${r})`} opacity={opacity}>
    <path d="M0,0 Q-8,-20 0,-40" stroke={LEAF} strokeWidth="1.5" fill="none"/>
    <ellipse cx="-8" cy="-12" rx="8" ry="14" transform="rotate(-40,-8,-12)" fill={LEAF} opacity="0.8"/>
    <ellipse cx="6" cy="-22" rx="7" ry="12" transform="rotate(35,6,-22)" fill={LEAF_LIGHT} opacity="0.75"/>
    <ellipse cx="-5" cy="-34" rx="6" ry="10" transform="rotate(-20,-5,-34)" fill={LEAF} opacity="0.7"/>
  </g>
);

// Small blossom (4-petal cherry)
const Blossom = ({x=0,y=0,r=1,rotate=0,opacity=1}) => (
  <g transform={`translate(${x},${y}) rotate(${rotate}) scale(${r})`} opacity={opacity}>
    {[0,90,180,270].map((a,i)=>(
      <ellipse key={i} cx={Math.cos(a*Math.PI/180)*7} cy={Math.sin(a*Math.PI/180)*7}
        rx="5" ry="8"
        transform={`rotate(${a+90},${Math.cos(a*Math.PI/180)*7},${Math.sin(a*Math.PI/180)*7})`}
        fill={BLUSH} opacity="0.9"/>
    ))}
    <circle cx="0" cy="0" r="4" fill={GOLD_PALE}/>
    <circle cx="0" cy="0" r="2" fill={GOLD}/>
  </g>
);

// Gold botanical accent — small 6-petal
const GoldBlossom = ({x=0,y=0,r=0.6,opacity=0.6}) => (
  <g transform={`translate(${x},${y}) scale(${r})`} opacity={opacity}>
    {[0,60,120,180,240,300].map((a,i)=>(
      <ellipse key={i} cx={Math.cos(a*Math.PI/180)*9} cy={Math.sin(a*Math.PI/180)*9}
        rx="4" ry="8"
        transform={`rotate(${a+90},${Math.cos(a*Math.PI/180)*9},${Math.sin(a*Math.PI/180)*9})`}
        fill={GOLD} opacity="0.7"/>
    ))}
    <circle cx="0" cy="0" r="4" fill={GOLD_LIGHT}/>
  </g>
);

// Full floral scene for the envelope background
const FloralBackground = ({w=800,h=600,dark=false}) => {
  const baseOp = dark ? 0.18 : 0.22;
  return (
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid slice">
      {/* Corners — large rose clusters */}
      <Rose x={55}  y={65}  r={1.6}  rotate={-20} opacity={baseOp*1.2}/>
      <Rose x={20}  y={110} r={1.1}  rotate={15}  opacity={baseOp*0.8}/>
      <LeafSprig x={40} y={40} r={1.4} rotate={10} opacity={baseOp*0.9}/>
      <Peony x={110} y={40} r={1.2} rotate={-10} opacity={baseOp} color={BLUSH}/>
      <Blossom x={145} y={80} r={0.9} rotate={20} opacity={baseOp*0.9}/>

      <Rose x={w-55} y={65}  r={1.6}  rotate={20}  opacity={baseOp*1.2}/>
      <Rose x={w-20} y={110} r={1.1}  rotate={-15} opacity={baseOp*0.8}/>
      <LeafSprig x={w-40} y={40} r={1.4} rotate={-10} opacity={baseOp*0.9}/>
      <Peony x={w-110} y={40} r={1.2} rotate={10} opacity={baseOp} color={BLUSH}/>
      <Blossom x={w-145} y={80} r={0.9} rotate={-20} opacity={baseOp*0.9}/>

      <Rose x={55}  y={h-65}  r={1.6} rotate={20}  opacity={baseOp*1.2}/>
      <Rose x={20}  y={h-110} r={1.1} rotate={-15} opacity={baseOp*0.8}/>
      <LeafSprig x={40} y={h-20} r={1.4} rotate={-30} opacity={baseOp*0.9}/>
      <Peony x={110} y={h-40} r={1.2} rotate={15} opacity={baseOp} color={BLUSH}/>

      <Rose x={w-55} y={h-65}  r={1.6} rotate={-20} opacity={baseOp*1.2}/>
      <Rose x={w-20} y={h-110} r={1.1} rotate={15}  opacity={baseOp*0.8}/>
      <LeafSprig x={w-40} y={h-20} r={1.4} rotate={30} opacity={baseOp*0.9}/>
      <Peony x={w-110} y={h-40} r={1.2} rotate={-15} opacity={baseOp} color={BLUSH}/>

      {/* Mid edges */}
      <Peony x={0} y={h/2} r={1.4} rotate={90} opacity={baseOp} color={ROSE_LIGHT}/>
      <LeafSprig x={30} y={h/2-30} r={1.2} rotate={80} opacity={baseOp*0.8}/>
      <Peony x={w} y={h/2} r={1.4} rotate={-90} opacity={baseOp} color={ROSE_LIGHT}/>
      <LeafSprig x={w-30} y={h/2-30} r={1.2} rotate={-80} opacity={baseOp*0.8}/>

      {/* Scattered blossoms & gold dots mid-field */}
      <Blossom x={w/2} y={30} r={0.8} opacity={baseOp*0.7}/>
      <Blossom x={w/2} y={h-30} r={0.8} opacity={baseOp*0.7}/>
      <GoldBlossom x={w/4} y={h/4} r={0.7} opacity={baseOp}/>
      <GoldBlossom x={w*3/4} y={h/4} r={0.7} opacity={baseOp}/>
      <GoldBlossom x={w/4} y={h*3/4} r={0.6} opacity={baseOp*0.8}/>
      <GoldBlossom x={w*3/4} y={h*3/4} r={0.6} opacity={baseOp*0.8}/>
      <GoldBlossom x={w/2} y={h/2} r={0.5} opacity={baseOp*0.5}/>

      {/* Extra small leaves */}
      {[[w/3,h/5],[w*2/3,h/5],[w/3,h*4/5],[w*2/3,h*4/5]].map(([lx,ly],i)=>(
        <LeafSprig key={i} x={lx} y={ly} r={0.9} rotate={i*45-30} opacity={baseOp*0.6}/>
      ))}
    </svg>
  );
};

// Floating petals — animated
const FloatingPetals = () => {
  const petals = [
    {left:"8%",  size:18, delay:0,   dur:7,  color:BLUSH,     startY:-20},
    {left:"18%", size:12, delay:2.5, dur:9,  color:ROSE_LIGHT,startY:-10},
    {left:"32%", size:14, delay:1,   dur:8,  color:GOLD_PALE, startY:-15},
    {left:"50%", size:10, delay:3.5, dur:10, color:BLUSH,     startY:-8},
    {left:"65%", size:16, delay:0.8, dur:7.5,color:ROSE_LIGHT,startY:-20},
    {left:"78%", size:11, delay:2,   dur:9,  color:GOLD_PALE, startY:-12},
    {left:"88%", size:13, delay:4,   dur:8,  color:BLUSH,     startY:-10},
    {left:"24%", size:9,  delay:1.5, dur:11, color:ROSE,      startY:-5},
    {left:"55%", size:15, delay:5,   dur:6,  color:BLUSH,     startY:-18},
    {left:"92%", size:10, delay:3,   dur:8,  color:ROSE_LIGHT,startY:-8},
  ];
  return (
    <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none",zIndex:1}}>
      {petals.map((p,i)=>(
        <div key={i} style={{
          position:"absolute", left:p.left, top:p.startY,
          width:p.size, height:p.size,
          animation:`petalFall ${p.dur}s linear ${p.delay}s infinite`,
          opacity:0.55,
        }}>
          <svg viewBox="0 0 20 20"><ellipse cx="10" cy="10" rx="6" ry="10" fill={p.color} transform="rotate(-20,10,10)"/></svg>
        </div>
      ))}
      <style>{`
        @keyframes petalFall {
          0%   { transform: translateY(0)   rotate(0deg)   translateX(0);   opacity:0; }
          10%  { opacity: 0.55; }
          85%  { opacity: 0.4; }
          100% { transform: translateY(100vh) rotate(360deg) translateX(40px); opacity:0; }
        }
      `}</style>
    </div>
  );
};

/* ═══════════════ SHARED COMPONENTS ═══════════════ */
const GoldDivider = ({width=300}) => (
  <div style={{display:"flex",alignItems:"center",gap:10,margin:"22px auto",maxWidth:width}}>
    <div style={{flex:1,height:"0.5px",background:`linear-gradient(to right,transparent,${GOLD})`}}/>
    <svg width="22" height="22" viewBox="0 0 22 22">
      <path d="M11 1 L12.8 8.5 L20 11 L12.8 13.5 L11 21 L9.2 13.5 L2 11 L9.2 8.5Z" fill={GOLD}/>
    </svg>
    <div style={{flex:1,height:"0.5px",background:`linear-gradient(to left,transparent,${GOLD})`}}/>
  </div>
);

const FiligreeCorner = ({rotate=0}) => (
  <svg width="72" height="72" viewBox="0 0 72 72" style={{transform:`rotate(${rotate}deg)`}}>
    <g fill="none" stroke={GOLD} strokeWidth="0.9" opacity="0.85">
      <path d="M5 5 L5 28 Q5 32 9 32"/>
      <path d="M5 5 L28 5 Q32 5 32 9"/>
      <path d="M5 5 Q16 5 16 16 Q16 27 27 27"/>
      <circle cx="9" cy="9" r="2" fill={GOLD} stroke="none"/>
      <circle cx="27" cy="27" r="1.2" fill={GOLD} stroke="none"/>
      <path d="M17 5 Q17 17 29 17" opacity="0.45"/>
      <path d="M5 17 Q17 17 17 29" opacity="0.45"/>
      <path d="M5 5 Q9 22 22 22" opacity="0.3" strokeDasharray="2 3"/>
    </g>
  </svg>
);

/* ═══════════════ ENVELOPE HERO ═══════════════ */
const EnvelopeHero = ({onOpen}) => {
  const [phase, setPhase] = useState("idle");
  const W=480, H=320;
  const handleClick = () => {
    if(phase!=="idle") return;
    setPhase("lifting");
    setTimeout(()=>setPhase("open"),900);
    setTimeout(()=>{setPhase("done");onOpen();},2600);
  };
  const flapR    = phase==="open"||phase==="done" ? -178 : 0;
  const sealOp   = phase==="lifting"||phase==="open"||phase==="done" ? 0 : 1;
  const sealSc   = phase==="lifting" ? 1.5 : 1;
  const cardY    = phase==="open" ? -100 : 0;

  return (
    <div onClick={handleClick} style={{
      minHeight:"100vh",display:"flex",flexDirection:"column",
      alignItems:"center",justifyContent:"center",
      background:`linear-gradient(160deg,#FDF5E8 0%,#F5E8CC 40%,#EDD9B0 100%)`,
      cursor:phase==="idle"?"pointer":"default",
      position:"relative",overflow:"hidden",
      opacity:phase==="done"?0:1,transition:"opacity 0.8s ease",
      pointerEvents:phase==="done"?"none":"auto",
    }}>
      {/* Rich floral background */}
      <FloralBackground w={1200} h={800}/>

      {/* Soft vignette */}
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at center, transparent 40%, rgba(237,217,176,0.55) 100%)",pointerEvents:"none"}}/>

      {/* Floating petals */}
      <FloatingPetals/>

      {/* Heading */}
      <div style={{textAlign:"center",marginBottom:44,zIndex:3,position:"relative"}}>
        <p style={{fontFamily:"Lato,sans-serif",fontSize:11,letterSpacing:"0.38em",textTransform:"uppercase",color:PLUM,margin:"0 0 10px",opacity:0.8}}>
          You are cordially invited to celebrate
        </p>
        <h1 style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"clamp(2rem,5.5vw,3.6rem)",fontWeight:600,color:NAVY,margin:0,lineHeight:1.1}}>
          Abdulrahman <span style={{color:GOLD,fontStyle:"italic"}}>&</span> Haneen
        </h1>
        <div style={{display:"flex",alignItems:"center",gap:8,justifyContent:"center",marginTop:10}}>
          <div style={{width:40,height:"0.5px",background:GOLD}}/>
          <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="3" fill={GOLD}/></svg>
          <div style={{width:40,height:"0.5px",background:GOLD}}/>
        </div>
      </div>

      {/* SVG Envelope */}
      <div style={{position:"relative",width:"min(520px,92vw)",zIndex:3}}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",filter:`drop-shadow(0 24px 64px rgba(80,40,10,0.28)) drop-shadow(0 4px 14px rgba(212,175,55,0.22))`,overflow:"visible"}}>
          <defs>
            <linearGradient id="envBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FEFAF0"/><stop offset="100%" stopColor="#EDD9B2"/>
            </linearGradient>
            <linearGradient id="envLining" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={PLUM_MID}/><stop offset="100%" stopColor={PLUM_DARK}/>
            </linearGradient>
            <linearGradient id="flapGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FAF2E0"/><stop offset="100%" stopColor={ENV_DARK}/>
            </linearGradient>
            <linearGradient id="sealGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#8A3278"/><stop offset="100%" stopColor={PLUM_DARK}/>
            </linearGradient>
            <clipPath id="envClip"><rect x="2" y="2" width={W-4} height={H-4} rx="8"/></clipPath>
          </defs>

          {/* Body */}
          <rect x="0" y="0" width={W} height={H} rx="8" fill="url(#envBody)" stroke={GOLD} strokeWidth="1.5"/>
          <rect x="7" y="7" width={W-14} height={H-14} rx="5" fill="none" stroke={GOLD} strokeWidth="0.5" opacity="0.55"/>

          {/* Bottom lining */}
          <polygon points={`0,${H} ${W/2},${H*0.52} ${W},${H}`} fill="url(#envLining)" clipPath="url(#envClip)"/>
          <g clipPath="url(#envClip)" opacity="0.2">
            {[0.55,0.65,0.75,0.85,0.95].map((t,i)=>(
              <line key={i} x1={W/2*(1-t)} y1={H} x2={W/2} y2={H*0.52+(H-H*0.52)*t*0.25} stroke={GOLD_LIGHT} strokeWidth="0.6"/>
            ))}
            {[0.55,0.65,0.75,0.85,0.95].map((t,i)=>(
              <line key={i} x1={W/2+(W/2*t)} y1={H} x2={W/2} y2={H*0.52+(H-H*0.52)*t*0.25} stroke={GOLD_LIGHT} strokeWidth="0.6"/>
            ))}
          </g>

          {/* Side folds */}
          <polygon points={`0,0 0,${H} ${W/2},${H*0.52}`} fill="rgba(0,0,0,0.028)" clipPath="url(#envClip)"/>
          <polygon points={`${W},0 ${W},${H} ${W/2},${H*0.52}`} fill="rgba(255,255,255,0.025)" clipPath="url(#envClip)"/>
          <polygon points={`0,0 0,${H} ${W/2},${H*0.52}`} fill="none" stroke={ENV_SHADOW} strokeWidth="1" opacity="0.6" clipPath="url(#envClip)"/>
          <polygon points={`${W},0 ${W},${H} ${W/2},${H*0.52}`} fill="none" stroke={ENV_SHADOW} strokeWidth="1" opacity="0.6" clipPath="url(#envClip)"/>

          {/* Floral decoration on envelope body */}
          <g clipPath="url(#envClip)" opacity="0.28">
            <Rose x={60}  y={H-50} r={1.1} rotate={-15}/>
            <LeafSprig x={30} y={H-20} r={1.0} rotate={-20}/>
            <Blossom x={115} y={H-70} r={0.85} rotate={10}/>
            <Rose x={W-60} y={H-50} r={1.1} rotate={15}/>
            <LeafSprig x={W-30} y={H-20} r={1.0} rotate={20}/>
            <Blossom x={W-115} y={H-70} r={0.85} rotate={-10}/>
            <GoldBlossom x={W/2} y={H-25} r={0.7}/>
            <GoldBlossom x={W/2-40} y={20} r={0.5} opacity={0.5}/>
            <GoldBlossom x={W/2+40} y={20} r={0.5} opacity={0.5}/>
          </g>

          {/* Postage stamp */}
          <g transform={`translate(${W-72},12)`}>
            <rect x="0" y="0" width="54" height="66" fill="#FFF9EE" stroke={GOLD} strokeWidth="1"/>
            {[0,1,2,3,4,5,6].map(i=><circle key={`t${i}`} cx={4+i*7.7} cy="0" r="2.2" fill={ENV_BG}/>)}
            {[0,1,2,3,4,5,6].map(i=><circle key={`b${i}`} cx={4+i*7.7} cy="66" r="2.2" fill={ENV_BG}/>)}
            {[0,1,2,3,4,5,6,7].map(i=><circle key={`l${i}`} cx="0" cy={4+i*8.3} r="2.2" fill={ENV_BG}/>)}
            {[0,1,2,3,4,5,6,7].map(i=><circle key={`r${i}`} cx="54" cy={4+i*8.3} r="2.2" fill={ENV_BG}/>)}
            <rect x="5" y="5" width="44" height="56" fill="none" stroke={GOLD} strokeWidth="0.5"/>
            <Rose x={27} y={28} r={0.55} rotate={0} opacity={0.9}/>
            <text x="27" y="52" textAnchor="middle" fontFamily="Cormorant Garamond,serif" fontSize="7" fill={PLUM} letterSpacing="1.5">A · H</text>
            <text x="27" y="59" textAnchor="middle" fontFamily="Lato,sans-serif" fontSize="4.5" fill={GOLD} letterSpacing="1">CAIRO</text>
          </g>

          {/* Card peeking */}
          <g transform={`translate(${W/2},${H*0.6})`} style={{transform:`translate(${W/2}px,${H*0.6}px) translateY(${cardY}px)`,transition:"transform 1s cubic-bezier(0.34,1.56,0.64,1) 0.35s"}}>
            <rect x="-108" y="-54" width="216" height="76" rx="2" fill="#FFFBF5" stroke={GOLD} strokeWidth="0.9" opacity="0.95"/>
            <g opacity="0.35"><Rose x={-88} y={-16} r={0.45} rotate={-10}/><Rose x={88} y={-16} r={0.45} rotate={10}/></g>
            <text x="0" y="-28" textAnchor="middle" fontFamily="Lato,sans-serif" fontSize="8" fill={GOLD} letterSpacing="2.5">WE'RE ENGAGED</text>
            <line x1="-70" y1="-18" x2="70" y2="-18" stroke={GOLD} strokeWidth="0.5" opacity="0.6"/>
            <text x="0" y="-4" textAnchor="middle" fontFamily="Cormorant Garamond,serif" fontSize="12" fontStyle="italic" fill={NAVY}>Abdulrahman &amp; Haneen</text>
            <text x="0" y="12" textAnchor="middle" fontFamily="Lato,sans-serif" fontSize="8" fill={GOLD} letterSpacing="1.5">25 · 07 · 2026</text>
          </g>

          {/* Flap */}
          <g style={{transformOrigin:`${W/2}px 0px`,transform:`perspective(900px) rotateX(${flapR}deg)`,transition:"transform 1.2s cubic-bezier(0.65,-0.1,0.3,1.1)"}}>
            <polygon points={`0,0 ${W},0 ${W/2},${H*0.52}`} fill="url(#envLining)"/>
            <g opacity="0.15">
              {[0.15,0.3,0.5,0.7,0.85].map((t,i)=>(
                <line key={i} x1={W*t} y1="0" x2={W/2} y2={H*0.52} stroke={GOLD_LIGHT} strokeWidth="0.7"/>
              ))}
            </g>
            {/* Floral lining on flap */}
            <g opacity="0.22">
              <Rose x={W/2} y={20} r={0.7} rotate={0}/>
              <Blossom x={W/2-55} y={30} r={0.7} rotate={-15}/>
              <Blossom x={W/2+55} y={30} r={0.7} rotate={15}/>
              <LeafSprig x={W/2-20} y={10} r={0.8} rotate={80}/>
              <LeafSprig x={W/2+20} y={10} r={0.8} rotate={-80}/>
            </g>
            <polygon points={`2,0 ${W-2},0 ${W/2},${H*0.495}`} fill="url(#flapGrad)"/>
            <polygon points={`2,0 ${W-2},0 ${W/2},${H*0.495}`} fill="none" stroke={GOLD} strokeWidth="1.2"/>
            {/* Flap floral */}
            <g opacity="0.3">
              <Rose x={W/2} y={H*0.18} r={0.7} rotate={5}/>
              <LeafSprig x={W/2-25} y={H*0.15} r={0.65} rotate={70}/>
              <LeafSprig x={W/2+22} y={H*0.15} r={0.6} rotate={-65}/>
              <Blossom x={W/2-52} y={H*0.08} r={0.55} rotate={-20}/>
              <Blossom x={W/2+50} y={H*0.08} r={0.55} rotate={20}/>
            </g>
          </g>

          {/* Wax seal */}
          <g style={{transformOrigin:`${W/2}px ${H*0.49}px`,transform:`translate(${W/2}px,${H*0.49}px) scale(${sealSc})`,opacity:sealOp,transition:"opacity 0.45s ease,transform 0.55s cubic-bezier(0.34,1.56,0.64,1)"}}>
            {/* Drips */}
            {[[-22,-26],[22,-26],[0,-33],[-12,-30],[12,-30]].map(([dx,dy],i)=>(
              <ellipse key={i} cx={dx} cy={dy} rx="4.5" ry="3.5" fill={PLUM} opacity="0.55"/>
            ))}
            <circle cx="0" cy="0" r="32" fill="none" stroke={GOLD} strokeWidth="0.6" opacity="0.4"/>
            <circle cx="0" cy="0" r="28" fill="url(#sealGrad)"/>
            <circle cx="0" cy="0" r="28" fill="none" stroke={GOLD} strokeWidth="1.4"/>
            <circle cx="0" cy="0" r="22" fill="none" stroke={GOLD} strokeWidth="0.6" strokeDasharray="2.5 2"/>
            <circle cx="0" cy="0" r="17" fill="none" stroke={GOLD} strokeWidth="0.4" opacity="0.6"/>
            <path d="M0,-15 L2.2,-5.5 L8,-10 L3.5,-2 L15,0 L3.5,2 L8,10 L2.2,5.5 L0,15 L-2.2,5.5 L-8,10 L-3.5,2 L-15,0 L-3.5,-2 L-8,-10 L-2.2,-5.5Z" fill={GOLD} opacity="0.22"/>
            <text x="-6.5" y="5.5" textAnchor="middle" fontFamily="Cormorant Garamond,serif" fontSize="13" fontWeight="700" fill={GOLD_LIGHT}>A</text>
            <text x="6.5"  y="5.5" textAnchor="middle" fontFamily="Cormorant Garamond,serif" fontSize="13" fontWeight="700" fill={GOLD_LIGHT}>H</text>
            <circle cx="0" cy="-1" r="1.8" fill={GOLD_LIGHT} opacity="0.85"/>
          </g>

          {/* Corner ornaments */}
          {[[18,18,0],[W-18,18,90],[18,H-18,270],[W-18,H-18,180]].map(([x,y,r],i)=>(
            <g key={i} transform={`translate(${x},${y}) rotate(${r})`}>
              <path d="M0,0 L0,-12 M0,0 L12,0 M0,0 L9,-9" stroke={GOLD} strokeWidth="0.8" fill="none" opacity="0.55"/>
              <circle cx="0" cy="0" r="2" fill={GOLD} opacity="0.55"/>
            </g>
          ))}
        </svg>

        {phase==="idle" && (
          <p style={{textAlign:"center",fontFamily:"Lato,sans-serif",fontSize:11,letterSpacing:"0.3em",textTransform:"uppercase",color:PLUM,marginTop:22,opacity:0.65,animation:"breathe 2.2s ease-in-out infinite"}}>
            ✦ &nbsp;Tap to open&nbsp; ✦
          </p>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Lato:wght@300;400;700&display=swap');
        @keyframes breathe{0%,100%{opacity:0.35;transform:scale(1)}50%{opacity:0.75;transform:scale(1.03)}}
      `}</style>
    </div>
  );
};

/* ═══════════════ INVITATION CARD SECTION ═══════════════ */
const InvitationCard = () => (
  <section style={{
    minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",
    background:`linear-gradient(155deg,#FDF8F0 0%,#F8EFE0 35%,#F2E3CC 70%,#EAD5B5 100%)`,
    padding:"64px 20px",position:"relative",overflow:"hidden",
  }}>
    {/* Full botanical background */}
    <FloralBackground w={1400} h={900}/>

    {/* Floating petals */}
    <FloatingPetals/>

    {/* Vignette */}
    <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at center,transparent 30%,rgba(242,227,204,0.5) 100%)",pointerEvents:"none",zIndex:1}}/>

    <FadeUp>
      <div style={{
        maxWidth:600,width:"100%",
        background:"rgba(255,253,247,0.88)",
        backdropFilter:"blur(12px)",
        border:`1px solid ${GOLD}77`,
        borderRadius:4,
        padding:"clamp(40px,7vw,72px) clamp(30px,6vw,64px)",
        boxShadow:`0 40px 100px rgba(92,32,82,0.13),0 12px 32px rgba(212,175,55,0.14),inset 0 0 60px rgba(255,245,210,0.25)`,
        position:"relative",textAlign:"center",zIndex:2,
      }}>
        {/* Triple inset borders */}
        <div style={{position:"absolute",inset:8, border:`0.5px solid ${GOLD}55`,borderRadius:2,pointerEvents:"none"}}/>
        <div style={{position:"absolute",inset:14,border:`0.5px solid ${GOLD}33`,borderRadius:1,pointerEvents:"none"}}/>
        <div style={{position:"absolute",inset:20,border:`0.5px solid ${GOLD}18`,borderRadius:1,pointerEvents:"none"}}/>

        {/* Filigree corners */}
        {[[0,0,0],[1,0,90],[0,1,270],[1,1,180]].map(([rx,ry,rot],i)=>(
          <div key={i} style={{position:"absolute",[ry?"bottom":"top"]:0,[rx?"right":"left"]:0,zIndex:3}}>
            <FiligreeCorner rotate={rot}/>
          </div>
        ))}

        {/* Floral corner sprays on card */}
        <div style={{position:"absolute",top:-8,left:-8,opacity:0.55,pointerEvents:"none"}}>
          <svg width="120" height="120" viewBox="0 0 120 120">
            <Rose x={30} y={30} r={1.1} rotate={-10}/>
            <LeafSprig x={10} y={20} r={0.9} rotate={15}/>
            <Blossom x={65} y={20} r={0.75} rotate={5}/>
            <LeafSprig x={25} y={60} r={0.75} rotate={40}/>
          </svg>
        </div>
        <div style={{position:"absolute",top:-8,right:-8,opacity:0.55,pointerEvents:"none",transform:"scaleX(-1)"}}>
          <svg width="120" height="120" viewBox="0 0 120 120">
            <Rose x={30} y={30} r={1.1} rotate={10}/>
            <LeafSprig x={10} y={20} r={0.9} rotate={-15}/>
            <Blossom x={65} y={20} r={0.75} rotate={-5}/>
          </svg>
        </div>
        <div style={{position:"absolute",bottom:-8,left:-8,opacity:0.5,pointerEvents:"none",transform:"scaleY(-1)"}}>
          <svg width="120" height="100" viewBox="0 0 120 100">
            <Rose x={30} y={30} r={1.0} rotate={-10}/>
            <LeafSprig x={12} y={18} r={0.85} rotate={20}/>
            <Blossom x={68} y={18} r={0.7} rotate={8}/>
          </svg>
        </div>
        <div style={{position:"absolute",bottom:-8,right:-8,opacity:0.5,pointerEvents:"none",transform:"scale(-1,−1) scaleX(-1) scaleY(-1)"}}>
          <svg width="120" height="100" viewBox="0 0 120 100">
            <Rose x={30} y={30} r={1.0} rotate={10}/>
            <LeafSprig x={12} y={18} r={0.85} rotate={-20}/>
          </svg>
        </div>

        {/* Content */}
        <p style={{fontFamily:"Lato,sans-serif",fontSize:10,letterSpacing:"0.38em",textTransform:"uppercase",color:GOLD,margin:"0 0 16px",position:"relative",zIndex:2}}>
          Together with their families
        </p>

        <h2 style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"clamp(1.4rem,3.5vw,2rem)",fontWeight:400,color:PLUM,margin:"0 0 4px",lineHeight:1.3,letterSpacing:"0.04em",position:"relative",zIndex:2}}>
          We're Getting
        </h2>
        <h2 style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"clamp(3rem,7.5vw,5rem)",fontWeight:600,color:NAVY,margin:"0 0 4px",lineHeight:1,fontStyle:"italic",letterSpacing:"-0.02em",position:"relative",zIndex:2}}>
          Engaged!
        </h2>

        <GoldDivider width={340}/>

        {/* Names */}
        <div style={{margin:"28px 0",animation:"floatNames 5s ease-in-out infinite",position:"relative",zIndex:2}}>
          <p style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"clamp(2rem,5.5vw,3.4rem)",fontWeight:500,color:NAVY,margin:"0 0 2px",lineHeight:1.2}}>
            Abdulrahman
          </p>
          <div style={{display:"flex",alignItems:"center",gap:14,justifyContent:"center",margin:"10px 0"}}>
            <div style={{width:44,height:"0.5px",background:`linear-gradient(to right,transparent,${GOLD})`}}/>
            <svg width="22" height="22" viewBox="0 0 24 24" fill={ROSE}><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/></svg>
            <div style={{width:44,height:"0.5px",background:`linear-gradient(to left,transparent,${GOLD})`}}/>
          </div>
          <p style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"clamp(2rem,5.5vw,3.4rem)",fontWeight:500,color:PLUM,margin:0,lineHeight:1.2}}>
            Haneen
          </p>
        </div>

        <GoldDivider width={340}/>

        {/* Details */}
        <div style={{marginTop:28,display:"flex",flexDirection:"column",gap:16,position:"relative",zIndex:2}}>
          {[
            {label:"Date",  value:"Saturday · 25th of July, 2026", href:null},
            {label:"Time",  value:"Eight o'clock in the evening",    href:null},
            {label:"Venue", value:"Nile Plaza at Nile Club · Cairo", href:"https://maps.app.goo.gl/R2HFLrKUPdvUFGA79"},
          ].map((item,i)=>(
            <div key={i}>
              <p style={{fontFamily:"Lato,sans-serif",fontSize:9,letterSpacing:"0.32em",textTransform:"uppercase",color:GOLD,margin:"0 0 4px"}}>{item.label}</p>
              {item.href ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer"
                  style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"clamp(1rem,2.5vw,1.2rem)",color:NAVY,display:"inline-flex",alignItems:"center",gap:7,textDecoration:"none",borderBottom:`1px solid ${GOLD}55`,paddingBottom:2,transition:"color 0.2s,border-color 0.2s"}}
                  onMouseEnter={e=>{e.currentTarget.style.color=GOLD;e.currentTarget.style.borderColor=GOLD;}}
                  onMouseLeave={e=>{e.currentTarget.style.color=NAVY;e.currentTarget.style.borderColor=`${GOLD}55`;}}
                >
                  {item.value}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{opacity:0.6}}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </a>
              ) : (
                <p style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"clamp(1rem,2.5vw,1.2rem)",color:NAVY,margin:0}}>{item.value}</p>
              )}
            </div>
          ))}
        </div>

        {/* Bottom ornament */}
        <div style={{marginTop:28,position:"relative",zIndex:2}}>
          <svg width="160" height="28" viewBox="0 0 160 28">
            <line x1="0" y1="14" x2="58" y2="14" stroke={GOLD} strokeWidth="0.6" opacity="0.55"/>
            <path d="M65 6 L68 14 L71 6 L74 14 L77 6 L80 14 L83 6 L86 14 L89 6 L92 14 L95 6" fill="none" stroke={GOLD} strokeWidth="0.9"/>
            <line x1="102" y1="14" x2="160" y2="14" stroke={GOLD} strokeWidth="0.6" opacity="0.55"/>
          </svg>
        </div>
      </div>
    </FadeUp>
    <style>{`@keyframes floatNames{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}`}</style>
  </section>
);

/* ═══════════════ COUNTDOWN SECTION ═══════════════ */
const Countdown = () => {
  const time = useCountdown("2026-07-25T20:00:00");
  return (
    <section style={{
      padding:"88px 20px",
      background:`linear-gradient(150deg,#2A0E3F 0%,${PLUM_DARK} 30%,${PLUM} 60%,#3A1550 100%)`,
      textAlign:"center",position:"relative",overflow:"hidden",
    }}>
      {/* Dark floral botanical overlay */}
      <div style={{position:"absolute",inset:0,opacity:0.14,pointerEvents:"none"}}>
        <svg style={{width:"100%",height:"100%"}} viewBox="0 0 1200 500" preserveAspectRatio="xMidYMid slice">
          <Rose x={80}   y={80}   r={2.2}  rotate={-20} opacity={1}/>
          <Rose x={40}   y={160}  r={1.4}  rotate={15}  opacity={1}/>
          <Peony x={180} y={50}   r={1.8}  rotate={-8}  opacity={1} color={ROSE_LIGHT}/>
          <LeafSprig x={60}  y={30}  r={1.8}  rotate={12} opacity={1}/>
          <LeafSprig x={150} y={100} r={1.4}  rotate={30} opacity={1}/>
          <Blossom x={260} y={70}  r={1.4}  rotate={15} opacity={1}/>

          <Rose x={1120}  y={80}  r={2.2}  rotate={20}  opacity={1}/>
          <Rose x={1160}  y={160} r={1.4}  rotate={-15} opacity={1}/>
          <Peony x={1020} y={50}  r={1.8}  rotate={8}   opacity={1} color={ROSE_LIGHT}/>
          <LeafSprig x={1140} y={30}  r={1.8} rotate={-12} opacity={1}/>
          <Blossom   x={940}  y={70}  r={1.4} rotate={-15} opacity={1}/>

          <Rose x={80}   y={420} r={2.2}  rotate={20}  opacity={1}/>
          <LeafSprig x={60}  y={470} r={1.8} rotate={-25} opacity={1}/>
          <Peony x={180} y={450} r={1.8}  rotate={10}  opacity={1} color={BLUSH}/>

          <Rose x={1120} y={420} r={2.2}  rotate={-20} opacity={1}/>
          <LeafSprig x={1140} y={470} r={1.8} rotate={25} opacity={1}/>
          <Peony x={1020} y={450} r={1.8} rotate={-10} opacity={1} color={BLUSH}/>

          <GoldBlossom x={600} y={60}  r={1.2} opacity={0.7}/>
          <GoldBlossom x={600} y={440} r={1.2} opacity={0.7}/>
          <GoldBlossom x={300} y={250} r={1.0} opacity={0.6}/>
          <GoldBlossom x={900} y={250} r={1.0} opacity={0.6}/>
          {[200,400,600,800,1000].map((x,i)=>(
            <LeafSprig key={i} x={x} y={i%2===0?120:380} r={0.9} rotate={i*30-40} opacity={0.8}/>
          ))}
        </svg>
      </div>

      {/* Gold radial glow */}
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"700px",height:"500px",background:`radial-gradient(ellipse,${GOLD}14 0%,transparent 65%)`,pointerEvents:"none"}}/>
      <div style={{position:"absolute",top:0,left:0,right:0,height:"1px",background:`linear-gradient(to right,transparent,${GOLD}66,transparent)`}}/>
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:"1px",background:`linear-gradient(to right,transparent,${GOLD}66,transparent)`}}/>

      <FadeUp>
        <div style={{position:"relative",zIndex:2}}>
          {/* Top floral mini-spray */}
          <div style={{display:"flex",justifyContent:"center",marginBottom:8,opacity:0.55}}>
            <svg width="200" height="50" viewBox="0 0 200 50">
              <Rose x={100} y={32} r={0.85} rotate={0}/>
              <LeafSprig x={68}  y={38} r={0.75} rotate={55}/>
              <LeafSprig x={132} y={38} r={0.75} rotate={-55}/>
              <Blossom x={44}  y={28} r={0.65} rotate={-25}/>
              <Blossom x={156} y={28} r={0.65} rotate={25}/>
            </svg>
          </div>

          <p style={{fontFamily:"Lato,sans-serif",fontSize:10,letterSpacing:"0.38em",textTransform:"uppercase",color:`${GOLD_LIGHT}88`,margin:"0 0 8px"}}>
            counting every heartbeat
          </p>
          <h3 style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"clamp(1.8rem,5vw,3.2rem)",fontWeight:600,fontStyle:"italic",color:CREAM,margin:"0 0 52px"}}>
            Until Our Day
          </h3>

          {/* Timer blocks */}
          <div style={{display:"flex",justifyContent:"center",gap:"clamp(10px,3vw,28px)",flexWrap:"wrap"}}>
            {[{label:"Days",val:time.days},{label:"Hours",val:time.hours},{label:"Minutes",val:time.minutes},{label:"Seconds",val:time.seconds}].map((t,i)=>(
              <div key={i} style={{textAlign:"center"}}>
                <div style={{width:"clamp(78px,18vw,108px)",height:"clamp(78px,18vw,108px)",position:"relative",marginBottom:10,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <svg style={{position:"absolute",inset:0,width:"100%",height:"100%"}} viewBox="0 0 100 100">
                    <rect x="2" y="2" width="96" height="96" rx="4" fill="rgba(255,255,255,0.05)" stroke={GOLD} strokeWidth="1.2"/>
                    <rect x="8" y="8" width="84" height="84" rx="2" fill="none" stroke={GOLD} strokeWidth="0.4" opacity="0.45"/>
                    {[[8,8],[92,8],[8,92],[92,92]].map(([cx,cy],j)=>(
                      <g key={j}>
                        <circle cx={cx} cy={cy} r="2.5" fill={GOLD} opacity="0.7"/>
                        <path d={`M${cx+(cx<50?4:-4)},${cy} L${cx+(cx<50?10:-10)},${cy}`} stroke={GOLD} strokeWidth="0.6" opacity="0.5"/>
                        <path d={`M${cx},${cy+(cy<50?4:-4)} L${cx},${cy+(cy<50?10:-10)}`} stroke={GOLD} strokeWidth="0.6" opacity="0.5"/>
                      </g>
                    ))}
                  </svg>
                  <span style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"clamp(2.2rem,5.5vw,3.2rem)",fontWeight:600,color:GOLD,lineHeight:1,position:"relative",zIndex:1}}>
                    {String(t.val??0).padStart(2,"0")}
                  </span>
                </div>
                <p style={{fontFamily:"Lato,sans-serif",fontSize:9,letterSpacing:"0.32em",textTransform:"uppercase",color:`${ROSE_LIGHT}99`,margin:0}}>{t.label}</p>
              </div>
            ))}
          </div>

          {/* Date + bottom floral */}
          <div style={{marginTop:48}}>
            <GoldDivider width={220}/>
            <p style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"clamp(1rem,2.5vw,1.35rem)",color:`${GOLD_LIGHT}cc`,margin:"10px 0 16px",letterSpacing:"0.22em"}}>
              25 · 07 · 2026
            </p>
            <div style={{display:"flex",justifyContent:"center",opacity:0.45}}>
              <svg width="200" height="50" viewBox="0 0 200 50">
                <Peony x={100} y={22} r={0.75} rotate={0} color={ROSE_LIGHT}/>
                <LeafSprig x={70}  y={15} r={0.65} rotate={-50}/>
                <LeafSprig x={130} y={15} r={0.65} rotate={50}/>
                <GoldBlossom x={42}  y={22} r={0.55} opacity={0.7}/>
                <GoldBlossom x={158} y={22} r={0.55} opacity={0.7}/>
              </svg>
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
};

/* ═══════════════ FOOTER ═══════════════ */
const Footer = () => (
  <footer style={{background:NAVY,padding:"52px 20px",textAlign:"center",position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",inset:0,opacity:0.12,pointerEvents:"none"}}>
      <svg style={{width:"100%",height:"100%"}} viewBox="0 0 800 160" preserveAspectRatio="xMidYMid slice">
        <Rose x={60}  y={80} r={1.6} rotate={-15}/>
        <LeafSprig x={20} y={60} r={1.4} rotate={20}/>
        <Blossom x={120} y={50} r={1.1} rotate={10}/>
        <Peony x={200} y={80} r={1.3} rotate={5} color={BLUSH}/>
        <Rose x={740} y={80} r={1.6} rotate={15}/>
        <LeafSprig x={780} y={60} r={1.4} rotate={-20}/>
        <Blossom x={680} y={50} r={1.1} rotate={-10}/>
        <Peony x={600} y={80} r={1.3} rotate={-5} color={BLUSH}/>
        <GoldBlossom x={400} y={80} r={1.0} opacity={0.8}/>
        <GoldBlossom x={300} y={40} r={0.7} opacity={0.6}/>
        <GoldBlossom x={500} y={40} r={0.7} opacity={0.6}/>
      </svg>
    </div>
    <div style={{position:"absolute",top:0,left:0,right:0,height:"1px",background:`linear-gradient(to right,transparent,${GOLD}77,transparent)`}}/>
    <div style={{position:"relative",zIndex:2}}>
      <svg width="100" height="24" viewBox="0 0 100 24" style={{marginBottom:14}}>
        <line x1="0" y1="12" x2="36" y2="12" stroke={GOLD} strokeWidth="0.5" opacity="0.5"/>
        <path d="M42 4 L44 12 L50 2 L56 12 L58 4" fill="none" stroke={GOLD} strokeWidth="1.1"/>
        <line x1="64" y1="12" x2="100" y2="12" stroke={GOLD} strokeWidth="0.5" opacity="0.5"/>
      </svg>
      <p style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"clamp(1.2rem,3vw,1.6rem)",fontStyle:"italic",color:GOLD,margin:"0 0 8px"}}>
        Abdulrahman &amp; Haneen
      </p>
      <p style={{fontFamily:"Lato,sans-serif",fontSize:10,letterSpacing:"0.28em",textTransform:"uppercase",color:`${ROSE_LIGHT}55`,margin:0}}>
        25 · 07 · 2026 &nbsp;·&nbsp; Nile Club, Cairo
      </p>
    </div>
  </footer>
);

/* ═══════════════ APP ═══════════════ */
export default function App() {
  const [opened,setOpened] = useState(false);
  return (
    <div style={{fontFamily:"Lato,sans-serif",background:CREAM,minHeight:"100vh"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Lato:wght@300;400;700&display=swap');
        *{box-sizing:border-box} body{margin:0}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:${CREAM}}
        ::-webkit-scrollbar-thumb{background:${GOLD}55;border-radius:3px}
      `}</style>

      <div style={{position:"fixed",inset:0,zIndex:100,pointerEvents:opened?"none":"auto",opacity:opened?0:1,transition:"opacity 0.9s ease 1.5s"}}>
        <EnvelopeHero onOpen={()=>setOpened(true)}/>
      </div>

      <div style={{opacity:opened?1:0,transform:opened?"translateY(0)":"translateY(28px)",transition:"opacity 1.1s ease 0.5s,transform 1.1s ease 0.5s"}}>
        <InvitationCard/>
        <Countdown/>
        <Footer/>
      </div>
    </div>
  );
}