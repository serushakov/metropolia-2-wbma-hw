import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { AuthProvider } from "./contexts/AuthContext";
import Navigator from "./navigators/Navigator";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Navigator />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
