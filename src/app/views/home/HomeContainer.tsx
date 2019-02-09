import * as React from 'react';
import './HomeContainer.less';
import {RouteComponentProps, withRouter} from "react-router";
import {inject, observer} from "mobx-react";
import Stores from "../../global/classes/Stores";

export interface IHomeContainerProps extends RouteComponentProps<any> {

}


@inject(Stores.itemStore)
@observer
class HomeContainer extends React.Component<IHomeContainerProps, {}> {


    render() {
        const {} = this.props;

        return (
            <div className="HomeContainer">
                Home
            </div>
        )
    }
}

export default withRouter(HomeContainer);