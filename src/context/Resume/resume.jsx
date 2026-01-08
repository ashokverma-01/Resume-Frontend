import { createContext, useContext } from "react";

const ResumeContext = createContext();

export const useResume = () => useContext(ResumeContext);

export { ResumeContext };
