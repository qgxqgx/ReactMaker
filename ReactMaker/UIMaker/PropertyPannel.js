
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
import ViewStylePropTypes from 'ViewStylePropTypes'
import ReactPropTypes from 'ReactPropTypes'


// 属性面板
export default class PropertyPannel extends Component {
  constructor(props){
    super(props);

    this.state = {
      flushTimes:1,
    };

    //
    this.tabStyles = {
      //常用的布局...
      Layout:{
        flex:'requireNumber',
        alignItems:[
          'flex-start',
          'flex-end',
          'center',
          'stretch'
        ],
        alignSelf:[
          'auto',
          'flex-start',
          'flex-end',
          'center',
          'stretch'
        ],
        justifyContent: ['flex-start','flex-end','center','space-between','space-around'],
        position:[
            'absolute',
            'relative'
        ],
        flexDirection: [
          'row',
          'column'
        ],
        flexWrap: [
          'wrap',
          'nowrap'
        ],
        width: 'requireNumber',
        height: 'requireNumber',
        top: 'requireNumber',
        left: 'requireNumber',
        right: 'requireNumber',
        bottom: 'requireNumber',
        margin: 'requireNumber',
        marginVertical: 'requireNumber',
        marginHorizontal: 'requireNumber',
        marginTop: 'requireNumber',
        marginBottom: 'requireNumber',
        marginLeft: 'requireNumber',
        marginRight: 'requireNumber',
        padding: 'requireNumber',
        paddingVertical: 'requireNumber',
        paddingHorizontal: 'requireNumber',
        paddingTop: 'requireNumber',
        paddingBottom: 'requireNumber',
        paddingLeft: 'requireNumber',
        paddingRight: 'requireNumber',
        borderWidth: 'requireNumber',
        borderTopWidth: 'requireNumber',
        borderRightWidth: 'requireNumber',
        borderBottomWidth: 'requireNumber',
        borderLeftWidth: 'requireNumber',
      },
      Property:{
        backfaceVisibility: ['visible', 'hidden'],
        backgroundColor: 'requireColorString',
        borderColor: 'requireColorString',
        borderTopColor: 'requireColorString',
        borderRightColor: 'requireColorString',
        borderBottomColor: 'requireColorString',
        borderLeftColor: 'requireColorString',
        borderRadius: 'requireNumber',
        borderTopLeftRadius: 'requireNumber',
        borderTopRightRadius: 'requireNumber',
        borderBottomLeftRadius: 'requireNumber',
        borderBottomRightRadius: 'requireNumber',
        borderStyle: ['solid', 'dotted', 'dashed'],
        borderWidth: 'requireNumber',
        borderTopWidth: 'requireNumber',
        borderRightWidth: 'requireNumber',
        borderBottomWidth: 'requireNumber',
        borderLeftWidth: 'requireNumber',
        opacity: 'requireNumber',
        overflow: ['visible', 'hidden'],
      }

    };

    this.state.selectedTab = 'Layout';
    this.modifyingItem = undefined;

    //监听
    var that = this;
    RCTDeviceEventEmitter.addListener('onTreeFocus',function(text){
        //刷新属性面板
        that.needCommitProperty();
    });
    RCTDeviceEventEmitter.addListener('flushScreen',function(text){
        //刷新属性面板
        that.needCommitProperty();
    });
  }

  needCommitProperty(){
    this.modifyingItem = this.props.domTreeData.currentFocus;

    this.setState({
      flushTimes : ++this.state.flushTimes
    });
  }


  //属性面板展示
  getPannelRender(){
    let ele = this.props.domTreeData.currentFocus;
    if(ele == undefined){
      return <View></View>
    }

    var curItems = this.tabStyles[this.state.selectedTab];

    var list = [];
    for (key in curItems) {
      // console.log(key);
      let currentKey = key;
      let itemValue = curItems[key];
        let component = <View style={{flexDirection:'row',height:20,width:120,alignItems:'center'}} key={key+'_aa'}>
          <Text style={{flex:1,fontSize:7,textAlign:'right',marginRight:2}} >{currentKey}</Text>
          <TextInput ref={currentKey} defaultValue="" onChangeText={(text)=>{
              let theEle = this.props.domTreeData.currentFocus;
              if (theEle.editStyles == undefined) {
                theEle.editStyles = {};
              }

              if(itemValue == 'requireNumber'){
                theEle.editStyles[currentKey] = parseInt(text);
              }else  {
                theEle.editStyles[currentKey]=text;
              }

              console.log('the  text,currentKey,theEle.editStyles[currentKey]='+text,currentKey,theEle.editStyles[currentKey]);
              // console.log(theEle);
            }}
            style={{marginTop:3,paddingRight:4,flex:1,fontSize:7,borderWidth:1,borderColor:'white'}}/>
        </View>;
        list.push(component);
    }

    var contentView = <View style={{flex:1,flexDirection:'row',flexWrap:'wrap'}} key='contentView'>{list}</View>

    return contentView;

  }

  _changeTab(keyText){
    this.setState({
      selectedTab : keyText,
    });
  }

  render() {

    //tab 展示
    var tabList = [];
    var selectTabColor = '#F1F1F1';
    var unselectTabColor = 'white';
    for (let key in this.tabStyles) {
      var color = unselectTabColor;
      var text = key;
      if (this.state.selectedTab == key) {
        color = selectTabColor;
        text = '【' + key + '】'
      }
      tabList.push(<View style={{height:25,backgroundColor:color }} key={text} >
        <TouchableOpacity onPress={()=>this._changeTab(key)}>
          <Text style={{color:'red',fontSize:18}}>{text}</Text>
        </TouchableOpacity>
      </View>);
    }
    var headView = <View style={{flexDirection:'row'}} key='headView'>{tabList}</View>

    //content
    var contentView = this.getPannelRender();

    return (
    <View style={{flex:1}}>
        {headView}
        <ScrollView onScroll={()=>console.log('scrolling')}
          automaticallyAdjustContentInsets={false}
          style={styles.contentContainer}>
          {contentView}
        </ScrollView>

      </View>
    );
  }

}



var styles = StyleSheet.create({
    contentContainer: {
      paddingVertical: 1,
      flex:1,
    }
});
