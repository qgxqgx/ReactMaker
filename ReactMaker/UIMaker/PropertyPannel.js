
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

  //属性面板展示
  getPannelRender(){
    let ele = this.props.domTreeData.currentFocus;
    if(ele == undefined){
      return <View></View>
    }
    //根据
    var theType = ele.componentType;



  }

  render() {
    return (
      <View >
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {this.getPannelRender()}
        </ScrollView>

      </View>
    );
  }

}

var styles = StyleSheet.create({
    contentContainer: {
      paddingVertical: 1
    }
});
