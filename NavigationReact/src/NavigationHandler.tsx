import NavigationContext from './NavigationContext';
import { StateNavigator, State } from 'navigation';
import * as React from 'react';

class NavigationHandler extends React.Component<{ stateNavigator: StateNavigator }, { stateNavigator: StateNavigator }> {
    private navigateHandler;
    private originalGetNavigateContinuation;
    constructor(props) {
        super(props);
        var { stateNavigator } = this.props;
        this.navigateHandler = () => this.forceUpdate();
        this.originalGetNavigateContinuation = stateNavigator['getNavigateContinuation'];
        stateNavigator['getNavigateContinuation'] = this.getNavigateContinuation.bind(this);
        this.state = { stateNavigator };
    }

    componentDidMount() {
        this.props.stateNavigator.onNavigate(this.navigateHandler);
    }

    componentWillUnmount() {
        this.props.stateNavigator.offNavigate(this.navigateHandler);
        this.state.stateNavigator['getNavigateContinuation'] = this.originalGetNavigateContinuation;
    }

    private getNavigateContinuation(oldUrl: string, state: State, data: any, url: string, historyAction: 'add' | 'replace' | 'none', history: boolean): (asyncData?: any) => void {
        var { stateNavigator } = this.props;
        return (asyncData?: any) => {
            this.setState(() => {
                if (oldUrl === stateNavigator.stateContext.url) {
                    var nextNavigator = new StateNavigator();
                    nextNavigator.states = stateNavigator.states;
                    nextNavigator.historyManager = stateNavigator.historyManager;
                    nextNavigator['stateHandler'] = stateNavigator['stateHandler'];
                    nextNavigator.stateContext = stateNavigator['createStateContext'](state, data, url, asyncData, history);
                    nextNavigator.configure = stateNavigator.configure.bind(stateNavigator);
                    nextNavigator.offNavigate = stateNavigator.offNavigate.bind(stateNavigator);
                    nextNavigator.onNavigate = stateNavigator.onNavigate.bind(stateNavigator);
                    nextNavigator.navigateLink = stateNavigator.navigateLink.bind(stateNavigator);
                    return { stateNavigator: nextNavigator };
                }
                return null;
            }, () => {
                if (url === this.state.stateNavigator.stateContext.url) {
                    stateNavigator.stateContext = this.state.stateNavigator.stateContext;
                    stateNavigator.offNavigate(this.navigateHandler);
                    stateNavigator['notify'](historyAction);
                }
            });
        };
    }

    render() {
        var { stateNavigator } = this.state;
        var { oldState, state, data, asyncData } = stateNavigator.stateContext;
        return (
            <NavigationContext.Provider value={{ oldState, state, data, asyncData, stateNavigator }}>
                {this.props.children}
            </NavigationContext.Provider>
        );
    }
}
export default NavigationHandler;
