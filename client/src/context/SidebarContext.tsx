import { createContext } from 'react';

// Define the type for the sidebar context value
interface SidebarContextValue {
  expanded: boolean; // Indicates whether the sidebar is expanded or not
  pathname: string; // Represents the current pathname of the application
}

// Create the SidebarContext with initial values
export const SidebarContext = createContext<SidebarContextValue>({
  expanded: false, // Default value for expanded is false
  pathname: '/', // Default value for pathname is "/"
});
