import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Droplet, Fish, Leaf, Factory, Trash2, Car, Beaker } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import pollutedWater from "@/assets/polluted-water.jpg";
import heroImage from "@/assets/hero-waterway.jpg";
import pollutionCloseup from "@/assets/pollution-closeup.jpg";
import cleanRiver from "@/assets/clean-river.jpg";
import stencilingAction from "@/assets/stenciling-action.jpg";

const Problem = () => {
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [beforeAfterPosition1, setBeforeAfterPosition1] = useState(50);
  const [beforeAfterPosition2, setBeforeAfterPosition2] = useState(50);
  const [isDragging1, setIsDragging1] = useState(false);
  const [isDragging2, setIsDragging2] = useState(false);
  const journeyRef = useRef<HTMLDivElement>(null);
  const slider1Ref = useRef<HTMLDivElement>(null);
  const slider2Ref = useRef<HTMLDivElement>(null);

  // Scroll-triggered raindrop animation
  useEffect(() => {
    const handleScroll = () => {
      if (journeyRef.current) {
        const rect = journeyRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementHeight = rect.height;

        // Calculate progress when element is in viewport
        if (rect.top < windowHeight && rect.bottom > 0) {
          const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
          const progress = Math.min(100, Math.max(0, (visibleHeight / elementHeight) * 100));
          setScrollProgress(progress);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Before/After slider handlers
  const handleSliderMove = (
    e: React.MouseEvent | React.TouchEvent,
    sliderRef: React.RefObject<HTMLDivElement>,
    setPosition: React.Dispatch<React.SetStateAction<number>>
  ) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percentage);
  };

  const commonCulprits = [
    {
      icon: Car,
      title: "Motor Oil",
      description: "Just one quart can contaminate 250,000 gallons of water",
      color: "from-orange-600 to-red-600",
      position: 25,
    },
    {
      icon: Leaf,
      title: "Fertilizers",
      description: "Causes algae blooms that suffocate aquatic life",
      color: "from-green-600 to-emerald-700",
      position: 40,
    },
    {
      icon: Trash2,
      title: "Litter",
      description: "Plastics and trash clog waterways and harm wildlife",
      color: "from-gray-600 to-slate-700",
      position: 55,
    },
    {
      icon: Beaker,
      title: "Chemicals",
      description: "Household cleaners poison fish and contaminate drinking water",
      color: "from-purple-600 to-violet-700",
      position: 70,
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary via-ocean-medium to-secondary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse-slow [animation-delay:1.5s]" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <AlertTriangle className="h-20 w-20 mx-auto mb-6 animate-wave" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            See the Stream to Drain Connection
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto opacity-95 mb-8 animate-fade-in [animation-delay:200ms]">
            Storm drains are NOT connected to sewage treatment plants. Everything that goes down
            them flows directly—untreated—into our local rivers and lakes.
          </p>
        </div>
      </section>

      {/* Interactive Raindrop Journey */}
      <section ref={journeyRef} className="py-20 bg-gradient-to-b from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Follow the Raindrop's Journey
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-16 max-w-3xl mx-auto">
            Watch as a single raindrop picks up pollutants on its way to our waterways
          </p>

          {/* Journey Path with SVG */}
          <div className="relative max-w-5xl mx-auto h-[600px]">
            {/* Path Line */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              <path
                d="M 50 80 Q 150 150, 250 220 T 450 360 Q 550 430, 600 520"
                fill="none"
                stroke="url(#pathGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="1000"
                strokeDashoffset={1000 - (scrollProgress * 10)}
                className="transition-all duration-300"
              />
            </svg>

            {/* Starting Point - Street */}
            <div className="absolute top-10 left-8 text-center animate-fade-in">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-full shadow-lg border-4 border-blue-500">
                <Droplet className="h-8 w-8 text-blue-500" />
              </div>
              <p className="font-bold mt-2 text-lg">Street</p>
            </div>

            {/* Pollutant Waypoints */}
            {commonCulprits.map((culprit, index) => {
              const Icon = culprit.icon;
              const isActive = scrollProgress > (index + 1) * 20;

              return (
                <div
                  key={index}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${isActive ? 'scale-100 opacity-100' : 'scale-50 opacity-30'
                    }`}
                  style={{
                    left: `${20 + index * 18}%`,
                    top: `${15 + index * 20}%`,
                  }}
                >
                  <div className={`bg-gradient-to-br ${culprit.color} p-5 rounded-2xl shadow-2xl border-4 border-white relative group cursor-pointer`}>
                    <Icon className="h-10 w-10 text-white" />

                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-gray-900 text-white p-3 rounded-lg shadow-xl max-w-xs whitespace-nowrap">
                        <p className="font-bold text-sm">{culprit.title}</p>
                        <p className="text-xs mt-1">{culprit.description}</p>
                      </div>
                      <div className="w-3 h-3 bg-gray-900 rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2" />
                    </div>
                  </div>

                  {/* Pollutant Label */}
                  <p className="text-center font-bold mt-2 text-sm bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow">
                    {culprit.title}
                  </p>
                </div>
              );
            })}

            {/* Storm Drain */}
            <div
              className={`absolute top-[55%] left-[65%] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${scrollProgress > 60 ? 'scale-100 opacity-100' : 'scale-50 opacity-30'
                }`}
            >
              <div className="bg-gray-700 p-6 rounded-full shadow-2xl border-4 border-yellow-500 animate-pulse-slow">
                <AlertTriangle className="h-12 w-12 text-yellow-500" />
              </div>
              <p className="font-bold mt-2 text-lg text-center">Storm Drain</p>
            </div>

            {/* Ending Point - River */}
            <div
              className={`absolute bottom-10 right-8 text-center transition-all duration-500 ${scrollProgress > 80 ? 'scale-100 opacity-100' : 'scale-50 opacity-30'
                }`}
            >
              <div className="bg-red-600 p-6 rounded-full shadow-2xl border-4 border-red-800 animate-glow">
                <Fish className="h-12 w-12 text-white" />
              </div>
              <p className="font-bold mt-2 text-lg">Polluted River</p>
            </div>

            {/* Animated Raindrop */}
            <div
              className="absolute w-12 h-12 transition-all duration-300 ease-linear"
              style={{
                left: `${Math.min(90, 8 + scrollProgress * 0.9)}%`,
                top: `${Math.min(85, 10 + scrollProgress * 0.75)}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="relative">
                <Droplet className="h-12 w-12 text-blue-500 animate-bounce drop-shadow-lg fill-blue-400" />
                {scrollProgress > 20 && (
                  <div className="absolute inset-0 bg-yellow-500 rounded-full opacity-30 animate-ping" />
                )}
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="max-w-xs mx-auto mt-12">
            <div className="bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-red-600 transition-all duration-300"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
            <p className="text-center mt-2 text-sm text-muted-foreground">
              Scroll to see the journey • {Math.round(scrollProgress)}%
            </p>
          </div>
        </div>
      </section>

      {/* Common Culprits Details */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Common Culprits
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-16 max-w-3xl mx-auto">
            These everyday substances become dangerous pollutants
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {commonCulprits.map((culprit, index) => {
              const Icon = culprit.icon;
              return (
                <Card
                  key={index}
                  className="border-2 hover:shadow-2xl hover:scale-105 transition-all duration-500 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${culprit.color} rounded-full flex items-center justify-center mb-4 animate-float`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{culprit.title}</h3>
                    <p className="text-muted-foreground">{culprit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* The Ripple Effect - Before/After Sliders */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            The Ripple Effect
          </h2>
          <p className="text-xl text-center text-muted-foreground mb-16 max-w-3xl mx-auto">
            See the dramatic transformation pollution causes to our waterways
          </p>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Before/After Slider 1 - River */}
            <div className="animate-slide-in-left">
              <h3 className="text-2xl font-bold text-center mb-4">River Transformation</h3>
              <div
                ref={slider1Ref}
                className="relative w-full h-96 overflow-hidden rounded-2xl shadow-2xl cursor-ew-resize border-4 border-primary group"
                onMouseMove={(e) => isDragging1 && handleSliderMove(e, slider1Ref, setBeforeAfterPosition1)}
                onTouchMove={(e) => isDragging1 && handleSliderMove(e, slider1Ref, setBeforeAfterPosition1)}
                onMouseDown={() => setIsDragging1(true)}
                onMouseUp={() => setIsDragging1(false)}
                onMouseLeave={() => setIsDragging1(false)}
                onTouchStart={() => setIsDragging1(true)}
                onTouchEnd={() => setIsDragging1(false)}
              >
                {/* After Image (Polluted) */}
                <div className="absolute inset-0">
                  <img
                    src={pollutedWater}
                    alt="Polluted waterway with algae"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                    After Pollution
                  </div>
                </div>

                {/* Before Image (Clean) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - beforeAfterPosition1}% 0 0)` }}
                >
                  <img
                    src={cleanRiver}
                    alt="Clean vibrant river"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-green-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                    Clean & Vibrant
                  </div>
                </div>

                {/* Slider Handle */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl group-hover:w-2 transition-all"
                  style={{ left: `${beforeAfterPosition1}%` }}
                >
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-primary group-hover:scale-125 transition-transform">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-center mt-4 text-muted-foreground italic">
                Drag the slider to compare • Algae blooms vs. crystal clear water
              </p>
            </div>

            {/* Before/After Slider 2 - Drain */}
            <div className="animate-slide-in-right">
              <h3 className="text-2xl font-bold text-center mb-4">Storm Drain Comparison</h3>
              <div
                ref={slider2Ref}
                className="relative w-full h-96 overflow-hidden rounded-2xl shadow-2xl cursor-ew-resize border-4 border-accent group"
                onMouseMove={(e) => isDragging2 && handleSliderMove(e, slider2Ref, setBeforeAfterPosition2)}
                onTouchMove={(e) => isDragging2 && handleSliderMove(e, slider2Ref, setBeforeAfterPosition2)}
                onMouseDown={() => setIsDragging2(true)}
                onMouseUp={() => setIsDragging2(false)}
                onMouseLeave={() => setIsDragging2(false)}
                onTouchStart={() => setIsDragging2(true)}
                onTouchEnd={() => setIsDragging2(false)}
              >
                {/* After Image (Littered) */}
                <div className="absolute inset-0">
                  <img
                    src={pollutionCloseup}
                    alt="Littered storm drain"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                    Littered Drain
                  </div>
                </div>

                {/* Before Image (Clean) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - beforeAfterPosition2}% 0 0)` }}
                >
                  <img
                    src={stencilingAction}
                    alt="Clean marked storm drain"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-green-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                    Marked & Protected
                  </div>
                </div>

                {/* Slider Handle */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl group-hover:w-2 transition-all"
                  style={{ left: `${beforeAfterPosition2}%` }}
                >
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-accent group-hover:scale-125 transition-transform">
                    <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-center mt-4 text-muted-foreground italic">
                Drag the slider to compare • Litter and debris vs. community awareness
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-gradient-to-br from-ocean-deep to-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse-slow [animation-delay:1s]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">The Impact</h2>
          <p className="text-center text-xl mb-12 opacity-90 max-w-2xl mx-auto">
            Stormwater pollution affects every aspect of our ecosystem
          </p>

          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="animate-zoom-in">
              <Fish className="h-16 w-16 mx-auto mb-4 animate-float" />
              <div className="text-5xl font-bold mb-2">70%</div>
              <p className="text-lg opacity-90">
                of fish populations affected by stormwater pollution
              </p>
            </div>
            <div className="animate-zoom-in [animation-delay:200ms]">
              <Droplet className="h-16 w-16 mx-auto mb-4 animate-float [animation-delay:1s]" />
              <div className="text-5xl font-bold mb-2">80%</div>
              <p className="text-lg opacity-90">
                of ocean pollution comes from land-based sources
              </p>
            </div>
            <div className="animate-zoom-in [animation-delay:400ms]">
              <AlertTriangle className="h-16 w-16 mx-auto mb-4 animate-float [animation-delay:2s]" />
              <div className="text-5xl font-bold mb-2">100%</div>
              <p className="text-lg opacity-90">
                preventable with proper education and community action
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 animate-fade-in">You Can Make a Difference</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in [animation-delay:200ms]">
            Understanding the problem is the first step. Now, join us in taking action to protect
            our precious waterways.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/pledge")}
              className="text-lg px-8 hover:scale-110 transition-transform animate-zoom-in [animation-delay:400ms]"
            >
              Take the Pledge
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate("/events")}
              className="text-lg px-8 hover:scale-110 transition-transform animate-zoom-in [animation-delay:600ms]"
            >
              Join an Event
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Problem;
