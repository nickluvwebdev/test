// src/pages/Quotation.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

// Type for a single quotation
interface Quotation {
  id: number;
  quotationNumber: string;
  createdDate: string;
  validUntil: string;
  client: {
    companyName: string;
  };
  staff: {
    firstName: string;
  };
  totalAmount: number;
  currency: string;
}

// NEW: Type for a single client
interface Client {
  id: number;
  companyName: string;
}

export default function Quotation() {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [clients, setClients] = useState<Client[]>([]); // NEW: State for clients
  const [isModalOpen, setIsModalOpen] = useState(false);

  // States for the form
  const [quotationNumber, setQuotationNumber] = useState('');
  const [validUntil, setValidUntil] = useState<Date | undefined>();
  const [subtotal, setSubtotal] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [notes, setNotes] = useState('');
  const [clientId, setClientId] = useState(''); // This will be the ID from the dropdown

  // Fetch data when the page loads
  useEffect(() => {
    fetchQuotations();
    fetchClients(); // NEW: Fetch clients as well
  }, []);

  const fetchQuotations = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://203.159.93.114:3100/quotations', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuotations(response.data);
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        console.log('No quotations found for this user.');
        setQuotations([]); // Set to empty array if 404
      } else {
        console.error('Failed to fetch quotations:', error);
      }
    }
  };

  // NEW: Function to fetch clients
  const fetchClients = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://203.159.93.114:3100/clients', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClients(response.data);
    } catch (error) {
      console.error('Failed to fetch clients:', error);
    }
  };

  const handleCreateQuotation = async () => {
    const token = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');

    // Validation
    if (!quotationNumber || !validUntil || !clientId || !subtotal || !userId) {
      alert('Please fill out all required fields.');
      return;
    }

    const quotationData = {
      quotationNumber: quotationNumber,
      validUntil: format(validUntil, 'yyyy-MM-dd'),
      clientId: parseInt(clientId),
      subtotal: parseFloat(subtotal),
      currency: currency,
      notes: notes,
      staffId: parseInt(userId as string),
    };

    console.log('Sending new quotation:', quotationData);

    try {
      await axios.post(
        'http://203.159.93.114:3100/quotations',
        quotationData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      fetchQuotations(); // Refresh the list
      setIsModalOpen(false); // Close the modal
      
      // Reset form
      setQuotationNumber('');
      setValidUntil(undefined);
      setClientId('');
      setSubtotal('');
      setNotes('');

    } catch (error) {
      console.error('Failed to create quotation:', error);
      alert('Failed to create quotation. Check console for details.');
    }
  };

  return (
    <div>
      {/* BANNER */}
      <section
        className="h-40 md:h-52 w-full bg-center bg-cover flex items-center justify-center"
        // style={{ backgroundImage: "url('/assets/bg2.png')" }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)]">
          Quotation Management System
        </h1>
      </section>

      {/* CONTENT */}
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        {/* SEARCH / FILTER CARD */}
        <section className="bg-white rounded-lg shadow p-5">
          {/* ... (your search form) ... */}
        </section>

        {/* LIST HEADER + CREATE BUTTON */}
        <section className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-5 py-4 flex items-center justify-between">
            {/* ... (your "Quotations" title) ... */}
            
            {/* CREATE QUOTATION MODAL */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button>+ Create a Quotation</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New Quotation</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div>
                    <label htmlFor="quotationNumber" className="text-sm font-medium">
                      Quotation Number
                    </label>
                    <Input
                      id="quotationNumber"
                      value={quotationNumber}
                      onChange={(e) => setQuotationNumber(e.target.value)}
                      placeholder="Q-2025-XXX"
                    />
                  </div>
                  
                  {/* NEW: Replaced Input with Select for Client */}
                  <div>
                    <label htmlFor="clientId" className="text-sm font-medium">
                      Client
                    </label>
                    <Select value={clientId} onValueChange={setClientId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a client" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem key={client.id} value={String(client.id)}>
                            {client.companyName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label htmlFor="validUntil" className="text-sm font-medium">
                      Valid Until
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full justify-start text-left font-normal',
                            !validUntil && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {validUntil ? format(validUntil, 'PPP') : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={validUntil}
                          onSelect={setValidUntil}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <label htmlFor="subtotal" className="text-sm font-medium">
                      Subtotal
                    </label>
                    <Input
                      id="subtotal"
                      type="number"
                      value={subtotal}
                      onChange={(e) => setSubtotal(e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label htmlFor="currency" className="text-sm font-medium">
                      Currency
                    </label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="THB">THB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={handleCreateQuotation}>Create Quotation</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* QUOTATION TABLE */}
          <div className="border-t">
            <Table>
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead>Quotation#</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Valid Until</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Staff</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* NEW: Added check for quotations.length */}
                {quotations.length > 0 ? (
                  quotations.map((quotation) => (
                    <TableRow key={quotation.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        {quotation.quotationNumber}
                      </TableCell>
                      <TableCell>
                        {format(new Date(quotation.createdDate), 'MMM dd, yyyy')}
                      </TableCell>
                      <TableCell>
                        {format(new Date(quotation.validUntil), 'MMM dd, yyyy')}
                      </TableCell>
                      <TableCell>{quotation.client.companyName}</TableCell>
                      <TableCell>{quotation.staff.firstName}</TableCell>
                      <TableCell className="text-right">
                        {quotation.currency}{' '}
                        {quotation.totalAmount.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  // Show this if no quotations are found
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-gray-500 py-4">
                      No quotations found. Try creating one!
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </section>
      </main>
    </div>
  );
}