import { Suspense } from 'react';
import LoansPage from './Lpage';

export default function LoansWrapper() {
  return (
    // Wrap the client component in a Suspense boundary to handle the useSearchParams hook
    <Suspense fallback={<div>Loading...</div>}>
      <LoansPage />
    </Suspense>
  );
}