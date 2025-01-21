  'use client'

  
  import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
  import DashboardContent from './components/DashboardContent';

  const queryClient = new QueryClient();


  
  export default function WayneDashboard() {
    return (
      <QueryClientProvider client={queryClient}>
        <DashboardContent/>
      </QueryClientProvider>
    );
  }
