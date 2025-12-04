import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const PledgeList = () => {
  const [pledges, setPledges] = useState<any[]>([]);

  useEffect(() => {
    loadPledges();
  }, []);

  const loadPledges = async () => {
    const { data, error } = await supabase
      .from('pledges')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPledges(data);
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Zip Code</TableHead>
            <TableHead>Actions</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pledges.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                No pledges found yet.
              </TableCell>
            </TableRow>
          ) : (
            pledges.map((pledge) => (
              <TableRow key={pledge.id}>
                <TableCell className="font-medium">{pledge.full_name}</TableCell>
                <TableCell>{pledge.email}</TableCell>
                <TableCell>{pledge.zip_code}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {pledge.actions.map((action: string, idx: number) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {action}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{new Date(pledge.created_at).toLocaleDateString()}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PledgeList;
