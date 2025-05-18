
import { useNavigate } from "react-router-dom";

// Wrapper for class-based component to use useNavigate (React Router v6)
const withRouter = (Component) => {
    function ComponentWithRouterProp(props) {
      const navigate = useNavigate();
      return <Component {...props} navigate={navigate} />;
    }
    return ComponentWithRouterProp;
  }


export default withRouter;