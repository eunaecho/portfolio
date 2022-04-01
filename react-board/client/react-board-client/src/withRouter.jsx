import { useLocation, useNavigate, useParams } from "react-router-dom";
  
export function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
        <Component
            {...props}
            router={{ location, navigate, params }}
        />
        );
    }

    return ComponentWithRouterProp;
}

// export 를 function 앞에 쓰니까 사용 가능 : 이유는? 