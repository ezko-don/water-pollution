import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Users, Download } from "lucide-react";
import volunteersImage from "@/assets/volunteers-stenciling.jpg";
import stencilImage from "@/assets/storm-drain-stencil.jpg";
// Teaching images
const teachingImage2 = "/teaching-2.jpg";
const teachingImage3 = "/teaching-3.jpg";
const teachingImage5 = "/teaching-5.jpg";
const teachingImage6 = "/teaching-6.jpg";
const stenciledDrain = "/stenciled-drain.jpg";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/integrations/supabase/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [events, setEvents] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
    if (user) {
      loadUserRegistrations();
    }
  }, [user]);

  const loadEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*, event_registrations(count)')
      .gte('event_date', new Date().toISOString())
      .order('event_date', { ascending: true });

    if (!error && data) {
      setEvents(data);
    }
    setLoading(false);
  };

  const loadUserRegistrations = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('event_registrations')
      .select('event_id')
      .eq('user_id', user.id);

    if (data) {
      setRegistrations(new Set(data.map(r => r.event_id)));
    }
  };

  const handleRegister = async (eventId: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const { error } = await supabase
      .from('event_registrations')
      .insert([{
        event_id: eventId,
        user_id: user.id,
        full_name: user.user_metadata?.full_name || user.email || '',
        email: user.email || ''
      }]);

    if (!error) {
      toast({
        title: "Registered!",
        description: "You're all set for this event."
      });
      loadEvents();
      loadUserRegistrations();
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message
      });
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-accent via-nature-green to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <Users className="h-20 w-20 mx-auto mb-6 animate-float" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Get Your Hands Dirty for Clean Water
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto opacity-95">
            Join a stenciling squad, download your action kit, and become a drain defender. Every volunteer makes waves!
          </p>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-6">See Our Community in Action</h2>
            <p className="text-xl text-center text-muted-foreground mb-12">
              Watch how our volunteers are making a difference, one storm drain at a time
            </p>
            {/* Main Featured Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-8">
              <img
                src={teachingImage6}
                alt="Community education and engagement"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white">
                  <h3 className="text-2xl font-bold mb-2">Community Education Event</h3>
                  <p className="text-lg opacity-90">Teaching and engaging our community for environmental protection</p>
                </div>
              </div>
            </div>
            
            {/* Additional Community Images Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <img
                  src={teachingImage2}
                  alt="Educational workshop session"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h4 className="text-lg font-bold mb-1">Educational Workshop</h4>
                    <p className="text-sm opacity-90">Learning about water protection</p>
                  </div>
                </div>
              </div>
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <img
                  src={teachingImage3}
                  alt="Community awareness session"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h4 className="text-lg font-bold mb-1">Awareness Session</h4>
                    <p className="text-sm opacity-90">Spreading environmental awareness</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Join a Stenciling Squad</h2>
          <p className="text-xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Sign up for an upcoming event and help mark storm drains in your community
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {loading ? (
              <p className="col-span-full text-center text-muted-foreground">Loading events...</p>
            ) : events.length === 0 ? (
              <p className="col-span-full text-center text-muted-foreground">No upcoming events at the moment. Check back soon!</p>
            ) : (
              events.map((event) => {
                const registrationCount = event.event_registrations?.[0]?.count || 0;
                const spotsLeft = event.max_participants ? event.max_participants - registrationCount : null;
                const isRegistered = registrations.has(event.id);

                return (
                  <Card key={event.id} className="border-2 hover:border-primary transition-all hover:shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      <CardDescription className="space-y-2 text-base">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(event.event_date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground line-clamp-3">{event.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            {registrationCount} registered
                          </span>
                          {spotsLeft !== null && (
                            <span className="font-semibold text-nature-green">
                              {spotsLeft} spots left
                            </span>
                          )}
                        </div>
                        <Button 
                          className="w-full" 
                          onClick={() => handleRegister(event.id)}
                          disabled={isRegistered || (spotsLeft !== null && spotsLeft <= 0)}
                        >
                          {isRegistered ? 'Already Registered' : spotsLeft === 0 ? 'Event Full' : 'Sign Up Now'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Action Kit Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">Download Your Action Kit</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Can't make it to an organized event? No problem! Download our complete stenciling kit with templates, instructions, and tips to organize your own community effort.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Download the Stencil Templates</h4>
                      <p className="text-sm text-muted-foreground">
                        Print-ready designs approved for city use
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Get Your Supplies</h4>
                      <p className="text-sm text-muted-foreground">
                        Complete list of materials and where to buy them
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Gather Your Squad</h4>
                      <p className="text-sm text-muted-foreground">
                        Tips for recruiting volunteers and organizing safely
                      </p>
                    </div>
                  </div>
                </div>
                <Button size="lg" className="gap-2">
                  <Download className="h-5 w-5" />
                  Download Action Kit
                </Button>
              </div>
              <div className="relative">
                <img
                  src={stenciledDrain}
                  alt="Real stenciled storm drain example"
                  className="w-full rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-secondary text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-6">Community Impact Gallery</h2>
          <p className="text-xl text-center mb-12 opacity-95 max-w-3xl mx-auto">
            See the amazing work our volunteers have accomplished
          </p>
          <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <div className="aspect-square rounded-xl overflow-hidden">
              <img src={stenciledDrain} alt="Real stenciled drain" className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="aspect-square rounded-xl overflow-hidden">
              <img src={teachingImage2} alt="Educational session" className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="aspect-square rounded-xl overflow-hidden">
              <img src={teachingImage3} alt="Community workshop" className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="aspect-square rounded-xl overflow-hidden">
              <img src={teachingImage5} alt="Environmental education" className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          
          {/* Second Row with Stats */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-8">
            <div className="aspect-square rounded-xl overflow-hidden">
              <img src={teachingImage6} alt="Community engagement" className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="aspect-square rounded-xl overflow-hidden">
              <img src={volunteersImage} alt="Volunteer group" className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="aspect-square rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border-2 border-white/20">
              <div className="text-center p-6">
                <p className="text-2xl font-bold mb-2">45+</p>
                <p className="opacity-90">Drains Marked</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Involved?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Whether you join an event or organize your own, every action counts toward protecting our waterways.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              Sign Up for an Event
            </Button>
            <Button size="lg" variant="secondary" className="text-lg px-8 gap-2">
              <Download className="h-5 w-5" />
              Download Action Kit
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
