import React from "react";

import { AuthProvider } from "./contexts/AuthContext";
import Navigator from "./navigators/Navigator";

const App = () => {
  return (
    <AuthProvider>
      <Navigator />
    </AuthProvider>
  );
};

export default App;
