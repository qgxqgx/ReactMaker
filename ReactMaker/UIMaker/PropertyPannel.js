
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'


export default class PropertyPannel extends Component {
  constructor(props){
    super(props);

    this.state = {
      flushTimes:1,
    };

    var that = this;
    RCTDeviceEventEmitter.addListener('onTreeFocus',function(text){
       that.setState({
        flushTimes : ++that.state.flushTimes
        });
      //刷新属性面板

    });
  }

  render() {
    return (
      <View style={{flexDirection:'row'}} >

      </View>
    );
  }

}
