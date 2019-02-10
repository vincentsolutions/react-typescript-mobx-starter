import * as React from 'react';
import {Switch} from "react-router-dom";
import AppliedRoute from "./AppliedRoute";
import HomeContainer from "./views/home/HomeContainer";

export interface IRoutesProps {
    childProps?: object;
}

const Routes: React.FunctionComponent<IRoutesProps> = props => (
    <Switch>
        {
            /** Add as many routes as you want here.
                Use the commented elements bellow as
                examples for simple and complex cases.
            **/
        }
         {/*<AppliedRoute path={"/items/:id"} Component={ItemContainer} childProps={props.childProps} />*/}
         {/*<AppliedRoute path={"/items"} Component={ItemsContainer} childProps={props.childProps}/>*/}

         {/** If you need a catch-all route (such as a 'Not Found' page), use the following example **/}
         {/*<Route component={NotFound} />*/}

        <AppliedRoute path={"/home"} Component={HomeContainer} childProps={props.childProps} />
    </Switch>
);

export default Routes;