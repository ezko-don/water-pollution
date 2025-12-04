import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Droplets, Users, Target, Sparkles, Play, X } from "lucide-react";
import { useEffect, useState } from "react";
import heroImage from "@/assets/hero-waterway.jpg";
import stencilImage from "@/assets/storm-drain-stencil.jpg";
import cleanRiver from "@/assets/clean-river.jpg";
import volunteersCleanup from "@/assets/volunteers-cleanup.jpg";
import stencilingAction from "@/assets/stenciling-action.jpg";
import beforeAfter from "@/assets/before-after.jpg";
// Teaching images for video thumbnails
const teachingImage2 = "/teaching-2.jpg";
const teachingImage3 = "/teaching-3.jpg";
const teachingImage5 = "/teaching-5.jpg";
const teachingImage6 = "/teaching-6.jpg";
const stenciledDrain = "/stenciled-drain.jpg";

const Home = () => {
  const navigate = useNavigate();
  const [pledgeCount, setPledgeCount] = useState(0);
  const targetCount = 247;
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Local video files
  const videoUrls: { [key: string]: string } = {
    'video1': '/videos/educational-video.mp4',
    'video2': '/videos/river-situation.mp4',
    'video3': '/videos/whole-community.mp4',
    'video4': '/videos/animated-explanation.mp4',
    'video5': '/videos/hero-waterway.mp4'
  };

  useEffect(() => {
    // Animate counter on mount
    let current = 0;
    const increment = targetCount / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetCount) {
        setPledgeCount(targetCount);
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 2000);
        clearInterval(timer);
      } else {
        setPledgeCount(Math.floor(current));
      }
    }, 30);

    return () => clearInterval(timer);
  }, []);

  const toggleSound = () => {
    const audioElement = document.getElementById('ambient-audio') as HTMLAudioElement;
    if (audioElement) {
      if (soundEnabled) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
      setSoundEnabled(!soundEnabled);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/hero-waterway.mp4" type="video/mp4" />
            <source src="/videos/river-situation.mp4" type="video/mp4" />
          </video>
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/70 via-ocean-deep/50 to-background" />
        </div>

        {/* Ambient Sound (hidden audio element) */}
        <audio id="ambient-audio" loop>
          <source src="https://assets.mixkit.co/active_storage/sfx/2393/2393-preview.mp3" type="audio/mpeg" />
        </audio>

        {/* Sound Toggle Button */}
        <button
          onClick={toggleSound}
          className="absolute top-24 right-6 z-20 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white p-3 rounded-full transition-all hover:scale-110"
          aria-label="Toggle ambient sound"
        >
          {soundEnabled ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
            </svg>
          )}
        </button>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg animate-slide-up">
            Be the Hero Your River Needs
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/95 max-w-3xl mx-auto drop-shadow animate-slide-up [animation-delay:200ms]">
            Every storm drain leads directly to our local waterways. Together, we can protect them
            from pollution—one pledge, one stencil, one action at a time.
          </p>

          {/* Pledge Counter with Celebration */}
          <div className="inline-block mb-8 bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 animate-slide-up [animation-delay:400ms] relative">
            <div className="text-6xl font-bold text-white mb-2">
              {pledgeCount}
              {showCelebration && (
                <span className="inline-flex gap-2 ml-4">
                  <span className="animate-bounce">💧</span>
                  <span className="animate-bounce [animation-delay:100ms]">💧</span>
                  <span className="animate-bounce [animation-delay:200ms]">💧</span>
                </span>
              )}
            </div>
            <div className="text-lg text-white/90">Pledges to Protect Our Water</div>

            {/* Celebration Particles */}
            {showCelebration && (
              <>
                <div className="absolute top-0 left-1/4 animate-float">
                  <Sparkles className="h-6 w-6 text-blue-300" />
                </div>
                <div className="absolute top-0 right-1/4 animate-float [animation-delay:500ms]">
                  <Sparkles className="h-6 w-6 text-blue-300" />
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up [animation-delay:600ms]">
            <Button
              size="lg"
              onClick={() => navigate("/pledge")}
              className="text-lg px-8 py-6 hover:scale-105 transition-transform"
            >
              Take the Pledge Now
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate("/problem")}
              className="text-lg px-8 py-6 hover:scale-105 transition-transform"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/70 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 animate-fade-in">See Our Impact</h2>
          <p className="text-xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in [animation-delay:200ms]">
            Watch how our community is making a difference
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Video 1 - Water Pollution Education */}
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl group animate-slide-in-left cursor-pointer"
              onClick={() => setPlayingVideo('video1')}
            >
              <img
                src={teachingImage2}
                alt="Educational teaching session"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/80 to-transparent flex items-center justify-center group-hover:bg-ocean-deep/60 transition-all">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform animate-pulse">
                    <Play className="h-10 w-10 text-white ml-1" />
                  </div>
                  <p className="text-white font-semibold text-lg">Educational Video</p>
                  <p className="text-white/80 text-sm mt-2">Learn about water protection and community action</p>
                </div>
              </div>
            </div>

            {/* Video 2 - Storm Drain Stenciling */}
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl group animate-slide-in-right cursor-pointer"
              onClick={() => setPlayingVideo('video2')}
            >
              <img
                src={teachingImage3}
                alt="Community education and awareness"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/80 to-transparent flex items-center justify-center group-hover:bg-ocean-deep/60 transition-all">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform animate-pulse">
                    <Play className="h-10 w-10 text-white ml-1" />
                  </div>
                  <p className="text-white font-semibold text-lg">River Situation</p>
                  <p className="text-white/80 text-sm mt-2">See the current state of our waterways</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Video Row */}
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-8">
            <div
              className="relative rounded-xl overflow-hidden shadow-xl group cursor-pointer animate-zoom-in"
              onClick={() => setPlayingVideo('video3')}
            >
              <img
                src={teachingImage5}
                alt="Environmental education program"
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/80 to-transparent flex items-center justify-center group-hover:bg-ocean-deep/60 transition-all">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <Play className="h-8 w-8 text-white ml-1" />
                  </div>
                  <p className="text-white font-medium text-sm mt-2">Whole Community Impact</p>
                </div>
              </div>
            </div>

            <div
              className="relative rounded-xl overflow-hidden shadow-xl group cursor-pointer animate-zoom-in [animation-delay:200ms]"
              onClick={() => setPlayingVideo('video4')}
            >
              <img
                src={stenciledDrain}
                alt="Real stenciled storm drain"
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/80 to-transparent flex items-center justify-center group-hover:bg-ocean-deep/60 transition-all">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <Play className="h-8 w-8 text-white ml-1" />
                  </div>
                  <p className="text-white font-medium text-sm mt-2">Animated Explanation</p>
                </div>
              </div>
            </div>

            <div
              className="relative rounded-xl overflow-hidden shadow-xl group cursor-pointer animate-zoom-in [animation-delay:400ms]"
              onClick={() => setPlayingVideo('video5')}
            >
              <img
                src={teachingImage6}
                alt="Teaching and community engagement"
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/80 to-transparent flex items-center justify-center group-hover:bg-ocean-deep/60 transition-all">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <Play className="h-8 w-8 text-white ml-1" />
                  </div>
                  <p className="text-white font-medium text-sm mt-2">Hero Waterway</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Modal */}
        {playingVideo && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setPlayingVideo(null)}>
            <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setPlayingVideo(null)}
                className="absolute -top-12 right-0 text-white hover:text-primary transition-colors"
              >
                <X className="h-8 w-8" />
              </button>
              <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
                <video
                  className="w-full h-auto max-h-[80vh]"
                  controls
                  autoPlay
                  src={playingVideo ? videoUrls[playingVideo] : ''}
                  onError={(e) => {
                    console.error('Video failed to load:', e);
                    setPlayingVideo(null);
                  }}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Before/After Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 animate-fade-in">The Transformation</h2>
          <p className="text-xl text-center text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in [animation-delay:200ms]">
            See the dramatic difference community action can make
          </p>

          <div className="max-w-5xl mx-auto animate-zoom-in">
            <img
              src={beforeAfter}
              alt="Before and after water quality transformation"
              className="w-full rounded-2xl shadow-2xl"
            />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center p-4 bg-warning-pollution/10 rounded-lg">
                <p className="font-bold text-xl mb-2">Before</p>
                <p className="text-muted-foreground">Polluted waterway with debris</p>
              </div>
              <div className="text-center p-4 bg-nature-green/10 rounded-lg">
                <p className="font-bold text-xl mb-2">After</p>
                <p className="text-muted-foreground">Crystal clear water with thriving fish</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 animate-fade-in">How Storm Drain Saviors Works</h2>
          <p className="text-xl text-center text-muted-foreground mb-16 max-w-2xl mx-auto animate-fade-in [animation-delay:200ms]">
            A multi-faceted approach to protecting our local waterways
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary transition-all hover:shadow-lg hover:scale-105 transform duration-300 animate-slide-up">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-6 animate-float">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Mark the Drains</h3>
                <p className="text-muted-foreground mb-4">
                  Stencil informative markers next to storm drains with messages like "Dump No
                  Waste - Drains to River" to educate passersby.
                </p>
                <img
                  src={stencilImage}
                  alt="Storm drain stencil"
                  className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                />
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-secondary transition-all hover:shadow-lg hover:scale-105 transform duration-300 animate-slide-up [animation-delay:200ms]">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center mb-6 animate-float [animation-delay:1s]">
                  <Droplets className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Educational Blitz</h3>
                <p className="text-muted-foreground mb-4">
                  Learn how motor oil, fertilizers, pet waste, and car wash water flow untreated
                  directly into our waterways, harming ecosystems and water quality.
                </p>
                <img
                  src={cleanRiver}
                  alt="Clean river ecosystem"
                  className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                />
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent transition-all hover:shadow-lg hover:scale-105 transform duration-300 animate-slide-up [animation-delay:400ms]">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-nature-green rounded-full flex items-center justify-center mb-6 animate-float [animation-delay:2s]">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Take the Pledge</h3>
                <p className="text-muted-foreground mb-4">
                  Commit to simple actions: properly dispose of chemicals, use pet waste bags, and
                  choose phosphorus-free fertilizer.
                </p>
                <img
                  src={volunteersCleanup}
                  alt="Community volunteers"
                  className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-secondary to-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse-slow [animation-delay:1.5s]" />
        </div>

        <div className="container mx-auto px-4 text-center text-white relative z-10">
          <h2 className="text-4xl font-bold mb-6 animate-fade-in">Your Impact Matters</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-95 animate-fade-in [animation-delay:200ms]">
            Every pledge, every stenciled drain, and every mindful action creates a ripple effect
            throughout our community. Together, we're building a cleaner, healthier future for our
            local waterways.
          </p>
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="animate-zoom-in">
              <div className="text-5xl font-bold mb-2">{pledgeCount}+</div>
              <div className="text-lg opacity-90">Pledges Made</div>
            </div>
            <div className="animate-zoom-in [animation-delay:200ms]">
              <div className="text-5xl font-bold mb-2">45+</div>
              <div className="text-lg opacity-90">Drains Marked</div>
            </div>
            <div className="animate-zoom-in [animation-delay:400ms]">
              <div className="text-5xl font-bold mb-2">8</div>
              <div className="text-lg opacity-90">Events Held</div>
            </div>
            <div className="animate-zoom-in [animation-delay:600ms]">
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-lg opacity-90">Volunteers</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 animate-fade-in">Ready to Make a Difference?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in [animation-delay:200ms]">
            Join hundreds of community members who have already pledged to protect our waterways.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/pledge")}
            className="text-lg px-12 py-6 hover:scale-110 transition-transform duration-300 animate-zoom-in [animation-delay:400ms]"
          >
            Take the Pledge Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
