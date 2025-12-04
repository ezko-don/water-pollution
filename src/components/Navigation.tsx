import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { Menu, X, Droplets, LogOut, Shield } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/integrations/supabase/hooks/useAuth";
import { useUserRole } from "@/integrations/supabase/hooks/useUserRole";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { isAdmin } = useUserRole(user?.id);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (!error) {
      toast({ title: "Signed out", description: "You have been signed out successfully." });
      navigate("/");
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 font-bold text-xl">
            <Droplets className="h-6 w-6 text-primary" />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Storm Drain Saviors
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink
              to="/"
              className="text-foreground hover:text-primary transition-colors"
              activeClassName="text-primary font-semibold"
            >
              Home
            </NavLink>
            <NavLink
              to="/problem"
              className="text-foreground hover:text-primary transition-colors"
              activeClassName="text-primary font-semibold"
            >
              The Problem
            </NavLink>
            <NavLink
              to="/pledge"
              className="text-foreground hover:text-primary transition-colors"
              activeClassName="text-primary font-semibold"
            >
              Take the Pledge
            </NavLink>
            <NavLink
              to="/events"
              className="text-foreground hover:text-primary transition-colors"
              activeClassName="text-primary font-semibold"
            >
              Get Involved
            </NavLink>
            {isAdmin && (
              <NavLink to="/admin" className="text-foreground hover:text-primary transition-colors flex items-center gap-1" activeClassName="text-primary font-semibold">
                <Shield className="h-4 w-4" />Admin
              </NavLink>
            )}
            {user ? (
              <Button variant="ghost" size="sm" onClick={handleSignOut} className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />Sign Out
              </Button>
            ) : (
              <>
                <NavLink to="/auth" className="text-foreground hover:text-primary transition-colors" activeClassName="text-primary font-semibold">Sign In</NavLink>
                <NavLink to="/pledge"><Button variant="default" size="sm">Join Now</Button></NavLink>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 animate-slide-up">
            <NavLink
              to="/"
              className="block py-2 text-foreground hover:text-primary transition-colors"
              activeClassName="text-primary font-semibold"
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/problem"
              className="block py-2 text-foreground hover:text-primary transition-colors"
              activeClassName="text-primary font-semibold"
              onClick={() => setIsOpen(false)}
            >
              The Problem
            </NavLink>
            <NavLink
              to="/pledge"
              className="block py-2 text-foreground hover:text-primary transition-colors"
              activeClassName="text-primary font-semibold"
              onClick={() => setIsOpen(false)}
            >
              Take the Pledge
            </NavLink>
            <NavLink
              to="/events"
              className="block py-2 text-foreground hover:text-primary transition-colors"
              activeClassName="text-primary font-semibold"
              onClick={() => setIsOpen(false)}
            >
              Get Involved
            </NavLink>
            {isAdmin && (
              <NavLink to="/admin" className="block py-2 text-foreground hover:text-primary transition-colors flex items-center gap-2" activeClassName="text-primary font-semibold" onClick={() => setIsOpen(false)}>
                <Shield className="h-4 w-4" />Admin
              </NavLink>
            )}
            {user ? (
              <Button variant="ghost" size="sm" onClick={handleSignOut} className="flex items-center gap-2 w-full justify-start">
                <LogOut className="h-4 w-4" />Sign Out
              </Button>
            ) : (
              <>
                <NavLink to="/auth" className="block py-2 text-foreground hover:text-primary transition-colors" activeClassName="text-primary font-semibold" onClick={() => setIsOpen(false)}>Sign In</NavLink>
                <div className="pt-2">
                  <NavLink to="/pledge" onClick={() => setIsOpen(false)}><Button variant="default" size="sm" className="w-full">Join Now</Button></NavLink>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
