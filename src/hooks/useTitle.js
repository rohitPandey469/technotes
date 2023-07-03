import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    // cleanup function
    // whenever our component unmount its setting back to the title it originally was!!!
    return () => (document.title = prevTitle);
  }, [title]);
};

export default useTitle;
