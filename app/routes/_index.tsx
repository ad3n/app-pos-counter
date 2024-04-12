import { LoaderFunctionArgs } from "@remix-run/node";
import { redirect, type MetaFunction } from "@remix-run/node";
import LoginContainer from "~/container/Login";

export const meta: MetaFunction = () => {
  return [
    { title: "Pink Cell POS" },
    { name: "description", content: "Welcome to Pink Cell POS" },
  ];
};


export default function Index() {
  return (
    <LoginContainer />
  );
}

// export function requireUser(props:Middleware) {
//   props
//   const isLoggedIn = useSelector((state:RootState) => isAuthtoken(state) )

//   if (isLoggedIn) {
//     throw redirect("/dash", 302);
//   }
// }