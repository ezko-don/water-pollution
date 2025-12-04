import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect, useRef } from "react";
import { CheckCircle2, Shield, Leaf, Trash2, Droplets, Fish, Sparkles, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Pledge = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    zipCode: "",
  });
  const [pledges, setPledges] = useState({
    chemicals: false,
    petWaste: false,
    fertilizer: false,
    carWash: false,
    litter: false,
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Simple animation approach - items animate in on mount
  useEffect(() => {
    // Add simple delay for staggered entrance
    const timer = setTimeout(() => {
      // Animation handled by CSS
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const pledgeItems = [
    {
      id: "chemicals",
      icon: Shield,
      title: "Guardian of Proper Disposal",
      pledge: "I pledge to properly dispose of motor oil, paint, and household chemicals at designated facilities.",
      color: "from-blue-600 to-blue-800",
      animationSteps: [
        { icon: "🛢️", label: "Motor Oil", x: 20, y: 50 },
        { icon: "🚮", label: "Disposal", x: 70, y: 50 },
      ],
    },
    {
      id: "petWaste",
      icon: Trash2,
      title: "Pet Waste Champion",
      pledge: "I pledge to use pet waste bags and dispose of them in the trash, never in storm drains.",
      color: "from-green-600 to-emerald-700",
      animationSteps: [
        { icon: "🐕", label: "Pet", x: 15, y: 50 },
        { icon: "💩", label: "Waste", x: 35, y: 55 },
        { icon: "🛍️", label: "Bag", x: 55, y: 50 },
        { icon: "🗑️", label: "Trash", x: 80, y: 50 },
      ],
    },
    {
      id: "fertilizer",
      icon: Leaf,
      title: "Eco-Lawn Protector",
      pledge: "I pledge to use phosphorus-free fertilizer and sweep clippings instead of hosing them into drains.",
      color: "from-lime-600 to-green-700",
      animationSteps: [
        { icon: "🌱", label: "Lawn", x: 20, y: 50 },
        { icon: "🧹", label: "Sweep", x: 50, y: 50 },
        { icon: "♻️", label: "Recycle", x: 80, y: 50 },
      ],
    },
    {
      id: "carWash",
      icon: Droplets,
      title: "Clean Car, Clean Water",
      pledge: "I pledge to wash my car at commercial car washes or on grass/gravel areas where water can filter naturally.",
      color: "from-cyan-600 to-blue-700",
      animationSteps: [
        { icon: "🚗", label: "Car", x: 20, y: 50 },
        { icon: "💧", label: "Wash", x: 50, y: 50 },
        { icon: "🌿", label: "Grass", x: 80, y: 50 },
      ],
    },
    {
      id: "litter",
      icon: Trash2,
      title: "Zero Litter Warrior",
      pledge: "I pledge to never litter and to pick up trash I see near storm drains.",
      color: "from-orange-600 to-red-700",
      animationSteps: [
        { icon: "🗑️", label: "Litter", x: 25, y: 50 },
        { icon: "👊", label: "Pick Up", x: 50, y: 45 },
        { icon: "✅", label: "Clean", x: 75, y: 50 },
      ],
    },
  ];

  const playSuccessSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

      const oscillator1 = audioContext.createOscillator();
      const gainNode1 = audioContext.createGain();

      oscillator1.connect(gainNode1);
      gainNode1.connect(audioContext.destination);

      oscillator1.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator1.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);

      gainNode1.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

      oscillator1.start(audioContext.currentTime);
      oscillator1.stop(audioContext.currentTime + 0.3);

      setTimeout(() => {
        const oscillator2 = audioContext.createOscillator();
        const gainNode2 = audioContext.createGain();

        oscillator2.connect(gainNode2);
        gainNode2.connect(audioContext.destination);

        oscillator2.frequency.setValueAtTime(600, audioContext.currentTime);
        oscillator2.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.15);

        gainNode2.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);

        oscillator2.start(audioContext.currentTime);
        oscillator2.stop(audioContext.currentTime + 0.4);
      }, 100);
    } catch (error) {
      console.log('Audio context not available:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedPledges = Object.entries(pledges)
      .filter(([_, value]) => value)
      .map(([key]) => pledgeItems.find(item => item.id === key)?.title || key);

    if (selectedPledges.length === 0) {
      toast({
        title: "Please select at least one pledge",
        description: "Choose the actions you commit to taking.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.name || !formData.email) {
      toast({
        title: "Please fill in required fields",
        description: "Name and email are required.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      playSuccessSound();
      setShowConfirmation(true);

      toast({
        title: "🌊 Welcome, Guardian!",
        description: `You've pledged to ${selectedPledges.length} action${selectedPledges.length > 1 ? 's' : ''}!`,
      });
    }, 1000);
  };

  const handlePledgeToggle = (pledgeId: string) => {
    setPledges({ ...pledges, [pledgeId]: !pledges[pledgeId as keyof typeof pledges] });
  };

  // Full-screen confirmation modal
  if (showConfirmation) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 z-50 flex items-center justify-center p-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating Fish */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + (i % 3)}s`,
              }}
            >
              <Fish className={`h-${8 + (i % 4) * 2} w-${8 + (i % 4) * 2} text-white/20`} />
            </div>
          ))}

          {/* Water Bubbles */}
          {[...Array(15)].map((_, i) => (
            <div
              key={`bubble-${i}`}
              className="absolute rounded-full bg-white/10 animate-bounce"
              style={{
                width: `${10 + (i % 5) * 8}px`,
                height: `${10 + (i % 5) * 8}px`,
                left: `${5 + i * 6}%`,
                bottom: `-${20 + (i % 3) * 30}px`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${4 + (i % 3) * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl w-full">
          <Card className="border-4 border-white shadow-2xl bg-white/95 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              {/* Success Icon */}
              <div className="relative inline-block mb-6">
                <CheckCircle2 className="h-28 w-28 text-green-600 animate-zoom-in" />
                <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-yellow-500 animate-spin" style={{ animationDuration: '3s' }} />
                <Sparkles className="absolute -bottom-2 -left-2 h-6 w-6 text-blue-500 animate-ping" />
              </div>

              {/* Thank You Message */}
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent animate-slide-up">
                Thank You, Guardian!
              </h1>

              <p className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 animate-fade-in">
                You are now an official
              </p>

              <h2 className="text-4xl md:text-5xl font-bold text-blue-600 mb-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
                ⚡ Storm Drain Savior ⚡
              </h2>

              {/* Pledge Summary */}
              <div className="bg-blue-50 rounded-2xl p-6 mb-8 animate-fade-in" style={{ animationDelay: '400ms' }}>
                <p className="text-xl text-gray-700 mb-4">
                  <strong>{formData.name}</strong>, you've committed to:
                </p>
                <div className="space-y-2">
                  {Object.entries(pledges)
                    .filter(([_, value]) => value)
                    .map(([key]) => {
                      const item = pledgeItems.find(p => p.id === key);
                      return (
                        <div key={key} className="flex items-center justify-center gap-2 text-lg">
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                          <span>{item?.title}</span>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Impact Message */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 mb-8 animate-zoom-in" style={{ animationDelay: '600ms' }}>
                <p className="text-lg text-gray-700">
                  Your actions will help protect our local waterways, preserve wildlife habitats,
                  and ensure clean water for future generations. Together, we're creating real change! 🌊
                </p>
              </div>

              {/* Email Confirmation */}
              <p className="text-gray-600 mb-8 animate-fade-in" style={{ animationDelay: '800ms' }}>
                📧 A confirmation email has been sent to <strong>{formData.email}</strong>
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '1000ms' }}>
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 hover:scale-110 transition-transform"
                  onClick={() => navigate("/events")}
                >
                  Find Local Events
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8 py-6 hover:scale-110 transition-transform"
                  onClick={() => navigate("/")}
                >
                  Back to Home
                </Button>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowConfirmation(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <Sparkles className="h-16 w-16 mx-auto mb-6 animate-wave" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Your Pledge, Our Pure Water
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-95 mb-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <strong>I am a guardian of my local waterways.</strong>
          </p>
          <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90 animate-fade-in" style={{ animationDelay: '400ms' }}>
            I pledge to take these simple actions to prevent pollution at its source and protect the waters we all depend on.
          </p>
        </div>
      </section>

      {/* Pledge Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-5xl mx-auto shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
              <CardTitle className="text-4xl text-center">Make Your Sacred Commitment</CardTitle>
              <CardDescription className="text-lg text-center">
                Select the actions you commit to and join our community of water protectors
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-12">
                {/* Pledge Items with Animations */}
                <div className="space-y-8">
                  <h3 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    As a Guardian, I Pledge To:
                  </h3>

                  {pledgeItems.map((item, index) => {
                    const Icon = item.icon;
                    const isChecked = pledges[item.id as keyof typeof pledges];

                    return (
                      <div
                        key={item.id}
                        className="transition-all duration-700 opacity-100 translate-y-0 animate-slide-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div
                          className={`relative p-6 rounded-2xl border-4 transition-all cursor-pointer ${isChecked
                            ? 'border-green-600 bg-green-50 shadow-lg scale-105'
                            : 'border-gray-200 hover:border-blue-400 hover:shadow-md'
                            }`}
                          onClick={() => handlePledgeToggle(item.id)}
                        >
                          <div className="flex items-start gap-6">
                            <input
                              type="checkbox"
                              id={item.id}
                              checked={isChecked}
                              readOnly
                              className="mt-2 h-6 w-6 rounded border-2 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                            />

                            <div className="flex-1">
                              {/* Pledge Header */}
                              <div className="flex items-center gap-4 mb-4">
                                <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center flex-shrink-0 shadow-lg`}>
                                  <Icon className="h-7 w-7 text-white" />
                                </div>
                                <h4 className="text-2xl font-bold">{item.title}</h4>
                              </div>

                              {/* Pledge Statement */}
                              <p className="text-lg text-gray-700 mb-4 italic">
                                "{item.pledge}"
                              </p>

                              {/* Animated Illustration - Always visible */}
                              <div className="bg-white/50 rounded-xl p-6 mt-4 border-2 border-gray-100">
                                <div className="relative h-24">
                                  {item.animationSteps.map((step, stepIndex) => (
                                    <div
                                      key={stepIndex}
                                      className="absolute transition-all duration-1000 animate-bounce"
                                      style={{
                                        left: `${step.x}%`,
                                        top: `${step.y}%`,
                                        transform: 'translate(-50%, -50%)',
                                        animationDelay: `${stepIndex * 300}ms`,
                                        animationDuration: '2s',
                                      }}
                                    >
                                      <div className="text-center">
                                        <div className="text-4xl mb-1 drop-shadow-lg">{step.icon}</div>
                                        <div className="text-xs font-semibold text-gray-600 bg-white/80 px-2 py-1 rounded-full">
                                          {step.label}
                                        </div>
                                      </div>
                                    </div>
                                  ))}

                                  {/* Arrow connecting steps */}
                                  {item.animationSteps.length > 1 && (
                                    <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
                                      <defs>
                                        <linearGradient id={`gradient-${item.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                                          <stop offset="100%" stopColor="#10B981" stopOpacity="0.3" />
                                        </linearGradient>
                                      </defs>
                                      <line
                                        x1="20%"
                                        y1="50%"
                                        x2="80%"
                                        y2="50%"
                                        stroke={`url(#gradient-${item.id})`}
                                        strokeWidth="3"
                                        strokeDasharray="5,5"
                                        className="animate-pulse"
                                      />
                                    </svg>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Personal Information */}
                <div className="space-y-6 pt-8 border-t-4 border-blue-200">
                  <h3 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    Your Guardian Information
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-lg">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="text-lg p-6"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-lg">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="text-lg p-6"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="zipCode" className="text-lg">ZIP Code (Optional)</Label>
                    <Input
                      id="zipCode"
                      placeholder="12345"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      className="max-w-xs text-lg p-6"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <Button
                    type="submit"
                    size="lg"
                    className="text-xl px-12 py-8 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center gap-3">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
                        Taking Your Pledge...
                      </span>
                    ) : (
                      <span className="flex items-center gap-3">
                        <CheckCircle2 className="h-6 w-6" />
                        Become a Guardian Now!
                      </span>
                    )}
                  </Button>
                  <p className="text-gray-500 mt-4 text-sm">
                    By submitting, you agree to receive updates about community events and water protection initiatives.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Impact Preview */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Your Pledge Creates Real Impact</h2>
          <p className="text-xl max-w-3xl mx-auto mb-12 opacity-95 animate-fade-in" style={{ animationDelay: '200ms' }}>
            Every action you commit to prevents pollution, protects wildlife, and ensures clean water for future generations.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl animate-zoom-in">
              <div className="text-6xl font-bold mb-3">1 Quart</div>
              <p className="text-lg opacity-90">
                Motor oil can pollute <strong>250,000 gallons</strong> of water
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl animate-zoom-in" style={{ animationDelay: '200ms' }}>
              <div className="text-6xl font-bold mb-3">100%</div>
              <p className="text-lg opacity-90">
                Storm drain water flows <strong>untreated</strong> to waterways
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl animate-zoom-in" style={{ animationDelay: '400ms' }}>
              <div className="text-6xl font-bold mb-3">Together</div>
              <p className="text-lg opacity-90">
                We can <strong>reverse</strong> water pollution
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pledge;
