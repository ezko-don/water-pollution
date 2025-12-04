import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/integrations/supabase/hooks/useAuth';
import { useUserRole } from '@/integrations/supabase/hooks/useUserRole';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Users, Calendar, FileText, TrendingUp } from 'lucide-react';
import EventManagement from '@/components/admin/EventManagement';
import PledgeList from '@/components/admin/PledgeList';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: roleLoading } = useUserRole(user?.id);
  const [stats, setStats] = useState({
    totalPledges: 0,
    totalEvents: 0,
    totalRegistrations: 0,
    recentPledges: 0
  });
  const [pledgesByMonth, setPledgesByMonth] = useState<any[]>([]);
  const [actionDistribution, setActionDistribution] = useState<any[]>([]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!roleLoading && !isAdmin) {
      navigate('/');
    }
  }, [isAdmin, roleLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      loadStats();
      loadChartData();
    }
  }, [isAdmin]);

  const loadStats = async () => {
    const [pledgesResult, eventsResult, registrationsResult] = await Promise.all([
      supabase.from('pledges').select('*', { count: 'exact' }),
      supabase.from('events').select('*', { count: 'exact' }),
      supabase.from('event_registrations').select('*', { count: 'exact' })
    ]);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const { count: recentCount } = await supabase
      .from('pledges')
      .select('*', { count: 'exact' })
      .gte('created_at', thirtyDaysAgo.toISOString());

    setStats({
      totalPledges: pledgesResult.count || 0,
      totalEvents: eventsResult.count || 0,
      totalRegistrations: registrationsResult.count || 0,
      recentPledges: recentCount || 0
    });
  };

  const loadChartData = async () => {
    // Load pledges by month
    const { data: pledges } = await supabase
      .from('pledges')
      .select('created_at')
      .order('created_at', { ascending: true });

    if (pledges) {
      const monthCounts: { [key: string]: number } = {};
      pledges.forEach(pledge => {
        const month = new Date(pledge.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        monthCounts[month] = (monthCounts[month] || 0) + 1;
      });

      const chartData = Object.entries(monthCounts).map(([month, count]) => ({
        month,
        pledges: count
      }));
      setPledgesByMonth(chartData);
    }

    // Load action distribution
    const { data: pledgesWithActions } = await supabase
      .from('pledges')
      .select('actions');

    if (pledgesWithActions) {
      const actionCounts: { [key: string]: number } = {};
      pledgesWithActions.forEach(pledge => {
        pledge.actions.forEach((action: string) => {
          actionCounts[action] = (actionCounts[action] || 0) + 1;
        });
      });

      const pieData = Object.entries(actionCounts).map(([name, value]) => ({
        name,
        value
      }));
      setActionDistribution(pieData);
    }
  };

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))'];

  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your Storm Drain Saviors campaign</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Pledges</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPledges}</div>
              <p className="text-xs text-muted-foreground">+{stats.recentPledges} this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEvents}</div>
              <p className="text-xs text-muted-foreground">Active campaigns</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Event Registrations</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRegistrations}</div>
              <p className="text-xs text-muted-foreground">Community participants</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.totalEvents > 0 ? Math.round((stats.totalRegistrations / stats.totalEvents) * 10) / 10 : 0}
              </div>
              <p className="text-xs text-muted-foreground">Avg per event</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Pledges Over Time</CardTitle>
              <CardDescription>Monthly pledge submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={pledgesByMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="pledges" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Action Distribution</CardTitle>
              <CardDescription>Most popular pledge actions</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={actionDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="hsl(var(--primary))"
                    dataKey="value"
                  >
                    {actionDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Management</CardTitle>
            <CardDescription>Manage events and view pledges</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="events" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="pledges">Pledges</TabsTrigger>
              </TabsList>
              
              <TabsContent value="events" className="mt-6">
                <EventManagement onUpdate={loadStats} />
              </TabsContent>
              
              <TabsContent value="pledges" className="mt-6">
                <PledgeList />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
